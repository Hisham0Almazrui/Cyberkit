import { ArrowRight, ShieldSmall, NetworkIcon, CodeIcon, BookIcon } from './Icons'
import Radar from './Radar'

const features = [
  { label: 'Clarity before your next scan.', icon: null },
  { label: 'Infrastructure to application', icon: NetworkIcon },
  { label: 'Open source & commercial', icon: CodeIcon },
  { label: 'Practical, unbiased overviews', icon: BookIcon },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/80">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_40%,rgba(157,49,68,0.12),transparent_70%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-0 pt-14 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-8 md:pt-16 lg:pt-20">
        <div className="max-w-xl">
          <p className="animate-fade-up mb-5 flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.14em] text-accent-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-deep" />
            THE SECURITY TOOLKIT, MAPPED.
          </p>

          <h1 className="animate-fade-up animate-fade-up-delay-1 text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-text sm:text-[3.25rem]">
            Know your tools.
            <br />
            Own your assessment.
          </h1>

          <p className="animate-fade-up animate-fade-up-delay-2 mt-5 max-w-md text-[1.02rem] leading-relaxed text-text-muted">
            Find the right tool for every stage of your assessment, from mapping your network to securing your code and tracking threats. Clear, practical overviews help you decide faster.
          </p>

          <div className="animate-fade-up animate-fade-up-delay-3 mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a
              href="#directory"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-deep px-5 py-3 text-[0.95rem] font-medium text-white shadow-[0_8px_24px_rgba(157,49,68,0.35)] transition hover:bg-accent"
            >
              Explore the directory
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="animate-fade-up animate-fade-up-delay-3 mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.8rem] text-text-dim">
            <span className="inline-flex items-center gap-1.5">
              <ShieldSmall className="h-3.5 w-3.5 text-accent-muted" />
              Independently curated
            </span>
            <span className="hidden sm:inline text-border">·</span>
            <span>Built for security practitioners</span>
          </div>
        </div>

        <div className="relative animate-fade-up animate-fade-up-delay-2 rounded-2xl border border-border/60 bg-gradient-to-br from-panel-from to-panel-to w-full p-4 sm:p-6">
          <Radar />
        </div>
      </div>

      <div className="relative mx-auto mt-14 max-w-7xl border-t border-border/80 px-5 sm:px-8">
        <div className="grid gap-6 py-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.label} className="flex items-center gap-3 text-[0.88rem] text-text-muted">
                {Icon ? (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-text-dim">
                    <Icon className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-accent-soft">
                    <ShieldSmall />
                  </span>
                )}
                <span>{f.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
