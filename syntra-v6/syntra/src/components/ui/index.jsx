import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

export function Button({ variant = 'primary', className, ...p }) {
  const v = {
    primary: 'bg-surface-inverse text-fg-inverse hover:opacity-90',
    ghost: 'text-fg-muted shadow-hairline hover:bg-surface',
    text: 'text-fg-muted hover:text-fg',
  }[variant]
  return <button className={cn('inline-flex h-8 items-center justify-center gap-2 rounded-md px-3 text-ui transition-colors disabled:opacity-50', v, className)} {...p} />
}
export const Card = ({ className, ...p }) => <div className={cn('rounded-md bg-surface p-4 shadow-ring', className)} {...p} />
export const Badge = ({ children, className }) => (
  <span className={cn('inline-flex items-center rounded-sm px-1.5 py-0.5 font-mono text-eyebrow uppercase tracking-eyebrow text-fg-muted shadow-hairline', className)}>{children}</span>
)
export const Avatar = ({ name, size = 28 }) => (
  <span title={name} style={{ width: size, height: size }} className="inline-flex shrink-0 items-center justify-center rounded-full bg-surface-inverse font-mono text-eyebrow text-fg-inverse">
    {name.split(' ').map((w) => w[0]).join('')}
  </span>
)
export const Progress = ({ value }) => (
  <div className="h-1.5 w-full rounded-full bg-border"><div className="h-full rounded-full bg-fg transition-all" style={{ width: `${value}%` }} /></div>
)
export const Input = ({ className, ...p }) => (
  <input className={cn('h-8 w-full rounded-md bg-surface px-3 text-ui shadow-hairline outline-none focus:shadow-[0_0_0_1px_var(--fg)]', className)} {...p} />
)
export const Select = ({ className, ...p }) => (
  <select className={cn('h-8 rounded-md bg-surface px-2 text-ui shadow-hairline', className)} {...p} />
)
export function PageHeader({ title, sub, action }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div><p className="eyebrow mb-1">{sub}</p><h1 className="text-heading">{title}</h1></div>
      {action}
    </div>
  )
}
export function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-md bg-surface p-5 shadow-ring" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between"><h2 className="text-body">{title}</h2>
          <button onClick={onClose} aria-label="Close"><X size={16} /></button></div>
        {children}
      </div>
    </div>
  )
}
export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="mb-4 flex gap-1 border-b border-border">
      {tabs.map((t) => (
        <button key={t} onClick={() => onChange(t)} className={cn('-mb-px border-b-2 px-3 py-2 text-ui', value === t ? 'border-fg text-fg' : 'border-transparent text-fg-subtle hover:text-fg')}>{t}</button>
      ))}
    </div>
  )
}
export const Empty = ({ text }) => <div className="rounded-md py-10 text-center text-ui text-fg-subtle shadow-hairline">{text}</div>

export const Skeleton = ({ className }) => <div className={cn('animate-pulse rounded-md bg-border', className)} />
export function Drawer({ open, onClose, title, children }) {
  return (
    <div className={cn('fixed inset-0 z-50', !open && 'pointer-events-none')} aria-hidden={!open}>
      <div onClick={onClose} className={cn('absolute inset-0 bg-black/30 transition-opacity', open ? 'opacity-100' : 'opacity-0')} />
      <aside className={cn('absolute inset-y-0 right-0 flex w-full flex-col bg-surface shadow-ring transition-transform duration-200 md:w-[440px]', open ? 'translate-x-0' : 'translate-x-full')}>
        <div className="flex h-14 items-center justify-between border-b border-border px-5"><h2 className="text-body">{title}</h2><button onClick={onClose} aria-label="Close"><X size={16} /></button></div>
        <div className="flex-1 space-y-5 overflow-y-auto p-5">{children}</div>
      </aside>
    </div>
  )
}
