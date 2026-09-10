import { describe, expect, it } from 'vitest'
import { alternates, getLocale, path, stripLocale, useTranslations } from './index'

describe('getLocale', () => {
  it('reads a locale prefix from the pathname', () => {
    expect(getLocale(new URL('https://elida.dev/de/ramblings'))).toBe('de')
  })

  it('falls back to the default locale when there is no prefix', () => {
    expect(getLocale(new URL('https://elida.dev/ramblings'))).toBe('en')
  })

  it('treats an unknown first segment as the default locale', () => {
    expect(getLocale(new URL('https://elida.dev/fr/ramblings'))).toBe('en')
  })
})

describe('path', () => {
  it('leaves default-locale paths unprefixed', () => {
    expect(path('/ramblings', 'en')).toBe('/ramblings')
  })

  it('prefixes non-default locales', () => {
    expect(path('/ramblings', 'de')).toBe('/de/ramblings')
  })

  it('normalises a missing leading slash', () => {
    expect(path('ramblings', 'de')).toBe('/de/ramblings')
  })

  it('maps the root path to the bare locale segment', () => {
    expect(path('/', 'de')).toBe('/de')
    expect(path('/', 'en')).toBe('/')
  })
})

describe('stripLocale', () => {
  it('removes a locale prefix', () => {
    expect(stripLocale('/de/ramblings/foo')).toBe('/ramblings/foo')
  })

  it('leaves an unprefixed path untouched', () => {
    expect(stripLocale('/ramblings/foo')).toBe('/ramblings/foo')
  })
})

describe('alternates', () => {
  it('produces one absolute URL per locale for the current route', () => {
    const url = new URL('https://elida.dev/de/ramblings')
    const site = new URL('https://elida.dev')

    expect(alternates(url, site)).toEqual([
      { locale: 'en', href: 'https://elida.dev/ramblings' },
      { locale: 'de', href: 'https://elida.dev/de/ramblings' },
    ])
  })
})

describe('useTranslations', () => {
  it('returns the string for the active locale', () => {
    expect(useTranslations('de')('nav.who')).toBe('Wer?')
  })

  it('falls back to English for a locale missing the key', () => {
    const t = useTranslations('de')
    expect(t('nav.who')).toBeTruthy()
  })
})
