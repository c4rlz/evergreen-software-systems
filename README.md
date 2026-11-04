# Sword Fern Studios

The website for Sword Fern Studios, a small software studio in Cumberland, Vancouver Island. It's one page laid out like a field guide, with each offering as a specimen.

Built with [Astro](https://astro.build) and plain CSS. The page works with JavaScript off; a few lines add the fern's tap-to-reveal and gentle fade-ins.

## Run it

Needs Node 22.12+; developed on Node 26 (`nvm use` picks it up from `.nvmrc`).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check, then build to dist/
npm run preview   # serve the built site
npm test          # build, then check the built page
```

## Where things live

| Path | What |
| --- | --- |
| `src/content/site.ts` | All copy and links. Edit words here. |
| `src/components/` | One component per page section, plus the fern and image slots |
| `public/drawings/`, `public/photos/` | Drawings and photos. Save your scan at the path named in `site.ts` (e.g. `public/drawings/plate-1.svg`) and it replaces the placeholder |
| `tests/` | Checks run against the built page in `dist/` |
| `src/styles/global.css` | Palette, type and spacing tokens, shared styles |
| `src/layouts/Base.astro` | `<head>`, fonts, meta tags |

## Deploy

Cloudflare Pages: connect the repo, set the build command to `npm run build` and the output directory to `dist`, and set `NODE_VERSION=26` if Pages doesn't read `.nvmrc`. Once the domain exists, set `site` in `astro.config.mjs` so share images get absolute URLs.
