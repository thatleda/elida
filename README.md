# ELIDA

Leda Wolf's website, rebuilt. A fast, static, mostly-JS-free site wearing an
80s terminal skin — the successor to [`vuelfden`](../vuelfden), which it treats
as rough inspiration rather than a spec.

The name is [ELIZA](https://en.wikipedia.org/wiki/ELIZA) with one letter's worth
of static, and it's `LEDA` rearranged.

## Stack

| Concern      | Choice                                                       |
| ------------ | ----------------------------------------------------------- |
| Framework    | [Astro](https://astro.build) — static output, zero JS by default |
| Interactivity| React islands (`@astrojs/react`) — none built yet           |
| Content      | Sanity (`page`, `article`, `review`, `resume`), document-level i18n |
| Reading list | Hardcover GraphQL, fetched at build time                    |
| i18n         | Astro i18n routing — `en` at `/`, `de` at `/de/`; UI strings in `src/i18n/ui.ts` |
| Hosting      | Netlify (static publish of `dist/`)                         |

## Develop

```sh
pnpm install
cp .env.example .env   # fill in HARDCOVER_API_KEY
pnpm dev
```

| Script               | Does                                                     |
| -------------------- | ------------------------------------------------------- |
| `pnpm dev`           | dev server                                              |
| `pnpm build`         | pulls Sanity + Hardcover, prerenders every route        |
| `pnpm check`         | `astro check` — types (pinned to TypeScript 5.x; the 7.x native compiler doesn't expose the API the checker needs) |
| `pnpm lint` / `:fix` | antfu flat config + `matt/no-comments` (comments are a lint error, same as `vuelfden`) |
| `pnpm test`          | vitest unit tests (`src/**/*.test.ts`, happy-dom)       |
| `pnpm test:e2e`      | Playwright — builds, serves `preview`, runs `e2e/`      |

### pnpm trust policy

The hardened pnpm on this machine writes `trustPolicy: no-downgrade` into
`pnpm-workspace.yaml` and rejects lockfile entries whose latest published
version lost provenance evidence. `chokidar@4.0.3` and `semver@6.3.1` (pulled
transitively by `@astrojs/check` and the eslint toolchain) trip it — both are
ubiquitous and actively maintained, no known incident, so they're listed under
`trustPolicyExclude`. Revisit if either package publishes a provenance-signed
release.

## Layout

```
src/
  i18n/            locale config, UI string dictionary, path helpers
  lib/             sanity.ts (client + typed queries), hardcover.ts
  layouts/Base.astro   html shell, <head>, skip link, CRT overlay
  components/
    SiteHeader / SiteFooter
    Section / Prose / ReadingNow / SanityImage        building blocks
    TypedCommand / Loader                             terminal motion pieces
    HomePage / RamblingsIndex / ArticlePage / ContentPage   page bodies
  pages/           thin route files; de/ mirrors the tree for German
  styles/terminal.css   the phosphor theme (all colour is a custom property)
e2e/               Playwright specs (run against a real preview build)
```

Unit tests sit next to their subject (`src/i18n/index.test.ts`,
`src/lib/hardcover.test.ts` — the latter mocks the GraphQL endpoint with MSW).

## Content notes

- `article` docs have `language: null` — the ramblings are **English only** by
  design. Both `/ramblings` and `/de/ramblings` render the same English posts.
- `page` docs (`hero`, `who`, `previously`, `privacy`, `imprint`) exist per
  locale, keyed by `slug.current` + `language`.

## Roadmap

- [x] Images — hero + `who` portraits, article banners, reviewer avatars,
      book covers. `SanityImage.astro` builds srcset from the CDN and carries
      LQIP + real dimensions. Ramblings index stays text-only on purpose.
- [ ] **"Previously" in second person** — content edit in Sanity, not code.
- [ ] Pick + self-host a display font with full Latin Extended-A (umlauts, ß).
      Current stack rides system monospace fonts.
- [ ] `/resume` page (there's a `resume` singleton in Sanity).
- [ ] Duotone / dither treatment on images for the CRT look (optional flourish).
- [ ] Ramblings index: the faux-terminal with key-map navigation
      (`j`/`k`/`enter`/`/`) as a React island over real `<a>` links.
- [ ] A real command prompt on the home page (`ls`, `cd`, `lang de`, `theme`).
- [x] `Loader` component — the underscore cursor walks E→L→I and parks on the
      I, so it reads `EL_DA`. Not wired anywhere yet; for the terminal island
      or a first-visit boot splash.
- [ ] Pagination for ramblings once the list gets long.
- [ ] OG images.
- [ ] Decide on `@astrojs/react` — kept for the islands above; until one ships
      it emits one unused ~190KB chunk into `dist/_astro/` that no page links.
- [ ] Set the real domain in `astro.config.mjs` / `SITE_URL`.
