import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, X, Plus, Shield, Lock, KeyRound, Users, Sun, Moon } from 'lucide-react'
import { Reveal, Counter } from '@/components/common/Reveal'
import { useApp } from '@/context/AppContext'
import { cn } from '@/utils/cn'

export function Trust() {
  return (
    <section className="mx-auto max-w-page px-6 py-12 text-center md:px-12">
      <p className="text-ui text-fg-subtle">Trusted by modern teams to organize work and move faster.</p>
      <div className="mt-5 flex flex-wrap justify-center gap-x-10 gap-y-3 font-mono text-ui uppercase tracking-eyebrow text-fg-faint">{['Northwind', 'Lumen Labs', 'Quanta', 'Atlas Co', 'Helix'].map((n) => <span key={n}>{n}</span>)}</div>
      <p className="mt-3 text-eyebrow text-fg-faint">Fictional demo brands for illustration.</p>
    </section>
  )
}

export function ProblemSolution() {
  const before = ['Too many tools', 'Scattered tasks', 'Missed deadlines', 'Poor visibility', 'Information everywhere']
  const after = ['One workspace', 'Clear priorities', 'Connected projects', 'Real-time visibility', 'Better decisions']
  return (
    <section className="mx-auto max-w-page px-6 py-20 md:px-12">
      <Reveal className="grid gap-4 md:grid-cols-2">
        {[['Before Syntra', before, X, false], ['With Syntra', after, Check, true]].map(([t, items, Icon, good]) => (
          <div key={t} className={cn('rounded-md bg-surface p-6', good ? 'shadow-[0_0_0_2px_var(--primary)]' : 'shadow-ring')}>
            <p className="eyebrow mb-4">{t}</p>
            <ul className="space-y-3">{items.map((i) => <li key={i} className="flex items-center gap-2 text-body"><Icon size={16} className={good ? 'text-primary' : 'text-fg-faint'} />{i}</li>)}</ul>
          </div>))}
      </Reveal>
    </section>
  )
}

export function Productivity() {
  const stats = [[1284, '', 'Tasks completed', 0], [94, '%', 'Completion rate', 0], [27, '', 'Active projects', 0], [18, '%', 'Productivity', 0, '+']]
  return (
    <section className="mx-auto max-w-page px-6 py-20 md:px-12">
      <Reveal><p className="eyebrow mb-3">Productivity</p><h2 className="text-heading">Know how your work is going.</h2></Reveal>
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(([n, s, l, d, p], i) => (
          <Reveal key={l} delay={i * 80}><div className="rounded-md bg-surface p-5 shadow-ring"><p className="text-heading-lg"><Counter to={n} suffix={s} prefix={p} /></p><p className="mt-1 text-ui text-fg-muted">{l}</p></div></Reveal>))}
      </div>
    </section>
  )
}

const feed = ['Sarah completed Landing Page Design.', 'Ahmed moved API Integration to Review.', 'Omar joined Mobile App Launch.', 'Layla commented on Q4 Campaign.']
export function Collaboration() {
  return (
    <section className="mx-auto max-w-page px-6 py-20 md:px-12">
      <Reveal className="grid items-center gap-10 lg:grid-cols-2">
        <div><p className="eyebrow mb-3">Collaboration</p><h2 className="text-heading">Know who is working on what.</h2>
          <p className="mt-3 text-body text-fg-muted">Assignments, comments and activity keep everyone aligned without another meeting.</p></div>
        <div className="rounded-md bg-surface p-5 shadow-ring">
          <div className="mb-4 flex -space-x-2">{['SH', 'AK', 'OK', 'LS', 'NA'].map((a) => <span key={a} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-surface-inverse font-mono text-eyebrow text-fg-inverse">{a}</span>)}</div>
          <ul className="space-y-3 text-ui">{feed.map((f, i) => <li key={f} style={{ transitionDelay: `${i * 120}ms` }} className="flex gap-2 text-fg-muted"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{f}</li>)}</ul>
        </div>
      </Reveal>
    </section>
  )
}

export function Security() {
  const items = [[Shield, 'Secure workspace'], [Lock, 'Privacy controls'], [KeyRound, 'Role-based access'], [Users, 'Workspace permissions']]
  return (
    <section className="mx-auto max-w-page px-6 py-20 md:px-12"><Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(([Icon, t]) => <div key={t} className="flex items-center gap-3 rounded-md bg-surface p-4 shadow-hairline"><Icon size={18} className="text-primary" /><span className="text-ui">{t}</span></div>)}
    </Reveal></section>
  )
}

const plans = [
  ['Free', 0, 'For individuals', ['3 projects', 'Kanban & list', 'Basic analytics']],
  ['Pro', 9, 'For professionals', ['Unlimited projects', 'Calendar & goals', 'AI Assistant preview'], true],
  ['Team', 15, 'For growing teams', ['Team workload', 'Roles & permissions', 'Advanced analytics']],
  ['Enterprise', 'Custom', 'For organizations', ['SSO (concept)', 'Audit log', 'Priority support']],
]
const compare = [['Projects', '3', 'Unlimited', 'Unlimited', 'Unlimited'], ['Kanban & list views', true, true, true, true], ['Calendar & goals', false, true, true, true], ['Advanced analytics', false, false, true, true], ['Roles & permissions', false, false, true, true], ['AI Assistant (preview)', false, true, true, true], ['Priority support', false, false, false, true]]
export function Pricing() {
  const [yearly, setYearly] = useState(true)
  return (
    <section id="pricing" className="mx-auto max-w-page px-6 py-20 md:px-12">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div><p className="eyebrow mb-3">Pricing</p><h2 className="text-heading">Simple plans that scale with you.</h2></div>
        <div className="flex rounded-md p-0.5 shadow-hairline">{[['Monthly', false], ['Yearly −20%', true]].map(([l, v]) => <button key={l} onClick={() => setYearly(v)} className={cn('rounded-md px-3 py-1.5 text-ui', yearly === v ? 'bg-surface-inverse text-fg-inverse' : 'text-fg-muted')}>{l}</button>)}</div>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map(([n, p, s, items, hot]) => (
          <div key={n} className={cn('relative rounded-md bg-surface p-6 transition-transform hover:-translate-y-0.5', hot ? 'shadow-[0_0_0_2px_var(--primary)]' : 'shadow-ring')}>
            {hot && <span className="absolute right-4 top-4 rounded-sm bg-primary px-1.5 py-0.5 font-mono text-eyebrow uppercase text-fg-inverse">Popular</span>}
            <p className="eyebrow">{n}</p>
            <p className="mt-3 text-heading">{typeof p === 'number' ? `$${yearly ? Math.round(p * 0.8) : p}` : p}</p><p className="text-caption text-fg-subtle">{s}</p>
            <ul className="mt-5 space-y-2 text-ui text-fg-muted">{items.map((i) => <li key={i} className="flex gap-2"><Check size={14} className="mt-1 text-primary" />{i}</li>)}</ul>
            <Link to="/signup" className="mt-6 flex h-9 items-center justify-center rounded-md bg-surface-inverse text-ui text-fg-inverse hover:opacity-90">{n === 'Enterprise' ? 'Contact sales' : 'Get started'}</Link>
          </div>))}
      </div>
      <Reveal className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-ui">
          <thead><tr><th className="eyebrow p-3">Compare</th>{plans.map(([n]) => <th key={n} className="eyebrow p-3">{n}</th>)}</tr></thead>
          <tbody>{compare.map(([f, ...v]) => <tr key={f} className="border-t border-border"><td className="p-3">{f}</td>{v.map((x, i) => <td key={i} className="p-3 text-fg-muted">{x === true ? <Check size={14} className="text-primary" /> : x === false ? '—' : x}</td>)}</tr>)}</tbody>
        </table>
      </Reveal>
    </section>
  )
}

