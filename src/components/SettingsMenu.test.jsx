import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SettingsMenu from './SettingsMenu.jsx'

describe('SettingsMenu', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('despliega el menú y el switch activa el modo oscuro', async () => {
    render(<SettingsMenu />)

    // El switch está oculto hasta abrir el menú.
    expect(
      screen.queryByRole('checkbox', { name: /dark mode/i }),
    ).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /settings/i }))

    const toggle = screen.getByRole('checkbox', { name: /dark mode/i })
    expect(toggle).not.toBeChecked()

    await userEvent.click(toggle)

    expect(toggle).toBeChecked()
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })
})
