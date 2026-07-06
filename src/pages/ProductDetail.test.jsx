import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '../context/CartContext.jsx'
import { BreadcrumbProvider } from '../context/BreadcrumbContext.jsx'
import Layout from '../components/Layout.jsx'
import ProductDetail from './ProductDetail.jsx'
import { getProduct, addToCart } from '../api/client.js'

vi.mock('../api/client.js', () => ({
  getProduct: vi.fn(),
  addToCart: vi.fn(),
}))

const PRODUCT = {
  id: 'p1',
  brand: 'Acer',
  model: 'Iconia',
  price: '170',
  imgUrl: '/p1.jpg',
  cpu: 'Quad',
  ram: '2 GB',
  os: 'Android',
  displayResolution: '7"',
  battery: '3400 mAh',
  primaryCamera: ['13 MP'],
  secondaryCmera: ['2 MP'],
  dimentions: '191 x 101',
  weight: '260',
  options: {
    colors: [{ code: 1000, name: 'Black' }],
    storages: [
      { code: 2000, name: '16 GB' },
      { code: 2001, name: '32 GB' },
    ],
  },
}

function renderPDP() {
  return render(
    <CartProvider>
      <BreadcrumbProvider>
        <MemoryRouter initialEntries={['/product/p1']}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/product/:id" element={<ProductDetail />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </BreadcrumbProvider>
    </CartProvider>,
  )
}

describe('ProductDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    getProduct.mockResolvedValue(PRODUCT)
    // La API real devuelve siempre { count: 1 } por petición.
    addToCart.mockResolvedValue({ count: 1 })
  })

  it('preselecciona la opción única y acumula el contador en cada añadido', async () => {
    renderPDP()

    await screen.findByRole('heading', { name: /acer iconia/i })

    // Color con una sola opción → seleccionado por defecto.
    expect(screen.getByLabelText('Color')).toHaveValue('1000')

    const addButton = screen.getByRole('button', { name: /add to cart/i })

    await userEvent.click(addButton)
    expect(addToCart).toHaveBeenCalledWith({
      id: 'p1',
      colorCode: 1000,
      storageCode: 2000,
    })
    expect(await screen.findByText('🛒 1')).toBeInTheDocument()

    // Segundo añadido → el contador acumula, no se queda en 1.
    await userEvent.click(addButton)
    expect(await screen.findByText('🛒 2')).toBeInTheDocument()
  })

  it('sin precio: marca el producto como no disponible y no deja añadir', async () => {
    getProduct.mockResolvedValue({ ...PRODUCT, price: '' })
    renderPDP()

    await screen.findByRole('heading', { name: /acer iconia/i })

    const addButton = screen.getByRole('button', { name: /not available/i })
    expect(addButton).toBeDisabled()
    // "Not available" aparece en el overlay de la imagen y en el botón.
    expect(screen.getAllByText('Not available')).toHaveLength(2)

    await userEvent.click(addButton)
    expect(addToCart).not.toHaveBeenCalled()
  })
})
