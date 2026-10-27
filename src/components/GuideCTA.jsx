import { TerminalIcon, ArrowUpRight } from './Icons'

export default function GuideCTA() {
  return (
    <section id="guide" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-8 rounded-2xl border border-border bg-gradient-to-br from-promo-from to-promo-to px-6 py-8 sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
            <div className="shrink-0">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg border border-accent-muted/50 text-accent-soft">
                <TerminalIcon />
              </div>
              <p className="text-[0.65rem] font-semibold tracking-[0.12em] text-text-dim">
                01 / LEARN · ASSESS · IMPROVE
              </p>
            </div>
            <div>
              <p className="mb-2 text-[0.72rem] font-semibold tracking-[0.14em] text-accent-soft">
                BUILD YOUR FOUNDATION
              </p>
              <h2 className="font-serif text-[1.85rem] leading-snug tracking-tight text-text sm:text-[2.15rem]">
                A good assessment starts with a plan.
              </h2>
              <p className="mt-2 max-w-lg text-[0.95rem] text-text-muted">
                Learn how to scope, discover, validate, and prioritize with confidence.
              </p>
            </div>
          </div>

          <a
            href="#directory"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-border px-5 py-3 text-[0.9rem] font-medium text-text transition hover:border-accent-muted hover:bg-bg-elevated lg:self-center"
          >
            Explore the starter guide
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
