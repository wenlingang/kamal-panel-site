# kamal-panel-site

[kamal-panel](https://github.com/wenlingang/kamal-panel) 的宣传官网，发布在
<https://wenlingang.github.io/kamal-panel-site/>。

- `site/`：纯静态页面，英文在 `/`，中文在 `/zh-CN/`，没有构建步骤。
- `site/assets/tokens.css`：颜色、字号、间距变量，抄自面板的
  `app/assets/stylesheets/application.css` 里的 `:root` 与深色主题块。面板改了 token 要手工同步。
- `site/assets/screenshots/`：面板截图（1440 宽、2x，浅色深色各一套），用演示数据截取，需手工更新。

## 本地预览

```sh
python3 -m http.server 8000   # 打开 http://localhost:8000/site/
```

## 版式检查

```sh
npm install && npx playwright install chromium
npm run check   # 两页 × 375/1440 × 浅/深色：无横向滚动、无资源加载失败
```

## 发布

push 到 `main` 且 `site/**` 有变动时，`.github/workflows/pages.yml` 先检查站内链接，再发布到 GitHub Pages。

## License

[MIT](LICENSE) © 2026 wenlingang
