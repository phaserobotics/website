'use client'

import { useState } from 'react'
import { ArrowDown, ArrowRight, Menu, X } from 'lucide-react'
import { Brand } from '@/components/glider-logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const LINKS = [
  { href: '#development', label: 'In development' },
  { href: '#vision', label: 'Vision' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="site-nav" aria-label="Primary">
      <div className="nav-bar gutter flex items-center justify-between gap-4">
        <Brand />

        <div className="flex items-center gap-3 text-sm text-muted-foreground sm:gap-9">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative hidden after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 sm:block"
            >
              {link.label}
            </a>
          ))}

          <span className="text-foreground">
            <ThemeToggle />
          </span>

          <Button asChild className="hidden sm:inline-flex">
            <a href="#access">Request access</a>
          </Button>

          {/* Phones: links move into a dropdown */}
          <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center border border-(--btn-edge) text-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:hidden"
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                {open ? <X className="size-[18px]" strokeWidth={1.5} /> : <Menu className="size-[18px]" strokeWidth={1.5} />}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              collisionPadding={12}
              sideOffset={14}
              className="w-[calc(100vw-24px)] p-2 shadow-[0_24px_48px_-24px_var(--shadow)] duration-200 sm:hidden"
            >
              {LINKS.map((link) => (
                <DropdownMenuItem key={link.href} asChild className="h-13 cursor-pointer justify-between border-b px-3 text-[17px]">
                  <a href={link.href}>
                    {link.label}
                    <ArrowDown className="size-4" strokeWidth={1.5} />
                  </a>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild className="mt-2 h-13 cursor-pointer justify-between border border-(--btn-edge) bg-primary px-6 text-[15px] font-medium text-primary-foreground focus:bg-primary focus:text-primary-foreground">
                <a href="#access">
                  Request early access
                  <ArrowRight className="size-4 text-primary-foreground!" strokeWidth={1.5} />
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
