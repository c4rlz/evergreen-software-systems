# Evergreen Software Systems

The website for Evergreen Software Systems: a one-page site that tells a potential client what I do, shows some work, and makes it easy to get in touch.

Built with [Astro](https://astro.build) and plain CSS. No client-side JavaScript yet.

## Run it

Needs Node 22.12+; developed on Node 26 (`nvm use` picks it up from `.nvmrc`).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check, then build to dist/
npm run preview   # serve the built site
```

## Where things live

| Path | What |
| --- | --- |
| `src/content/site.ts` | All copy and links. Edit words here. |
| `src/components/` | One component per page section, plus the hero treeline |
| `src/styles/global.css` | Palette, type and spacing tokens, shared styles |
| `src/layouts/Base.astro` | `<head>`, fonts, meta tags |

## Deploy

Static output in `dist/`. Works on Netlify or Cloudflare Pages with build command `npm run build` and output directory `dist`; set `NODE_VERSION=26` in the host's environment if it doesn't read `.nvmrc`.

## Roadmap

- **Phase 1, live and useful:** copy, layout, contact, deploy on the host's default subdomain.
- **Phase 2, the funk:** generative p5.js forest in the hero (static treeline stays as the fallback and for reduced motion), textures, dark mode, an easter egg.
- **Phase 3, once the name is final:** domain, custom email, set `site` in `astro.config.mjs`.
