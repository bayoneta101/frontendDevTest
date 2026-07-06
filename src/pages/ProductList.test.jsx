import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ProductList from './ProductList.jsx'
import { getProducts } from '../api/client.js'

vi.mock('../api/client.js', () => ({ getProducts: vi.fn() }))

const SAMPLE = [
  { id: '1', brand: 'Acer', model: 'Iconia', price: '170', imgUrl: '/1.jpg' },
  { id: '2', brand: 'Apple', model: 'iPhone 13', price: '900', imgUrl: '/2.jpg' },
  { id: '3', brand: 'Samsung', model: 'Galaxy S21', price: '800', imgUrl: '/3.jpg' },
]

describe('ProductList', () => {
  beforeEach(() => {
    getProducts.mockResolvedValue(SAMPLE)
  })

  it('filtra la lista por marca/modelo en tiempo real', async () => {
    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>,
    )

    expect(await screen.findByText('Iconia')).toBeInTheDocument()
    expect(screen.getByText('iPhone 13')).toBeInTheDocument()
    expect(screen.getByText('Galaxy S21')).toBeInTheDocument()

    await userEvent.type(screen.getByRole('searchbox'), 'apple')

    expect(screen.getByText('iPhone 13')).toBeInTheDocument()
    expect(screen.queryByText('Iconia')).not.toBeInTheDocument()
    expect(screen.queryByText('Galaxy S21')).not.toBeInTheDocument()
  })
})
