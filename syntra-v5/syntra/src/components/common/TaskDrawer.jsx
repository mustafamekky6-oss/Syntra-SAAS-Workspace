import { useState } from 'react'
import { Drawer, Input, Select, Button, Badge } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { users } from '@/data'

const label = 'eyebrow mb-1 block text-fg-subtle'

export default function TaskDrawer({ id, onClose }) {
  const { tasks, projects, updateTask, toast } = useApp()
  const [sub, setSub] = useState('')
  const [com, setCom] = useState('')
  const t = tasks.find((x) => x.id === id)
  const subs = t?.subtasks || []
  const comments = t?.comments || []
  const set = (patch) => updateTask(t.id, patch)
  return (
    <Drawer open={!!t} onClose={onClose} title="Task details">
      {t && (
        <>
          <input value={t.title} onChange={(e) => set({ title: e.target.value })} className="w-full bg-transparent text-heading outline-none" aria-label="Title" />
          <textarea value={t.description || ''} onChange={(e) => set({ description: e.target.value })} placeholder="Add a description…" rows={3} className="w-full rounded-md bg-canvas p-3 text-ui shadow-hairline outline-none" />
          <div className="grid grid-cols-2 gap-3">
            <label><span className={label}>Status</span><Select className="w-full" value={t.status} onChange={(e) => { set({ status: e.target.value }); toast('Status updated', 'info') }}>{[['todo', 'To do'], ['doing', 'In progress'], ['review', 'Review'], ['done', 'Done']].map(([k, l]) => <option key={k} value={k}>{l}</option>)}</Select></label>
            <label><span className={label}>Priority</span><Select className="w-full" value={t.priority} onChange={(e) => set({ priority: e.target.value })}>{['High', 'Medium', 'Low'].map((p) => <option key={p}>{p}</option>)}</Select></label>
            <label><span className={label}>Assignee</span><Select className="w-full" value={t.assignee} onChange={(e) => set({ assignee: Number(e.target.value) })}>{users.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}</Select></label>
            <label><span className={label}>Due date</span><Input type="date" value={t.due} onChange={(e) => set({ due: e.target.value })} /></label>
          </div>
          <p className="text-caption text-fg-subtle">Project: {projects.find((p) => p.id === t.project)?.name || '—'}</p>

          <div>
            <p className={label}>Subtasks · {subs.filter((s) => s.done).length}/{subs.length}</p>
            <ul className="space-y-1.5">{subs.map((s, i) => (
              <li key={i}><label className="flex items-center gap-2 text-ui"><input type="checkbox" checked={s.done} onChange={() => set({ subtasks: subs.map((x, k) => (k === i ? { ...x, done: !x.done } : x)) })} /><span className={s.done ? 'text-fg-subtle line-through' : ''}>{s.title}</span></label></li>))}</ul>
            <form className="mt-2 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (!sub.trim()) return; set({ subtasks: [...subs, { title: sub, done: false }] }); setSub('') }}>
              <Input placeholder="Add subtask" value={sub} onChange={(e) => setSub(e.target.value)} /><Button type="submit" variant="ghost">Add</Button></form>
          </div>

          <div>
            <p className={label}>Comments</p>
            <ul className="space-y-2">{comments.map((c, i) => <li key={i} className="rounded-md bg-canvas p-2 text-ui"><Badge className="mr-2">You</Badge>{c}</li>)}</ul>
            <form className="mt-2 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (!com.trim()) return; set({ comments: [...comments, com] }); setCom(''); toast('Comment added') }}>
              <Input placeholder="Write a comment" value={com} onChange={(e) => setCom(e.target.value)} /><Button type="submit">Post</Button></form>
          </div>
        </>
      )}
    </Drawer>
  )
}
