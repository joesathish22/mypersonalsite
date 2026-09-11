import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(800);

const info = await page.evaluate(() => {
  const ids = ["home", "impact", "capabilities", "ai", "work", "about", "qtt", "global", "contact"];
  const total = document.body.scrollHeight;
  const results = {};
  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) { results[id] = "MISSING"; continue; }
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    results[id] = { top: Math.round(top), height: Math.round(rect.height), topPct: (top/total*100).toFixed(1), heightPct: (rect.height/total*100).toFixed(1) };
  }
  return { total, results };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
