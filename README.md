# Refresh Kiwi — Sites Repository

This repository is cloned by Cursor cloud agents when rebuilding customer websites.

## Structure

```
template/          Minimal scaffold — agents may restructure freely
sites/{slug}/      One folder per customer rebuild
```

## Setup

1. Create a new GitHub repository (e.g. `refresh-kiwi-sites`).
2. Push the contents of this `site-template/` folder to that repo.
3. Connect the repository to your Cursor team (GitHub integration).
4. Set `CURSOR_SITES_REPO_URL` in Refresh Kiwi to the repo URL.

## Output contract

Each rebuild writes to `sites/{slug}/` and must include:

- `site.json` — manifest (brand, pages, gating flags)
- Static site files (`index.html` and assets, or a `dist/` folder after build)
- Downloaded images in `assets/` where reused from the source site
