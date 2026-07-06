import { createContext, useContext, useState, useCallback } from 'react'
import { addToCart } from '../api/client.js'

const CartContext = createContext(null)
const STORAGE_KEY = 'cart:count'

export function CartProvider({ children }) {
  const [count, setCount] = useState(() => {
    const saved = Number(localStorage.getItem(STORAGE_KEY))
    return Number.isFinite(saved) ? saved : 0
  })

  // Añade al carrito vía API; la respuesta ({ count }) es la fuente de verdad.
  const addItem = useCallback(async (selection) => {
    const { count: newCount } = await addToCart(selection)
    setCount(newCount)
    localStorage.setItem(STORAGE_KEY, String(newCount))
    return newCount
  }, [])

  return (
    <CartContext.Provider value={{ count, addItem }}>
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
