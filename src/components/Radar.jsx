import { ShieldLogo } from './Icons'

export default function Radar() {
  return (
    <div className="relative mx-auto aspect-square w-full min-w-[260px] max-w-[480px] whitespace-nowrap">
      <div className="hero-grid absolute inset-0 opacity-60" />

      <div className="absolute inset-[6%] rounded-full border border-radar-line/60" />
      <div className="absolute inset-[16%] rounded-full border border-radar-line/45" />
      <div className="absolute inset-[28%] rounded-full border border-radar-line/40" />
      <div className="absolute inset-[40%] rounded-full border border-radar-line/35" />

      <div className="absolute left-1/2 top-[6%] bottom-[6%] w-px -translate-x-1/2 bg-radar-line/50" />
      <div className="absolute top-1/2 left-[6%] right-[6%] h-px -translate-y-1/2 bg-radar-line/50" />

      <svg className="absolute inset-[6%] overflow-visible" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'var(--color-accent-deep)', stopOpacity: 0 }} />
            <stop offset="70%" style={{ stopColor: 'var(--color-accent-deep)', stopOpacity: 0.15 }} />
            <stop offset="100%" style={{ stopColor: 'var(--color-accent-soft)', stopOpacity: 0.55 }} />
          </linearGradient>
        </defs>
        <g className="radar-sweep" style={{ transformOrigin: '50px 50px' }}>
          <path d="M50 50 L50 0 A50 50 0 0 1 92 22 Z" fill="url(#sweepGrad)" />
          <line x1="50" y1="50" x2="50" y2="0" stroke="var(--color-accent-soft)" strokeWidth="0.4" opacity="0.8" />
        </g>
      </svg>

      <span className="pulse-dot absolute left-[62%] top-[28%] h-2 w-2 rounded-full bg-radar-dot shadow-[0_0_10px_var(--color-radar-dot)]" style={{ animationDelay: '0s' }} />
      <span className="pulse-dot absolute left-[72%] top-[48%] h-1.5 w-1.5 rounded-full bg-radar-dot shadow-[0_0_8px_var(--color-radar-dot)]" style={{ animationDelay: '0.6s' }} />
      <span className="pulse-dot absolute left-[38%] top-[62%] h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" style={{ animationDelay: '1.2s' }} />
      <span className="pulse-dot absolute left-[55%] top-[72%] h-1.5 w-1.5 rounded-full bg-radar-dot/70" style={{ animationDelay: '1.8s' }} />

      <div className="float-soft absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-radar-core-border bg-radar-core shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
        <ShieldLogo className="h-8 w-8 text-accent-deep" />
      </div>

      <div className="absolute right-[2%] top-[12%] z-20 rounded-md border border-border bg-bg-elevated/90 px-2.5 py-1.5 text-[0.65rem] font-medium tracking-[0.08em] text-text-muted shadow-sm backdrop-blur-sm">
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent-soft" />
        KNOW YOUR ATTACK SURFACE
      </div>

      <div className="absolute bottom-[18%] left-[2%] z-20 w-[190px] rounded-lg border border-border bg-bg-elevated/95 p-3 shadow-sm backdrop-blur-sm">
        <div className="mb-2 flex items-center gap-2 text-[0.68rem] font-medium tracking-[0.06em] text-text-muted">
          <span className="flex h-5 w-5 items-center justify-center rounded border border-border text-[0.6rem]">≡</span>
          ASSET DISCOVERY
        </div>
        <div className="flex items-center gap-2 text-[0.68rem] font-medium tracking-[0.06em] text-text">
          <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-accent-deep/80 text-[0.55rem] text-white">✓</span>
          VULNERABILITY INSIGHT
        </div>
      </div>

      <div className="absolute bottom-[4%] right-[4%] font-mono text-[0.65rem] tracking-wide text-text-dim">
        25° 41′ N / 139° 42′ E
      </div>
    </div>
  )
}
