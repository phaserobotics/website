'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

// Follows the device setting until the visitor picks a mode, then remembers it.
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      className="theme-toggle inline-flex size-11 shrink-0 cursor-pointer items-center justify-center outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      aria-label="Switch between light and dark mode"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <Moon className="size-[18px] dark:hidden" strokeWidth={1.5} />
      <Sun className="hidden size-[18px] dark:block" strokeWidth={1.5} />
    </button>
  )
}
