// Tests read the built site, so they check what visitors actually get.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;

export const html = () => readFileSync(join(dist, 'index.html'), 'utf8');

export const css = () => {
  const files = readdirSync(dist, { recursive: true }).filter((f) => f.endsWith('.css'));
  // Astro may inline small stylesheets, so include <style> blocks from the page too.
  const inline = [...html().matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  return [...files.map((f) => readFileSync(join(dist, f), 'utf8')), ...inline].join('\n');
};

// Text content of the first element with the given id, tags stripped.
export const section = (id) => {
  const page = html();
  const start = page.search(new RegExp(`<section[^>]*id="${id}"`));
  if (start === -1) return '';
  const end = page.indexOf('</section>', start);
  return page.slice(start, end);
};
