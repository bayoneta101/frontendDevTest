import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme.js'
import styles from './SettingsMenu.module.css'

export default function SettingsMenu() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useTheme()
  const ref = useRef(null)

  // Cierra al clicar fuera o con Escape.
  useEffect(() => {
    if (!open) return
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={styles.menu} ref={ref}>
      <button
        type="button"
        className={styles.gear}
        aria-label="Settings"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        ⚙️
      </button>

      {open && (
        <div className={styles.dropdown} role="menu">
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
            />
            <span className={styles.slider} aria-hidden="true" />
            <span>Dark mode</span>
          </label>
        </div>
      )}
    </div>
  )
}
