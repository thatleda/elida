import vue from '@astrojs/vue'
// @ts-check
import { defineConfig } from 'astro/config'

const site = process.env.SITE_URL ?? 'https://elida.netlify.app'

export default defineConfig({
  site,

  output: 'static',
  integrations: [vue()],
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
})
