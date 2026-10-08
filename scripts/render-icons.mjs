// Renders icons/icon.svg to the PNG sizes the manifest uses.
// Needs Playwright with a Chromium build: `npm i playwright && npx playwright install chromium`.
//
// The 128px icon doubles as the Chrome Web Store icon, whose artwork should
// be 96px with 16px of transparent padding, so it's rendered zoomed out.
// The smaller sizes fill their canvas to stay legible in the toolbar.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'icons');
const svg = fs.readFileSync(path.join(dir, 'icon.svg'), 'utf8').replace(/<!--[\s\S]*?-->\s*/, '');

// The tile spans 112 of the 128 units; show it at 96px in the 128px icon.
const storeScale = 96 / 112;
const storeBox = 128 / storeScale;
const storeOffset = (storeBox - 128) / 2;

const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
for (const size of [16, 32, 48, 128]) {
  const viewBox = size === 128 ? `${-storeOffset} ${-storeOffset} ${storeBox} ${storeBox}` : '0 0 128 128';
  const sized = svg
    .replace('width="128" height="128"', `width="${size}" height="${size}"`)
    .replace('viewBox="0 0 128 128"', `viewBox="${viewBox}"`);
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(`<body style="margin:0;background:transparent">${sized}</body>`);
  await page.screenshot({ path: path.join(dir, `icon-${size}.png`), omitBackground: true });
  await page.close();
  console.log(`icons/icon-${size}.png`);
}
await browser.close();
