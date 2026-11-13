// The Phase Robotics mark: a Conway glider with fused, rounded cells
// ("logo A"). Single source of truth for the kit; the website's
// src/components/GliderLogo.jsx and public/glider.svg embed MARK_D verbatim.

// Round every corner of a rectilinear polygon (clockwise in screen space):
// convex corners get radius rc, concave corners get an outward fillet rf.
export function roundedPath(pts, rc, rf) {
  const n = pts.length
  const unit = ([x, y]) => { const l = Math.hypot(x, y); return [x / l, y / l] }
  const corners = pts.map((V, i) => {
    const Pp = pts[(i - 1 + n) % n]
    const N = pts[(i + 1) % n]
    const din = [V[0] - Pp[0], V[1] - Pp[1]]
    const dout = [N[0] - V[0], N[1] - V[1]]
    const convex = din[0] * dout[1] - din[1] * dout[0] > 0
    const r = convex ? rc : rf
    const u1 = unit([Pp[0] - V[0], Pp[1] - V[1]])
    const u2 = unit([N[0] - V[0], N[1] - V[1]])
    return {
      t1: [V[0] + u1[0] * r, V[1] + u1[1] * r],
      t2: [V[0] + u2[0] * r, V[1] + u2[1] * r],
      r, sweep: convex ? 1 : 0,
    }
  })
  const f = ([x, y]) => `${+x.toFixed(3)} ${+y.toFixed(3)}`
  let d = `M${f(corners[n - 1].t2)}`
  for (const c of corners) d += `L${f(c.t1)}A${c.r} ${c.r} 0 0 ${c.sweep} ${f(c.t2)}`
  return d + 'Z'
}

// Glider cells (1,0) (2,1) (0,2) (1,2) (2,2) on a gapless 10-unit grid,
// offset by 1 to sit centered in a 32x32 box. The outline passes through the
// diagonal touch point twice; both visits get concave fillets, forming the
// neck between the top cell and the L below it.
export const MARK_OUTLINE = [
  [10, 0], [20, 0], [20, 10], [30, 10], [30, 30], [0, 30], [0, 20], [20, 20], [20, 10], [10, 10],
].map(([x, y]) => [x + 1, y + 1])

export const MARK_RADIUS = 3
export const MARK_VIEWBOX = '0 0 32 32'
export const MARK_D = roundedPath(MARK_OUTLINE, MARK_RADIUS, MARK_RADIUS)
