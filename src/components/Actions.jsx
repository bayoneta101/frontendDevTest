import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { isAvailable } from '../utils/product.js'
import styles from './Actions.module.css'

export default function Actions({ product }) {
  const colors = product.options?.colors ?? []
  const storages = product.options?.storages ?? []
  const available = isAvailable(product)
  const { addItem } = useCart()

  // El primer valor queda seleccionado por defecto (también con una sola opción).
  const [colorCode, setColorCode] = useState(colors[0]?.code)
  const [storageCode, setStorageCode] = useState(storages[0]?.code)
  const [status, setStatus] = useState('idle') // idle | adding | done | error

  async function handleAdd() {
    if (!available) return
    setStatus('adding')
    try {
      const color = colors.find((c) => c.code === colorCode)
      const storage = storages.find((s) => s.code === storageCode)
      await addItem({ product, color, storage })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className={styles.actions}>
      <label className={styles.field}>
        Storage
        <select
          value={storageCode}
          onChange={(e) => setStorageCode(Number(e.target.value))}
        >
          {storages.map((s) => (
            <option key={s.code} value={s.code}>
              {s.name}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        Color
        <select
          value={colorCode}
          onChange={(e) => setColorCode(Number(e.target.value))}
        >
          {colors.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={handleAdd}
        disabled={!available || status === 'adding'}
      >
        {!available
          ? 'Not available'
          : status === 'adding'
            ? 'Adding…'
            : 'Add to cart'}
      </button>

      {status === 'done' && (
        <p role="status" className={styles.feedback}>
          Added to cart.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className={styles.feedback}>
          Couldn’t add to cart.
        </p>
      )}
    </div>
  )
}
