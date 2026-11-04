# Sword Fern Studio site: design

Date: 2026-11-04
Branch: `sword-fern-studio`
Approved mockup: https://claude.ai/artifact/S4Y7gRCkusvZoApzA83QtS (version 3, "No coffee ring")

## Intent

Carly's consulting site, currently branded "Evergreen Software", becomes **Sword Fern Studio**, her software studio in Cumberland, on Vancouver Island. Every trace of Evergreen goes.

The two sites have different jobs:

- **carlyewasiuk.com is the person**: background, career, resume. People go there to check who she is.
- **Sword Fern Studio is the work**: what the studio offers, how it works, and evidence that it's good. People go there to decide whether to hire it.

So the site is about the offerings, not a bio. The human side shows in how the site is made: Carly's voice, her drawings, the margin notes, and the "Made by hand, with help" section.

The core idea, which the site should get across without stating it outright: **AI is in the toolkit, and the human is the point.**

It's built as a page from a naturalist's field guide or herbarium, with each offering as a specimen. The theme should be light and charming, not a gimmick.

## Goals

- The Evergreen branding is gone: copy, palette, treeline illustration, favicon, package name, README.
- The field-guide structure below is in place, with editable placeholder copy.
- Clear, swappable slots for Carly's own drawings and photos.
- It looks good and reads well on a phone.
- It's easy to add to later: a new offering is one more specimen sheet, and an "Other things growing here" section can slot in without restructuring.

## Non-goals (out of scope for now)

Shop, Reiki or other offerings, blog, CMS, rates, client logos, contact form.

## Anti-goals

Carly's words: the site must not feel **disingenuous or overly aggressive**. In practice:

- No polished marketing copy and no buzzwords ("leverage", "solutions", "cutting-edge"). Carly writes all copy in her own voice. The builder writes placeholders, with at most one rough draft line each.
- No sales pressure: no countdowns, no "book a call now" banners, no stacked CTAs.
- No gimmick overload. Only one visible imperfection is used: a crossed-out word on the Systems sheet. **Carly rejected the coffee ring.** Don't add it back, and don't add other stains or smudges without asking.

## Page structure

One page, top to bottom. Section names are as below. Roman numerals mark section order only.

### Nav
Brand wordmark "Sword Fern Studio" on the left. Links on the right: Key, Specimens, Field notes, Made by hand, Say hello. It wraps on phones. No hamburger menu is needed.

### Header: the specimen (from mockup A)
- Fern illustration on the left (SVG), with *Polystichum munitum* in small italic underneath.
- Small label "Specimen", then the title "Sword Fern Studio".
- Italic line: "Software, made by hand. Grows in Cumberland, Vancouver Island."
- Placeholder: `[Carly writes: one line on what the studio is]`
- A taped "polaroid" photo slot on the right, captioned in handwriting (placeholder "Cumberland, Oct."). On phones it moves below.
- **Fern easter egg:** on hover or keyboard focus (and on tap for touch), the fern reveals its Latin name and a short handwritten note: `[CARLY WRITES THE NOTE]`. The fern is a focusable button with an accessible name. The note is extra, never essential information.

### i. Key to the specimens (from mockup B)
A dichotomous key, the "if this, go here" index real field guides use. Visitors pick the problem they have. Each line links to an anchor.

- 1a. You have an idea, or a service that needs to be better → Plate I
- 1b. Your process, or the plumbing between your tools, is the problem → Plate II
- 1c. You want AI to do something useful, without being thoughtless about it → Plate III
- 1d. None of these, but you think we'd get along → Say hello

These lines are rough drafts for Carly to rewrite. Dotted leaders run between each line and its link on wide screens. On phones the link wraps under the line.

### ii. Specimens: herbarium sheets (from mockup A)
One sheet per offering. Each sheet has:
- a drawing slot,
- a plate number ("Plate I"),
- a name,
- a rough one-liner,
- a specimen label card with **Habitat** (who it suits), **Growth habit** (how an engagement goes), and **Seen at** (link to a field note), and
- a handwritten "not to be confused with" note.

Sheets alternate a slight tilt and offset on wide screens and sit straight, full width, on phones. They lift slightly on hover.

