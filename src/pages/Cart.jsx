import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import styles from './Cart.module.css'

export default function Cart() {
  const { items, total, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Cart</h1>
        <p className={styles.empty}>Your cart is empty.</p>
        <Link to="/" className={styles.back}>
          ← Back to list
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Cart ({items.length})</h1>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.lineId} className={styles.row}>
            <img
              className={styles.thumb}
              src={item.imgUrl}
              alt={`${item.brand} ${item.model}`}
            />
            <div className={styles.info}>
              <span className={styles.name}>
                {item.brand} {item.model}
              </span>
              <span className={styles.opts}>
                {[item.storageName, item.colorName].filter(Boolean).join(' · ')}
              </span>
            </div>
            <span className={styles.price}>{item.price} €</span>
            <button
              type="button"
              className={styles.remove}
              onClick={() => removeItem(item.lineId)}
              aria-label={`Remove ${item.brand} ${item.model} from cart`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalValue}>{total} €</span>
      </div>

      <Link to="/" className={styles.back}>
        ← Continue shopping
      </Link>
    </div>
  )
}
