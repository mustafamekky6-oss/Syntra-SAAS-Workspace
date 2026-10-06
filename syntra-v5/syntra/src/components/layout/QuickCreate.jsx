import { useEffect, useState } from 'react'
import { Plus, FolderKanban, CheckSquare, Target } from 'lucide-react'
import { Modal, Input, Button } from '@/components/ui'
import { useApp } from '@/context/AppContext'

const kinds = { project: ['Project', FolderKanban], task: ['Task', CheckSquare], goal: ['Goal', Target] }

export default function QuickCreate() {
  const { addProject, addTask, addGoal } = useApp()
  const [menu, setMenu] = useState(false)
  const [kind, setKind] = useState(null)
  const [title, setTitle] = useState('')
  useEffect(() => {
    const h = (e) => {
      const tag = e.target.tagName
      if (e.key.toLowerCase() === 'c' && !e.metaKey && !e.ctrlKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) setMenu((m) => !m)
      if (e.key === 'Escape') setMenu(false)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])
  const submit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    if (kind === 'project') addProject({ name: title, status: 'Planning', due: '2026-12-01', owner: 1 })
    if (kind === 'task') addTask({ title, priority: 'Medium', assignee: 1, project: 1, due: '2026-10-30' })
    if (kind === 'goal') addGoal(title)
    setTitle(''); setKind(null)
  }
  return (
    <div className="relative">
      <button onClick={() => setMenu((m) => !m)} aria-haspopup="menu" aria-expanded={menu} className="flex h-8 items-center gap-1.5 rounded-md bg-primary px-2.5 text-ui text-fg-inverse"><Plus size={14} />Create<kbd className="hidden font-mono text-eyebrow opacity-70 sm:inline">C</kbd></button>
      {menu && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setMenu(false)} />
          <ul role="menu" className="page absolute right-0 top-10 z-40 w-44 rounded-md bg-surface p-1 shadow-ring">
            {Object.entries(kinds).map(([k, [l, Icon]]) => <li key={k}><button role="menuitem" onClick={() => { setKind(k); setMenu(false) }} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-ui hover:bg-canvas"><Icon size={14} />New {l.toLowerCase()}</button></li>)}
          </ul>
        </>
      )}
      <Modal open={!!kind} onClose={() => setKind(null)} title={kind ? `New ${kinds[kind][0].toLowerCase()}` : ''}>
        <form onSubmit={submit} className="space-y-3"><Input autoFocus placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><Button type="submit" className="w-full">Create</Button></form>
      </Modal>
    </div>
  )
}
