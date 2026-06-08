# Refresh Kiwi — Agent Guidelines

You are rebuilding small-business websites for non-technical owners.

## Creative freedom

- Treat `template/` as a loose scaffold only. You may delete, replace, or restructure it entirely.
- Avoid generic "AI website" patterns. Each site should feel bespoke to the business.
- Let brand personality drive typography, color, layout, imagery, and motion.
- Vary approaches between projects — do not reuse the same hero/layout formula every time.

## Technical constraints

- Output must be **static** (HTML/CSS/JS, or a static build in `dist/`).
- Write all customer files under `sites/{slug}/`.
- Always create or update `sites/{slug}/site.json`.
- Download reused images into `sites/{slug}/assets/`.
- Commit your work to the repository when a phase is complete.

## site.json shape

```json
{
  "brandName": "Business Name",
  "slug": "business-name",
  "sourceUrl": "https://example.com",
  "pages": [
    { "path": "/", "title": "Home", "gated": false }
  ],
  "discoveredPages": [
    { "path": "/about", "title": "About" }
  ]
}
```

- `pages` — built routes. Homepage: `gated: false`. Other pages: `gated: true` once built.
- `discoveredPages` — same-domain URLs found during crawl (max 15), listed before they are built.
