import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FolderKanban, CheckSquare, CalendarDays, BarChart3, FileText, Users, Target, Bell, Activity, Settings, Search, PanelLeft, Menu } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { Modal, Input } from '@/components/ui'
import { cn } from '@/utils/cn'

const nav = [
  ['/', 'Dashboard', LayoutDashboard], ['/projects', 'Projects', FolderKanban], ['/tasks', 'Tasks', CheckSquare],
  ['/calendar', 'Calendar', CalendarDays], ['/analytics', 'Analytics', BarChart3], ['/documents', 'Documents', FileText],
  ['/team', 'Team', Users], ['/goals', 'Goals', Target], ['/notifications', 'Notifications', Bell],
  ['/activity', 'Activity', Activity], ['/settings', 'Settings', Settings],
]

function CommandPalette({ open, onClose }) {
  const { projects, tasks } = useApp()
  const go = useNavigate()
  const [q, setQ] = useState('')
  const items = [
    ...nav.map(([to, label]) => ({ to, label, kind: 'Page' })),
    ...projects.map((p) => ({ to: '/projects', label: p.name, kind: 'Project' })),
    ...tasks.map((t) => ({ to: '/tasks', label: t.title, kind: 'Task' })),
  ].filter((i) => i.label.toLowerCase().includes(q.toLowerCase())).slice(0, 8)
  return (
    <Modal open={open} onClose={onClose} title="Search & commands">
      <Input autoFocus placeholder="Search pages, projects, tasks…" value={q} onChange={(e) => setQ(e.target.value)} />
      <ul className="mt-3 space-y-1">
        {items.map((i, k) => (
          <li key={k}><button onClick={() => { go(i.to); onClose(); setQ('') }} className="flex w-full justify-between rounded-md px-2 py-1.5 text-ui hover:bg-canvas">
            {i.label}<span className="eyebrow text-fg-subtle">{i.kind}</span></button></li>
        ))}
      </ul>
    </Modal>
  )
}

export default function AppShell() {
  const { toasts, notifications } = useApp()
  const [collapsed, setCollapsed] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [cmd, setCmd] = useState(false)
  const unread = notifications.filter((n) => !n.read).length

  useEffect(() => {
    const h = (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setCmd((o) => !o) } }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  return (
    <div className="flex min-h-screen">
      <aside className={cn('fixed inset-y-0 z-40 flex flex-col border-r border-border bg-canvas p-3 transition-all md:static', collapsed ? 'md:w-14' : 'md:w-56', mobile ? 'w-56 translate-x-0' : '-translate-x-full md:translate-x-0')}>
        <div className="mb-4 flex h-10 items-center gap-2 px-2"><span className="text-brand">▲</span>{!collapsed && <span className="font-medium">Syntra</span>}</div>
        <nav className="flex-1 space-y-0.5">
          {nav.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setMobile(false)} className={({ isActive }) => cn('flex h-8 items-center gap-2.5 rounded-md px-2 text-ui', isActive ? 'bg-surface text-fg shadow-hairline' : 'text-fg-muted hover:text-fg')}>
              <Icon size={16} />{!collapsed && <span className="flex-1">{label}</span>}
              {!collapsed && label === 'Notifications' && unread > 0 && <span className="font-mono text-eyebrow">{unread}</span>}
            </NavLink>
          ))}
        </nav>
        <button onClick={() => setCollapsed((c) => !c)} className="hidden h-8 items-center gap-2 px-2 text-ui text-fg-subtle hover:text-fg md:flex"><PanelLeft size={16} />{!collapsed && 'Collapse'}</button>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="flex h-14 items-center gap-3 border-b border-border px-4 md:px-8">
          <button className="md:hidden" onClick={() => setMobile((m) => !m)} aria-label="Menu"><Menu size={18} /></button>
          <button onClick={() => setCmd(true)} className="flex h-8 w-full max-w-sm items-center gap-2 rounded-md bg-surface px-3 text-ui text-fg-subtle shadow-hairline"><Search size={14} />Search<span className="ml-auto font-mono text-eyebrow">⌘K</span></button>
        </header>
        <main className="mx-auto max-w-[1280px] p-4 md:p-8"><Outlet /></main>
      </div>
      <CommandPalette open={cmd} onClose={() => setCmd(false)} />
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((t) => <div key={t.id} className="rounded-md bg-surface-inverse px-3 py-2 text-ui text-fg-inverse">✓ {t.msg}</div>)}
      </div>
    </div>
  )
}
