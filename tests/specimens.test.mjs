import { test } from 'node:test';
import assert from 'node:assert/strict';
import { html, css, section } from './helpers.mjs';

const text = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

test('key section has the heading and four links', () => {
  const key = section('key');
  assert.match(text(key), /Key to the specimens/);
  assert.equal([...key.matchAll(/href="#/g)].length, 4);
});

test('every key link lands on a sheet', () => {
  const page = html();
  const hrefs = [...section('key').matchAll(/href="#(plate-\d)"/g)].map((m) => m[1]);
  assert.equal(hrefs.length, 3);
  for (const id of hrefs) assert.match(page, new RegExp(`<article[^>]*id="${id}"`));
});

test('the "none of these" key line lands on the contact section', () => {
  assert.match(html(), /<section[^>]*id="hello"/);
});

test('three herbarium sheets, each with habitat and growth habit', () => {
  const sheets = [...html().matchAll(/<article[^>]*class="sheet[^"]*"[\s\S]*?<\/article>/g)].map((m) => text(m[0]));
  assert.equal(sheets.length, 3);
  for (const s of sheets) {
    assert.match(s, /Habitat/);
    assert.match(s, /Growth habit/);
  }
});

test('exactly one crossed-out word, and it is "more process"', () => {
  const struck = [...html().matchAll(/<(s|del)[\s>][^>]*>?([\s\S]*?)<\/\1>/g)];
  assert.equal(struck.length, 1);
  assert.equal(text(struck[0][2]), 'more process');
});

test('sheets straighten on phones and the page never scrolls sideways', () => {
  const styles = css();
  assert.match(styles, /@media \((?:max-width:\s*600px|width\s*<=\s*600px)\)\{[^@]*\.sheet[^{]*\{[^}]*transform:\s*none/);
  assert.match(styles, /\.page\{[^}]*overflow-x:\s*clip/);
});
