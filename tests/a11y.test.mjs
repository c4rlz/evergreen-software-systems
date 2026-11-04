import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { html, css } from './helpers.mjs';
import * as content from '../src/content/site.ts';

// Light tokens sit on bare :root; dark tokens inside the prefers-color-scheme block.
const source = readFileSync('src/styles/global.css', 'utf8');
const tokens = (block) => Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
const light = tokens(source.match(/:root\s*\{([\s\S]*?)\n\}/)[1]);
const dark = tokens(source.match(/prefers-color-scheme:\s*dark\)\s*\{\s*:root\s*\{([\s\S]*?)\}/)[1]);

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

for (const [theme, t] of [['light', light], ['dark', dark]]) {
  test(`text tokens meet WCAG AA on paper and sheet (${theme})`, () => {
    for (const fg of ['ink', 'ink-soft', 'fern', 'fern-soft', 'accent']) {
      for (const bg of ['paper', 'sheet']) {
        const r = ratio(t[fg], t[bg]);
        assert.ok(r >= 4.5, `--${fg} on --${bg} is ${r.toFixed(2)}:1`);
      }
    }
  });
}

const slots = () => [content.specimen.photo, ...content.specimens.map((s) => s.drawing), content.handmade.image];

test('every image slot has its file path filled in, so swapping a scan is one file', () => {
  for (const img of slots()) assert.match(img.src, /^\/(drawings|photos)\/[\w-]+\.(svg|png|jpe?g|webp)$/, JSON.stringify(img));
});

test('every <img> on the page points at a file that exists', () => {
  for (const [, src] of html().matchAll(/<img[^>]*src="([^"]+)"/g)) {
    assert.ok(existsSync(`dist${src}`), `${src} is missing, which would show a broken image`);
  }
});

test('every slot has a hand-drawn sketch to show until Carly adds her own', () => {
  for (const img of slots()) {
    assert.ok(img.sketch, `no sketch for ${img.src}`);
    assert.ok(existsSync(`public${img.sketch.src}`), `${img.sketch.src} is missing`);
    assert.ok(img.sketch.alt && !img.sketch.alt.includes('['), `sketch alt for ${img.src} should describe the sketch`);
  }
});

test('a slot shows Carly\'s file first, then the sketch, and the placeholder only if neither exists', () => {
  const page = html();
  for (const img of slots()) {
    const shown = existsSync(`public${img.src}`) ? img.src : img.sketch && existsSync(`public${img.sketch.src}`) ? img.sketch.src : null;
    if (shown) assert.match(page, new RegExp(`<img[^>]*src="${shown}"`));
  }
  const neither = slots().filter((img) => !existsSync(`public${img.src}`) && !(img.sketch && existsSync(`public${img.sketch.src}`))).length;
  assert.equal([...page.matchAll(/class="slot[^"]*"[^>]*role="img"/g)].length, neither);
});

test('sketches look hand-drawn and follow dark mode', () => {
  for (const img of slots()) {
    const svg = readFileSync(`public${img.sketch.src}`, 'utf8');
    assert.match(svg, /feDisplacementMap/, `${img.sketch.src} has no pencil wobble`);
    assert.match(svg, /prefers-color-scheme:\s*dark/, `${img.sketch.src} ignores dark mode`);
  }
});

test('the fern note reveals on keyboard focus', () => {
  assert.match(css(), /\.fern(\[[^\]]+\])?:focus-visible/);
});

test('without JS the fern is a plain button, not a "collapsed" one', () => {
  assert.doesNotMatch(html(), /<button[^>]*class="fern[^"]*"[^>]*aria-expanded/);
});

test('Escape dismisses the fern note', () => {
  const scripts = [...html().matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('');
  assert.match(scripts, /Escape/);
});
