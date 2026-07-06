import { createContext, useContext, useState } from 'react'

const BreadcrumbContext = createContext(null)

export function BreadcrumbProvider({ children }) {
  const [label, setLabel] = useState(null)
  return (
    <BreadcrumbContext.Provider value={{ label, setLabel }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBreadcrumb() {
  // Default seguro para no acoplar cada render de Header a un provider.
  return useContext(BreadcrumbContext) ?? { label: null, setLabel: () => {} }
}
