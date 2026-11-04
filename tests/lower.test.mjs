import { test } from 'node:test';
import assert from 'node:assert/strict';
import { html, section } from './helpers.mjs';

const text = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const footer = () => html().match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? '';

test('field notes link to ticket2pr', () => {
  assert.match(section('field-notes'), /href="https:\/\/github\.com\/c4rlz\/ticket2pr"/);
});

test('the Plate I "Seen at" link lands on the ticket2pr note', () => {
  assert.match(html(), /id="note-ticket2pr"/);
});

test('Made by hand says AI shortens the path from idea to reality', () => {
  const t = text(section('handmade'));
  assert.match(t, /only limited by our imagination/);
  assert.doesNotMatch(t, /\[Carly writes/);
});

test('Made by hand is written as separate paragraphs', () => {
  assert.ok([...section('handmade').matchAll(/<p[\s>]/g)].length >= 2);
});

test('contact links to the personal site', () => {
  assert.match(section('hello'), /href="https:\/\/carlyewasiuk\.com"/);
});

test('email is the main way in: shown as text and as a mailto link', () => {
  const hello = section('hello');
  assert.match(hello, /<a[^>]*href="mailto:hi@carlyewasiuk\.com"[^>]*>hi@carlyewasiuk\.com<\/a>/);
  assert.doesNotMatch(text(hello), /\[email goes here\]/);
  const first = hello.match(/<a[^>]*href="([^"]+)"/)[1];
  assert.equal(first, 'mailto:hi@carlyewasiuk.com');
  assert.match(hello, /linkedin\.com/);
});

test('footer shows last tended and the about line, no copyright', () => {
  const f = text(footer());
  assert.match(f, /Last tended \d{1,2} \w{3,4}\.? \d{4}/);
  assert.match(f, /Human creativity, amplified by AI\./);
  assert.doesNotMatch(html(), /©/);
});

test('no future sections render yet', () => {
  assert.doesNotMatch(html(), /Other things growing here/);
});

test('footer says "Made with love by Carly" with a heart', () => {
  const f = footer();
  assert.match(text(f), /Made with love by Carly/);
  assert.match(f, /class="heart"[^>]*aria-hidden="true"|aria-hidden="true"[^>]*class="heart"/);
});