const faqs = [
  ['What is Syntra?', 'A workspace for projects, tasks, calendar, goals, documents and analytics, in one place.'],
  ['Who is Syntra for?', 'Individuals and teams who want clearer priorities and visibility.'],
  ['Can I manage multiple projects?', 'Yes. Track progress, deadlines and members across all projects.'],
  ['Does Syntra include analytics?', 'Yes. Productivity, completion and workload views are built in.'],
  ['Can I use Syntra with a team?', 'Yes. Invite members, assign tasks and follow activity.'],
  ['How does the AI Assistant work?', 'It is currently a front-end prototype with simulated, workspace-aware replies.'],
  ['Is Syntra available on mobile?', 'The interface is fully responsive, with a mobile drawer navigation.'],
  ['Can I customize my workspace?', 'You can switch themes and set preferences in Settings.'],
]
export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 md:px-12">
      <Reveal><h2 className="mb-8 text-heading">Frequently asked questions</h2>
        {faqs.map(([q, a], i) => (
          <div key={q} className="border-b border-border">
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between py-4 text-left text-body">{q}<Plus size={16} className={cn('transition-transform', open === i && 'rotate-45')} /></button>
            <div className={cn('acc', open === i && 'open')}><div className="overflow-hidden"><p className="pb-4 text-ui text-fg-muted">{a}</p></div></div>
          </div>))}
      </Reveal>
    </section>
  )
}

export function FinalCta() {
  return (
    <section className="mx-auto max-w-page px-6 pb-24 md:px-12">
      <Reveal><div className="relative overflow-hidden rounded-md bg-surface-inverse px-6 py-20 text-center text-fg-inverse">
        <h2 className="text-heading-lg">Bring your work into focus.</h2>
        <p className="mx-auto mt-3 max-w-md text-body opacity-70">One workspace for projects, people, tasks, and progress.</p>
        <Link to="/signup" className="mt-8 inline-flex h-10 items-center rounded-md bg-surface px-5 text-ui text-fg">Get started</Link>
      </div></Reveal>
    </section>
  )
}

const cols = { Product: ['Features', 'Analytics', 'AI Assistant', 'Integrations', 'Pricing'], Company: ['About', 'Careers', 'Blog', 'Contact'], Resources: ['Documentation', 'Help Center', 'Guides', 'Community'], Legal: ['Privacy', 'Terms', 'Security'] }
export function Footer() {
  const { theme, setTheme } = useApp()
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-page gap-8 px-6 py-12 md:grid-cols-5 md:px-12">
        <div><p className="flex items-center gap-2 font-medium"><span className="text-primary">▲</span>Syntra</p><p className="mt-2 text-caption text-fg-subtle">One workspace. Total clarity.</p></div>
        {Object.entries(cols).map(([h, l]) => <div key={h}><p className="eyebrow mb-3">{h}</p><ul className="space-y-2 text-ui text-fg-muted">{l.map((i) => <li key={i}><a href="#top" className="hover:text-fg">{i}</a></li>)}</ul></div>)}
      </div>
      <div className="mx-auto flex max-w-page items-center justify-between px-6 pb-8 text-caption text-fg-subtle md:px-12">
        <span>© 2026 Syntra · A front-end portfolio project</span>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme" className="flex h-8 w-8 items-center justify-center rounded-md shadow-hairline hover:text-fg">{theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}</button>
      </div>
    </footer>
  )
}
