import { Card, Avatar, Progress, PageHeader } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { activity } from '@/data'

export default function Profile() {
  const { tasks, projects } = useApp()
  const mine = tasks.filter((t) => t.assignee === 1)
  const stats = [['Tasks assigned', mine.length], ['Completed', mine.filter((t) => t.status === 'done').length], ['Projects', projects.length]]
  return (
    <>
      <PageHeader title="Profile" sub="You" />
      <Card className="mb-4 flex items-center gap-4"><Avatar name="Mustafa Ali" size={56} /><div><p className="text-body">Mustafa Ali</p><p className="text-ui text-fg-subtle">Product Lead · mustafa@syntra.io</p><p className="mt-1 text-ui text-fg-muted">Building clear, focused workspaces for modern teams.</p></div></Card>
      <div className="grid gap-4 md:grid-cols-3">{stats.map(([l, v]) => <Card key={l}><p className="eyebrow text-fg-subtle">{l}</p><p className="mt-2 text-heading">{v}</p></Card>)}</div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card><p className="eyebrow mb-3">Projects</p><div className="space-y-3">{projects.slice(0, 4).map((p) => <div key={p.id}><p className="mb-1 text-ui">{p.name}</p><Progress value={p.progress} /></div>)}</div></Card>
        <Card><p className="eyebrow mb-3">Recent activity</p><ul className="space-y-2 text-ui text-fg-muted">{activity.map((a) => <li key={a}>{a}</li>)}</ul></Card>
      </div>
    </>
  )
}
