import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

/**
 * Syntra mark: an "S" traced by one continuous path that links two nodes —
 * connection (nodes), organization (clean right angles), clarity (single stroke),
 * flow (productivity). Colors come from theme tokens, so it works in light and dark.
 */
export function SyntraMark({ size = 28, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={cn('shrink-0', className)}>
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <path d="M21 8H13a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8H11" className="stroke-fg-inverse" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="21" cy="8" r="2.6" className="fill-fg-inverse" />
      <circle cx="11" cy="24" r="2.6" className="fill-fg-inverse" />
    </svg>
  )
}

/**
 * variant="full"    → mark + "Syntra" wordmark (navbar, footer, auth, onboarding, sidebar)
 * variant="icon"    → mark only
 * variant="compact" → smaller mark only (collapsed sidebar, tight spaces)
 * `to={null}` renders a non-link.
 */
export default function SyntraLogo({ variant = 'full', size, to = '/', className }) {
  const px = size ?? (variant === 'compact' ? 24 : 28)
  const content = variant === 'full'
    ? <span className="inline-flex items-center gap-2"><SyntraMark size={px} /><span className="font-medium tracking-tight text-fg" style={{ fontSize: px * 0.64 }}>Syntra</span></span>
    : <SyntraMark size={px} />
  return to
    ? <Link to={to} aria-label="Syntra home" className={cn('inline-flex items-center', className)}>{content}</Link>
    : <span role="img" aria-label="Syntra" className={cn('inline-flex items-center', className)}>{content}</span>
}
