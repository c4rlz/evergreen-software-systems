// All site copy and links live here, so editing words never means touching layout.

export const site = {
  name: 'Evergreen Software Systems',
  shortName: 'Evergreen',
  description:
    'Carly Ewasiuk, senior full-stack engineer. Helping SaaS teams turn rough ideas into clear plans and software that stays healthy long after launch. Remote from Vancouver Island, BC.',
};

export const hero = {
  // Words wrapped in *asterisks* get the italic moss accent.
  status: 'Taking on contract work · Remote from Vancouver Island, BC',
  headline: 'From rough idea to *evergreen* software.',
  sub: 'I’m Carly, a senior full-stack engineer. I help SaaS teams turn rough ideas into clear plans, then build software that stays healthy long after launch.',
  cta: 'Get in touch',
};

export const services = [
  {
    title: 'Product engineering',
    body: 'Features built end to end in React, Next.js, Node and Rails, shipped with tests and monitoring.',
  },
  {
    title: 'AI workflows',
    body: 'AI features and agentic dev workflows, with review checkpoints so people stay in charge of what ships.',
  },
  {
    title: 'Backend and reliability',
    body: 'APIs, data pipelines and AWS infrastructure, with the tracing and alerts that catch problems early.',
  },
  {
    title: 'Technical leadership',
    body: 'A former engineering manager who can scope a messy project, coordinate a risky release, and steady a team.',
  },
];

export const proof = [
  {
    title: 'AI topic classification',
    meta: 'Moz · 2024–2026',
    body: 'Led the cross-team rollout of AI keyword categorization, and designed the API contracts for a shared AI tracking service used across several apps.',
  },
  {
    title: 'ticket2pr',
    meta: 'Open source · TypeScript, Claude Code',
    href: 'https://github.com/c4rlz/ticket2pr',
    body: 'A CLI that turns a ticket into a plan you review, then a draft pull request. A two-minute plan review catches a wrong approach before it becomes a 400-line diff.',
  },
  {
    title: 'Garden Within',
    meta: 'Side project · Next.js, Prisma, Postgres',
    href: 'https://github.com/c4rlz/garden-within',
    body: 'A cycle-aware journaling app I designed and built solo, with auth, rate limiting and an installable PWA.',
  },
];

export const about = {
  paragraphs: [
    'Before software, I was a special education assistant, adapting my approach to each student. I still work that way: meet a team where it is, then figure out what will actually help. Since 2018 I’ve been a full-stack developer, an engineering manager for a team of six, and most recently a senior developer at Moz.',
    'The thread through all of it is turning ambiguity into a plan. I ask the awkward questions early, write the answers down, and make sure the release everyone is nervous about lands smoothly.',
    'I work async-first. Agree on the outcome with me and trust me with the how: I plan before I build, raise risks early, and build in tests, docs and monitoring as I go, so your team can own the work after I’ve moved on.',
  ],
};

export const contact = {
  intro: 'Have a project or a gap on your team? Send me a few lines about it.',
  // Leave empty until the domain email exists. While blank, LinkedIn is the main button.
  email: '',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/carly-ewasiuk/' },
    { label: 'GitHub', href: 'https://github.com/c4rlz' },
  ],
  // Optional intro-call booking link (e.g. Cal.com). Hidden while blank.
  bookingUrl: '',
};
