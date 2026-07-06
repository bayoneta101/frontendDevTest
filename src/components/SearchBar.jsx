import styles from './SearchBar.module.css'

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      className={styles.input}
      placeholder="Search by brand or model…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search products"
    />
  )
}
