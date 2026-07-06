import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct } from '../api/client.js'
import { useBreadcrumb } from '../context/BreadcrumbContext.jsx'
import { isAvailable } from '../utils/product.js'
import Description from '../components/Description.jsx'
import Actions from '../components/Actions.jsx'
import styles from './ProductDetail.module.css'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | error
  const { setLabel } = useBreadcrumb()

  useEffect(() => {
    let active = true
    setStatus('loading')
    getProduct(id)
      .then((data) => {
        if (!active) return
        setProduct(data)
        setStatus('ready')
      })
      .catch(() => active && setStatus('error'))
    return () => {
      active = false
    }
  }, [id])

  // Breadcrumb del header refleja el producto actual.
  useEffect(() => {
    if (product) setLabel(`${product.brand} ${product.model}`)
    return () => setLabel(null)
  }, [product, setLabel])

  if (status === 'loading') {
    return <p className={styles.state}>Loading product…</p>
  }
  if (status === 'error') {
    return <p className={styles.state}>Couldn’t load the product.</p>
  }

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}>
        ← Back to list
      </Link>

      <div className={styles.columns}>
        <div className={styles.imageCol}>
          <div className={styles.imageWrap}>
            <img
              className={styles.image}
              src={product.imgUrl}
              alt={`${product.brand} ${product.model}`}
            />
            {!isAvailable(product) && (
              <span className={styles.overlay}>Not available</span>
            )}
          </div>
        </div>

        <div className={styles.infoCol}>
          <h1 className={styles.title}>
            {product.brand} {product.model}
          </h1>
          <Description product={product} />
          <Actions product={product} />
        </div>
      </div>
    </div>
  )
}
