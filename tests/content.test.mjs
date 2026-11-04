import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as content from '../src/content/site.ts';

const { key, specimens, futureSections } = content;

test('every key line points at a specimen sheet or the contact section', () => {
  const ids = new Set(specimens.map((s) => s.id));
  assert.equal(key.length, 4);
  for (const line of key) {
    assert.equal(line.href, `#${line.target}`);
    assert.ok(line.target === 'hello' || ids.has(line.target), `${line.target} has no sheet`);
  }
});

test('three specimens, plate-1 to plate-3', () => {
  assert.deepEqual(specimens.map((s) => s.id), ['plate-1', 'plate-2', 'plate-3']);
});

test('exactly one crossed-out word on the whole page', () => {
  assert.equal(specimens.filter((s) => s.confused.struck).length, 1);
});

test('no future sections until Carly adds one', () => {
  assert.equal(futureSections.length, 0);
});

test('no buzzwords in the copy', () => {
  assert.doesNotMatch(JSON.stringify(content), /leverage|solutions|cutting-edge/i);
});
