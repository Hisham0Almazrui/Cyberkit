import { useMemo, useState } from 'react'
import { SearchIcon, categoryIcons } from './Icons'
import { tools, categories } from '../data/tools'
import { installs, prerequisites } from '../data/installs'

const runnable = new Set(['apt', 'go', 'pipx', 'gem', 'snap', 'git', 'script', 'docker'])

const typeLabel = {
  apt: 'apt',
  go: 'Go',
  pipx: 'pipx',
  gem: 'Ruby gem',
  snap: 'snap',
  git: 'Source',
  script: 'Script',
  docker: 'Docker',
  download: 'Download',
  service: 'Web service',
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className="shrink-0 rounded-md border border-border px-2.5 py-1 text-[0.72rem] font-medium text-text-muted transition hover:border-accent-muted hover:text-text"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

function CommandBlock({ type, cmd }) {
  const isRunnable = runnable.has(type)
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-lg border border-border bg-bg-elevated px-3 py-2">
      <code
        className={`min-w-0 flex-1 whitespace-pre-wrap [overflow-wrap:anywhere] text-[0.78rem] leading-relaxed ${
          isRunnable ? 'font-mono text-text' : 'text-text-muted'
        }`}
      >
        {isRunnable && <span className="mr-2 select-none text-accent-soft">$</span>}
        {cmd}
      </code>
      {isRunnable && <CopyButton text={cmd} />}
    </div>
  )
}

function ToolRow({ t }) {
  const inst = installs[t.id]
  return (
    <div className="flex min-w-0 flex-col gap-3 px-4 py-3.5 md:flex-row md:items-center md:gap-5">
      <div className="flex min-w-0 items-center gap-3 md:w-64 md:shrink-0">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[0.7rem] font-semibold text-white"
          style={{ background: t.color }}
        >
          {t.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.9rem] font-semibold text-text">{t.name}</p>
          <p className="truncate text-[0.72rem] text-text-dim">by {t.vendor}</p>
        </div>
        <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-[0.66rem] text-text-muted">
          {typeLabel[inst.type]}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <CommandBlock type={inst.type} cmd={inst.cmd} />
      </div>
    </div>
  )
}

const hubCategories = categories.filter((c) => c.id !== 'all')

export default function LearningHub() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(hubCategories[0].id)

  const byCategory = useMemo(() => {
    const map = {}
    for (const cat of hubCategories) {
      map[cat.id] = tools
        .filter((t) => t.category === cat.id && installs[t.id])
        .sort((a, b) => a.name.localeCompare(b.name))
    }
    return map
  }, [])

  const q = query.trim().toLowerCase()
  const groups = q
    ? hubCategories
        .map((cat) => ({
          ...cat,
          items: byCategory[cat.id].filter((t) => `${t.name} ${t.vendor}`.toLowerCase().includes(q)),
        }))
        .filter((g) => g.items.length > 0)
    : hubCategories.filter((c) => c.id === active).map((cat) => ({ ...cat, items: byCategory[cat.id] }))

  const shown = groups.reduce((n, g) => n + g.items.length, 0)

  return (
    <section id="learning-hub" className="scroll-mt-20 border-b border-border/80">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="mb-8">
          <p className="mb-3 text-[0.72rem] font-semibold tracking-[0.14em] text-accent-soft">LEARNING HUB</p>
          <h2 className="text-[2rem] font-semibold tracking-tight text-text sm:text-[2.35rem]">Install guide.</h2>
          <p className="mt-2 max-w-2xl text-text-muted">
            Set up your environment once, then install any tool in the directory with a single command.
          </p>
        </div>

        <p className="mb-3 text-[0.68rem] font-semibold tracking-[0.12em] text-text-dim">BEFORE YOU START</p>
        <ol className="mb-12 grid gap-4 md:grid-cols-3">
          {prerequisites.map((p, i) => (
            <li key={p.id} className="flex min-w-0 flex-col rounded-xl border border-border bg-bg-card p-4">
              <div className="mb-2 flex items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent-deep text-[0.75rem] font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="text-[0.95rem] font-semibold leading-tight tracking-tight text-text">{p.title}</h3>
              </div>
              <p className="mb-3 flex-1 text-[0.8rem] leading-relaxed text-text-muted">{p.body}</p>
              <CommandBlock type="script" cmd={p.cmd} />
            </li>
          ))}
        </ol>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent-deep text-[0.75rem] font-semibold text-white">
              4
            </span>
            <div>
              <h3 className="text-[1.1rem] font-semibold tracking-tight text-text">Install your tools</h3>
              <p className="text-[0.78rem] text-text-dim">
                {q ? `${shown} ${shown === 1 ? 'match' : 'matches'} across all categories` : 'Pick a category, then copy the command you need.'}
              </p>
            </div>
          </div>
          <label className="relative sm:w-72">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-dim" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search all tools..."
              className="w-full rounded-lg border border-border bg-bg-elevated py-2.5 pl-10 pr-3 text-[0.9rem] text-text placeholder:text-text-dim outline-none transition focus:border-accent-muted"
            />
          </label>
        </div>

        {!q && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {hubCategories.map((cat) => {
              const Icon = categoryIcons[cat.icon]
              const isActive = active === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActive(cat.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-[0.82rem] transition ${
                    isActive
                      ? 'border-accent-deep bg-accent-deep text-white'
                      : 'border-border text-text-muted hover:border-accent-muted hover:text-text'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {cat.label}
                  <span className={`text-[0.72rem] tabular-nums ${isActive ? 'text-white/80' : 'text-text-dim'}`}>
                    {byCategory[cat.id].length}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {groups.length === 0 ? (
          <div className="rounded-xl border border-border bg-bg-card px-6 py-12 text-center text-text-muted">
            No tools match your search.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {groups.map((g) => (
              <div key={g.id}>
                {q && (
                  <h4 className="mb-2 text-[0.7rem] font-semibold tracking-[0.12em] text-text-dim">
                    {g.label.toUpperCase()} · {g.items.length}
                  </h4>
                )}
                <div className="divide-y divide-border/70 overflow-hidden rounded-xl border border-border bg-bg-card">
                  {g.items.map((t) => (
                    <ToolRow key={t.id} t={t} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-6 text-[0.78rem] text-text-dim">
          Commands target Debian, Ubuntu, and Kali Linux. Check each tool's official docs for other platforms, and only use these tools on systems you are authorized to test.
        </p>
      </div>
    </section>
  )
}

