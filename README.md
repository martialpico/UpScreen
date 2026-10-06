# Upscreen website

Landing page for **Upscreen**, an agency that builds landing pages, motion design videos and Instagram content for small businesses in Australia.

Built with React 19, Vite and Tailwind CSS v4. It is a static site: no server or database needed.

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
| `src/imports/` | Images, logo, background video loop and icons |
| `.figma/make/site.json` | Page title, description and indexing settings (read by `vite.config.ts`) |

Content you will most often edit lives at the top of `src/App.tsx`: the pricing cards (`services`), the timeline steps (`processSteps`) and the FAQ (`faqs`).

## Before launch

- [ ] **Connect the contact form.** It shows a confirmation but does not send anything yet. Plug it into a form service (Formspree, Netlify Forms, etc.) or a booking tool.
- [ ] **Allow Google indexing.** In `.figma/make/site.json`, set `"robots": { "index": true }`. It is set to `false` while the site is in progress.
- [ ] **Replace placeholders:** hero video, the two "Recent websites" cards, contact email and ABN in the footer.
- [ ] Optional: convert the two motion-video GIF thumbnails to MP4/WebP to speed up loading on mobile.

## Brand

- Colors: onyx `#0A0A0B`, graphite `#17171A`, red `#E94445`, light red `#FF7A7B`, off-white `#F7F5F2`, warm grey `#8C8A87`
- Fonts: Open Sans (UI and headings), DM Serif Display Italic (highlighted words)
- Tagline: *Be seen. Be chosen.*
