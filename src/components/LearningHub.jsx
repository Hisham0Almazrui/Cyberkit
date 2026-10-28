import { useMemo, useState } from 'react'
import { SearchIcon, TerminalIcon } from './Icons'
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
        className={`min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-[0.78rem] ${
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

export default function LearningHub() {
  const [query, setQuery] = useState('')

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    return categories
      .filter((c) => c.id !== 'all')
      .map((cat) => ({
        ...cat,
        items: tools
          .filter((t) => t.category === cat.id && installs[t.id])
          .filter((t) => !q || `${t.name} ${t.vendor}`.toLowerCase().includes(q))
          .sort((a, b) => a.name.localeCompare(b.name)),
      }))
      .filter((g) => g.items.length > 0)
  }, [query])

  const shown = groups.reduce((n, g) => n + g.items.length, 0)

  return (
    <section id="learning-hub" className="scroll-mt-20 border-b border-border/80">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="mb-10">
          <p className="mb-3 text-[0.72rem] font-semibold tracking-[0.14em] text-accent-soft">LEARNING HUB</p>
          <h2 className="text-[2rem] font-semibold tracking-tight text-text sm:text-[2.35rem]">
            Install guide.
          </h2>
          <p className="mt-2 max-w-2xl text-text-muted">
            Set up your environment once, then install any tool in the directory with a single command.
          </p>
        </div>

        <ol className="mb-12 grid gap-4 lg:grid-cols-3">
          {prerequisites.map((p, i) => (
            <li key={p.id} className="flex min-w-0 flex-col rounded-xl border border-border bg-bg-card p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-deep text-[0.8rem] font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="text-[1rem] font-semibold tracking-tight text-text">{p.title}</h3>
              </div>
              <p className="mb-4 flex-1 text-[0.85rem] leading-relaxed text-text-muted">{p.body}</p>
              <CommandBlock type="script" cmd={p.cmd} />
            </li>
          ))}
        </ol>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-muted/50 text-accent-soft">
              <TerminalIcon className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-[1.15rem] font-semibold tracking-tight text-text">4. Install your tools</h3>
              <p className="text-[0.8rem] text-text-dim">Showing {shown} tools</p>
            </div>
          </div>
          <label className="relative sm:w-80">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-dim" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a tool..."
              className="w-full rounded-lg border border-border bg-bg-elevated py-2.5 pl-10 pr-3 text-[0.9rem] text-text placeholder:text-text-dim outline-none transition focus:border-accent-muted"
            />
          </label>
        </div>

        {groups.length === 0 ? (
          <div className="rounded-xl border border-border bg-bg-card px-6 py-12 text-center text-text-muted">
            No tools match your search.
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {groups.map((g) => (
              <div key={g.id}>
                <h4 className="mb-3 text-[0.72rem] font-semibold tracking-[0.12em] text-text-dim">
                  {g.label.toUpperCase()} · {g.items.length}
                </h4>
                <div className="grid gap-3 lg:grid-cols-2">
                  {g.items.map((t) => {
                    const inst = installs[t.id]
                    return (
                      <div key={t.id} className="min-w-0 rounded-xl border border-border bg-bg-card p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <span
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[0.7rem] font-semibold text-white"
                              style={{ background: t.color }}
                            >
                              {t.initials}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-[0.92rem] font-semibold text-text">{t.name}</p>
                              <p className="truncate text-[0.75rem] text-text-dim">by {t.vendor}</p>
                            </div>
                          </div>
                          <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-[0.68rem] text-text-muted">
                            {typeLabel[inst.type]}
                          </span>
                        </div>
                        <CommandBlock type={inst.type} cmd={inst.cmd} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-8 text-[0.8rem] text-text-dim">
          Commands target Debian, Ubuntu, and Kali Linux. Check each tool's official docs for other platforms, and only use these tools on systems you are authorized to test.
        </p>
      </div>
    </section>
  )
}
