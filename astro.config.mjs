// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// TODO: set this to the real production domain before launch.
const site = process.env.SITE_URL ?? 'https://elida.netlify.app';

// https://astro.build/config
export default defineConfig({
  site,
  // Fully static: every route is prerendered at build time, content pulled
  // from Sanity + Hardcover during the build. No serverless functions.
  // If ISR / on-demand rendering is wanted later, add `@astrojs/netlify`.
  output: 'static',
  integrations: [react()],
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
