import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { GliderLogo } from '@/components/glider-logo'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main className="gutter relative grid min-h-svh place-items-center overflow-clip text-center">
      <div className="blob blob-a" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="relative flex flex-col items-center gap-6">
        <GliderLogo size={40} />
        <h1 className="text-[clamp(36px,6vw,72px)] leading-none font-medium tracking-[-0.04em]">Page not found.</h1>
        <p className="text-lg text-muted-foreground">This glider flew off the grid.</p>
        <Button asChild size="lg">
          <a href="/">
            Back to Phase Robotics <ArrowRight strokeWidth={1.5} />
          </a>
        </Button>
      </div>
    </main>
  )
}
