import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLoading } from '@/hooks/useLoading'
import { Button, Card, Badge, Avatar, Progress, PageHeader, Modal, Input, Select, Tabs, Empty, Skeleton } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { users } from '@/data'

export default function Projects() {
  const { projects, addProject } = useApp()
  const loading = useLoading()
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', status: 'Planning', due: '2026-12-01', owner: 1 })
  const list = projects.filter((p) => filter === 'All' || p.status === filter)
  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    addProject({ ...form, owner: Number(form.owner) }); setOpen(false); setForm({ ...form, name: '' })
  }
  return (
    <>
      <PageHeader title="Projects" sub="▲ Workspace" action={<Button onClick={() => setOpen(true)}><Plus size={14} />New project</Button>} />
      <Tabs tabs={['All', 'Active', 'Planning', 'On hold', 'Completed']} value={filter} onChange={setFilter} />
      {loading ? <div className="grid gap-4 md:grid-cols-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-32" />)}</div> : list.length === 0 ? <Empty text="No projects in this status." /> : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <Link key={p.id} to={`/app/projects/${p.id}`}><Card className="h-full transition-shadow hover:shadow-hairline">
              <div className="mb-3 flex items-start justify-between"><h3 className="text-body">{p.name}</h3><Badge>{p.status}</Badge></div>
              <Progress value={p.progress} />
              <div className="mt-4 flex items-center justify-between text-caption text-fg-subtle"><Avatar name={users.find((u) => u.id === p.owner).name} /><span className="font-mono">Due {p.due}</span></div>
            </Card></Link>
          ))}
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)} title="Create project">
        <form onSubmit={submit} className="space-y-3">
          <Input placeholder="Project name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <div className="flex gap-2">
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>{['Planning', 'Active', 'On hold'].map((s) => <option key={s}>{s}</option>)}</Select>
            <Select value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })}>{users.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}</Select>
            <Input type="date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} />
          </div>
          <Button type="submit" className="w-full">Create</Button>
        </form>
      </Modal>
    </>
  )
}
