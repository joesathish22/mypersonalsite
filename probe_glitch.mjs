import { chromium } from "playwright";
const OUT = "C:/Users/gayat/AppData/Local/Temp/claude/d--Queen-Touch-Technology-works-Company-Sites-personal-site/c7673378-baee-4fba-93b4-3fec7265deed/scratchpad/screenshots-v2";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const errors = [];
page.on("console", (msg) => errors.push(`[${msg.type()}] ${msg.text()}`));
page.on("pageerror", (err) => errors.push("PAGEERROR: " + err.message));

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(800);

const totalHeight = await page.evaluate(() => document.body.scrollHeight);

// Reproduce the exact rapid-jump pattern with a fixed seed so it's deterministic.
const seedRandom = (() => {
  let s = 42;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
})();

for (let i = 0; i < 8; i++) {
  const y = seedRandom() * totalHeight;
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(60);
}
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/glitch-repro.png` });

const domInfo = await page.evaluate(() => {
  const brokenImages = Array.from(document.querySelectorAll("img")).filter(
    (img) => !img.complete || img.naturalWidth === 0
  ).map((img) => ({ src: img.src, alt: img.alt, complete: img.complete, naturalWidth: img.naturalWidth }));

  const canvases = Array.from(document.querySelectorAll("canvas")).map((c) => ({
    width: c.width, height: c.height,
    style: c.getAttribute("style"),
    parentClass: c.parentElement?.className,
  }));

  // Find any element covering most of the viewport with a gray/white background
  const all = Array.from(document.querySelectorAll("body *"));
  const suspects = all.filter((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.width < window.innerWidth * 0.8 || rect.height < window.innerHeight * 0.5) return false;
    const style = getComputedStyle(el);
    return style.position === "fixed" || parseInt(style.zIndex || "0", 10) > 50;
  }).map((el) => ({
    tag: el.tagName, id: el.id, className: typeof el.className === "string" ? el.className : "",
    zIndex: getComputedStyle(el).zIndex, position: getComputedStyle(el).position,
    bg: getComputedStyle(el).background.slice(0, 120),
    rect: el.getBoundingClientRect().toJSON ? el.getBoundingClientRect() : null,
  }));

  return { brokenImages, canvases, suspects, scrollY: window.scrollY };
});

console.log("errors:", errors.length ? errors.join("\n") : "none");
console.log("DOM info:", JSON.stringify(domInfo, null, 2));

await browser.close();
