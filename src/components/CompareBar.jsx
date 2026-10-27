import { tools } from '../data/tools'

export default function CompareBar({ compareIds, onClear, onRemove }) {
  if (compareIds.size === 0) return null

  const selected = tools.filter((t) => compareIds.has(t.id))

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[min(920px,calc(100%-2rem))] -translate-x-1/2 rounded-xl border border-border bg-bg-elevated/95 p-3 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[0.8rem] text-text-muted">
            Comparing {selected.length}
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
          <button
            type="button"
            onClick={onClear}
            className="rounded-md px-3 py-1.5 text-[0.85rem] text-text-muted hover:text-text"
          >
            Clear
          </button>
          <button
            type="button"
            className="rounded-lg bg-accent-deep px-4 py-1.5 text-[0.85rem] font-medium text-white hover:bg-accent"
          >
            Compare selected
          </button>
        </div>
      </div>
    </div>
  )
}
