import { useMemo, useState } from 'react'
import { ArrowUpRight } from './Icons'
import { certifications, certLevels } from '../data/certifications'

const levelStyles = {
  Entry: 'text-license-oss border-license-oss/30 bg-license-oss/10',
  Intermediate: 'text-license-freemium border-license-freemium/30 bg-license-freemium/10',
  Advanced: 'text-license-commercial border-license-commercial/30 bg-license-commercial/10',
}

export default function Certifications() {
  const [level, setLevel] = useState('All levels')

  const filtered = useMemo(
    () => (level === 'All levels' ? certifications : certifications.filter((c) => c.level === level)),
    [level],
  )

  return (
    <section id="certifications" className="scroll-mt-20 border-b border-border/80">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[0.72rem] font-semibold tracking-[0.14em] text-accent-soft">
              GROW YOUR SKILLS
            </p>
            <h2 className="text-[2rem] font-semibold tracking-tight text-text sm:text-[2.35rem]">
              Recommended certifications.
            </h2>
            <p className="mt-2 max-w-xl text-text-muted">
              Build credibility at every stage, from your first security role to leading assessments.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
            {certLevels.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLevel(l)}
                className={`rounded-lg border px-3 py-1.5 text-[0.82rem] transition ${
                  level === l
                    ? 'border-accent-deep bg-accent-deep text-white'
                    : 'border-border text-text-muted hover:border-accent-muted hover:text-text'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((c) => (
            <article
              key={c.id}
              className="group flex flex-col rounded-xl border border-border bg-bg-card p-5 transition duration-200 hover:border-accent-muted hover:bg-bg-card-hover"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div
                  className="flex h-11 min-w-11 shrink-0 items-center justify-center rounded-lg px-2 text-[0.75rem] font-semibold text-white"
                  style={{ background: c.color }}
                >
                  {c.short}
                </div>
                <span className={`rounded-full border px-2.5 py-1 text-[0.7rem] font-medium ${levelStyles[c.level]}`}>
                  {c.level}
                </span>
              </div>

              <h3 className="text-[1rem] font-semibold leading-snug tracking-tight text-text">{c.name}</h3>
              <p className="mt-0.5 mb-2 text-[0.8rem] text-text-dim">by {c.issuer}</p>
              <p className="mb-4 flex-1 text-[0.85rem] leading-relaxed text-text-muted">{c.description}</p>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {c.focus.map((f) => (
                  <span key={f} className="rounded-md border border-border px-2 py-0.5 text-[0.7rem] text-text-dim">
                    {f}
                  </span>
                ))}
              </div>

              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 border-t border-border/70 pt-3.5 text-[0.85rem] font-medium text-accent-soft transition hover:text-accent"
              >
                Learn more
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
