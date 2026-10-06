import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Layout({ title, sub, children, footer }) {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2 font-medium"><span className="text-primary">▲</span>Syntra</Link>
        <div className="rounded-md bg-surface p-6 shadow-ring">
          <h1 className="text-heading">{title}</h1><p className="mb-5 mt-1 text-ui text-fg-muted">{sub}</p>
          {children}
        </div>
        <p className="mt-4 text-center text-ui text-fg-subtle">{footer}</p>
      </div>
    </main>
  )
}
const Field = ({ label, ...p }) => (
  <label className="block text-caption text-fg-muted">{label}
    <input {...p} className="mt-1 h-9 w-full rounded-md bg-canvas px-3 text-ui text-fg shadow-hairline outline-none focus:shadow-[0_0_0_1px_var(--primary)]" /></label>
)
const Primary = ({ children }) => <button type="submit" className="h-9 w-full rounded-md bg-primary text-ui text-fg-inverse hover:opacity-90">{children}</button>
const Social = ({ go }) => (
  <>
    <div className="my-4 text-center eyebrow text-fg-subtle">or</div>
    <div className="grid grid-cols-2 gap-2">{['Google', 'GitHub'].map((n) => <button key={n} type="button" onClick={go} className="h-9 rounded-md text-ui shadow-hairline hover:shadow-ring">{n}</button>)}</div>
  </>
)
const Err = ({ msg }) => msg ? <p className="text-caption text-fg">⚠ {msg}</p> : null

export function SignIn() {
  const nav = useNavigate()
  const [err, setErr] = useState('')
  return (
    <Layout title="Welcome back" sub="Sign in to your workspace." footer={<>New to Syntra? <Link to="/signup" className="text-fg underline">Create an account</Link></>}>
      <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); const f = new FormData(e.target); if (!f.get('email') || !f.get('password')) return setErr('Enter your email and password.'); nav('/app/dashboard') }}>
        <Field label="Email" name="email" type="email" placeholder="you@company.com" />
        <Field label="Password" name="password" type="password" />
        <div className="flex justify-between text-caption"><label className="flex items-center gap-1.5 text-fg-muted"><input type="checkbox" defaultChecked />Remember me</label><Link to="/forgot-password" className="text-fg-muted hover:text-fg">Forgot password?</Link></div>
        <Err msg={err} /><Primary>Sign in</Primary>
      </form>
      <Social go={() => nav('/app/dashboard')} />
    </Layout>
  )
}

export function SignUp() {
  const nav = useNavigate()
  const [err, setErr] = useState('')
  return (
    <Layout title="Create your account" sub="Start organizing your work." footer={<>Already have an account? <Link to="/signin" className="text-fg underline">Sign in</Link></>}>
      <form className="space-y-3" onSubmit={(e) => {
        e.preventDefault(); const f = Object.fromEntries(new FormData(e.target))
        if (!f.name || !f.email) return setErr('Name and email are required.')
        if (f.password.length < 8) return setErr('Password must be at least 8 characters.')
        if (f.password !== f.confirm) return setErr('Passwords do not match.')
        if (!f.terms) return setErr('Please accept the terms.')
        nav('/onboarding')
      }}>
        <Field label="Full name" name="name" placeholder="Sara Hassan" />
        <Field label="Email" name="email" type="email" placeholder="you@company.com" />
        <Field label="Password" name="password" type="password" />
        <Field label="Confirm password" name="confirm" type="password" />
        <label className="flex items-center gap-1.5 text-caption text-fg-muted"><input type="checkbox" name="terms" />I agree to the Terms and Privacy Policy</label>
        <Err msg={err} /><Primary>Create account</Primary>
      </form>
      <Social go={() => nav('/onboarding')} />
    </Layout>
  )
}

export function Forgot() {
  const [sent, setSent] = useState(false)
  return (
    <Layout title="Forgot password" sub="We'll email you a reset link." footer={<Link to="/signin" className="text-fg underline">Back to sign in</Link>}>
      {sent ? <p className="text-ui">✓ Check your inbox. If an account exists, a reset link is on its way. <Link to="/reset-password" className="block pt-3 underline">Open reset page (demo)</Link></p> : (
        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true) }}><Field label="Email" type="email" required /><Primary>Send reset link</Primary></form>)}
    </Layout>
  )
}

export function Reset() {
  const nav = useNavigate()
  const [err, setErr] = useState('')
  return (
    <Layout title="Reset password" sub="Choose a new password." footer={null}>
      <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); const f = Object.fromEntries(new FormData(e.target)); if (f.password.length < 8) return setErr('Use at least 8 characters.'); if (f.password !== f.confirm) return setErr('Passwords do not match.'); nav('/signin') }}>
        <Field label="New password" name="password" type="password" /><Field label="Confirm password" name="confirm" type="password" />
        <Err msg={err} /><Primary>Reset password</Primary>
      </form>
    </Layout>
  )
}
