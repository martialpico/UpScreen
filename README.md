# Upscreen website

Landing page for **Upscreen**, an agency that builds landing pages, motion design videos and Instagram content for small businesses in Australia.

Built with Preact (React-compatible API, much lighter), Vite and Tailwind CSS v4. It is a static site: no server or database needed.

## Run it locally

Requires Node.js 20+ and [pnpm](https://pnpm.io/) (npm works too).

```bash
pnpm install
pnpm dev        # local dev server with hot reload
pnpm build      # production build into dist/
pnpm preview    # serve the production build locally
```

## Deploy

Any static host works. Recommended: **Vercel** or **Netlify** (free for this kind of site).

1. Push this repository to GitHub.
2. Import the repo in Vercel or Netlify.
3. Settings: build command `pnpm build`, output directory `dist`.
4. Add your custom domain in the host's dashboard.

## Project structure

| Path | What it is |
| --- | --- |
| `src/App.tsx` | All page sections (header, hero, problem cards, pricing, timeline, work, FAQ, contact, footer) |
| `src/index.css` | Brand colors, fonts, glass effects and animations |
| `src/imports/` | Images, logo, video previews and icons (the animated red background is pure CSS, in `src/index.css`) |
| `src/fonts/` | Self-hosted Open Sans and DM Serif Display (latin subset, SIL Open Font License) |
| `public/` | Favicon and Apple touch icon |
| `brand/logos/` | All UpScreen logo versions (horizontal, stacked, icon, mark, wordmark, reversed for dark backgrounds) |
| `site.config.json` | Page title, description and indexing settings (read by `vite.config.ts`) |

The main presentation video (VSL) is set by `heroVideoId` in `src/App.tsx` (a Wistia media ID).

Content you will most often edit lives at the top of `src/App.tsx`: the pricing cards (`services`), the reviews (`reviews`), the timeline steps (`processSteps`) and the FAQ (`faqs`).

## Before launch

- [x] **Contact form** emails every enquiry to upscreenweb@gmail.com through [FormSubmit](https://formsubmit.co) (`contactEmail` in `src/App.tsx`). One-time step: submit the form once from the live site, then click the "Activate Form" link FormSubmit emails to that inbox (check spam).
- [x] **Google indexing is on** (`"robots": { "index": true }` in `site.config.json`). The canonical address is https://upscren.agency/ (set in `customScripts.headEnd`), so Google lists that domain rather than the vercel.app one.
- [ ] Add a "Recent websites" section back once you have client sites to show.
- [x] **Real client reviews** are in `reviews` at the top of `src/App.tsx`. Only add quotes from real clients who agreed to be published. Invented reviews are illegal under Australian Consumer Law.

## Brand

- Colors: onyx `#0A0A0B`, graphite `#17171A`, red `#E94445`, light red `#FF7A7B`, off-white `#F7F5F2`, warm grey `#8C8A87`
- Fonts: Open Sans (UI and headings), DM Serif Display Italic (highlighted words)
- Tagline: *Be seen. Be chosen.*
