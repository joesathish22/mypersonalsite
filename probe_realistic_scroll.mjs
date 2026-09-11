import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const errors = [];
page.on("console", (msg) => { if (msg.type() !== "log") errors.push(`[${msg.type()}] ${msg.text()}`); });
page.on("pageerror", (err) => errors.push("PAGEERROR: " + err.message));

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(600);

const totalHeight = await page.evaluate(() => document.body.scrollHeight);

// Simulate a genuinely fast continuous flick-scroll: many small steps, ~16ms apart (60fps).
const steps = 120;
for (let i = 0; i <= steps; i++) {
  const y = (i / steps) * totalHeight;
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(12);
}
await page.waitForTimeout(300);

// And a fast scroll back up.
for (let i = steps; i >= 0; i--) {
  const y = (i / steps) * totalHeight;
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(8);
}
await page.waitForTimeout(500);

console.log("errors/warnings:", errors.length ? errors.join("\n") : "none");
await browser.close();
