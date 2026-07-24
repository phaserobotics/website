import { useEffect, useState } from 'react'

const SPIN = ['|', '/', '─', '\\']

function frame(s) {
  return [
    '    MOTOR          REDUCER         OUTPUT',
    ' ┌───────────┐  ┌───────────┐  ┌───────────┐',
    ' │ o o o o o │  │ ╭───────╮ │  │     ▪     │',
    ` │ o   ${s}   o ├──┤ │ 11:1  │ ├──┤  ▪──▪──▪  │`,
    ' │ o o o o o │  │ ╰───────╯ │  │     ▪     │',
    ' └───────────┘  └───────────┘  └───────────┘',
    '   BLDC · FOC     CYCLOIDAL     BOLT ANYTHING',
  ].join('\n')
}

// An actuator, in ASCII, with a spinning rotor.
function AsciiActuator() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setTick((t) => t + 1), 160)
    return () => clearInterval(id)
  }, [])

  return (
    <pre className="ascii-actuator" aria-label="ASCII diagram of a Phase actuator: motor, cycloidal reducer, output">
      {frame(SPIN[tick % SPIN.length])}
    </pre>
  )
}

export default AsciiActuator
