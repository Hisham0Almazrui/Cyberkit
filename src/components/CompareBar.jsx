import { useEffect } from 'react'
import { tools, categories } from '../data/tools'
import { installs } from '../data/installs'
import { ArrowUpRight } from './Icons'

export const MAX_COMPARE = 4

const categoryLabel = Object.fromEntries(categories.map((c) => [c.id, c.label]))

const installLabel = {
  apt: 'apt package',
  go: 'Go install',
  pipx: 'pipx (Python)',
  gem: 'Ruby gem',
  snap: 'snap',
  git: 'Build from source',
  script: 'Install script',
  docker: 'Docker',
  download: 'Manual download',
  service: 'Web service (no install)',
}

const rows = [
  { label: 'By', render: (t) => t.vendor },
  { label: 'Category', render: (t) => categoryLabel[t.category] },
  { label: 'License', render: (t) => t.license },
  { label: 'What it does', render: (t) => <span className="text-text-muted">{t.description}</span> },
  {
    label: 'Focus',
    render: (t) => (
      <div className="flex flex-wrap gap-1.5">
        {t.tags.map((tag) => (
          <span key={tag} className="rounded-md border border-border px-2 py-0.5 text-[0.7rem] text-text-dim">
            {tag}
          </span>
        ))}
      </div>
    ),
  },
  { label: 'How to get it', render: (t) => installLabel[installs[t.id]?.type] ?? '—' },
  {
    label: 'Install',
    render: (t) => (
      <code className="block whitespace-pre-wrap [overflow-wrap:anywhere] rounded-md border border-border bg-bg-elevated px-2 py-1.5 font-mono text-[0.72rem] text-text">
        {installs[t.id]?.cmd ?? '—'}
      </code>
    ),
  },
]

function CompareModal({ selected, onClose, onRemove }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const cols = { gridTemplateColumns: `120px repeat(${selected.length}, minmax(180px, 1fr))` }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Compare tools"
    >
      <div
        className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-bg-card shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-[1.15rem] font-semibold tracking-tight text-text">Compare tools</h2>
            <p className="text-[0.8rem] text-text-dim">Side-by-side view of {selected.length} tools</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close comparison"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-lg leading-none text-text-muted transition hover:border-accent-muted hover:text-text"
          >
            ×
          </button>
        </div>

        <div className="overflow-auto">
          <div style={{ minWidth: 120 + selected.length * 180 }}>
            <div className="sticky top-0 z-10 grid border-b border-border bg-bg-card" style={cols}>
              <div />
              {selected.map((t) => (
                <div key={t.id} className="flex items-start gap-2.5 border-l border-border/60 px-3 py-4">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[0.72rem] font-semibold text-white"
                    style={{ background: t.color }}
                  >
                    {t.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.92rem] font-semibold text-text" title={t.name}>
                      {t.name}
                    </p>
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[0.75rem] font-medium text-accent-soft hover:text-accent"
                    >
                      Website
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(t.id)}
                    aria-label={`Remove ${t.name}`}
                    className="shrink-0 rounded px-1.5 text-text-dim hover:text-text"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {rows.map((row) => (
              <div key={row.label} className="grid border-b border-border/60 last:border-b-0" style={cols}>
                <div className="px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-text-dim">
                  {row.label}
                </div>
                {selected.map((t) => (
                  <div key={t.id} className="border-l border-border/60 px-3 py-3 text-[0.85rem] text-text">
                    {row.render(t)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CompareBar({ compareIds, open, onOpen, onClose, onClear, onRemove }) {
  const selected = tools.filter((t) => compareIds.has(t.id))
  const canCompare = selected.length >= 2

  useEffect(() => {
    if (selected.length < 2 && open) onClose()
  }, [selected.length, open, onClose])

  if (selected.length === 0) return null

  return (
    <>
      <div className="fixed bottom-5 left-1/2 z-50 w-[min(920px,calc(100%-2rem))] -translate-x-1/2 rounded-xl border border-border bg-bg-elevated/95 p-3 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[0.8rem] text-text-muted">
              Comparing {selected.length}/{MAX_COMPARE}
            </span>
            {selected.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onRemove(t.id)}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-card px-2.5 py-1 text-[0.8rem] text-text transition hover:border-accent-muted"
                title="Remove from compare"
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded text-[0.55rem] font-semibold text-white"
                  style={{ background: t.color }}
                >
                  {t.initials.slice(0, 2)}
                </span>
                {t.name}
                <span className="text-text-dim">×</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {!canCompare && <span className="text-[0.75rem] text-text-dim">Pick one more tool</span>}
            <button
              type="button"
              onClick={onClear}
              className="rounded-md px-3 py-1.5 text-[0.85rem] text-text-muted hover:text-text"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={onOpen}
              disabled={!canCompare}
              className="rounded-lg bg-accent-deep px-4 py-1.5 text-[0.85rem] font-medium text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-accent-deep"
            >
              Compare selected
            </button>
          </div>
        </div>
      </div>

      {open && canCompare && (
        <CompareModal selected={selected} onClose={onClose} onRemove={onRemove} />
      )}
    </>
  )
}
