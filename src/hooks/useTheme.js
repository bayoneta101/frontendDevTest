import { useState, useEffect } from 'react'

const STORAGE_KEY = 'theme'

// Tema claro/oscuro persistido; se aplica como data-theme en <html> para que
// las variables CSS (y color-scheme) cambien en toda la web.
export function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(STORAGE_KEY) || 'light',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return [theme, setTheme]
}
