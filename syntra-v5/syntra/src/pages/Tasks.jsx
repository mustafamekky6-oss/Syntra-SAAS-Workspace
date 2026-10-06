import { useState } from 'react'
import { Button, Card, Badge, Avatar, PageHeader, Input, Select, Modal, Skeleton } from '@/components/ui'
import { useLoading } from '@/hooks/useLoading'
import { Plus } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { users } from '@/data'
import TaskDrawer from '@/components/common/TaskDrawer'

const cols = [['todo', 'To do'], ['doing', 'In progress'], ['review', 'Review'], ['done', 'Done']]

export default function Tasks() {
  const { tasks, moveTask, addTask } = useApp()
  const [q, setQ] = useState('')
  const [prio, setPrio] = useState('All')
  const [open, setOpen] = useState(false)
  const [sel, setSel] = useState(null)
  const loading = useLoading()
  const [title, setTitle] = useState('')
  const shown = tasks.filter((t) => t.title.toLowerCase().includes(q.toLowerCase()) && (prio === 'All' || t.priority === prio))
  if (loading) return <><PageHeader title="Tasks" sub="▲ Kanban" /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-64" />)}</div></>
  return (
    <>
      <PageHeader title="Tasks" sub="▲ Kanban" action={<Button onClick={() => setOpen(true)}><Plus size={14} />New task</Button>} />
      <div className="mb-4 flex gap-2">
        <Input className="max-w-xs" placeholder="Filter tasks…" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={prio} onChange={(e) => setPrio(e.target.value)}>{['All', 'High', 'Medium', 'Low'].map((p) => <option key={p}>{p}</option>)}</Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cols.map(([key, label]) => (
          <div key={key} onDragOver={(e) => e.preventDefault()} onDrop={(e) => moveTask(Number(e.dataTransfer.getData('id')), key)} className="min-h-40 rounded-md bg-border/40 p-2">
            <p className="eyebrow mb-2 px-1">{label} · {shown.filter((t) => t.status === key).length}</p>
            <div className="space-y-2">
              {shown.filter((t) => t.status === key).map((t) => (
                <Card key={t.id} draggable onDragStart={(e) => e.dataTransfer.setData('id', String(t.id))} onClick={() => setSel(t.id)} className="cursor-grab p-3 transition-shadow hover:shadow-hairline">
                  <p className="text-ui">{t.title}</p>
                  <div className="mt-3 flex items-center justify-between"><Badge>{t.priority}</Badge><Avatar size={22} name={users.find((u) => u.id === t.assignee).name} /></div>
                  <Select onClick={(e) => e.stopPropagation()} className="mt-2 w-full text-caption" value={t.status} onChange={(e) => moveTask(t.id, e.target.value)}>{cols.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</Select>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
      <TaskDrawer id={sel} onClose={() => setSel(null)} />
      <Modal open={open} onClose={() => setOpen(false)} title="New task">
        <form onSubmit={(e) => { e.preventDefault(); if (!title.trim()) return; addTask({ title, priority: 'Medium', assignee: 1, project: 1, due: '2026-10-30' }); setTitle(''); setOpen(false) }} className="space-y-3">
          <Input autoFocus placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} /><Button type="submit" className="w-full">Add task</Button>
        </form>
      </Modal>
    </>
  )
}
