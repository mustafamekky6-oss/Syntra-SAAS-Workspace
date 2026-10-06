import SyntraLogo from '@/components/common/SyntraLogo'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, FolderKanban, CheckSquare, CalendarDays, BarChart3, FileText, Users, Target, Bell, Activity, Settings, Search, PanelLeft, Menu, Sparkles, Sun, Moon, User } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { Modal, Input } from '@/components/ui'
import QuickCreate from '@/components/layout/QuickCreate'
import AssistantDrawer from '@/components/layout/AssistantDrawer'
import { cn } from '@/utils/cn'

const nav = [
  ['/app/dashboard', 'Dashboard', LayoutDashboard], ['/app/projects', 'Projects', FolderKanban], ['/app/tasks', 'Tasks', CheckSquare],
  ['/app/calendar', 'Calendar', CalendarDays], ['/app/analytics', 'Analytics', BarChart3], ['/app/documents', 'Documents', FileText],
  ['/app/team', 'Team', Users], ['/app/goals', 'Goals', Target], ['/app/notifications', 'Notifications', Bell],
  ['/app/activity', 'Activity', Activity], ['/app/profile', 'Profile', User], ['/app/settings', 'Settings', Settings],
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
  const { toasts, notifications, theme, setTheme } = useApp()
  const [ai, setAi] = useState(false)
  const { pathname } = useLocation()
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
        <div className="mb-4 flex h-10 items-center px-1"><SyntraLogo variant={collapsed ? 'compact' : 'full'} /></div>
        <nav className="flex-1 space-y-0.5">
          {nav.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} end onClick={() => setMobile(false)} className={({ isActive }) => cn('flex h-8 items-center gap-2.5 rounded-md px-2 text-ui', isActive ? 'bg-surface text-fg shadow-hairline' : 'text-fg-muted hover:text-fg')}>
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
          <div className="ml-auto flex items-center gap-1">
            <QuickCreate />
            <button onClick={() => setAi(true)} aria-label="AI Assistant" className="flex h-8 items-center gap-1.5 rounded-md px-2 text-ui text-fg-muted shadow-hairline hover:text-fg"><Sparkles size={14} />Ask AI</button>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme" className="flex h-8 w-8 items-center justify-center rounded-md text-fg-muted shadow-hairline hover:text-fg">{theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}</button>
          </div>
        </header>
        <main className="mx-auto max-w-[1280px] p-4 pb-24 md:p-8"><div key={pathname} className="page"><Outlet /></div></main>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-canvas md:hidden" aria-label="Primary">
        {[['/app/dashboard', 'Home', LayoutDashboard], ['/app/projects', 'Projects', FolderKanban], ['/app/tasks', 'Tasks', CheckSquare], ['/app/calendar', 'Calendar', CalendarDays]].map(([to, l, Icon]) => (
          <NavLink key={to} to={to} className={({ isActive }) => cn('flex flex-1 flex-col items-center gap-0.5 py-2 text-eyebrow', isActive ? 'text-fg' : 'text-fg-subtle')}><Icon size={18} />{l}</NavLink>
        ))}
        <button onClick={() => setMobile(true)} className="flex flex-1 flex-col items-center gap-0.5 py-2 text-eyebrow text-fg-subtle"><Menu size={18} />More</button>
      </nav>
      <AssistantDrawer open={ai} onClose={() => setAi(false)} />
      <CommandPalette open={cmd} onClose={() => setCmd(false)} />
      <div className="fixed bottom-20 right-4 md:bottom-4 z-50 space-y-2">
        {toasts.map((t) => <div key={t.id} className="rounded-md bg-surface-inverse px-3 py-2 text-ui text-fg-inverse">{{ success: '✓', info: 'ℹ', warning: '⚠', error: '✕' }[t.type]} {t.msg}</div>)}
      </div>
    </div>
  )
}
