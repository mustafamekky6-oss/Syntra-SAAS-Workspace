import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, Badge, Avatar, Progress, PageHeader, Tabs, Empty } from '@/components/ui'
import TaskDrawer from '@/components/common/TaskDrawer'
import { useApp } from '@/context/AppContext'
import { users } from '@/data'

function health(p) {
  const days = Math.round((new Date(p.due) - new Date('2026-10-06')) / 864e5)
  if (p.progress >= 100) return 'Completed'
  if (days < 0) return 'Delayed'
  if (p.progress < 50 && days < 30) return 'At Risk'
  return 'Healthy'
}

export default function ProjectDetails() {
  const { id } = useParams()
  const { projects, tasks } = useApp()
  const [tab, setTab] = useState('Overview')
  const [sel, setSel] = useState(null)
  const p = projects.find((x) => x.id === Number(id))
  if (!p) return <Empty text="Project not found." />
  const pt = tasks.filter((t) => t.project === p.id)
  const team = [...new Set([p.owner, ...pt.map((t) => t.assignee)])].map((i) => users.find((u) => u.id === i))
  const milestones = [['Kickoff', 100], ['Design complete', Math.min(100, p.progress + 20)], ['Beta release', p.progress], ['Launch', Math.max(0, p.progress - 40)]]
  return (
    <>
      <Link to="/app/projects" className="mb-3 inline-block text-ui text-fg-subtle hover:text-fg">← Projects</Link>
      <PageHeader title={p.name} sub={`▲ ${p.status}`} action={<Badge>{health(p)}</Badge>} />
      <Tabs tabs={['Overview', 'Tasks', 'Team', 'Activity']} value={tab} onChange={setTab} />
      {tab === 'Overview' && (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2"><p className="eyebrow mb-3">Progress · {p.progress}%</p><Progress value={p.progress} />
            <p className="eyebrow mb-3 mt-6">Milestones</p>
            <ul className="space-y-3">{milestones.map(([m, v]) => <li key={m}><div className="mb-1 flex justify-between text-ui"><span>{m}</span><span className="font-mono text-caption text-fg-subtle">{v}%</span></div><Progress value={v} /></li>)}</ul></Card>
          <Card className="space-y-3 text-ui"><p className="eyebrow">Stats</p><p>Health: <b className="font-medium">{health(p)}</b></p><p>Due: <span className="font-mono">{p.due}</span></p><p>Tasks: {pt.length} ({pt.filter((t) => t.status === 'done').length} done)</p></Card>
        </div>
      )}
      {tab === 'Tasks' && (pt.length ? <Card className="p-0">{pt.map((t) => <button key={t.id} onClick={() => setSel(t.id)} className="flex w-full items-center justify-between border-b border-border p-3 text-left text-ui last:border-0 hover:bg-canvas">{t.title}<Badge>{t.status}</Badge></button>)}</Card> : <Empty text="Nothing on this project's list yet." />)}
      {tab === 'Team' && <div className="grid gap-4 md:grid-cols-3">{team.map((u) => <Card key={u.id} className="flex items-center gap-3"><Avatar name={u.name} size={36} /><div><p>{u.name}</p><p className="text-caption text-fg-subtle">{u.role}</p></div></Card>)}</div>}
      {tab === 'Activity' && <Card><ul className="space-y-3 text-ui text-fg-muted"><li>{users[p.owner - 1].name} updated progress to {p.progress}%</li><li>{pt.length} tasks are linked to this project</li><li>Project created</li></ul></Card>}
      <TaskDrawer id={sel} onClose={() => setSel(null)} />
    </>
  )
}
