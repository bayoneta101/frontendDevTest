import styles from './Description.module.css'

const toText = (v) => (Array.isArray(v) ? v.join(', ') : v || '—')

export default function Description({ product }) {
  const rows = [
    ['Brand', product.brand],
    ['Model', product.model],
    ['Price', product.price ? `${product.price} €` : '—'],
    ['CPU', product.cpu],
    ['RAM', product.ram],
    ['OS', product.os],
    ['Display', product.displayResolution],
    ['Battery', product.battery],
    ['Primary camera', product.primaryCamera],
    ['Secondary camera', product.secondaryCmera],
    ['Dimensions', product.dimentions],
    ['Weight', product.weight ? `${product.weight} g` : '—'],
  ]

  return (
    <dl className={styles.description}>
      {rows.map(([label, value]) => (
        <div className={styles.row} key={label}>
          <dt className={styles.term}>{label}</dt>
          <dd className={styles.value}>{toText(value)}</dd>
        </div>
      ))}
    </dl>
  )
}
