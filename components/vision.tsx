import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const POINTS = [
  { title: 'Design', text: 'Drives and actuators designed in-house, end to end.' },
  {
    title: 'Machines',
    text: 'We build our own machines to make motors, so we can iterate, scale and not rely on anyone else.',
  },
  { title: 'Supply', text: 'A US source of precision motors for the people building robots here.' },
]

export function Vision() {
  return (
    <section id="vision" className="gutter relative pt-6 pb-22 sm:pt-10 sm:pb-35">
      <div className="blob blob-c" aria-hidden="true" />
      <div className="reveal relative grid items-start gap-[clamp(32px,5vw,64px)] min-[860px]:grid-cols-2">
        <h2 className="text-[clamp(36px,5vw,72px)] leading-[0.98] font-medium tracking-[-0.04em]">
          Building the motor supply chain in the United States.
        </h2>

        <div className="flex min-w-0 flex-col gap-10 pt-2">
          <p className="max-w-[540px] text-lg leading-[1.45] sm:text-xl">
            Every robot runs on motors. We want that supply chain built in the US, and manufacturing brought back with
            it. So we make the actuators, and we build our own machines to make the motors in house.
          </p>

          {/* Phones: tap-to-open rows */}
          <Accordion type="single" collapsible defaultValue="Design" className="border-t border-border-strong sm:hidden">
            {POINTS.map((point) => (
              <AccordionItem key={point.title} value={point.title} className="border-border-strong last:border-b">
                <AccordionTrigger className="min-h-14 items-center py-0 text-xl font-medium tracking-[-0.02em] hover:no-underline [&>svg]:translate-y-0 [&>svg]:text-foreground">
                  {point.title}
                </AccordionTrigger>
                <AccordionContent className="pb-[18px] text-[15px] leading-normal text-muted-foreground">
                  {point.text}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Larger screens: everything open */}
          <dl className="hidden border-t border-border-strong sm:block">
            {POINTS.map((point) => (
              <div
                key={point.title}
                className="grid grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] items-baseline gap-4 border-b border-border-strong py-5"
              >
                <dt className="text-xl font-medium tracking-[-0.02em]">{point.title}</dt>
                <dd className="text-[15px] leading-normal text-muted-foreground">{point.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
