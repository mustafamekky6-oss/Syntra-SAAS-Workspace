import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('syntra-theme') || 'light' } catch { return 'light' }
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try { localStorage.setItem('syntra-theme', theme) } catch { /* ignore */ }
  }, [theme])
  return [theme, setTheme]
}
