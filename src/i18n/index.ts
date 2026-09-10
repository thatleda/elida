import type { Locale } from './config'
import type { UIKey } from './ui'
import { defaultLocale, isLocale, locales } from './config'
import { ui } from './ui'

export function getLocale(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split('/')
  return isLocale(maybeLocale) ? maybeLocale : defaultLocale
}

export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key]
  }
}

export function path(pathname: string, locale: Locale): string {
  const clean = `/${pathname.replace(/^\/+/, '')}`
  if (locale === defaultLocale)
    return clean
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}

export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split('/')
  if (isLocale(first))
    return `/${rest.join('/')}`
  return pathname
}

export function alternates(url: URL, site: URL | undefined) {
  const route = stripLocale(url.pathname)
  return locales.map(locale => ({
    locale,
    href: new URL(path(route, locale), site ?? url).toString(),
  }))
}

export { defaultLocale, type Locale, locales }
