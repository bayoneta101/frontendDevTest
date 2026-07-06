import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import styles from './Header.module.css'

export default function Header() {
  const { count } = useCart()
  const { pathname } = useLocation()
  const onProduct = pathname.startsWith('/product/')

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Mobile Shop
      </Link>

      <nav aria-label="Breadcrumbs" className={styles.breadcrumbs}>
        <Link to="/">Home</Link>
        {onProduct && <span> / {pathname.split('/').pop()}</span>}
      </nav>

      <span className={styles.cart} aria-label="Cart items">
        🛒 {count}
      </span>
    </header>
  )
}
