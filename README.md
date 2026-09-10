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

`pnpm build` pulls all content from Sanity + Hardcover and prerenders every
route. `pnpm astro check` type-checks (needs TypeScript 5.x — the 7.x native
compiler doesn't expose the API the checker uses yet).

## Layout

```
src/
  i18n/            locale config, UI string dictionary, path helpers
  lib/             sanity.ts (client + typed queries), hardcover.ts
  layouts/Base.astro   html shell, <head>, skip link, CRT overlay
  components/
    SiteHeader / SiteFooter
    Section / Prose / ReadingNow        building blocks
    HomePage / RamblingsIndex / ArticlePage / ContentPage   page bodies
  pages/           thin route files; de/ mirrors the tree for German
  styles/terminal.css   the phosphor theme (all colour is a custom property)
```

## Content notes

- `article` docs have `language: null` — the ramblings are **English only** by
  design. Both `/ramblings` and `/de/ramblings` render the same English posts.
- `page` docs (`hero`, `who`, `previously`, `privacy`, `imprint`) exist per
  locale, keyed by `slug.current` + `language`.

## Roadmap

- [ ] **"Previously" in second person** — content edit in Sanity, not code.
- [ ] Pick + self-host a display font with full Latin Extended-A (umlauts, ß).
      Current stack rides system monospace fonts.
- [ ] `/resume` page (there's a `resume` singleton in Sanity).
- [ ] Ramblings index: the faux-terminal with key-map navigation
      (`j`/`k`/`enter`/`/`) as a React island over real `<a>` links.
- [ ] A real command prompt on the home page (`ls`, `cd`, `lang de`, `theme`).
- [ ] Pagination for ramblings once the list gets long.
- [ ] OG images.
- [ ] Decide on `@astrojs/react` — kept for the islands above; until one ships
      it emits one unused ~190KB chunk into `dist/_astro/` that no page links.
- [ ] Set the real domain in `astro.config.mjs` / `SITE_URL`.
