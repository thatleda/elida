# ELIDA

Leda Wolf's website. A fast, static, mostly-JS-free site wearing an 80s
terminal skin.

## ELIZA, 1966

In 1966, Joseph Weizenbaum built a chatbot at MIT that did nothing but
reflect a person's own words back as questions. It didn't understand
anything — it pattern-matched keywords and rephrased them, Rogerian-therapist
style. People confided in it anyway. Weizenbaum was disturbed enough by that
to spend the rest of his career warning people not to mistake the
performance of understanding for the real thing.

ELIDA is ELIZA with one letter's worth of static, and it's also `LEDA`
rearranged. Both readings are intentional. This site wears the costume of
the most famous con in computing history, on purpose, at a moment when the
question ELIZA first raised — can something that reflects you back convince
you it understands? — has never been more alive. The "Ask ELIDA" terminal on
the homepage is a real, working ELIZA clone: keyword matching, no
comprehension, and a default response that's the original Rogerian
deflection, near enough verbatim ("Why do you want to know that?"). Unlike
1966, the visitor is in on it — that's the point. Leda spends her career
doing the work ELIZA only pretended to: translating a complex system into
something a room with no engineering background can trust, mentoring people
into the field, building accessibility in from the start instead of bolting
it on after. Naming a portfolio after the machine that faked all of that,
and then being completely transparent about the fake, is the joke and the
thesis at the same time.

## Stack

**Astro — static output, zero JS by default.** Most of this site is words: a
bio, some articles, a resume. Astro ships no JavaScript for any of that. The
two genuinely interactive pieces are isolated, hydrated islands rather than
an excuse to ship a full SPA runtime to read a paragraph.

**Vue — two islands, and a deliberate signal.** `EliQuery.vue` runs the
ELIZA matcher client-side; `StoryBeats.vue` runs the choose-your-own-adventure
reveal on the bio page. Vue over React here isn't a default, it's a choice —
Leda's recent professional work is React-heavy, and this site exists partly
to show range.

**Sanity — headless CMS.** Content (bio, articles, testimonials, resume) is
authored and edited without a deploy, keyed per-locale. The schema itself
isn't part of this document — it's an editing surface, not a public API.

**Hardcover — a live reading widget.** Calls the Hardcover GraphQL API at
build time. Reviews come back as Slate.js rich text and are rendered through
a small hand-rolled renderer (bold, italic, blockquotes, lists, a
click-to-reveal spoiler tag) rather than pulling in a heavy rich-text
dependency for five node types.

**The terminal skin.** Green phosphor on true black, a self-typing `whoami`
prompt, CRT scanlines that respect `prefers-reduced-motion`. Every color is
a CSS custom property, so the entire palette is a one-line swap.

**i18n.** Astro's own i18n routing — English at `/`, German at `/de/` — with
real `hreflang` and canonical tags, not a client-side language toggle, so
the German content is actually indexable.

**Print.** The resume renders from the same content as the on-screen page,
but the print stylesheet is its own design pass: real `@page` margins
(padding on the page wrapper only applies once across the whole document,
not once per physical page), explicit background overrides (the root
element paints the canvas independently of where the content itself ends),
and heading/entry-level break rules tuned against the actual paginated
output rather than guessed at from the screen view.

## Structure

```text
src/
  components/    Astro components, plus two Vue islands (EliQuery, StoryBeats)
  i18n/          locale config, UI string dictionary, path helpers
  layouts/       Base.astro — html shell, CRT overlay, skip link
  lib/           Sanity client, Hardcover client, the ELIZA matcher,
                 Slate + Portable Text renderers
  pages/         thin route files; de/ mirrors the tree for German
  styles/        the phosphor theme
```

## Security

- No secrets live in the repo. The Sanity project ID and dataset are public
  by design — they're read-only, CDN-cached queries. The Hardcover API key
  is a real bearer token and exists only in the deploy environment.
- CMS-authored content is rendered through explicit component allowlists
  (Portable Text, Slate), not raw HTML injection — there's no path from
  "someone edits a review in Hardcover" to arbitrary script execution on
  this site.
- Every external link (Calendly, GitHub, LinkedIn, Discord) carries
  `rel="noopener noreferrer"`.
- Dependencies are pinned to exact versions through a pnpm catalog, checked
  against a supply-chain trust policy that flags dependency updates with
  irregular publishing provenance before they land.

## Deployment

Netlify, connected directly to the GitHub repository. Pushes to `main`
trigger a build in Netlify's own environment — never from a local machine.
Environment variables (the Hardcover key, the canonical site URL) are set in
Netlify's dashboard, not committed. Build: `pnpm build`, Node 22, publishing
`dist/`.
