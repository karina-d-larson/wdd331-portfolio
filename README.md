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
- [Custom Media Queries](unit-2/custom-media-queries/)
- [Logical Properties and Writing Modes](unit-4/logical-properties/)

## CSS Architecture

All authored CSS lives under the root `css/` directory. Pages load shared styles from `css/main.css`, then any page-specific sheet they need.

```text
css/
├── tokens/                 # Shared design tokens
│   ├── colors.css
│   ├── variables.css
│   └── breakpoints.css     # @custom-media breakpoint aliases (compiled demos)
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
│   ├── gradients-advanced.css
│   ├── custom-media-queries.css
│   └── logical-properties.css
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

Demo pages load `css/main.css` plus a demo sheet. Authored demo CSS stays under `css/team-teaching/`. Most demos load that authored sheet directly; demos that need Lightning CSS for unsupported features load the compiled output from `dist/` instead. Demo HTML lives in the matching unit directory (for example `unit-3/gradients-advanced/` or `unit-4/logical-properties/`). Demos reuse `.page-shell`, shared navigation, and the theme menu. The Logical Properties demo uses native CSS only—no compilation step.

### Shared content cards (logical properties)

`css/components/cards.css` uses logical block-edge properties for shared `.page-shell` content cards (`margin-block-end`, `margin-block-start`, `padding-block-start`, and `border-block-start`). In horizontal writing mode the LTR appearance matches the previous physical top/bottom rules; under alternate writing modes those edges follow the block axis.

### Breakpoint tokens

`css/tokens/breakpoints.css` defines shared `@custom-media` aliases (for example `--tablet`). Compiled demos import this file so multiple components can share one named breakpoint. It is **not** imported into uncompiled `css/main.css`, because browsers do not yet support `@custom-media` natively.

After changing a custom media definition in `breakpoints.css` (or any sheet that depends on it), run `pnpm build` so `dist/custom-media-queries.css` stays in sync. Include the generated `dist/custom-media-queries.css` when deploying to GitHub Pages—the deploy workflow copies the repo as-is and does not run the build.

## Themes

The site supports **Light**, **Dark**, and **System** preferences.

- Semantic colors and `light-dark()` values: `css/tokens/colors.css`
- Theme UI: `css/components/theme-toggle.css`
- Persistence: `js/theme-preference.js` (`localStorage`)

Prefer semantic tokens (`--color-text`, `--color-primary`, `--color-surface`, and so on) instead of hardcoded light/dark colors.

## URL convention

Use **trailing-slash directory URLs** for coursework and demos (for example `unit-3/gradients-advanced/`) so relative assets resolve from the directory, not the parent folder.

## Local development and build

This project uses **pnpm**. Most pages load authored CSS directly from `css/`—no compilation step.

**Lightning CSS** is only required for demos that depend on CSS features browsers do not yet support natively (for example custom media queries). Those demos keep authored source under `css/team-teaching/` and load a compiled sheet from `dist/`.

```bash
pnpm install
pnpm build
```

`pnpm build` currently runs `build:custom-media`, which compiles `css/team-teaching/custom-media-queries.css` into `dist/custom-media-queries.css` with `--custom-media`, `--bundle`, and `--targets "defaults"`. That step expands `@media (--tablet)` aliases into standard media queries. Shared styles continue to load from `css/main.css` with no build step.

Whenever you change `@custom-media` definitions or the Custom Media Queries demo source, run `pnpm build` again before previewing or deploying.

Preview the site with a local static server from the repo root (for example `npx serve`), then open pages with trailing-slash paths.

Commit `pnpm-lock.yaml` so dependency versions stay consistent. Commit the generated `dist/custom-media-queries.css` as well so GitHub Pages can serve the compiled demo stylesheet (the deploy workflow does not run `pnpm build`).
