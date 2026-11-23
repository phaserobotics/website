'use client'

import { useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export const EMAIL = 'founders@phaserobotics.cc'

// The address as a mail link, with a copy icon right beside it and a short
// confirmation bubble. If the clipboard is unavailable the address is selected
// instead, and the bubble says so rather than claiming a copy.
export function CopyEmail() {
  const addressRef = useRef<HTMLAnchorElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [state, setState] = useState<'idle' | 'copied' | 'selected'>('idle')

  function confirm(next: 'copied' | 'selected') {
    setState(next)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState('idle'), 2400)
  }

  function selectAddress() {
    const node = addressRef.current
    if (!node) return
    const range = document.createRange()
    range.selectNodeContents(node)
    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)
    confirm('selected')
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      confirm('copied')
    } catch {
      selectAddress()
    }
  }

  return (
    <div className="flex items-center gap-1">
      <a
        ref={addressRef}
        href={`mailto:${EMAIL}?subject=Early%20access`}
        className="min-w-0 text-[clamp(17px,2vw,22px)] tracking-[-0.01em] [overflow-wrap:anywhere] underline-offset-4 hover:underline"
      >
        {EMAIL}
      </a>
      <Tooltip open={state !== 'idle'}>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={copy}
            aria-label="Copy email address"
            className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center text-muted-foreground transition-[color,scale] duration-300 outline-none hover:scale-110 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[done=true]:text-foreground"
            data-done={state === 'copied'}
          >
            {state === 'copied' ? <Check className="size-5" strokeWidth={1.6} /> : <Copy className="size-5" strokeWidth={1.6} />}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" align="end" sideOffset={2} className="px-3.5 py-2.5 text-sm font-medium" role="status">
          {state === 'selected' ? 'Address selected, copy it from here' : 'Email address copied'}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
