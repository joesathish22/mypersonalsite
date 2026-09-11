import { chromium } from "playwright";

const ITERATIONS = 30;
const results = [];

function parseRgb(str) {
  const m = str.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/);
  if (!m) return null;
  return { r: +m[1], g: +m[2], b: +m[3] };
}

function isLight(rgb) {
  if (!rgb) return false;
  // Anything meaningfully light/white/grey — the dark theme's darkest tones
  // (void/deep/panel) all have each channel well under 40.
  return rgb.r > 120 && rgb.g > 120 && rgb.b > 120;
}

async function runOnce(browser, i) {
  // Vary CPU throttling and an artificial pre-scroll delay across runs to
  // widen the chance of hitting whatever timing window used to cause the
  // flash — a fixed single condition would under-test an intermittent bug.
  const cpuThrottle = [1, 1, 2, 4, 6][i % 5];
  const preScrollDelay = [0, 30, 80, 150, 300, 500][i % 6];
  const viewport = [
    { width: 1440, height: 900 },
    { width: 1366, height: 768 },
    { width: 1280, height: 800 },
    { width: 390, height: 844 },
  ][i % 4];

  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const client = await context.newCDPSession(page);
  await client.send("Emulation.setCPUThrottlingRate", { rate: cpuThrottle });

  const consoleErrors = [];
  page.on("pageerror", (e) => consoleErrors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });

  await page.goto("http://localhost:3000", { waitUntil: "commit" });
  if (preScrollDelay > 0) await page.waitForTimeout(preScrollDelay);

  const capTop = await page.evaluate(() => {
    const el = document.getElementById("capabilities");
    return el ? el.getBoundingClientRect().top + window.scrollY : null;
  }).catch(() => null);

  if (capTop === null) {
    await context.close();
    return { i, cpuThrottle, preScrollDelay, viewport, skipped: true };
  }

  await page.evaluate((y) => window.scrollTo(0, y), capTop);
  // Sample immediately and again shortly after — the flash, if present,
  // would show in an early sample and should self-correct per the original
  // report ("scrolling immediately fixes it").
  const samples = [];
  for (const wait of [0, 50, 150, 400]) {
    if (wait > 0) await page.waitForTimeout(wait);
    const sample = await page.evaluate(() => {
      const section = document.getElementById("capabilities");
      const heading = section?.querySelector("h3");
      const rect = section?.getBoundingClientRect();
      const cx = rect ? rect.left + rect.width * 0.2 : 100;
      const cy = rect ? rect.top + rect.height * 0.5 : 100;
      const topEl = document.elementFromPoint(cx, cy);
      const sectionBg = section ? getComputedStyle(section).backgroundColor : null;
      const topElBg = topEl ? getComputedStyle(topEl).backgroundColor : null;
      const headingColor = heading ? getComputedStyle(heading).color : null;
      const headingOpacity = heading ? getComputedStyle(heading.parentElement).opacity : null;
      return { sectionBg, topElBg, headingColor, headingOpacity, topElTag: topEl?.tagName };
    });
    samples.push({ wait, ...sample });
  }

  await page.screenshot({
    path: `C:/Users/gayat/AppData/Local/Temp/claude/d--Queen-Touch-Technology-works-Company-Sites-personal-site/c7673378-baee-4fba-93b4-3fec7265deed/scratchpad/flash-run-${i}.png`,
  });

  await context.close();

  const flaggedSamples = samples.filter((s) => {
    const bg = parseRgb(s.sectionBg || "");
    const topBg = parseRgb(s.topElBg || "");
    return isLight(bg) || isLight(topBg);
  });

  return {
    i,
    cpuThrottle,
    preScrollDelay,
    viewport,
    samples,
    flagged: flaggedSamples.length > 0,
    consoleErrors,
  };
}

const browser = await chromium.launch();
for (let i = 0; i < ITERATIONS; i++) {
  const result = await runOnce(browser, i);
  results.push(result);
  const status = result.skipped ? "SKIPPED" : result.flagged ? "FLAGGED-WHITE" : "ok";
  console.log(
    `run ${i}: cpu=${result.cpuThrottle}x delay=${result.preScrollDelay}ms vp=${result.viewport?.width} -> ${status}` +
      (result.consoleErrors?.length ? ` errors=${result.consoleErrors.join(" | ")}` : "")
  );
}
await browser.close();

const flaggedRuns = results.filter((r) => r.flagged);
console.log("\n=== SUMMARY ===");
console.log(`${results.length} runs, ${flaggedRuns.length} flagged white/grey flash`);
if (flaggedRuns.length > 0) {
  console.log(JSON.stringify(flaggedRuns, null, 2));
}
