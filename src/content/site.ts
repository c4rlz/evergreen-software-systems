// All site copy and links live here, so editing words never means touching layout.
// Anything in [square brackets] is still a placeholder. The rest is a first draft for Carly to edit.

// A drawing or photo slot. `src` is where your own file lives under public/.
// Until that file exists, the page shows the hand-drawn `sketch` instead (or a
// dashed placeholder box if there's no sketch), so adding your scan at that
// exact path is all it takes to swap it in. Update `alt` when you do.
export type Image = { src: string; alt: string; placeholder: string; sketch?: { src: string; alt: string } };

export const site: {
  name: string;
  title: string;
  description: string;
  place: string;
  // e.g. '4 Nov 2026'. Leave unset to use the build date.
  lastTended?: string;
} = {
  name: 'Sword Fern Studios',
  title: 'Sword Fern Studios — software, made by hand on Vancouver Island',
  description:
    'Sword Fern Studios is a one-person software studio in Cumberland, Vancouver Island: product development, systems, and thoughtful AI consulting.',
  place: 'Cumberland, Vancouver Island',
};

export const nav = [
  { label: 'Key', href: '#key' },
  { label: 'Specimens', href: '#specimens' },
  { label: 'Field notes', href: '#field-notes' },
  { label: 'Made by hand', href: '#handmade' },
  { label: 'Say hello', href: '#hello' },
];

export const specimen = {
  tagline: 'Software, made by hand. Grows in Cumberland, Vancouver Island.',
  line: 'A one-person software studio. I build and untangle software for small teams, and use AI where it actually helps.',
  photo: {
    src: '/photos/header.jpg',
    alt: '[Carly writes: describe the photo]',
    placeholder: 'photo: the forest, your desk',
    sketch: { src: '/drawings/sketches/header.svg', alt: 'Pencil sketch of the Beaufort Range above a line of trees and sword ferns' },
    caption: 'Cumberland, Oct.',
  },
  fern: {
    latin: 'Polystichum munitum',
    note: 'Sword ferns grow all through the forest here. They stay green all winter and come back every spring.',
  },
};

export const key = [
  {
    couplet: '1a.',
    text: 'You have an idea, or a service that needs to be better',
    href: '#plate-1',
    target: 'plate-1',
  },
  {
    couplet: '1b.',
    text: 'Your process, or the plumbing between your tools, is the problem',
    href: '#plate-2',
    target: 'plate-2',
  },
  {
    couplet: '1c.',
    text: 'You want AI to do something useful, without being thoughtless about it',
    href: '#plate-3',
    target: 'plate-3',
  },
  {
    couplet: '1d.',
    text: 'None of these, but you think we’d get along',
    href: '#hello',
    target: 'hello',
  },
];

