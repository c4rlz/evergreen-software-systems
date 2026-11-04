// All site copy and links live here, so editing words never means touching layout.
// Anything in [square brackets] is a placeholder for Carly to write.

// A drawing or photo slot. `src` is where the file lives under public/.
// Until that file exists, the page shows a dashed placeholder box, so adding
// your scan at that exact path is all it takes to swap it in.
export type Image = { src: string; alt: string; placeholder: string };

export const site: {
  name: string;
  title: string;
  description: string;
  place: string;
  // e.g. '4 Nov 2026'. Leave unset to use the build date.
  lastTended?: string;
} = {
  name: 'Sword Fern Studio',
  title: 'Sword Fern Studio — software, made by hand on Vancouver Island',
  description:
    'Sword Fern Studio is a small software studio in Cumberland, Vancouver Island: product development, systems, and thoughtful AI consulting.',
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
  line: '[Carly writes: one line on what the studio is]',
  photo: {
    src: '/photos/header.jpg',
    alt: '[Carly writes: describe the photo]',
    placeholder: 'photo: the forest, your desk',
    caption: 'Cumberland, Oct.',
  },
  fern: {
    latin: 'Polystichum munitum',
    note: '[Carly writes: a tiny note on why the sword fern]',
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
    line: '[rough: a new or updated service your users love]',
    habitat: '[which teams this suits]',
    growth: '[how an engagement goes]',
    seenAt: { label: 'ticket2pr', href: '#note-ticket2pr' },
    confused: { text: 'an agency that ships and disappears' },
    drawing: { src: '/drawings/plate-1.svg', alt: '[Carly writes: describe the drawing]', placeholder: 'your drawing' },
  },
  {
    id: 'plate-2',
    plate: 'Plate II',
    name: 'Systems',
    line: '[rough: untangle the process and the plumbing between your tools]',
    habitat: '[teams drowning in tools]',
    growth: '[map it, then fix and connect it]',
    seenAt: { label: '[a field note]', href: '#field-notes' },
    confused: { struck: 'more process', text: 'another tool to manage' },
    drawing: { src: '/drawings/plate-2.svg', alt: '[Carly writes: describe the drawing]', placeholder: 'your drawing' },
  },
  {
    id: 'plate-3',
    plate: 'Plate III',
    name: 'AI consulting',
    line: '[rough: AI where it actually helps, put in thoughtfully]',
    habitat: '[teams curious but wary]',
    growth: '[how you approach it]',
    seeAlso: { label: 'Made by hand, with help', href: '#handmade' },
    confused: { text: 'AI for the sake of AI' },
    drawing: { src: '/drawings/plate-3.svg', alt: '[Carly writes: describe the drawing]', placeholder: 'your drawing' },
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
    body: '[Carly writes: a short observation]',
    href: 'https://github.com/c4rlz/ticket2pr',
    linkLabel: 'github.com/c4rlz/ticket2pr',
    specimenId: 'plate-1',
  },
  { id: 'note-2', date: 'Observed [year]', title: '[project]', body: '[Carly writes]' },
  { id: 'note-3', date: 'Observed [year]', title: '[project]', body: '[Carly writes]' },
];

export const handmade = {
  body: '[Carly writes this whole section: how you use AI, and where you deliberately don’t.]',
  image: { src: '/photos/handmade.jpg', alt: '[Carly writes: describe the image]', placeholder: 'a sketch, or a photo of your notebook' },
};

export const contact = {
  invite: '[Carly writes: a warm invitation]',
  // Leave empty until the studio email exists. While blank, LinkedIn is the main link.
  email: '',
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
};
