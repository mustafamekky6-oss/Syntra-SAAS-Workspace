import { Link } from 'react-router-dom'
import { CheckCircle2, TrendingUp, Sparkles } from 'lucide-react'
import LandingNav from './LandingNav'
import ProductPreview from './ProductPreview'
import Showcase from './Showcase'
import { Reveal } from '@/components/common/Reveal'
import { Trust, ProblemSolution, Productivity, Collaboration, Security, Pricing, Faq, FinalCta, Footer } from './Sections'

const chip = 'floaty absolute hidden items-center gap-2 rounded-md bg-surface px-3 py-2 text-caption shadow-ring lg:flex'

export default function LandingPage() {
  return (
    <div id="top" className="relative">
      <div className="ambient"><div className="orb -left-40 -top-40" /><div className="orb -right-48 top-72" style={{ animationDelay: '-9s' }} /></div>
      <LandingNav />
      <section className="mx-auto max-w-page px-6 pb-14 pt-16 text-center md:px-12 md:pt-24">
        <p className="sharpen eyebrow mb-4">The workspace for modern teams</p>
        <h1 className="sharpen mx-auto max-w-4xl text-heading-lg md:text-display" style={{ animationDelay: '0.1s' }}>One workspace. Total clarity.</h1>
        <p className="sharpen mx-auto mt-6 max-w-2xl text-body text-fg-muted" style={{ animationDelay: '0.2s' }}>Plan projects, organize work, collaborate with your team, track progress, and make better decisions — all from one intelligent workspace.</p>
        <div className="sharpen mt-8 flex flex-wrap justify-center gap-3" style={{ animationDelay: '0.3s' }}>
          <Link to="/signup" className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-ui text-fg-inverse transition-transform hover:opacity-90 active:scale-95">Get started</Link>
          <Link to="/app/dashboard" className="inline-flex h-10 items-center rounded-md bg-surface px-5 text-ui shadow-hairline transition-transform hover:shadow-ring active:scale-95">Explore demo</Link>
        </div>
      </section>

      <section id="product" className="relative mx-auto max-w-5xl px-6 pb-16 md:px-12">
        <div className="sharpen" style={{ animationDelay: '0.45s' }}><ProductPreview /></div>
        <div className={chip + ' -left-6 top-24'}><CheckCircle2 size={14} className="text-primary" />Task completed</div>
        <div className={chip + ' -right-4 top-40'} style={{ animationDelay: '-2s' }}><TrendingUp size={14} className="text-primary" />+12% productivity</div>
        <div className={chip + ' -bottom-2 left-24'} style={{ animationDelay: '-4s' }}><Sparkles size={14} className="text-primary" />AI insight available</div>
      </section>

      <Trust />
      <ProblemSolution />
      <section id="features" className="mx-auto max-w-page px-6 py-20 md:px-12"><Reveal><Showcase /></Reveal></section>
      <Productivity />
      <Collaboration />
      <Security />
      <Pricing />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  )
}
