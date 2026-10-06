import { useRef, useState } from 'react'
import { Sparkles, Send } from 'lucide-react'
import { cn } from '@/utils/cn'

const initial = { todo: ['Write campaign brief', 'Landing copy pass'], doing: ['Build pricing page'], done: ['Design hero section'] }
function KanbanDemo() {
  const [cols, setCols] = useState(initial)
  const drag = useRef(null)
  const drop = (to) => {
    if (!drag.current) return
    const { from, task } = drag.current
    if (from === to) return
    setCols((c) => ({ ...c, [from]: c[from].filter((t) => t !== task), [to]: [...c[to], task] }))
  }
  return (
    <div className="grid grid-cols-3 gap-3">
      {Object.entries(cols).map(([k, list]) => (
        <div key={k} onDragOver={(e) => e.preventDefault()} onDrop={() => drop(k)} className="min-h-40 rounded-md bg-canvas p-2">
          <p className="eyebrow mb-2">{{ todo: 'To do', doing: 'In progress', done: 'Done' }[k]} · {list.length}</p>
          <div className="space-y-2">{list.map((t) => <div key={t} draggable onDragStart={() => (drag.current = { from: k, task: t })} className="cursor-grab rounded-md bg-surface p-2 text-caption shadow-hairline transition-shadow hover:shadow-ring">{t}</div>)}</div>
        </div>
      ))}
    </div>
  )
}

const ranges = { '7D': [30, 42, 38, 55, 50, 68, 72], '30D': [20, 35, 30, 48, 52, 60, 66], '90D': [15, 22, 40, 38, 55, 62, 80] }
function AnalyticsDemo() {
  const [r, setR] = useState('7D')
  const pts = ranges[r].map((v, i) => `${i * 50},${90 - v}`).join(' ')
  return (
    <div>
      <div className="mb-3 flex gap-1">{Object.keys(ranges).map((k) => <button key={k} onClick={() => setR(k)} className={cn('rounded-md px-2.5 py-1 font-mono text-eyebrow', r === k ? 'bg-surface-inverse text-fg-inverse' : 'text-fg-muted shadow-hairline')}>{k}</button>)}</div>
      <svg viewBox="0 0 300 100" className="h-40 w-full"><polyline key={r} pathLength="1" className="draw" fill="none" stroke="var(--primary)" strokeWidth="2" points={pts} /></svg>
      <p className="font-mono text-caption text-fg-subtle">Productivity · last {r}</p>
    </div>
  )
}

const events = { 4: 'Sprint planning', 9: 'Design review', 14: 'Pricing page due', 21: 'Launch checklist', 26: 'Quarterly review' }
function CalendarDemo() {
  const [sel, setSel] = useState(14)
  return (
    <div>
      <div className="grid grid-cols-7 gap-1">{Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
        <button key={d} onClick={() => setSel(d)} className={cn('relative h-9 rounded-md text-caption', sel === d ? 'bg-primary text-fg-inverse' : 'shadow-hairline text-fg-muted hover:text-fg')}>{d}{events[d] && <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-current" />}</button>))}</div>
      <p className="mt-3 text-ui">{events[sel] ? `Oct ${sel} — ${events[sel]}` : `Oct ${sel} — No events`}</p>
    </div>
  )
}

const answers = {
  'What should I focus on today?': 'You have 3 high-priority tasks due today. The most urgent is the Website Redesign milestone.',
  'Summarize my projects.': '5 projects: 3 active, 1 planning, 1 completed. Average progress is 58%.',
  'What tasks are overdue?': '2 tasks are overdue: "Fix checkout bug" and "Review invoice flow".',
  'What needs attention?': 'Website Redesign is 18% behind schedule. Mobile App Launch has 4 overdue tasks.',
}
export function AiDemo() {
  const [msgs, setMsgs] = useState([])
  const [typing, setTyping] = useState(false)
  const [text, setText] = useState('')
  const ask = (q) => {
    if (!q.trim() || typing) return
    setMsgs((m) => [...m, { u: true, t: q }]); setText(''); setTyping(true)
    setTimeout(() => { setMsgs((m) => [...m, { t: answers[q] || 'I can summarize projects, find overdue tasks and suggest priorities. Try a suggested prompt.' }]); setTyping(false) }, 900)
  }
  return (
    <div>
      <p className="eyebrow mb-2 flex items-center gap-1.5"><Sparkles size={12} className="text-primary" />AI Assistant — Preview</p>
      <div className="min-h-32 space-y-2 rounded-md bg-canvas p-3">
        {msgs.length === 0 && <p className="text-caption text-fg-subtle">Pick a prompt to see a simulated reply.</p>}
        {msgs.map((m, i) => <div key={i} className={cn('max-w-[88%] rounded-md px-3 py-2 text-caption', m.u ? 'ml-auto bg-primary text-fg-inverse' : 'bg-surface shadow-hairline')}>{m.t}</div>)}
        {typing && <p className="text-caption text-fg-subtle">Thinking…</p>}
      </div>
      <div className="my-2 flex flex-wrap gap-1.5">{Object.keys(answers).map((q) => <button key={q} onClick={() => ask(q)} className="rounded-full px-2.5 py-1 text-eyebrow text-fg-muted shadow-hairline hover:text-fg">{q}</button>)}</div>
      <form onSubmit={(e) => { e.preventDefault(); ask(text) }} className="flex gap-2"><input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask anything…" className="h-8 flex-1 rounded-md bg-canvas px-3 text-caption shadow-hairline outline-none" /><button aria-label="Send" className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-fg-inverse"><Send size={13} /></button></form>
    </div>
  )
}

const tabs = [
  ['Tasks', 'Drag tasks through your workflow.', KanbanDemo],
  ['Analytics', 'Understand performance through data.', AnalyticsDemo],
  ['Calendar', 'See everything on a single timeline.', CalendarDemo],
  ['AI Assistant', 'Ask questions and get workspace insights.', AiDemo],
]
export default function Showcase() {
  const [i, setI] = useState(0)
  const Demo = tabs[i][2]
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <h2 className="text-heading">Everything your team needs to stay aligned.</h2>
        <div className="mt-6 space-y-1" role="tablist">
          {tabs.map(([n, d], k) => (
            <button key={n} role="tab" aria-selected={i === k} onClick={() => setI(k)} className={cn('block w-full rounded-md px-4 py-3 text-left transition-colors', i === k ? 'bg-surface shadow-ring' : 'text-fg-muted hover:text-fg')}>
              <span className="text-body">{n}</span>{i === k && <span className="block text-ui text-fg-muted">{d}</span>}
            </button>))}
        </div>
      </div>
      <div className="rounded-md bg-surface p-5 shadow-ring"><div key={i} className="page"><Demo /></div></div>
    </div>
  )
}
