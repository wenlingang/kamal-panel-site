// 两页 × 375/1440 × 浅色/深色：不许横向滚动，不许有裂图。截图留在 tmp/site/review/ 供人工看。
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const root = new URL("../site/", import.meta.url);
const out = new URL("../tmp/review/", import.meta.url).pathname;
const pages = ["index.html", "zh-CN/index.html", "docs/index.html", "zh-CN/docs/index.html"];
mkdirSync(out, { recursive: true });

let failed = false;
const browser = await chromium.launch();

for (const width of [375, 1440]) {
  for (const colorScheme of ["light", "dark"]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme });
    const page = await context.newPage();
    // 用失败的请求判断裂图，不用 naturalWidth：只有 viewBox 的 SVG 在 Chromium 里 naturalWidth 恒为 0。
    const failedRequests = [];
    page.on("requestfailed", (request) => failedRequests.push(request.url()));

    for (const p of pages) {
      await page.goto(new URL(p, root).href, { waitUntil: "load" });
      const label = `${p} @${width} ${colorScheme}`;

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      if (overflow > 0) { console.error(`${label}：横向溢出 ${overflow}px`); failed = true; }

      const broken = failedRequests.splice(0).filter((url) => url.startsWith("file:"));
      if (broken.length) { console.error(`${label}：资源没加载 ${broken.join(", ")}`); failed = true; }

      await page.screenshot({ path: `${out}${p.replaceAll("/", "_")}-${width}-${colorScheme}.png`, fullPage: true });
    }
    await context.close();
  }
}

await browser.close();
console.log(failed ? "版式检查未通过" : `版式检查通过，截图见 ${out}`);
process.exit(failed ? 1 : 0);
