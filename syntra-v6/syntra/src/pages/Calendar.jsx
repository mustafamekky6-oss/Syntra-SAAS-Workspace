import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Button, PageHeader, Tabs, Modal, Input, Select } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { cn } from '@/utils/cn'

const pad = (n) => String(n).padStart(2, '0')
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x }
const TODAY = new Date(2026, 9, 6)
const cats = { Meeting: 'bg-primary text-fg-inverse', Task: 'bg-border text-fg', Milestone: 'bg-surface-inverse text-fg-inverse' }
const seed = [
  { id: 'e1', title: 'Sprint planning', date: '2026-10-07', time: '10:00', cat: 'Meeting' },
  { id: 'e2', title: 'Design review', date: '2026-10-09', time: '14:00', cat: 'Meeting' },
  { id: 'e3', title: 'Beta milestone', date: '2026-10-15', time: '', cat: 'Milestone' },
]
const blank = { title: '', date: iso(TODAY), time: '09:00', cat: 'Meeting' }

export default function Calendar() {
  const { tasks, toast } = useApp()
  const [view, setView] = useState('Month')
  const [cur, setCur] = useState(TODAY)
  const [events, setEvents] = useState(seed)
  const [form, setForm] = useState(null)

  const dayEvents = (d) => [
    ...events.filter((e) => e.date === iso(d)),
    ...tasks.filter((t) => t.due === iso(d)).map((t) => ({ id: 't' + t.id, title: t.title, cat: 'Task', time: '', readonly: true })),
  ].sort((a, b) => a.time.localeCompare(b.time))

  const move = (n) => setCur(view === 'Month' ? new Date(cur.getFullYear(), cur.getMonth() + n, 1) : addDays(cur, n * (view === 'Week' ? 7 : 1)))
  const save = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    if (form.id) { setEvents(events.map((x) => (x.id === form.id ? form : x))); toast('Event updated') }
    else { setEvents([...events, { ...form, id: 'e' + Date.now() }]); toast('Event created') }
    setForm(null)
  }
  const Chip = ({ e }) => (
    <button onClick={() => !e.readonly && setForm(e)} className={cn('block w-full truncate rounded-sm px-1.5 py-0.5 text-left text-eyebrow', cats[e.cat])}>{e.time && `${e.time} `}{e.title}</button>
  )
  const Cell = ({ d, dim }) => (
    <div className={cn('min-h-24 bg-surface p-1.5', dim && 'opacity-50')}>
      <span className={cn('inline-flex h-5 w-5 items-center justify-center rounded-full font-mono text-caption', iso(d) === iso(TODAY) ? 'bg-primary text-fg-inverse' : 'text-fg-subtle')}>{d.getDate()}</span>
      <div className="mt-1 space-y-1">{dayEvents(d).map((e) => <Chip key={e.id} e={e} />)}</div>
    </div>
  )

  const first = new Date(cur.getFullYear(), cur.getMonth(), 1)
  const monthDays = Array.from({ length: 42 }, (_, i) => addDays(first, i - first.getDay()))
  const weekStart = addDays(cur, -cur.getDay())
  const title = view === 'Month' ? cur.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : view === 'Week' ? `Week of ${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : cur.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <>
      <PageHeader title={title} sub="Calendar" action={<Button onClick={() => setForm({ ...blank, date: iso(cur) })}><Plus size={14} />New event</Button>} />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1">
          <Button variant="ghost" onClick={() => move(-1)} aria-label="Previous"><ChevronLeft size={14} /></Button>
          <Button variant="ghost" onClick={() => setCur(TODAY)}>Today</Button>
          <Button variant="ghost" onClick={() => move(1)} aria-label="Next"><ChevronRight size={14} /></Button>
        </div>
        <div className="flex gap-3">{Object.keys(cats).map((c) => <span key={c} className="flex items-center gap-1.5 text-caption text-fg-subtle"><i className={cn('h-2 w-2 rounded-full', cats[c].split(' ')[0])} />{c}</span>)}</div>
      </div>
      <Tabs tabs={['Month', 'Week', 'Day']} value={view} onChange={setView} />

      {view === 'Month' && (
        <div className="overflow-x-auto"><div className="grid min-w-[640px] grid-cols-7 gap-px overflow-hidden rounded-md bg-border shadow-hairline">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d} className="bg-canvas p-2 eyebrow">{d}</div>)}
          {monthDays.map((d) => <Cell key={iso(d)} d={d} dim={d.getMonth() !== cur.getMonth()} />)}
        </div></div>
      )}
      {view === 'Week' && (
        <div className="grid gap-px overflow-hidden rounded-md bg-border shadow-hairline sm:grid-cols-7">
          {Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)).map((d) => <Cell key={iso(d)} d={d} />)}
        </div>
      )}
      {view === 'Day' && (
        <div className="rounded-md bg-surface shadow-ring">
          {Array.from({ length: 11 }, (_, i) => i + 8).map((h) => (
            <div key={h} className="flex gap-3 border-b border-border p-2 last:border-0">
              <span className="w-12 font-mono text-caption text-fg-subtle">{pad(h)}:00</span>
              <div className="flex-1 space-y-1">{dayEvents(cur).filter((e) => e.time && Number(e.time.slice(0, 2)) === h).map((e) => <Chip key={e.id} e={e} />)}</div>
            </div>
          ))}
          <div className="flex gap-3 p-2"><span className="w-12 font-mono text-caption text-fg-subtle">All day</span><div className="flex-1 space-y-1">{dayEvents(cur).filter((e) => !e.time).map((e) => <Chip key={e.id} e={e} />)}</div></div>
        </div>
      )}

      <Modal open={!!form} onClose={() => setForm(null)} title={form?.id ? 'Edit event' : 'New event'}>
        {form && (
          <form onSubmit={save} className="space-y-3">
            <Input autoFocus placeholder="Event title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <div className="flex gap-2"><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /><Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></div>
            <Select className="w-full" value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })}>{['Meeting', 'Milestone'].map((c) => <option key={c}>{c}</option>)}</Select>
            <div className="flex gap-2"><Button type="submit" className="flex-1">Save</Button>{form.id && <Button type="button" variant="ghost" onClick={() => { setEvents(events.filter((x) => x.id !== form.id)); setForm(null); toast('Event deleted', 'info') }}>Delete</Button>}</div>
          </form>
        )}
      </Modal>
    </>
  )
}
