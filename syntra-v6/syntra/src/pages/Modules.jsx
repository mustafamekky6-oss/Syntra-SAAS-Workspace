import { useState } from 'react'
import { Button, Card, Badge, Avatar, Progress, PageHeader, Input, Select, Tabs, Skeleton } from '@/components/ui'
import { useLoading } from '@/hooks/useLoading'
import { useApp } from '@/context/AppContext'
import { users, documents, activity } from '@/data'
import { cn } from '@/utils/cn'

export function Analytics() {
  const { tasks, projects } = useApp()
  const counts = ['todo', 'doing', 'review', 'done'].map((s) => [s, tasks.filter((t) => t.status === s).length])
  const max = Math.max(...counts.map((c) => c[1]), 1)
  return (
    <>
      <PageHeader title="Analytics" sub="Insights" />
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

export function Team() {
  const loading = useLoading()
  if (loading) return <><PageHeader title="Team" sub="People" /><div className="grid gap-4 md:grid-cols-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-20" />)}</div></>
  return (
    <>
      <PageHeader title="Team" sub="People" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{users.map((u) => (
        <Card key={u.id} className="flex items-center gap-3"><Avatar name={u.name} size={40} /><div><p>{u.name}</p><p className="text-caption text-fg-subtle">{u.role}</p></div></Card>))}</div>
    </>
  )
}

export function Goals() {
  const { goals, bumpGoal, toast } = useApp()
  return (
    <>
      <PageHeader title="Goals" sub="Objectives" />
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
      <PageHeader title="Notifications" sub="Inbox" action={<Button variant="ghost" onClick={readAll}>Mark all read</Button>} />
      <div className="space-y-2">{notifications.map((n) => (
        <Card key={n.id} onClick={() => toggleRead(n.id)} className={cn('flex cursor-pointer justify-between p-3', n.read && 'opacity-60')}>
          <span className="text-ui">{!n.read && '● '}{n.text}</span><span className="text-caption text-fg-subtle">{n.time}</span></Card>))}</div>
    </>
  )
}

export function ActivityPage() {
  return (
    <>
      <PageHeader title="Activity" sub="Timeline" />
      <Card><ul className="space-y-3 text-ui">{activity.map((a, i) => <li key={a} className="flex justify-between"><span>{a}</span><span className="text-caption text-fg-subtle">{i + 1}h ago</span></li>)}</ul></Card>
    </>
  )
}

export function Settings() {
  const { toast, theme, setTheme } = useApp()
  const [tab, setTab] = useState('Account')
  const [name, setName] = useState('Mustafa Ali')
  return (
    <>
      <PageHeader title="Settings" sub="Preferences" />
      <Tabs tabs={['Account', 'Appearance', 'Notifications']} value={tab} onChange={setTab} />
      <Card className="max-w-lg space-y-3">
        {tab === 'Account' && <><Input value={name} onChange={(e) => setName(e.target.value)} /><Button onClick={() => toast('Settings saved')}>Save changes</Button></>}
        {tab === 'Appearance' && <div className="flex gap-2">{['light', 'dark'].map((t) => <Button key={t} variant={theme === t ? 'primary' : 'ghost'} onClick={() => setTheme(t)} className="capitalize">{t}</Button>)}</div>}
        {tab === 'Notifications' && <label className="flex items-center gap-2 text-ui"><input type="checkbox" defaultChecked />Email me about task updates</label>}
      </Card>
    </>
  )
}
