import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { addToCart } from '../api/client.js'

const CartContext = createContext(null)
const STORAGE_KEY = 'cart:count'

export function CartProvider({ children }) {
  const [count, setCount] = useState(() => {
    const saved = Number(localStorage.getItem(STORAGE_KEY))
    return Number.isFinite(saved) ? saved : 0
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(count))
  }, [count])

  // La API de test es stateless y devuelve siempre { count: 1 } (los añadidos
  // de esta petición), no el total. Acumulamos en cliente para el contador.
  const addItem = useCallback(async (selection) => {
    const { count: added } = await addToCart(selection)
    setCount((prev) => prev + added)
    return added
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
