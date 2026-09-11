import { chromium } from "playwright";
const OUT = "C:/Users/gayat/AppData/Local/Temp/claude/d--Queen-Touch-Technology-works-Company-Sites-personal-site/c7673378-baee-4fba-93b4-3fec7265deed/scratchpad/screenshots-v2";
import fs from "node:fs";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

async function run(viewport, label, opts = {}) {
  const context = await browser.newContext({ viewport, reducedMotion: opts.reducedMotion });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
  page.on("pageerror", (err) => errors.push("PAGEERROR: " + err.message));

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT}/${label}-00-hero.png` });

  const totalHeight = await page.evaluate(() => document.body.scrollHeight);

  // Scroll gradually through the whole page, capturing key moments.
  const fractions = [0.08, 0.14, 0.16, 0.18, 0.2, 0.22, 0.24, 0.3, 0.4, 0.55, 0.7, 0.85, 1.0];
  for (const f of fractions) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(totalHeight * f));
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/${label}-scroll-${String(f).replace(".", "")}.png` });
  }

  // Rapid scroll test (jump around quickly)
  for (let i = 0; i < 8; i++) {
    const y = Math.random() * totalHeight;
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/${label}-rapid-scroll.png` });

  // Reverse scroll test
  await page.evaluate((h) => window.scrollTo(0, h), totalHeight);
  await page.waitForTimeout(400);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/${label}-reverse-scroll-top.png` });

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 0) errors.push(`horizontal overflow: ${overflow}px`);

  console.log(`--- ${label} ---`);
  console.log("errors:", errors.length ? errors.join(" | ") : "none");

  await context.close();
}

await run({ width: 1440, height: 900 }, "desktop");
await run({ width: 390, height: 844 }, "mobile");
await run({ width: 1440, height: 900 }, "reduced-motion", { reducedMotion: "reduce" });

await browser.close();
