import { Link } from 'react-router-dom'
import styles from './ProductItem.module.css'

export default function ProductItem({ product }) {
  const { id, brand, model, price, imgUrl } = product
  return (
    <li className={styles.card}>
      <Link to={`/product/${id}`} className={styles.link}>
        <img
          className={styles.image}
          src={imgUrl}
          alt={`${brand} ${model}`}
          loading="lazy"
        />
        <div className={styles.info}>
          <span className={styles.brand}>{brand}</span>
          <span className={styles.model}>{model}</span>
          <span className={styles.price}>{price ? `${price} €` : '—'}</span>
        </div>
      </Link>
    </li>
  )
}
