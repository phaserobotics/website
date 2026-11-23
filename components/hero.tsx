import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <header className="hero-out gutter relative flex flex-col items-center gap-7 py-[clamp(72px,10vw,120px)] text-center">
      <h1 className="rise max-w-[1000px] text-[clamp(42px,6.6vw,100px)] leading-[0.96] font-medium tracking-[-0.045em]">
        Bringing small, precise actuators to the US.
      </h1>
      <p className="rise rise-2 max-w-[460px] text-lg leading-normal text-muted-foreground">
        Building actuator supply chains for dexterous manipulators in the US.
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
