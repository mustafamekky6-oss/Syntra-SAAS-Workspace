import { useState } from 'react'
import { Button, Card, Badge, Avatar, Progress, PageHeader, Input, Select, Tabs } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { users, documents, activity } from '@/data'
import { cn } from '@/utils/cn'

export function Calendar() {
  const { tasks } = useApp()
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const offset = new Date(2026, 9, 1).getDay()
  return (
    <>
      <PageHeader title="October 2026" sub="▲ Calendar" />
      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-md bg-border shadow-hairline">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d} className="bg-canvas p-2 eyebrow">{d}</div>)}
        {Array.from({ length: offset }).map((_, i) => <div key={'o' + i} className="bg-canvas" />)}
        {days.map((d) => {
          const due = tasks.filter((t) => Number(t.due.slice(8)) === d && t.due.startsWith('2026-10'))
          return (
            <div key={d} className={cn('min-h-20 bg-surface p-1.5', d === 5 && 'outline outline-1 -outline-offset-1 outline-fg')}>
              <span className="font-mono text-caption text-fg-subtle">{d}</span>
              {due.map((t) => <p key={t.id} className="mt-1 truncate rounded-sm bg-border px-1 text-eyebrow">{t.title}</p>)}
            </div>
          )
        })}
      </div>
    </>
  )
}

export function Analytics() {
  const { tasks, projects } = useApp()
  const counts = ['todo', 'doing', 'review', 'done'].map((s) => [s, tasks.filter((t) => t.status === s).length])
  const max = Math.max(...counts.map((c) => c[1]), 1)
  return (
    <>
      <PageHeader title="Analytics" sub="▲ Insights" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><p className="eyebrow mb-4">Tasks by status</p>
          <div className="flex h-40 items-end gap-4">{counts.map(([s, c]) => (
            <div key={s} className="flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-sm bg-fg" style={{ height: `${(c / max) * 100}%` }} /><span className="font-mono text-eyebrow uppercase">{s} · {c}</span></div>))}</div></Card>
        <Card><p className="eyebrow mb-4">Average project progress</p>
          <p className="text-display">{Math.round(projects.reduce((a, p) => a + p.progress, 0) / projects.length)}%</p></Card>
      </div>
    </>
  )
}

export function Documents() {
  const [q, setQ] = useState('')
  return (
    <>
      <PageHeader title="Documents" sub="▲ Library" />
      <Input className="mb-4 max-w-xs" placeholder="Search documents…" value={q} onChange={(e) => setQ(e.target.value)} />
      <Card className="p-0"><table className="w-full text-ui"><thead><tr className="text-left"><th className="eyebrow p-3">Name</th><th className="eyebrow p-3">Type</th><th className="eyebrow p-3">Owner</th><th className="eyebrow p-3">Updated</th></tr></thead>
        <tbody>{documents.filter((d) => d.name.toLowerCase().includes(q.toLowerCase())).map((d) => (
          <tr key={d.id} className="border-t border-border"><td className="p-3">{d.name}</td><td className="p-3"><Badge>{d.type}</Badge></td><td className="p-3"><Avatar size={22} name={users.find((u) => u.id === d.owner).name} /></td><td className="p-3 text-fg-subtle">{d.updated}</td></tr>))}</tbody></table></Card>
    </>
  )
}

export function Team() {
  return (
    <>
      <PageHeader title="Team" sub="▲ People" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{users.map((u) => (
        <Card key={u.id} className="flex items-center gap-3"><Avatar name={u.name} size={40} /><div><p>{u.name}</p><p className="text-caption text-fg-subtle">{u.role}</p></div></Card>))}</div>
    </>
  )
}

export function Goals() {
  const { goals, bumpGoal, toast } = useApp()
  return (
    <>
      <PageHeader title="Goals" sub="▲ Objectives" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{goals.map((g) => (
        <Card key={g.id}><p className="mb-3">{g.title}</p><Progress value={g.progress} />
          <div className="mt-3 flex items-center justify-between"><span className="font-mono text-caption">{g.progress}%</span>
            <Button variant="ghost" onClick={() => { bumpGoal(g.id); toast('Progress updated') }}>+10%</Button></div></Card>))}</div>
    </>
  )
}

export function Notifications() {
  const { notifications, toggleRead, readAll } = useApp()
  return (
    <>
      <PageHeader title="Notifications" sub="▲ Inbox" action={<Button variant="ghost" onClick={readAll}>Mark all read</Button>} />
      <div className="space-y-2">{notifications.map((n) => (
        <Card key={n.id} onClick={() => toggleRead(n.id)} className={cn('flex cursor-pointer justify-between p-3', n.read && 'opacity-60')}>
          <span className="text-ui">{!n.read && '● '}{n.text}</span><span className="text-caption text-fg-subtle">{n.time}</span></Card>))}</div>
    </>
  )
}

export function ActivityPage() {
  return (
    <>
      <PageHeader title="Activity" sub="▲ Timeline" />
      <Card><ul className="space-y-3 text-ui">{activity.map((a, i) => <li key={a} className="flex justify-between"><span>{a}</span><span className="text-caption text-fg-subtle">{i + 1}h ago</span></li>)}</ul></Card>
    </>
  )
}

export function Settings() {
  const { toast } = useApp()
  const [tab, setTab] = useState('Account')
  const [name, setName] = useState('Mustafa Ali')
  return (
    <>
      <PageHeader title="Settings" sub="▲ Preferences" />
      <Tabs tabs={['Account', 'Appearance', 'Notifications']} value={tab} onChange={setTab} />
      <Card className="max-w-lg space-y-3">
        {tab === 'Account' && <><Input value={name} onChange={(e) => setName(e.target.value)} /><Button onClick={() => toast('Settings saved')}>Save changes</Button></>}
        {tab === 'Appearance' && <p className="text-ui text-fg-muted">Light theme active. Dark mode is not implemented yet.</p>}
        {tab === 'Notifications' && <label className="flex items-center gap-2 text-ui"><input type="checkbox" defaultChecked />Email me about task updates</label>}
      </Card>
    </>
  )
}
