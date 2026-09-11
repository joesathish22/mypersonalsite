import { chromium } from "playwright";
const OUT = "C:/Users/gayat/AppData/Local/Temp/claude/d--Queen-Touch-Technology-works-Company-Sites-personal-site/c7673378-baee-4fba-93b4-3fec7265deed/scratchpad";
const browser = await chromium.launch();

const viewports = [
  { width: 1440, height: 900, label: "1440" },
  { width: 1366, height: 768, label: "1366" },
  { width: 1280, height: 800, label: "1280" },
  { width: 390, height: 844, label: "390" },
];

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: vp });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const capTop = await page.evaluate(() => document.getElementById("capabilities").getBoundingClientRect().top + window.scrollY);
  const total = await page.evaluate(() => document.body.scrollHeight);

  // Strategy (start of pin)
  await page.evaluate((y) => window.scrollTo(0, y), capTop + 5);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/tj-${vp.label}-strategy.png` });

  // Build (~1/3 through the pin's scroll runway)
  await page.evaluate((y) => window.scrollTo(0, y), capTop + (window.innerHeight * 1.0));
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/tj-${vp.label}-build.png` });

  // Scale (~2/3 through)
  await page.evaluate((y) => window.scrollTo(0, y), capTop + (window.innerHeight * 2.0));
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/tj-${vp.label}-scale.png` });

  // Protect (near end)
  await page.evaluate((y) => window.scrollTo(0, y), capTop + (window.innerHeight * 2.85));
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/tj-${vp.label}-protect.png` });

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(`${vp.label}px: overflow=${overflow}px errors=${errors.length ? errors.join(" | ") : "none"}`);

  await context.close();
}

await browser.close();
