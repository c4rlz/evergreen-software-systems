// Renders public/og.png (1200×630), the image shown when the site is shared.
// Run with `npm run og` after changing the fern drawing or the studio name.
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const fern = readFileSync(new URL('../public/drawings/fern.svg', import.meta.url), 'utf8')
  .replace(/<svg[^>]*>/, '')
  .replace('</svg>', '');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f3ecdc"/>
  <rect x="60" y="45" width="1080" height="540" fill="#faf6ec"/>
  <rect x="60" y="45" width="1080" height="540" fill="none" stroke="#2e241b" stroke-opacity="0.15"/>
  <g transform="translate(110 70) scale(2.4)" color="#2f5a3a" fill="none" stroke="currentColor"
     stroke-linecap="round" stroke-linejoin="round">${fern}</g>
  <text x="460" y="280" font-family="Georgia, 'Times New Roman', serif" font-size="70" fill="#2e241b">Sword Fern Studio</text>
  <text x="462" y="345" font-family="Georgia, serif" font-style="italic" font-size="34" fill="#5f5144">Software, made by hand.</text>
  <text x="462" y="395" font-family="Georgia, serif" font-style="italic" font-size="34" fill="#5f5144">Cumberland, Vancouver Island.</text>
  <line x1="462" y1="440" x2="840" y2="440" stroke="#a94f1c" stroke-width="2"/>
  <text x="462" y="485" font-family="Georgia, serif" font-style="italic" font-size="26" fill="#a94f1c">Polystichum munitum</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(new URL('../public/og.png', import.meta.url).pathname);
console.log('wrote public/og.png');
