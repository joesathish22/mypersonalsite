import { chromium } from "playwright";
const OUT = "C:/Users/gayat/AppData/Local/Temp/claude/d--Queen-Touch-Technology-works-Company-Sites-personal-site/c7673378-baee-4fba-93b4-3fec7265deed/scratchpad";
const browser = await chromium.launch();

async function run(label, opts, fn) {
  const context = await browser.newContext(opts);
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await fn(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(`${label}: overflow=${overflow}px errors=${errors.length ? errors.join(" | ") : "none"}`);
  await context.close();
}

// Visual check - screenshot the Strategy caption in its normal state
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const capTop = await page.evaluate(() => document.getElementById("capabilities").getBoundingClientRect().top + window.scrollY);
  await page.evaluate((y) => window.scrollTo(0, y), capTop);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT}/strategy-visual-check.png` });
  await context.close();
}

await run("reduced-motion", { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" }, async (page) => {
  await page.waitForTimeout(600);
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (const f of [0, 0.15, 0.3, 0.5, 1]) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(total * f));
    await page.waitForTimeout(400);
  }
});

await run("webgl-disabled", { viewport: { width: 1440, height: 900 } }, async (page) => {
  await page.addInitScript(() => {
    const orig = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (String(type).includes("webgl")) return null;
      return orig.call(this, type, ...args);
    };
  });
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (const f of [0, 0.15, 0.3, 0.5, 1]) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(total * f));
    await page.waitForTimeout(400);
  }
});

await run("mobile", { viewport: { width: 390, height: 844 } }, async (page) => {
  await page.waitForTimeout(600);
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (const f of [0, 0.15, 0.3, 0.5, 1]) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(total * f));
    await page.waitForTimeout(400);
  }
});

await run("rapid-scroll-from-load", { viewport: { width: 1440, height: 900 } }, async (page) => {
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let i = 0; i <= 60; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), (i / 60) * total);
    await page.waitForTimeout(8);
  }
});

await run("reverse-scroll", { viewport: { width: 1440, height: 900 } }, async (page) => {
  const total = await page.evaluate(() => document.body.scrollHeight);
  await page.evaluate((y) => window.scrollTo(0, y), total);
  await page.waitForTimeout(500);
  for (let i = 60; i >= 0; i--) {
    await page.evaluate((y) => window.scrollTo(0, y), (i / 60) * total);
    await page.waitForTimeout(10);
  }
});

await browser.close();
