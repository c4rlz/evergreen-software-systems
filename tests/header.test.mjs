import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { html } from './helpers.mjs';

const text = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

test('the h1 is the studio name', () => {
  const h1 = html().match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  assert.ok(h1, 'no h1');
  assert.equal(text(h1[1]), 'Sword Fern Studios');
});

test('the fern is a keyboard-reachable button named with its Latin name', () => {
  assert.match(html(), /<button[^>]*class="fern[^"]*"[^>]*aria-label="[^"]*Polystichum munitum[^"]*"/);
});

test('the fern note is tied to the button', () => {
  const page = html();
  assert.match(page, /<button[^>]*class="fern[^"]*"[^>]*aria-describedby="fern-note"/);
  assert.match(page, /id="fern-note"/);
});

test('Latin name and place show as visible text', () => {
  const page = text(html());
  assert.match(page, /Polystichum munitum/);
  assert.match(page, /Cumberland, Vancouver Island/);
});

test('no image slot ever renders an img with an empty src', () => {
  assert.doesNotMatch(html(), /<img[^>]*src=""/);
});

test('nav links all land on an element on the page', () => {
  const page = html();
  const nav = page.match(/<nav[\s\S]*?<\/nav>/)[0];
  const hrefs = [...nav.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
  assert.equal(hrefs.length, 6); // the brand link to #main, plus five section links
  for (const id of hrefs) assert.match(page, new RegExp(`id="${id}"`), `#${id} missing`);
});

test('share image and favicon exist', () => {
  assert.ok(existsSync('dist/og.png'));
  assert.ok(existsSync('dist/favicon.svg'));
});

test('the polaroid caption names the place', () => {
  assert.match(html(), /<figcaption[^>]*>Cumberland, BC<\/figcaption>/);
});
