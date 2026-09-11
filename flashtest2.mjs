import { chromium } from "playwright";

function parseRgb(str) {
  const m = (str || "").match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/);
  if (!m) return null;
  return { r: +m[1], g: +m[2], b: +m[3] };
}
function isLight(rgb) {
  return !!rgb && rgb.r > 120 && rgb.g > 120 && rgb.b > 120;
}

const browser = await chromium.launch();
let flaggedCount = 0;

for (let i = 0; i < 10; i++) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const client = await context.newCDPSession(page);

  // Simulate a cold, slow-network first visit: throttle to ~slow-3G-ish and
  // disable cache so the self-hosted font file genuinely takes time to
  // arrive, maximizing the fallback-font-then-swap window this fix targets.
  await client.send("Network.emulateNetworkConditions", {
    offline: false,
    downloadThroughput: (400 * 1024) / 8,
    uploadThroughput: (400 * 1024) / 8,
    latency: 150,
  });
  await client.send("Network.setCacheDisabled", { cacheDisabled: true });
  await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });

  await page.goto("http://localhost:3000", { waitUntil: "commit" });

  const capTop = await page
    .evaluate(() => {
      const el = document.getElementById("capabilities");
      return el ? el.getBoundingClientRect().top + window.scrollY : null;
    })
    .catch(() => null);

  if (capTop !== null) {
    // Scroll straight there immediately — the worst case for a timing race.
    await page.evaluate((y) => window.scrollTo(0, y), capTop);
  }

  const samples = [];
  for (const wait of [0, 100, 300, 800, 1500]) {
    await page.waitForTimeout(wait);
    const sample = await page.evaluate(() => {
      const section = document.getElementById("capabilities");
      const rect = section?.getBoundingClientRect();
      const cx = rect ? rect.left + rect.width * 0.2 : 100;
      const cy = rect ? rect.top + rect.height * 0.5 : 100;
      const topEl = document.elementFromPoint(cx, cy);
      return {
        sectionBg: section ? getComputedStyle(section).backgroundColor : null,
        topElBg: topEl ? getComputedStyle(topEl).backgroundColor : null,
        fontsReady: document.fonts.status,
      };
    });
    samples.push({ wait, ...sample });
  }

  await page.screenshot({
    path: `C:/Users/gayat/AppData/Local/Temp/claude/d--Queen-Touch-Technology-works-Company-Sites-personal-site/c7673378-baee-4fba-93b4-3fec7265deed/scratchpad/flash2-run-${i}.png`,
  });

  const flagged = samples.some((s) => isLight(parseRgb(s.sectionBg)) || isLight(parseRgb(s.topElBg)));
  if (flagged) flaggedCount++;
  console.log(`cold-slow run ${i}: ${flagged ? "FLAGGED" : "ok"}`, JSON.stringify(samples));

  await context.close();
}

await browser.close();
console.log(`\n${flaggedCount} / 10 cold-slow-network runs flagged`);
