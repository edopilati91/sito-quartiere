# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

The official website of Quartiere San Fortunato, a neighbourhood of Bassano del Grappa (Italy), run by its neighbourhood council. The quartiere may have its own site and use its official name and coat of arms.

It is a simple Italian-language static site (a landing page or little more), built with Astro and Tailwind CSS. There are no user accounts, no login, no admin panel and no server code: the owner, a council member, edits content directly in the repository, working alone and committing straight to `main`.

The project was a Laravel app until October 2026; that code is only in the git history. Do not reintroduce a server framework, a database or an admin panel without asking.

## Commands

- `npm install` — install dependencies
- `npm run dev` — dev server at http://localhost:4321
- `npm run build` — type check (`astro check`) and build the static site into `dist/`; this is what CI runs (`build.yml` on pull requests, `deploy.yml` on `main`)
- `npm run preview` — serve the built `dist/` locally
- `npm run check` — type check only

## Architecture

- `src/site.config.ts` — site name, description and language, used by the layout and pages
- `src/pages/` — one file per route (`index.astro` is `/`, `404.astro` is the not-found page)
- `src/layouts/BaseLayout.astro` — shared HTML shell: `lang="it"`, meta tags, header and footer. Every page uses it and passes `title` and `description`.
- `src/styles/global.css` — Tailwind 4 entry point (`@import 'tailwindcss'`, configured in CSS, no `tailwind.config.js`), loaded by the layout
- `public/` — files served as-is (favicons, `robots.txt`)
- The site is published on GitHub Pages at https://edopilati91.github.io/sito-quartiere/ by `.github/workflows/deploy.yml` on every push to `main`. Because of the `/sito-quartiere/` base path, internal links and `public/` files must be prefixed with `import.meta.env.BASE_URL`, never a bare `/`. When a custom domain is connected, update `site` and remove `base` in `astro.config.mjs`.
- For news or events, use Astro content collections with Markdown files rather than a database.

## Conventions

- All visible text is in Italian, written directly in the pages (there is no translation layer).
- The project was set up before the neutral template in `~/Herd/astro-starter` (github.com/edopilati91/astro-starter) and is kept in line with it by hand; it is not linked to it.
- Indent with 4 spaces (see `.editorconfig`).
- Node 22.23.4 or newer is required (Astro's minimum). Locally it comes from Herd.
- Never invent facts about the quartiere (names, addresses, dates, council members): ask the owner for real content.
- Pages must be accessible (semantic HTML, alt text, sufficient contrast) and work on mobile.
