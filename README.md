# WDD 331R Portfolio

**Student:** Karina Larson  
**Semester:** Fall 2026  
**Live Site:** [View Site](https://karina-d-larson.github.io/wdd331-portfolio/)

## About

This repository is my portfolio for WDD 331R: Advanced CSS.
Each week new pages are added and styles updated as I work through the course assignments.

## Pages

- [Home](index.html)
- [Custom Properties and Nesting](unit-1/custom-properties/index.html)
- [Layered Components](unit-2/layered-components/index.html)

## CSS Architecture

The root homepage styles are organized into cascade layers:

```text
css/
├── base/
│   ├── elements.css
│   └── reset.css
├── components/
│   └── assignment-cards.css
├── layout/
│   └── primary.css
├── tokens/
│   ├── colors.css
│   └── variables.css
├── utilities/
│   └── utilities.css
└── main.css
```

- `tokens` — shared design values such as colors, spacing, typography, radius, and shadows
- `base` — reset and element-level styles
- `layout` — overall page structure and spacing
- `components` — reusable UI pieces such as assignment cards
- `utilities` — small helper classes when needed

`css/main.css` declares the cascade layer order and imports these source files.

## Build

This project uses **pnpm** as the package manager and **Lightning CSS** as the build tool.

After cloning the repository:

```bash
pnpm install
pnpm build
```

`pnpm build` reads `css/main.css`, follows and bundles its imported source files, minifies the CSS, and writes the result to `dist/styles.css`.

`dist/styles.css` is the generated build artifact for this assignment. The live homepage still loads `css/main.css`. `dist/styles.css` is not the live homepage stylesheet.

Commit `pnpm-lock.yaml` so dependency versions stay consistent.
