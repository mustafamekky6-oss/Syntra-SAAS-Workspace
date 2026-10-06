import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/utils/cn'

const links = [['Product', '#product'], ['Features', '#features'], ['Pricing', '#pricing']]

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8)
    h()
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <header className={cn('sticky top-0 z-40 border-b transition-colors', scrolled ? 'border-border bg-canvas/90 backdrop-blur' : 'border-transparent')}>
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-6 md:px-12">
        <Link to="/" className="flex items-center gap-2 font-medium"><span className="text-primary">▲</span>Syntra</Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([l, h]) => <a key={l} href={h} className="text-ui text-fg-muted hover:text-fg">{l}</a>)}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/signin" className="text-ui text-fg-muted hover:text-fg">Sign in</Link>
          <Link to="/signup" className="inline-flex h-8 items-center rounded-md bg-primary px-3 text-ui text-fg-inverse hover:opacity-90">Get started</Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      {open && (
        <div className="space-y-1 border-t border-border bg-canvas px-6 py-3 md:hidden">
          {links.map(([l, h]) => <a key={l} href={h} onClick={() => setOpen(false)} className="block py-2 text-ui">{l}</a>)}
          <Link to="/signin" className="block py-2 text-ui">Sign in</Link>
          <Link to="/signup" className="mt-2 flex h-9 items-center justify-center rounded-md bg-primary text-ui text-fg-inverse">Get started</Link>
        </div>
      )}
    </header>
  )
}
