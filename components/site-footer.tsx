import { Brand } from '@/components/glider-logo'
import { CopyEmail, EMAIL } from '@/components/copy-email'

export function SiteFooter() {
  return (
    <footer id="access" className="relative border-t bg-(--glass-soft) backdrop-blur-xl">
      <div className="reveal gutter flex flex-wrap items-end justify-between gap-10 pt-16 pb-14 sm:pt-24 sm:pb-20">
        <h2 className="max-w-[760px] text-[clamp(36px,5.6vw,80px)] leading-[0.96] font-medium tracking-[-0.045em]">
          Building robots? Get early access.
        </h2>
        <CopyEmail />
      </div>

      <div className="gutter flex flex-wrap items-center justify-between gap-x-10 gap-y-4 border-t pt-7 pb-8 text-sm text-muted-foreground">
        <Brand className="text-foreground" />
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <a href="#development" className="inline-flex min-h-11 items-center transition-colors hover:text-foreground">
            In development
          </a>
          <a href={`mailto:${EMAIL}`} className="inline-flex min-h-11 items-center transition-colors hover:text-foreground">
            {EMAIL}
          </a>
        </div>
        <span className="label-mono">© {new Date().getFullYear()} Phase Robotics</span>
      </div>
    </footer>
  )
}
