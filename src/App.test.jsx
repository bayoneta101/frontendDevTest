import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import Layout from './components/Layout.jsx'
import ProductList from './pages/ProductList.jsx'
import ProductDetail from './pages/ProductDetail.jsx'

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
  it('muestra header y PLP en /', () => {
    renderAt('/')
    expect(
      screen.getByRole('link', { name: /mobile shop/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /productos/i }),
    ).toBeInTheDocument()
  })

  it('muestra header y PDP en /product/:id', () => {
    renderAt('/product/abc123')
    expect(
      screen.getByRole('link', { name: /mobile shop/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /producto abc123/i }),
    ).toBeInTheDocument()
  })
})
