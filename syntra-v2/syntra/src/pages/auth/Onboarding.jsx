import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import { cn } from '@/utils/cn'

const uses = ['Personal Productivity', 'Team Management', 'Project Management', 'Business', 'Education', 'Other']
const goals = ['Organize projects', 'Improve productivity', 'Manage tasks', 'Collaborate', 'Track goals', 'Analyze performance']

function Choice({ items, value, onToggle }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((i) => (
        <button key={i} type="button" onClick={() => onToggle(i)} className={cn('flex items-center justify-between rounded-md px-3 py-3 text-left text-ui', value.includes(i) ? 'shadow-[0_0_0_2px_var(--primary)]' : 'shadow-hairline hover:shadow-ring')}>
          {i}{value.includes(i) && <Check size={14} className="text-primary" />}
        </button>
      ))}
    </div>
  )
}

export default function Onboarding() {
  const nav = useNavigate()
  const [step, setStep] = useState(0)
  const [use, setUse] = useState([])
  const [goal, setGoal] = useState([])
  const [ws, setWs] = useState({ name: '', url: '' })
  const [emails, setEmails] = useState([''])
  const toggle = (set, arr, v, single) => set(single ? [v] : arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const titles = ['Welcome to Syntra', 'What are you using Syntra for?', 'What are your main goals?', 'Create your workspace', 'Invite your team', "You're all set"]
  const valid = [true, use.length > 0, goal.length > 0, ws.name.trim().length > 1, true, true][step]
  const input = 'mt-1 h-9 w-full rounded-md bg-canvas px-3 text-ui shadow-hairline outline-none'

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <div className="mb-6 flex gap-1.5">{titles.map((_, i) => <div key={i} className={cn('h-1 flex-1 rounded-full', i <= step ? 'bg-primary' : 'bg-border')} />)}</div>
        <div className="rounded-md bg-surface p-6 shadow-ring">
          <p className="eyebrow mb-1">Step {step + 1} of {titles.length}</p>
          <h1 className="mb-5 text-heading">{titles[step]}</h1>
          {step === 0 && <p className="text-body text-fg-muted">Let's set up your workspace in a minute. Plan projects, organize work and see clearly where things stand.</p>}
          {step === 1 && <Choice items={uses} value={use} onToggle={(v) => toggle(setUse, use, v, true)} />}
          {step === 2 && <Choice items={goals} value={goal} onToggle={(v) => toggle(setGoal, goal, v)} />}
          {step === 3 && (
            <div className="space-y-3">
              <label className="block text-caption text-fg-muted">Workspace name<input className={input} value={ws.name} onChange={(e) => setWs({ name: e.target.value, url: slug(e.target.value) })} placeholder="Acme Studio" /></label>
              <label className="block text-caption text-fg-muted">Workspace URL<div className="mt-1 flex h-9 items-center rounded-md bg-canvas px-3 text-ui shadow-hairline"><span className="text-fg-subtle">syntra.io/</span><input className="flex-1 bg-transparent outline-none" value={ws.url} onChange={(e) => setWs({ ...ws, url: slug(e.target.value) })} /></div></label>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-2">
              {emails.map((m, i) => (
                <div key={i} className="flex gap-2"><input type="email" className={input + ' mt-0'} placeholder="teammate@company.com" value={m} onChange={(e) => setEmails(emails.map((x, k) => (k === i ? e.target.value : x)))} />
                  {emails.length > 1 && <button aria-label="Remove" onClick={() => setEmails(emails.filter((_, k) => k !== i))}><X size={16} /></button>}</div>
              ))}
              <button className="text-ui text-primary" onClick={() => setEmails([...emails, ''])}>+ Add another</button>
            </div>
          )}
          {step === 5 && <p className="text-body text-fg-muted">✓ <b className="font-medium text-fg">{ws.name || 'Your workspace'}</b> is ready{emails.filter(Boolean).length ? ` and ${emails.filter(Boolean).length} invite(s) were queued` : ''}.</p>}
          <div className="mt-6 flex justify-between">
            <button disabled={step === 0} onClick={() => setStep(step - 1)} className="text-ui text-fg-muted disabled:invisible">Back</button>
            {step < 5
              ? <button disabled={!valid} onClick={() => setStep(step + 1)} className="h-9 rounded-md bg-primary px-4 text-ui text-fg-inverse disabled:opacity-40">{step === 4 ? 'Finish setup' : 'Continue'}</button>
              : <button onClick={() => nav('/app/dashboard')} className="h-9 rounded-md bg-primary px-4 text-ui text-fg-inverse">Enter workspace</button>}
          </div>
        </div>
      </div>
    </main>
  )
}
