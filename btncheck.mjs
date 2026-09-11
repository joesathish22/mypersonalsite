import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
const box = await page.evaluate(() => {
  const links = Array.from(document.querySelectorAll("a"));
  const primary = links.find(a => a.textContent.includes("Let's Build Together"));
  const secondary = links.find(a => a.textContent.includes("Explore My Work"));
  const p = primary.getBoundingClientRect();
  const s = secondary.getBoundingClientRect();
  return { primary: {height: p.height, top: p.top, bottom: p.bottom}, secondary: {height: s.height, top: s.top, bottom: s.bottom} };
});
console.log(JSON.stringify(box, null, 2));
const el = await page.$("a:has-text(\"Let's Build Together\")");
await el.screenshot({ path: "C:/Users/gayat/AppData/Local/Temp/claude/d--Queen-Touch-Technology-works-Company-Sites-personal-site/c7673378-baee-4fba-93b4-3fec7265deed/scratchpad/btn-check.png" });
const parent = await page.$(".flex.flex-wrap.items-center.gap-4");
if (parent) await parent.screenshot({ path: "C:/Users/gayat/AppData/Local/Temp/claude/d--Queen-Touch-Technology-works-Company-Sites-personal-site/c7673378-baee-4fba-93b4-3fec7265deed/scratchpad/btn-pair.png" });
await browser.close();
