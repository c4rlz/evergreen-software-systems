import { test } from 'node:test';
import assert from 'node:assert/strict';
import { html, css } from './helpers.mjs';

test('motion respects prefers-reduced-motion', () => {
  assert.match(css(), /prefers-reduced-motion:\s*no-preference|prefers-reduced-motion:\s*reduce/);
});

test('the fern leaves unfurl', () => {
  assert.match(css(), /@keyframes\s+unfurl/);
});

test('fade-in hidden states only apply once JS has run', () => {
  const rules = [...css().matchAll(/([^{}]*\[data-reveal\][^{}]*)\{([^}]*)\}/g)];
  assert.ok(rules.length > 0, 'no [data-reveal] rules');
  for (const [, selector, body] of rules) {
    if (/opacity:\s*0(?![.\d])/.test(body)) {
      for (const s of selector.split(',')) assert.match(s.trim(), /^\.js\b/, `"${s.trim()}" hides content without JS`);
    }
  }
});

test('the page sets html.js from a tiny inline script', () => {
  const scripts = [...html().matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('');
  assert.match(scripts, /classList\.add\(['"]js['"]\)/);
  assert.ok(scripts.length < 1500, `inline scripts are ${scripts.length} chars`);
});

