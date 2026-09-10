import { vi } from 'vitest'
import '@testing-library/jest-dom/vitest'

function createMemoryStorage(): Storage {
  const store = new Map<string, string>()
  return {
    getItem: key => store.get(key) ?? null,
    setItem: (key, value) => void store.set(key, String(value)),
    removeItem: key => void store.delete(key),
    clear: () => store.clear(),
    key: index => [...store.keys()][index] ?? null,
    get length() {
      return store.size
    },
  }
}

vi.stubGlobal('localStorage', createMemoryStorage())

if (!window.matchMedia) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }))
}
