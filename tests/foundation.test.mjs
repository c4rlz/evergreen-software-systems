import { test } from 'node:test';
import assert from 'node:assert/strict';
import { html, css } from './helpers.mjs';

test('no Evergreen branding in the built page', () => {
  assert.doesNotMatch(html() + css(), /evergreen/i);
});

test('page title', () => {
  assert.match(html(), /<title>Sword Fern Studio — software, made by hand on Vancouver Island<\/title>/);
});

test('meta description, OG image and theme colour', () => {
  const page = html();
  assert.match(page, /<meta name="description" content="[^"]+"/);
  assert.match(page, /<meta property="og:image" content="[^"]*\/og\.png"/);
  assert.match(page, /<meta name="theme-color" content="#[0-9a-f]{6}"/i);
});

test('dark mode is defined', () => {
  assert.match(css(), /prefers-color-scheme:\s*dark/);
});

test('exactly one h1', { todo: 'lands in Task 3' }, () => {
  assert.equal(html().match(/<h1[\s>]/g)?.length, 1);
});
