import { FlagSketch } from '@/components/flag-sketch'
import { Development } from '@/components/development'
import { Hero } from '@/components/hero'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { Vision } from '@/components/vision'

export default function HomePage() {
  return (
    <div id="top" className="relative overflow-clip">
      <div className="blob blob-a" aria-hidden="true" />
      <div className="blob blob-b" aria-hidden="true" />
      <FlagSketch />
      <div className="grain" aria-hidden="true" />

      <SiteNav />
      <main>
        <Hero />
        <Development />
        <Vision />
      </main>
      <SiteFooter />
    </div>
  )
}
