# kamal-panel-site

**English** | [简体中文](README.zh-CN.md)

The website for [kamal-panel](https://github.com/wenlingang/kamal-panel), published at
<https://wenlingang.github.io/kamal-panel-site/>.

- `site/` — plain static pages, English at `/` and Chinese at `/zh-CN/`. No build step.
- `site/docs/`, `site/zh-CN/docs/` — the user documentation (security posture, deployment,
  roles, write operations, deploy reporting, development). The panel's README only keeps a
  quick start; these pages are the reference.
- `site/assets/tokens.css` — colour, type and spacing variables, copied from the `:root` and
  dark-theme blocks of the panel's `app/assets/stylesheets/application.css`. Copy them again
  by hand when the panel's tokens change.
- `site/assets/screenshots/` — panel screenshots (1440 wide, 2x, light and dark), taken from
  demo data. Update them by hand.

## Local preview

```sh
python3 -m http.server 8000   # then open http://localhost:8000/site/
```

## Layout check

```sh
npm install && npx playwright install chromium
npm run check   # 4 pages × 375/1440 × light/dark: no horizontal scroll, no failed assets
```

## Publishing

A push to `main` that touches `site/**` runs `.github/workflows/pages.yml`, which checks the
site's internal links and then deploys to GitHub Pages.

## License

[MIT](LICENSE) © 2026 wenlingang
