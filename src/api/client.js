import { cached } from './cache.js'

const BASE_URL = 'https://itx-frontend-test.onrender.com'

async function request(path, options) {
  const res = await fetch(`${BASE_URL}${path}`, options)
  if (!res.ok) {
    throw new Error(`API ${res.status} ${res.statusText} en ${path}`)
  }
  return res.json()
}

// GET /api/product — cacheado 1h.
export function getProducts() {
  return cached('products', () => request('/api/product'))
}

// GET /api/product/:id — cacheado 1h por producto.
export function getProduct(id) {
  return cached(`product:${id}`, () => request(`/api/product/${id}`))
}

// POST /api/cart → { count }. No se cachea (es una mutación).
export function addToCart({ id, colorCode, storageCode }) {
  return request('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, colorCode, storageCode }),
  })
}