| Plate | Name | Rough line (Carly's meaning) | Not to be confused with (draft) |
| --- | --- | --- | --- |
| I | Product development | A new or updated service that delights their users | an agency that ships and disappears |
| II | Systems | Untangling process **and** the software plumbing between tools, so process isn't the problem. The studio builds the connections, it doesn't only advise. | ~~more process~~ another tool to manage (the crossed-out word is the site's one deliberate imperfection) |
| III | AI consulting | How to implement AI meaningfully, without being thoughtless | AI for the sake of AI |

Plate III's label has **See also: Made by hand, with help** (anchor link) in place of "Seen at".

Habitat and Growth habit from the original brief live on each sheet now. They're not separate sections.

Sheets come from an array in `site.ts`, so adding an offering means adding one entry.

### iii. Field notes
2–4 short project stories on ruled-paper cards, written like observations. Each has a date line ("Observed 2026"), a title, a placeholder body, and an optional link or margin note. The first is **ticket2pr** (https://github.com/c4rlz/ticket2pr). The others are placeholders. Each note can name the specimen it shows, so a sheet's "Seen at" can link to it. The cards sit in three columns on wide screens and one on phones.

### iv. Made by hand, with help
**The heart of the site. The builder must not draft it.** Render a clear `[Carly writes this whole section]` placeholder, plus a drawing or notebook-photo slot. Give it room, with nothing else competing for attention.

### v. Companion species
- Placeholder: `[Carly writes: a warm invitation]`
- Email shown as text and as a `mailto:` link. No form.
- "Sword Fern Studio is Carly Ewasiuk's practice. More about me, and my resume →" linking to https://carlyewasiuk.com.
- A dashed placeholder box marking where "Other things growing here" will go later. It's hidden from the built site by default (see "Builder's calls").

### Footer
- "Last tended {date}" in place of a copyright line.
- About-this-site line, Carly's draft: **"Human creativity, amplified by AI."** (She may rewrite it. It lives in `site.ts`.)

## Look and feel

Match the approved mockup. Its CSS is a fine starting point for tokens.

- **Paper:** warm cream page with a faint pencil grid behind it, and a slightly lighter sheet with faint grain for the page itself. Textures must stay subtle enough not to hurt contrast.
- **Palette:** deep fern green, ink black-brown, warm paper, and mushroom orange as the single accent (plate numbers, "not to be confused with" notes, the strikethrough, focus rings).
- **Type:** IM Fell English for headings, Literata for body text, Caveat **only** for annotations and margin notes, never for essential information.
- **Layout:** slightly asymmetrical and pinned (tape strips, small tilts), but clean and readable on phones.
- **Dark mode:** the same field guide by lamplight: dark warm-brown paper, cream ink, lighter fern green and orange. It follows the system setting.
- **Motion:** the fern's leaves unfurl on load. Margin notes and sheets may fade in on scroll **from a visible resting state** (content is never hidden waiting for JS). Sheets lift on hover. All motion is off under `prefers-reduced-motion`.

## Constraints

- **Stack:** keep Astro on this branch, with plain CSS. Copy and links stay in `src/content/site.ts`, so editing words never means touching layout. Fonts are self-hosted with Fontsource packages, like today.
- **Little JavaScript:** the page works fully with JS off. Allowed JS: the tap-to-reveal on the fern for touch devices, and an optional IntersectionObserver for the scroll fade-ins.
- **Illustrations:** SVG preferred. The fern ships as a static SVG file, not one generated at runtime. Every drawing or photo slot is a named file in `public/` (for example `public/drawings/plate-1.svg`, `public/photos/header.jpg`) with alt text in `site.ts`, so Carly swaps a scan by replacing one file. Until she supplies one, the slot shows a dashed placeholder box with a handwritten label.
- **Accessibility:** semantic HTML (landmarks, one `h1`, ordered headings), keep the existing skip link, WCAG AA contrast in both themes over the textures, visible focus states, everything usable by keyboard, alt text on every image, and decorative tape and doodles hidden from screen readers.
- **Meta:** title "Sword Fern Studio — software, made by hand on Vancouver Island" (a placeholder Carly may change), a description, an OG image of the fern specimen (1200×630 PNG in `public/`), favicon from the fern, and `theme-color` updated.
- **Hosting:** static output to Cloudflare Pages. Carly connects the repo in the Cloudflare dashboard herself.
- **Light:** no images over what's needed, no tracking scripts.

## What gets removed or renamed

- Components: `Hero`, `Services`, `Proof`, `About`, `Treeline` and the Evergreen palette in `global.css`. Reuse `Section.astro`, `Base.astro` and `Footer.astro` where they fit.
- The Fraunces and Inter font packages, replaced by IM Fell English, Literata and Caveat.
- Package name `evergreen-software-systems` → `sword-fern-studio` (both `package.json` and `package-lock.json`).
- README rewritten for Sword Fern Studio, updating the "Where things live" table and Deploy section (Cloudflare Pages).
- `site.shortName: 'Evergreen'` and every other Evergreen string. After the build, `git grep -i evergreen` should return nothing outside `docs/`.

## Builder's calls (decided during design, not by Carly; flag if you disagree)

- The "Other things growing here" placeholder box shows in the mockup but is **off in the built site**: an empty array in `site.ts` that renders nothing until it has entries.
- The rough draft lines in the key and the "not to be confused with" notes are Claude's drafts, marked for Carly to rewrite.
- "1d. None of these, but you think we'd get along" was added by Claude.
- "Last tended" uses the build date automatically. Carly can override it in `site.ts`.
- The old Evergreen proof items (Moz AI classification, Garden Within) are not carried over as field notes. Only ticket2pr is named in the brief, and the others are placeholders.
- LinkedIn and GitHub links go in the Companion species section as small secondary links.
- No studio email or domain exists yet. `contact.email` stays blank, and the existing behaviour carries over: while it's blank, the section shows a visible `[email goes here]` placeholder and LinkedIn becomes the main link. `site` in `astro.config.mjs` stays unset until the domain is bought. Once it's set, the OG image and canonical URLs become absolute.
