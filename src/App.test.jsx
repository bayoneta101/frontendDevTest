import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import Layout from './components/Layout.jsx'
import ProductList from './pages/ProductList.jsx'
import ProductDetail from './pages/ProductDetail.jsx'

vi.mock('./api/client.js', () => ({
  getProducts: vi.fn().mockResolvedValue([]),
  addToCart: vi.fn(),
}))

function renderAt(path) {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </CartProvider>,
  )
}

describe('enrutado + layout', () => {
  it('muestra header y PLP en /', async () => {
    renderAt('/')
    expect(
      screen.getByRole('link', { name: /mobile shop/i }),
    ).toBeInTheDocument()
    expect(
      await screen.findByRole('heading', { name: /products/i }),
    ).toBeInTheDocument()
  })

  it('muestra header y PDP en /product/:id', () => {
    renderAt('/product/abc123')
    expect(
      screen.getByRole('link', { name: /mobile shop/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /product abc123/i }),
    ).toBeInTheDocument()
  })
})
