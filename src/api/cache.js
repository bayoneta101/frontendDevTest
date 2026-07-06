// Cache en localStorage con expiración de 1 hora (persistencia en cliente).
const TTL = 60 * 60 * 1000

export function readCache(key) {
  const raw = localStorage.getItem(key)
  if (!raw) return null
  try {
    const { value, expiry } = JSON.parse(raw)
    if (Date.now() > expiry) {
      localStorage.removeItem(key)
      return null
    }
    return value
  } catch {
    localStorage.removeItem(key)
    return null
  }
}

export function writeCache(key, value) {
  localStorage.setItem(key, JSON.stringify({ value, expiry: Date.now() + TTL }))
}

// Devuelve el valor cacheado si está fresco; si hay miss o caducó, llama a
// `fetcher`, reescribe la cache y devuelve el valor nuevo.
export async function cached(key, fetcher) {
  const hit = readCache(key)
  if (hit !== null) return hit
  const value = await fetcher()
  writeCache(key, value)
  return value
}
