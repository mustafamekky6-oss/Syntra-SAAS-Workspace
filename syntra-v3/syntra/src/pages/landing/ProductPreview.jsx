import { Sparkles } from 'lucide-react'

const kpis = [['Active projects', '12'], ['Open tasks', '48'], ['Productivity', '87%']]
const bars = [['Website Redesign', 72], ['Mobile App Launch', 45], ['Marketing Campaign', 88]]

// Static, decorative mock of the Syntra workspace (not the real app).
export default function ProductPreview() {
  return (
    <div className="overflow-hidden rounded-md bg-surface shadow-ring" aria-hidden="true">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        {[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-border" />)}
        <span className="ml-3 font-mono text-eyebrow text-fg-subtle">app.syntra.io/dashboard</span>
      </div>
      <div className="grid md:grid-cols-[170px_1fr]">
        <div className="hidden space-y-2 border-r border-border bg-canvas p-3 md:block">
          {['Overview', 'Projects', 'Tasks', 'Calendar', 'Analytics', 'Team'].map((l, i) => (
            <div key={l} className={`rounded-md px-2 py-1.5 text-caption ${i === 0 ? 'bg-surface text-fg shadow-hairline' : 'text-fg-subtle'}`}>{l}</div>
          ))}
        </div>
        <div className="space-y-3 p-4">
          <div className="grid grid-cols-3 gap-3">
            {kpis.map(([l, v], i) => <div key={l} style={{ animationDelay: `${400 + i * 150}ms` }} className="rise rounded-md p-3 shadow-hairline"><p className="eyebrow text-fg-subtle">{l}</p><p className="mt-1 text-heading">{v}</p></div>)}
          </div>
          <div className="grid gap-3 md:grid-cols-5">
            <div className="rounded-md p-3 shadow-hairline md:col-span-3">
              <p className="eyebrow mb-2">Productivity trend</p>
              <svg viewBox="0 0 300 80" className="h-24 w-full">
                <polyline pathLength="1" className="draw" fill="none" stroke="var(--primary)" strokeWidth="2" points="0,60 40,52 80,56 120,38 160,42 200,24 240,28 300,10" />
                <polyline fill="none" stroke="var(--border)" strokeWidth="1" points="0,78 300,78" />
              </svg>
            </div>
            <div className="space-y-3 rounded-md p-3 shadow-hairline md:col-span-2">
              <p className="eyebrow">Project progress</p>
              {bars.map(([n, v]) => (
                <div key={n}><div className="mb-1 flex justify-between text-eyebrow text-fg-muted"><span>{n}</span><span>{v}%</span></div>
                  <div className="h-1.5 rounded-full bg-border"><div className="grow h-full rounded-full bg-primary" style={{ width: `${v}%` }} /></div></div>
              ))}
            </div>
          </div>
          <div style={{ animationDelay: '2.2s' }} className="rise flex items-start gap-2 rounded-md bg-canvas p-3 text-caption text-fg-muted">
            <Sparkles size={14} className="mt-0.5 shrink-0 text-primary" />
            <span>2 projects may need attention: Website Redesign is 18% behind schedule.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
