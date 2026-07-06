import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext.jsx'
import Cart from './Cart.jsx'

const ITEMS = [
  {
    lineId: 'a',
    id: 'p1',
    brand: 'Acer',
    model: 'Iconia',
    price: 170,
    imgUrl: '/1.jpg',
    colorName: 'Black',
    storageName: '16 GB',
  },
  {
    lineId: 'b',
    id: 'p2',
    brand: 'Apple',
    model: 'iPhone',
    price: 900,
    imgUrl: '/2.jpg',
    colorName: 'White',
    storageName: '128 GB',
  },
]

function renderCart() {
  return render(
    <CartProvider>
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    </CartProvider>,
  )
}

describe('Cart', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('cart:items', JSON.stringify(ITEMS))
  })

  it('lista los items, muestra el total y permite borrar cada uno', async () => {
    renderCart()

    expect(screen.getByText('Acer Iconia')).toBeInTheDocument()
    expect(screen.getByText('Apple iPhone')).toBeInTheDocument()
    // Total = 170 + 900.
    expect(screen.getByText('1070 €')).toBeInTheDocument()

    await userEvent.click(
      screen.getByRole('button', { name: /remove acer iconia/i }),
    )

    expect(screen.queryByText('Acer Iconia')).not.toBeInTheDocument()
    expect(screen.getByText('Apple iPhone')).toBeInTheDocument()
    // Tras borrar, el precio del item (900 €) y el total (900 €) coinciden.
    expect(screen.getAllByText('900 €')).toHaveLength(2)
  })
})
