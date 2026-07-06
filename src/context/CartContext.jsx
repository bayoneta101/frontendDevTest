import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { addToCart } from '../api/client.js'

const CartContext = createContext(null)
const STORAGE_KEY = 'cart:items'

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadItems)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  // Registra el añadido en la API (contrato del enunciado) y guarda la línea
  // en cliente para poder listarla y borrarla.
  const addItem = useCallback(async ({ product, color, storage }) => {
    await addToCart({
      id: product.id,
      colorCode: color?.code,
      storageCode: storage?.code,
    })
    setItems((prev) => [
      ...prev,
      {
        lineId: crypto.randomUUID(),
        id: product.id,
        brand: product.brand,
        model: product.model,
        price: Number(product.price) || 0,
        imgUrl: product.imgUrl,
        colorName: color?.name,
        storageName: storage?.name,
      },
    ])
  }, [])

  const removeItem = useCallback((lineId) => {
    setItems((prev) => prev.filter((it) => it.lineId !== lineId))
  }, [])

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      total: items.reduce((sum, it) => sum + it.price, 0),
      addItem,
      removeItem,
    }),
    [items, addItem, removeItem],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
