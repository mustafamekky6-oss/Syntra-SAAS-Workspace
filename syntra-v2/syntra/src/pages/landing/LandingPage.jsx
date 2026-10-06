import { Link } from 'react-router-dom'
import { FolderKanban, CheckSquare, Users, BarChart3, CalendarDays, FileText, Target, Sparkles, Check } from 'lucide-react'
import LandingNav from './LandingNav'
import ProductPreview from './ProductPreview'

const features = [
  [FolderKanban, 'Project management', 'Organize projects, milestones and deadlines in one place.'],
  [CheckSquare, 'Task management', 'Plan work in list and Kanban views with clear ownership.'],
  [Users, 'Team collaboration', 'See assignments, workload and activity across your team.'],
  [BarChart3, 'Analytics', 'Understand productivity and project performance at a glance.'],
  [CalendarDays, 'Calendar', 'Keep deadlines, meetings and milestones on one timeline.'],
  [FileText, 'Documents', 'Keep project files and documents organized and searchable.'],
  [Target, 'Goals', 'Track personal and team objectives with visible progress.'],
  [Sparkles, 'AI Assistant', 'A prototype assistant experience for summaries and planning.'],
]
const plans = [
  ['Free', '$0', 'For individuals getting started', ['3 projects', 'Kanban & list views', 'Basic analytics']],
  ['Team', '$12', 'per member / month', ['Unlimited projects', 'Calendar & goals', 'Team workload insights'], true],
  ['Business', '$24', 'per member / month', ['Advanced analytics', 'Workspace controls', 'Priority support']],
]

export default function LandingPage() {
  return (
    <div>
      <LandingNav />
      <section className="mx-auto max-w-page px-6 pb-12 pt-16 text-center md:px-12 md:pt-24">
        <p className="eyebrow rise mb-4">▲ The workspace for modern teams</p>
        <h1 className="rise rise-2 mx-auto max-w-4xl text-heading-lg md:text-display">One workspace. Total clarity.</h1>
        <p className="rise rise-2 mx-auto mt-6 max-w-2xl text-body text-fg-muted">
          Plan projects, organize work, collaborate with your team, track progress, and make better decisions — all from one intelligent workspace.
        </p>
        <div className="rise rise-3 mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/signup" className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-ui text-fg-inverse hover:opacity-90">Get started</Link>
          <Link to="/app/dashboard" className="inline-flex h-10 items-center rounded-md bg-surface px-5 text-ui shadow-hairline hover:shadow-ring">Explore demo</Link>
        </div>
      </section>

      <section id="product" className="mx-auto max-w-5xl px-6 pb-24 md:px-12"><div className="rise rise-3"><ProductPreview /></div></section>

      <section id="features" className="mx-auto max-w-page px-6 py-20 md:px-12">
        <p className="eyebrow mb-3">Features</p>
        <h2 className="max-w-xl text-heading">Everything your team needs, nothing it doesn't.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(([Icon, t, d]) => (
            <div key={t} className="rounded-md bg-surface p-5 shadow-ring transition-shadow hover:shadow-hairline">
              <Icon size={18} className="text-primary" /><h3 className="mt-4 text-body">{t}</h3><p className="mt-1 text-ui text-fg-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-page px-6 py-20 md:px-12">
        <p className="eyebrow mb-3">Pricing</p>
        <h2 className="text-heading">Simple plans that scale with you.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {plans.map(([n, p, s, items, hot]) => (
            <div key={n} className={`rounded-md bg-surface p-6 ${hot ? 'shadow-[0_0_0_2px_var(--primary)]' : 'shadow-ring'}`}>
              <p className="eyebrow">{n}</p><p className="mt-3 text-heading">{p}</p><p className="text-caption text-fg-subtle">{s}</p>
              <ul className="mt-5 space-y-2 text-ui text-fg-muted">{items.map((i) => <li key={i} className="flex gap-2"><Check size={14} className="mt-1 text-primary" />{i}</li>)}</ul>
              <Link to="/signup" className="mt-6 flex h-9 items-center justify-center rounded-md bg-surface-inverse text-ui text-fg-inverse hover:opacity-90">Get started</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-page px-6 pb-24 md:px-12">
        <div className="rounded-md bg-surface-inverse px-6 py-16 text-center text-fg-inverse">
          <h2 className="text-heading">Bring clarity to your work.</h2>
          <Link to="/signup" className="mt-6 inline-flex h-10 items-center rounded-md bg-surface px-5 text-ui text-fg">Get started free</Link>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-caption text-fg-subtle">© 2026 Syntra · A front-end portfolio project</footer>
    </div>
  )
}
