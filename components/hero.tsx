import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <header className="hero-out gutter relative flex flex-col items-center gap-7 py-[clamp(72px,10vw,120px)] text-center">
      <h1 className="rise max-w-[980px] text-[clamp(44px,7vw,104px)] leading-[0.95] font-medium tracking-[-0.045em]">
        Small actuators. Precise motion.
      </h1>
      <p className="rise rise-2 max-w-[460px] text-lg leading-normal text-muted-foreground">
        For robot hands and dexterous manipulators, and the machines that make them.
      </p>
      <div className="rise rise-3">
        <Button asChild size="lg">
          <a href="#access">
            Request early access <ArrowRight strokeWidth={1.5} />
          </a>
        </Button>
      </div>
    </header>
  )
}
