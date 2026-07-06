import { useEffect, useMemo, useState } from 'react'
import { getProducts } from '../api/client.js'
import ProductItem from '../components/ProductItem.jsx'
import SearchBar from '../components/SearchBar.jsx'
import styles from './ProductList.module.css'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [query, setQuery] = useState('')

  useEffect(() => {
    let active = true
    getProducts()
      .then((data) => {
        if (!active) return
        setProducts(data)
        setStatus('ready')
      })
      .catch(() => active && setStatus('error'))
    return () => {
      active = false
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter((p) =>
      `${p.brand} ${p.model}`.toLowerCase().includes(q),
    )
  }, [products, query])

  if (status === 'loading') {
    return <p className={styles.state}>Loading products…</p>
  }
  if (status === 'error') {
    return <p className={styles.state}>Couldn’t load products.</p>
  }

  return (
    <div>
      <div className={styles.toolbar}>
        <h1 className={styles.title}>Products</h1>
        <SearchBar value={query} onChange={setQuery} />
      </div>
      {filtered.length === 0 ? (
        <p className={styles.state}>No products match “{query}”.</p>
      ) : (
        <ul className={styles.grid}>
          {filtered.map((p) => (
            <ProductItem key={p.id} product={p} />
          ))}
        </ul>
      )}
    </div>
  )
}