export const specimens: {
  id: string;
  plate: string;
  name: string;
  line: string;
  habitat: string;
  growth: string;
  seenAt?: { label: string; href: string };
  seeAlso?: { label: string; href: string };
  // `struck` renders crossed out before `text`. Use it once on the page, at most.
  confused: { struck?: string; text: string };
  drawing: Image;
}[] = [
  {
    id: 'plate-1',
    plate: 'Plate I',
    name: 'Product development',
    line: 'New services, or better versions of the ones you have, built so your users enjoy using them.',
    habitat: 'Small teams and mission-driven orgs with a clear idea and nobody free to build it.',
    growth: 'We agree on the outcome, I write a plan you can poke holes in, then I build it end to end, with the tests and docs your team needs to own it after I leave.',
    seenAt: { label: 'ticket2pr', href: '#note-ticket2pr' },
    confused: { text: 'an agency that ships and disappears' },
    drawing: {
      src: '/drawings/plate-1.svg',
      alt: '[Carly writes: describe the drawing]',
      placeholder: 'your drawing',
      sketch: { src: '/drawings/sketches/plate-1.svg', alt: 'Pencil sketch of a young fern frond unfurling, beside a measuring ruler' },
    },
  },
  {
    id: 'plate-2',
    plate: 'Plate II',
    name: 'Systems',
    line: 'Untangling how work gets done, and the software plumbing between your tools, so process stops being the problem.',
    habitat: 'Teams with too many tools, copy-and-paste between them, and integrations nobody finished.',
    growth: 'I map how work actually moves, then simplify what I can and connect what’s left.',
    seenAt: { label: 'A shared AI tracking service', href: '#note-moz' },
    confused: { struck: 'more process', text: 'another tool to manage' },
    drawing: {
      src: '/drawings/plate-2.svg',
      alt: '[Carly writes: describe the drawing]',
      placeholder: 'your drawing',
      sketch: { src: '/drawings/sketches/plate-2.svg', alt: 'Pencil sketch of roots running underground and joining three small boxes, like a fungal network linking tools' },
    },
  },
  {
    id: 'plate-3',
    plate: 'Plate III',
    name: 'AI consulting',
    line: 'Working out where AI is actually useful for you, then putting it in thoughtfully.',
    habitat: 'Teams who are curious about AI but wary of the hype, the cost, or getting it wrong.',
    growth: 'Start with the problem, not the model. Try it small, check it with real people, and keep a person reviewing what ships.',
    seeAlso: { label: 'Made by hand, with help', href: '#handmade' },
    confused: { text: 'AI for the sake of AI' },
    drawing: {
      src: '/drawings/plate-3.svg',
      alt: '[Carly writes: describe the drawing]',
      placeholder: 'your drawing',
      sketch: { src: '/drawings/sketches/plate-3.svg', alt: 'Pencil sketch of a hand lens held over a fern sprig, with a small spark beside it' },
    },
  },
];

export const fieldNotes: {
  id: string;
  date: string;
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
  specimenId?: string;
}[] = [
  {
    id: 'note-ticket2pr',
    date: 'Observed 2026',
    title: 'ticket2pr',
    body: 'A small command-line tool that turns a ticket into a plan you review, then a draft pull request. A two-minute plan review catches a wrong approach before it becomes a 400-line diff.',
    href: 'https://github.com/c4rlz/ticket2pr',
    linkLabel: 'github.com/c4rlz/ticket2pr',
    specimenId: 'plate-1',
  },
  {
    id: 'note-moz',
    date: 'Observed 2024–2026',
    title: 'AI topic classification at Moz',
    body: 'Led the cross-team rollout of AI keyword categorization, and designed the API contracts for a shared AI tracking service used across several apps.',
    specimenId: 'plate-3',
  },
  {
    id: 'note-garden-within',
    date: 'Observed on the side',
    title: 'Garden Within',
    body: 'A cycle-aware journaling app I designed and built on my own, with sign-in, rate limiting, and an app you can install on your phone.',
    href: 'https://github.com/c4rlz/garden-within',
    linkLabel: 'github.com/c4rlz/garden-within',
    specimenId: 'plate-1',
  },
];

export const handmade = {
  // One string per paragraph.
  body: [
    'AI has shortened the distance between an idea and the thing itself. Something that used to take weeks just to try can now be sketched, built and put in front of people far sooner. Truly, we’re only limited by our imagination.',
    'So I let AI do a lot of the heavy lifting. The parts that matter most stay with me: listening to what you actually need, deciding what’s worth making, and caring whether it’s good before it ships.',
  ],
  image: {
    src: '/photos/handmade.jpg',
    alt: '[Carly writes: describe the image]',
    placeholder: 'a sketch, or a photo of your notebook',
    sketch: { src: '/drawings/sketches/handmade.svg', alt: 'Pencil sketch of an open notebook with a fern doodle, a pencil, and a small spark' },
  },
};

export const contact = {
  invite: 'If something here sounds like your team, send me a few lines about it. No pitch deck needed, just what’s going on and what you’d like to be different.',
  // Shown as the main way in. Leave empty to fall back to LinkedIn.
  email: 'hi@carlyewasiuk.com',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/carly-ewasiuk/' },
    { label: 'GitHub', href: 'https://github.com/c4rlz' },
  ],
  personal: { label: 'More about me, and my resume', href: 'https://carlyewasiuk.com' },
};

// "Other things growing here": add entries when there's something to show.
export const futureSections: { title: string; body: string }[] = [];

export const footer = {
  about: 'Human creativity, amplified by AI.',
  madeBy: 'Made with love by Carly',
};
