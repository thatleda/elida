import { defaultLocale, isLocale, locales, type Locale } from './config';
import { ui, type UIKey } from './ui';

/** Pull the active locale out of a URL pathname (`/de/ramblings` -> `de`). */
export function getLocale(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split('/');
  return isLocale(maybeLocale) ? maybeLocale : defaultLocale;
}

/** Translator bound to a locale, with English fallback for missing keys. */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key];
  };
}

/**
 * Prefix a path with the locale segment when it isn't the default.
 * `path('/ramblings', 'de')` -> `/de/ramblings`
 * `path('/ramblings', 'en')` -> `/ramblings`
 */
export function path(pathname: string, locale: Locale): string {
  const clean = `/${pathname.replace(/^\/+/, '')}`;
  if (locale === defaultLocale) return clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/** Strip any locale prefix, giving the route-relative path. */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split('/');
  if (isLocale(first)) return `/${rest.join('/')}`;
  return pathname;
}

/** `hreflang` alternates for the current route, for <head>. */
export function alternates(url: URL, site: URL | undefined) {
  const route = stripLocale(url.pathname);
  return locales.map((locale) => ({
    locale,
    href: new URL(path(route, locale), site ?? url).toString(),
  }));
}

export { locales, defaultLocale, type Locale };
