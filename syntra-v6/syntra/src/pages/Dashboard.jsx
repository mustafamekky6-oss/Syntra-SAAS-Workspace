import { useLoading } from '@/hooks/useLoading'
import { Card, Badge, Progress, PageHeader, Skeleton } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { activity } from '@/data'

export default function Dashboard() {
  const { tasks, projects } = useApp()
  const loading = useLoading()
  if (loading) return <><PageHeader title="Dashboard" sub="Overview" /><div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-24" />)}</div><Skeleton className="mt-4 h-64" /></>
  const done = tasks.filter((t) => t.status === 'done').length
  const kpis = [['Active projects', projects.filter((p) => p.status === 'Active').length], ['Open tasks', tasks.length - done], ['Completed', done], ['Team members', 5]]
  return (
    <>
      <PageHeader title="Dashboard" sub="Overview" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map(([l, v]) => <Card key={l}><p className="eyebrow text-fg-subtle">{l}</p><p className="mt-2 text-heading">{v}</p></Card>)}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2"><p className="eyebrow mb-4">Project progress</p>
          <div className="space-y-4">{projects.map((p) => (
            <div key={p.id}><div className="mb-1 flex justify-between text-ui"><span>{p.name}</span><span className="font-mono text-caption text-fg-subtle">{p.progress}%</span></div><Progress value={p.progress} /></div>))}</div></Card>
        <Card><p className="eyebrow mb-4">Recent activity</p>
          <ul className="space-y-3 text-ui text-fg-muted">{activity.map((a) => <li key={a}>{a}</li>)}</ul></Card>
      </div>
    </>
  )
}
