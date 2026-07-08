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

## Cursor Cloud specific instructions

This repository has **no package manager dependencies** (no `package.json`, `requirements.txt`, or Docker setup). Python 3 is preinstalled on the VM and is only needed to preview static files locally.

### Previewing sites

There is no built-in dev server. Serve files with Python's HTTP server from the directory you want to preview:

```bash
# Template scaffold
cd template && python3 -m http.server 8080

# A built customer site (once it exists)
cd sites/{slug} && python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/` in the browser. Use a tmux session if the server must stay running in the background.

### Lint and tests

No repo-level lint or test commands are configured. Validate `sites/{slug}/site.json` against the shape above (see `template/site.json.example`). If an agent adds a framework build for a specific site, run that site's own `package.json` scripts from `sites/{slug}/`.

### What "working" means here

The product is static site output under `sites/{slug}/`, not a long-running application in this repo. End-to-end verification is: correct `site.json`, static HTML/CSS/JS (or `dist/`) present, and pages load when served locally.
