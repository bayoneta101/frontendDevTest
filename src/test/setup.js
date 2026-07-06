import '@testing-library/jest-dom'

// Node 25 define un global `localStorage` no-op (Web Storage experimental) que
// tapa el de jsdom, así que sus métodos son undefined. Lo sustituimos por uno
// en memoria para que los tests de cache sean deterministas.
const store = new Map()
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
    clear: () => store.clear(),
  },
})
