import { useEffect, useRef, useState } from 'react'
import { cn } from '@/utils/cn'

function useInView() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return setSeen(true)
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.15 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return [ref, seen]
}

export function Reveal({ children, className, delay = 0 }) {
  const [ref, seen] = useInView()
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={cn('reveal', seen && 'in', className)}>{children}</div>
}

export function Counter({ to, prefix = '', suffix = '', decimals = 0 }) {
  const [ref, seen] = useInView()
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!seen) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setV(to)
    let raf, t0
    const step = (t) => { t0 ??= t; const p = Math.min((t - t0) / 1300, 1); setV(to * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(step) }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [seen, to])
  return <span ref={ref}>{prefix}{v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>
}
