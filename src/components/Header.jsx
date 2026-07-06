import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useBreadcrumb } from '../context/BreadcrumbContext.jsx'
import styles from './Header.module.css'

export default function Header() {
  const { count } = useCart()
  const { label } = useBreadcrumb()
  const { pathname } = useLocation()
  const onProduct = pathname.startsWith('/product/')
  const crumb = label ?? pathname.split('/').pop()

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Mobile Shop
      </Link>

      <nav aria-label="Breadcrumbs" className={styles.breadcrumbs}>
        <Link to="/">Home</Link>
        {onProduct && <span> / {crumb}</span>}
      </nav>

      <Link
        to="/cart"
        className={styles.cart}
        aria-label={`${count} items in cart`}
      >
        🛒 {count}
      </Link>
    </header>
  )
}
