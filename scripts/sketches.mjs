// Draws the hand-drawn fallback sketches in public/drawings/sketches/.
// They show in each image slot until Carly adds her own drawing or photo.
// Run with `npm run sketches`. Each drawing is seeded, so reruns are identical.
import { mkdirSync, writeFileSync } from 'node:fs';

const out = new URL('../public/drawings/sketches/', import.meta.url);
mkdirSync(out, { recursive: true });

let seed = 1;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) - 0.5;
const f = (n) => n.toFixed(1);

// A smooth path through points (Catmull-Rom to cubic Bézier).
const smooth = (pts, closed = false) => {
  const p = closed ? [pts.at(-1), ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts.at(-1)];
  let d = `M${f(p[1][0])} ${f(p[1][1])}`;
  for (let i = 1; i < p.length - 2; i++) {
    const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
};

// Nudge every point a little, the way a hand never quite follows a line.
const shake = (pts, amt = 1.2) => pts.map(([x, y]) => [x + rnd() * amt, y + rnd() * amt]);

// A pencil line: one confident stroke and a fainter second pass beside it.
const stroke = (pts, cls = 'ink', w = 1.4, closed = false) =>
  `<path class="${cls}" stroke-width="${w}" d="${smooth(shake(pts), closed)}"/>` +
  `<path class="${cls}" stroke-width="${f(w * 0.6)}" opacity="0.45" d="${smooth(shake(pts, 2), closed)}"/>`;

const line = (x1, y1, x2, y2, cls, w) => {
  const n = Math.max(2, Math.round(Math.hypot(x2 - x1, y2 - y1) / 18));
  return stroke(Array.from({ length: n + 1 }, (_, i) => [x1 + ((x2 - x1) * i) / n, y1 + ((y2 - y1) * i) / n]), cls, w);
};

const ring = (cx, cy, rx, ry, cls, w, overshoot = 0.25) => {
  const pts = [];
  for (let a = -0.3; a <= Math.PI * 2 + overshoot; a += 0.35) {
    const r = 1 + rnd() * 0.05;
    pts.push([cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]);
  }
  return stroke(pts, cls, w);
};

const box = (x, y, w, h, cls, sw) =>
  stroke([[x, y], [x + w * 0.5, y + rnd()], [x + w, y], [x + w + rnd(), y + h * 0.5], [x + w, y + h], [x + w * 0.5, y + h + rnd()], [x, y + h], [x + rnd(), y + h * 0.5], [x + 0.6, y + 1.5]], cls, sw);

// Parallel shading lines clipped to a rough region.
const hatch = (x, y, w, h, gap = 4, cls = 'ink', angle = 1) => {
  let s = '';
  for (let i = -h; i < w; i += gap) s += line(x + i, y + h, x + i + h * angle, y, cls, 0.6);
  return `<g clip-path="url(#c${seed})"><clipPath id="c${seed}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>${s}</g>`;
};

const sparkle = (x, y, r) =>
  line(x, y - r, x, y + r, 'accent', 1.3) + line(x - r, y, x + r, y, 'accent', 1.3) +
  line(x - r * 0.45, y - r * 0.45, x + r * 0.45, y + r * 0.45, 'accent', 0.8) + line(x - r * 0.45, y + r * 0.45, x + r * 0.45, y - r * 0.45, 'accent', 0.8);

// A pinna: a narrow leaf from (x, y) pointing along `angle`.
const leaf = (x, y, len, angle, cls = 'fern', wide = 0.28) => {
  const c = Math.cos(angle), s = Math.sin(angle), nx = -s, ny = c;
  const tip = [x + c * len, y + s * len];
  const mid = (k, side) => [x + c * len * k + nx * len * wide * side, y + s * len * k + ny * len * wide * side];
  return `<path class="${cls} fill" stroke-width="1" d="${smooth(shake([[x, y], mid(0.45, 1), tip, mid(0.5, -1), [x, y]], 0.6))}"/>`;
};

const frond = (x, y, len, angle, n = 9, cls = 'fern') => {
  let s = line(x, y, x + Math.cos(angle) * len, y + Math.sin(angle) * len, cls, 1.3);
  for (let i = 1; i < n; i++) {
    const t = i / n, px = x + Math.cos(angle) * len * t, py = y + Math.sin(angle) * len * t;
    const l = len * 0.32 * Math.sin(Math.PI * (0.2 + t * 0.8)) + 2;
    s += leaf(px, py, l, angle - 1.05, cls) + leaf(px, py, l, angle + 1.05, cls);
  }
  return s;
};

const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="none" stroke-linecap="round" stroke-linejoin="round">
<style>
  .ink { stroke: #2e241b; } .fern { stroke: #2f5a3a; } .accent { stroke: #a94f1c; } .faint { stroke: #2e241b; opacity: .25; }
  .fill.fern { fill: rgba(47, 90, 58, .14); } .fill.accent { fill: rgba(169, 79, 28, .18); }
  @media (prefers-color-scheme: dark) {
    .ink, .faint { stroke: #efe4cf; } .fern { stroke: #93c39a; } .accent { stroke: #ec9358; }
    .fill.fern { fill: rgba(147, 195, 154, .14); } .fill.accent { fill: rgba(236, 147, 88, .2); }
  }
</style>
<filter id="pencil"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="1.6"/></filter>
<g filter="url(#pencil)">
${body}
</g>
</svg>
`;

const ruler = (x, y1, y2) => {
  let s = line(x, y1, x, y2, 'faint', 1);
  for (let y = y1, i = 0; y <= y2; y += 8, i++) s += line(x, y, x + (i % 5 === 0 ? 7 : 4), y, 'faint', 0.8);
  return s;
};

const drawings = {
  // Product development: a fiddlehead unfurling, new growth.
  'plate-1': () => {
    seed = 11;
    const coil = [];
    for (let a = 0; a < Math.PI * 3.2; a += 0.3) {
      const r = 22 * Math.exp(-a * 0.32);
      coil.push([92 + Math.cos(a + Math.PI) * r, 58 + Math.sin(a + Math.PI) * r]);
    }
    const stem = [[78, 182], [74, 150], [70, 118], [68, 86], [70, 60]];
    let s = stroke([...stem, ...coil], 'fern', 2.2);
    // Young pinnae, still half-curled, getting smaller toward the coil.
    for (const [y, len] of [[156, 22], [138, 19], [120, 15], [102, 11], [86, 7]]) {
      const x = 76 - (182 - y) * 0.07;
      s += leaf(x, y, len, -0.75) + leaf(x, y, len, Math.PI + 0.75);
    }
    s += line(30, 182, 140, 184, 'ink', 1.2) + hatch(34, 185, 100, 8, 5);
    s += stroke([[120, 150], [128, 120], [124, 92]], 'accent', 1.1) + line(124, 92, 119, 99, 'accent', 1.1) + line(124, 92, 129, 98, 'accent', 1.1);
    s += ruler(18, 40, 176);
    return svg(160, 200, s);
  },
  // Systems: roots joining three tools underground, like a forest's fungal network.
  'plate-2': () => {
    seed = 23;
    let s = line(12, 48, 150, 46, 'ink', 1.3) + hatch(14, 38, 132, 8, 6);
    s += frond(80, 46, 30, -Math.PI / 2 - 0.15, 6);
    const tools = [[22, 92], [100, 104], [52, 156]];
    for (const [x, y] of tools) s += box(x, y, 34, 24, 'ink', 1.3) + line(x + 7, y + 9, x + 26, y + 9, 'faint', 1) + line(x + 7, y + 15, x + 20, y + 15, 'faint', 1);
    s += stroke([[80, 48], [74, 70], [52, 82], [40, 92]], 'fern', 1.6);
    s += stroke([[80, 48], [92, 72], [112, 90], [117, 104]], 'fern', 1.6);
    s += stroke([[56, 116], [62, 136], [68, 156]], 'fern', 1.4);
    s += stroke([[100, 120], [86, 140], [76, 156]], 'fern', 1.4);
    s += stroke([[74, 70], [70, 88], [78, 112], [96, 116]], 'fern', 1);
    for (const [x, y] of [[40, 92], [117, 104], [68, 156], [76, 156]]) s += ring(x, y, 2.6, 2.6, 'accent', 1.2, 0);
    for (const [x, y, a] of [[30, 120, 2.2], [130, 140, 0.9], [110, 180, 1.4]]) s += stroke([[x, y], [x + Math.cos(a) * 10, y + Math.sin(a) * 10], [x + Math.cos(a) * 16 + 3, y + Math.sin(a) * 16]], 'fern', 0.8);
    return svg(160, 200, s);
  },
  // AI consulting: a hand lens looking closely at a fern sprig, with a small spark.
  'plate-3': () => {
    seed = 37;
    let s = frond(30, 176, 120, -1.15, 11);
    s += ring(92, 82, 34, 34, 'ink', 2) + ring(92, 82, 29, 29, 'faint', 1);
    s += hatch(66, 56, 18, 18, 5, 'faint');
    s += stroke([[116, 108], [128, 122], [142, 138], [150, 147]], 'ink', 5) + stroke([[117, 109], [129, 123]], 'accent', 2.2);
    s += sparkle(132, 40, 9) + sparkle(146, 62, 4.5);
    return svg(160, 200, s);
  },
  // Header: the Beaufort Range above a line of trees and ferns.
  header: () => {
    seed = 51;
    let s = ring(176, 30, 11, 11, 'accent', 1.3);
    s += stroke([[0, 92], [26, 66], [44, 78], [74, 40], [98, 66], [118, 52], [150, 80], [176, 62], [220, 90]], 'ink', 1.4);
    s += stroke([[66, 48], [74, 40], [81, 50]], 'ink', 0.9) + hatch(88, 58, 22, 18, 4, 'faint');
    for (let i = 0; i < 9; i++) {
      const x = 10 + i * 25 + rnd() * 8, h = 34 + rnd() * 16, base = 128;
      s += line(x, base, x, base - h, 'fern', 1.2);
      for (let k = 0; k < 4; k++) {
        const y = base - h + 6 + k * (h / 4.5), wdt = 4 + k * 3.2;
        s += stroke([[x - wdt, y + 6], [x, y], [x + wdt, y + 6]], 'fern', 1.1);
      }
    }
    s += line(0, 130, 220, 128, 'ink', 1.1);
    s += frond(16, 156, 30, -1.15, 7) + frond(200, 156, 30, -2.0, 7) + frond(110, 156, 24, -1.5, 6);
    return svg(220, 160, s);
  },
  // Made by hand, with help: an open notebook, a pencil, and a small spark.
  handmade: () => {
    seed = 67;
    let s = stroke([[20, 70], [60, 62], [100, 74], [100, 192], [60, 182], [20, 190], [20, 70]], 'ink', 1.5);
    s += stroke([[100, 74], [140, 62], [180, 70], [180, 190], [140, 182], [100, 192]], 'ink', 1.5);
    for (let y = 92; y < 176; y += 12) s += line(28, y, 92, y + 4, 'faint', 0.8) + line(108, y + 4, 172, y, 'faint', 0.8);
    s += frond(40, 160, 44, -1.25, 7) + stroke([[116, 100], [130, 96], [146, 104], [160, 98]], 'ink', 1) + stroke([[116, 116], [138, 112], [154, 118]], 'ink', 1);
    s += stroke([[118, 150], [126, 136], [140, 146], [150, 132], [162, 150]], 'accent', 1.1);
    s += stroke([[150, 30], [72, 132]], 'ink', 6) + stroke([[150, 30], [143, 39]], 'accent', 6) + stroke([[72, 132], [68, 142], [76, 137]], 'ink', 1.4);
    s += sparkle(176, 40, 9) + sparkle(190, 66, 4);
    return svg(210, 215, s);
  },
};

for (const [name, draw] of Object.entries(drawings)) {
  writeFileSync(new URL(`${name}.svg`, out), draw());
  console.log(`wrote public/drawings/sketches/${name}.svg`);
}
