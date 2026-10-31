import './PhalanxMockup.css'

// Exploded concept drawing: Phalanx Drive PCB integrated into a complete
// cycloidal actuator. Pure SVG so it stays crisp and on-brand.
function PhalanxMockup() {
  const ink = 'var(--color-ink)'
  const muted = 'var(--color-muted)'
  const cell = 'var(--color-cell)'

  return (
    <aside className="pmock" aria-label="Phalanx actuator concept mockup">
      <div className="pmock__header">
        <span>PHALANX_ACTUATOR_R1</span>
        <span className="pmock__header-right">CONCEPT MOCKUP</span>
      </div>

      <svg
        className="pmock__svg"
        viewBox="0 0 380 440"
        role="img"
        aria-label="Exploded view of the Phalanx actuator: output flange, cycloidal discs, pin ring, BLDC stator, and the integrated Phalanx Drive PCB"
      >
        {/* registration marks */}
        <g stroke={muted} strokeWidth="1" opacity="0.6">
          <path d="M8 14 h12 M14 8 v12" />
          <path d="M360 14 h12 M366 8 v12" />
          <path d="M8 426 h12 M14 420 v12" />
          <path d="M360 426 h12 M366 420 v12" />
        </g>

        {/* center axis */}
        <line x1="150" y1="16" x2="150" y2="404" stroke={muted} strokeWidth="1" strokeDasharray="6 5" opacity="0.7" />

        {/* ── output flange ── */}
        <g stroke={ink} strokeWidth="1.5" fill="#ffffff">
          <path d="M86 52 v12 M214 52 v12" />
          <path d="M86 64 a64 18 0 0 0 128 0" fill={cell} stroke={ink} />
          <ellipse cx="150" cy="52" rx="64" ry="18" />
          <ellipse cx="150" cy="56" rx="14" ry="4.5" fill={cell} />
          <ellipse cx="110" cy="50" rx="4" ry="1.6" fill={cell} />
          <ellipse cx="190" cy="50" rx="4" ry="1.6" fill={cell} />
          <ellipse cx="150" cy="38" rx="4" ry="1.6" fill={cell} />
          <ellipse cx="150" cy="64" rx="4" ry="1.6" fill={cell} />
        </g>

        {/* ── cycloidal discs (second one eccentric) ── */}
        <g stroke={ink} strokeWidth="1.5" fill="#ffffff">
          <path d="M90 112 v6 M210 112 v6" />
          <path d="M90 118 a60 17 0 0 0 120 0" fill={cell} />
          <ellipse cx="150" cy="112" rx="60" ry="17" />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i / 6) * Math.PI * 2
            return (
              <ellipse
                key={i}
                cx={150 + Math.cos(a) * 38}
                cy={112 + Math.sin(a) * 10.5}
                rx="4.5"
                ry="1.8"
                fill={cell}
              />
            )
          })}
          <path d="M98 146 v6 M218 146 v6" />
          <path d="M98 152 a60 17 0 0 0 120 0" fill={cell} />
          <ellipse cx="158" cy="146" rx="60" ry="17" />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i / 6) * Math.PI * 2 + 0.5
            return (
              <ellipse
                key={i}
                cx={158 + Math.cos(a) * 38}
                cy={146 + Math.sin(a) * 10.5}
                rx="4.5"
                ry="1.8"
                fill={cell}
              />
            )
          })}
        </g>

        {/* ── pin ring housing ── */}
        <g stroke={ink} strokeWidth="1.5" fill="#ffffff">
          <path d="M78 196 v10 M222 196 v10" />
          <path d="M78 206 a72 20 0 0 0 144 0" fill={cell} />
          <ellipse cx="150" cy="196" rx="72" ry="20" />
          <ellipse cx="150" cy="196" rx="50" ry="13.5" fill={cell} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const a = (i / 8) * Math.PI * 2
            return (
              <circle
                key={i}
                cx={150 + Math.cos(a) * 61}
                cy={196 + Math.sin(a) * 16.5}
                r="2.2"
                fill="#ffffff"
              />
            )
          })}
        </g>

        {/* ── BLDC stator ── */}
        <g stroke={ink} strokeWidth="1.5">
          <path d="M82 252 v48 M218 252 v48" fill="none" />
          <path d="M82 300 a68 19 0 0 0 136 0 L218 252 a68 19 0 0 1 -136 0 Z" fill={cell} stroke="none" />
          <path d="M82 300 a68 19 0 0 0 136 0" fill="none" />
          {[96, 112, 128, 144, 160, 176, 192, 206].map((x) => {
            const dx = Math.abs(x - 150) / 68
            const sag = Math.sqrt(Math.max(0, 1 - dx * dx)) * 19
            return <line key={x} x1={x} y1={252 + sag} x2={x} y2={300 + sag} stroke={muted} strokeWidth="1" />
          })}
          <ellipse cx="150" cy="252" rx="68" ry="19" fill="#ffffff" />
          <ellipse cx="150" cy="252" rx="18" ry="5.5" fill={cell} />
        </g>

        {/* ── encoder magnet ── */}
        <g stroke={ink} strokeWidth="1.5" fill="#ffffff">
          <path d="M139 330 v5 M161 330 v5" />
          <path d="M139 335 a11 3.5 0 0 0 22 0" fill={cell} />
          <ellipse cx="150" cy="330" rx="11" ry="3.5" />
        </g>

        {/* ── Phalanx Drive PCB ── */}
        <g stroke={ink} strokeWidth="1.5" fill="#ffffff">
          <path d="M86 362 v5 M214 362 v5" />
          <path d="M86 367 a64 18 0 0 0 128 0" fill={cell} />
          <ellipse cx="150" cy="362" rx="64" ry="18" />
          {/* components, slightly skewed for the iso feel */}
          <g transform="translate(150 362) skewX(-24) scale(1 0.5)">
            <rect x="-26" y="-18" width="22" height="18" fill="#ffffff" />
            <rect x="6" y="-4" width="16" height="12" fill="#ffffff" />
            <rect x="-38" y="6" width="9" height="7" fill={cell} />
            <rect x="14" y="-22" width="9" height="7" fill={cell} />
            <rect x="-10" y="10" width="7" height="5" fill={cell} />
          </g>
        </g>

        {/* ── diameter dimension ── */}
        <g stroke={ink} strokeWidth="1">
          <line x1="86" y1="404" x2="214" y2="404" />
          <path d="M86 398 v12 M214 398 v12" />
        </g>
        <text x="150" y="424" textAnchor="middle" className="pmock__dim">Ø37 MM</text>

        {/* ── labels ── */}
        <g stroke={muted} strokeWidth="1">
          <line x1="216" y1="55" x2="242" y2="55" />
          <line x1="220" y1="130" x2="242" y2="130" />
          <line x1="224" y1="199" x2="242" y2="199" />
          <line x1="220" y1="276" x2="242" y2="276" />
          <line x1="163" y1="331" x2="242" y2="331" />
          <line x1="216" y1="364" x2="242" y2="364" />
        </g>
        <g className="pmock__label">
          <text x="248" y="58">OUTPUT FLANGE</text>
          <text x="248" y="126">2× CYCLOIDAL DISCS</text>
          <text x="248" y="139">11:1 REDUCTION</text>
          <text x="248" y="202">PIN RING HOUSING</text>
          <text x="248" y="279">BLDC STATOR</text>
          <text x="248" y="334">14-BIT ENCODER</text>
          <text x="248" y="360">PHALANX DRIVE R1</text>
          <text x="248" y="373">FOC + FDCAN, ON BOARD</text>
        </g>
      </svg>

      <div className="pmock__footer">
        <span>ONE PACKAGE — DRIVE, MOTOR, GEARING</span>
        <span className="cursor-blink" aria-hidden="true"></span>
      </div>
    </aside>
  )
}

export default PhalanxMockup
