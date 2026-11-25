# WDD 331R Portfolio

**Student:** Karina Larson  
**Semester:** Fall 2026  
**Live Site:** [View Site](https://karina-d-larson.github.io/wdd331-portfolio/)

## About

This repository is my portfolio for WDD 331R: Advanced CSS.
Each week new pages are added and styles updated as I work through the course assignments.

## Pages

- [Home](index.html)
- [Custom Properties and Nesting](unit-1/custom-properties/)
- [Layered Components](unit-2/layered-components/)
- [Visual Effects](unit-3/visual-effects/)

## Team Teaching

- [Advanced Gradients and @property](unit-3/gradients-advanced/)

## CSS Architecture

All authored CSS lives under the root `css/` directory. Pages load shared styles from `css/main.css`, then any page-specific sheet they need.

```text
css/
├── tokens/                 # Shared design tokens
│   ├── colors.css
│   └── variables.css
├── base/                   # Reset + element defaults
│   ├── reset.css
│   └── elements.css
├── layout/                 # Shared + homepage layout
│   ├── shell.css           # Page shell, content width, page-header/footer
│   └── portfolio.css       # Homepage-only sections
├── components/             # Shared UI
│   ├── assignment-cards.css
│   ├── cards.css
│   ├── buttons.css
│   ├── forms.css
│   ├── theme-toggle.css
│   └── site-nav.css
├── utilities/
│   └── utilities.css
├── assignments/            # Loaded only by coursework pages
│   ├── custom-properties.css
│   ├── visual-effects.css
│   └── layered-components/
├── team-teaching/          # Loaded only by Team Teaching demos
│   └── gradients-advanced.css
└── main.css                # Layer order + shared imports
```

### Cascade layers

`css/main.css` declares and imports layers in this order:

`tokens → base → layout → components → utilities`

Shared tokens, reset/base, shell layout, navigation, theme controls, cards, buttons, and forms load through `main.css` on every page that includes it.

### Assignment-specific styles

Coursework pages add a second stylesheet only where needed:

- Unit 1 → `css/assignments/custom-properties.css`
- Unit 2 → `css/assignments/layered-components/main.css`
- Unit 3 → `css/assignments/visual-effects.css`

These sheets keep topic-specific or intentional overrides. They should not restate shared chrome already provided by `main.css`.

### Team Teaching styles

Demo pages load `css/main.css` plus a sheet under `css/team-teaching/`. Demo HTML lives in the matching unit directory (for example `unit-3/gradients-advanced/`). Demos reuse `.page-shell`, shared navigation, and the theme menu.

## Themes

The site supports **Light**, **Dark**, and **System** preferences.

- Semantic colors and `light-dark()` values: `css/tokens/colors.css`
- Theme UI: `css/components/theme-toggle.css`
- Persistence: `js/theme-preference.js` (`localStorage`)

Prefer semantic tokens (`--color-text`, `--color-primary`, `--color-surface`, and so on) instead of hardcoded light/dark colors.

## URL convention

Use **trailing-slash directory URLs** for coursework and demos (for example `unit-3/gradients-advanced/`) so relative assets resolve from the directory, not the parent folder.

## Local development and build

This project uses **pnpm** and **Lightning CSS**.

```bash
pnpm install
pnpm build
```

Preview the site with a local static server from the repo root (for example `npx serve`), then open pages with trailing-slash paths.

`pnpm build` bundles and minifies `css/main.css` into `dist/styles.css`. Live pages still load `css/main.css` (and any assignment/demo sheet). `dist/styles.css` is a build artifact, not the live homepage stylesheet.

Commit `pnpm-lock.yaml` so dependency versions stay consistent.
