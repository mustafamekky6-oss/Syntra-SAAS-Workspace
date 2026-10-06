import { useEffect, useRef, useState } from 'react'
import { Sparkles, X, Maximize2, Minimize2, Trash2, Send } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { cn } from '@/utils/cn'

const prompts = ['Summarize my active projects.', 'What tasks are overdue?', 'Which projects need attention?', 'What are my priorities today?', 'Create a weekly plan.']

// Front-end simulation only: no real AI, responses are generated locally.
export default function AssistantDrawer({ open, onClose }) {
  const { tasks, projects } = useApp()
  const [msgs, setMsgs] = useState([])
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(false)
  const [wide, setWide] = useState(false)
  const end = useRef(null)
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, typing])

  const reply = (q) => {
    const s = q.toLowerCase()
    const overdue = tasks.filter((t) => t.status !== 'done' && t.due < '2026-10-06')
    if (s.includes('overdue')) return overdue.length ? `You have ${overdue.length} overdue task(s):\n` + overdue.map((t) => `• ${t.title} (due ${t.due})`).join('\n') : 'Nothing is overdue. Nice work!'
    if (s.includes('summar') || s.includes('active')) return `You have ${projects.filter((p) => p.status === 'Active').length} active projects:\n` + projects.filter((p) => p.status === 'Active').map((p) => `• ${p.name} — ${p.progress}% complete`).join('\n')
    if (s.includes('attention')) return '2 projects may need attention:\n• Website Redesign is 18% behind schedule.\n• Mobile App v2 has 4 tasks without an owner.'
    if (s.includes('priorit') || s.includes('today')) return 'Your top priorities today:\n1. Fix checkout bug (Review)\n2. Review invoice flow\n3. Build pricing page'
    if (s.includes('plan') || s.includes('week')) return 'Suggested weekly plan:\n• Mon–Tue: finish pricing page\n• Wed: user testing round 2\n• Thu: campaign brief\n• Fri: review and demo'
    return "I can summarize projects, list overdue tasks, or build a weekly plan. Try one of the suggestions below."
  }
  const send = (q) => {
    if (!q.trim() || typing) return
    setMsgs((m) => [...m, { role: 'user', text: q }]); setText(''); setTyping(true)
    setTimeout(() => { setMsgs((m) => [...m, { role: 'ai', text: reply(q) }]); setTyping(false) }, 900)
  }
  return (
    <aside className={cn('fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-surface shadow-ring transition-transform duration-200', wide ? 'md:w-[560px]' : 'md:w-[380px]', open ? 'translate-x-0' : 'translate-x-full')} aria-hidden={!open}>
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-fg-inverse"><Sparkles size={14} /></span>
        <span className="flex-1">Syntra Assistant</span>
        <button onClick={() => setMsgs([])} aria-label="Clear" className="text-fg-subtle hover:text-fg"><Trash2 size={15} /></button>
        <button onClick={() => setWide((w) => !w)} aria-label="Expand" className="hidden text-fg-subtle hover:text-fg md:block">{wide ? <Minimize2 size={15} /> : <Maximize2 size={15} />}</button>
        <button onClick={onClose} aria-label="Close" className="text-fg-subtle hover:text-fg"><X size={16} /></button>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {msgs.length === 0 && <p className="text-ui text-fg-muted">Hi! Ask me about your projects and tasks. This is a UI prototype with simulated replies.</p>}
        {msgs.map((m, i) => (
          <div key={i} className={cn('max-w-[85%] whitespace-pre-line rounded-md px-3 py-2 text-ui', m.role === 'user' ? 'ml-auto bg-primary text-fg-inverse' : 'bg-canvas text-fg')}>{m.text}</div>
        ))}
        {typing && <div className="flex w-14 gap-1 rounded-md bg-canvas px-3 py-3">{[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 animate-pulse rounded-full bg-fg-subtle" style={{ animationDelay: `${i * 150}ms` }} />)}</div>}
        <div ref={end} />
      </div>
      <div className="space-y-2 border-t border-border p-3">
        <div className="flex flex-wrap gap-1.5">{prompts.map((p) => <button key={p} onClick={() => send(p)} className="rounded-full px-2.5 py-1 text-caption text-fg-muted shadow-hairline hover:text-fg">{p}</button>)}</div>
        <form onSubmit={(e) => { e.preventDefault(); send(text) }} className="flex gap-2">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask anything…" className="h-9 flex-1 rounded-md bg-canvas px-3 text-ui shadow-hairline outline-none" />
          <button type="submit" aria-label="Send" className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-fg-inverse"><Send size={15} /></button>
        </form>
      </div>
    </aside>
  )
}
