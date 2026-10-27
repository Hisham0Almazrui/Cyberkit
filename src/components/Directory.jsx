import { useMemo, useState } from 'react'
import {
  SearchIcon,
  ChevronDown,
  ArrowUpRight,
  BookIcon,
  ShieldSmall,
  categoryIcons,
} from './Icons'
import ToolCard from './ToolCard'
import { categories, licenses, tools, getCategoryCounts } from '../data/tools'

export default function Directory({ compareIds, onToggleCompare }) {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [license, setLicense] = useState('All licenses')
  const [sort, setSort] = useState('featured')
  const counts = useMemo(() => getCategoryCounts(), [])

  const filtered = useMemo(() => {
    let list = tools.filter((t) => {
      if (category !== 'all' && t.category !== category) return false
      if (license !== 'All licenses' && t.license !== license) return false
      if (query.trim()) {
        const q = query.toLowerCase()
        const hay = `${t.name} ${t.vendor} ${t.description} ${t.tags.join(' ')}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })

    if (sort === 'featured') {
      list = [...list].sort((a, b) => {
        const ao = a.order ?? (a.featured ? 100 : 999)
        const bo = b.order ?? (b.featured ? 100 : 999)
        return ao - bo || a.name.localeCompare(b.name)
      })
    } else if (sort === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === 'license') {
      list = [...list].sort((a, b) => a.license.localeCompare(b.license) || a.name.localeCompare(b.name))
    }
    return list
  }, [category, query, license, sort])

  return (
    <section id="directory" className="scroll-mt-20 border-b border-border/80">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[0.72rem] font-semibold tracking-[0.14em] text-accent-soft">
              THE DIRECTORY
            </p>
            <h2 className="text-[2rem] font-semibold tracking-tight text-text sm:text-[2.35rem]">
              Find your next security tool.
            </h2>
            <p className="mt-2 max-w-xl text-text-muted">
              Explore trusted tools for every layer of your security assessment.
            </p>
          </div>
          <a
            href="#directory"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-border px-3.5 py-2 text-[0.85rem] text-text-muted transition hover:border-accent-muted hover:text-text sm:self-auto"
          >
            {tools.length} curated tools
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-10">
          <aside className="flex flex-col gap-6">
            <div>
              <p className="mb-3 text-[0.68rem] font-semibold tracking-[0.12em] text-text-dim">
                CATEGORIES
              </p>
              <nav className="flex flex-col gap-0.5">
                {categories.map((cat) => {
                  const Icon = categoryIcons[cat.icon]
                  const active = category === cat.id
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[0.875rem] transition ${
                        active
                          ? 'bg-accent-deep/25 text-text'
                          : 'text-text-muted hover:bg-bg-elevated hover:text-text'
                      }`}
                    >
                      {Icon && <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-accent-soft' : ''}`} />}
                      <span className="flex-1 truncate">{cat.label}</span>
                      <span className={`text-[0.75rem] tabular-nums ${active ? 'text-accent-soft' : 'text-text-dim'}`}>
                        {counts[cat.id] ?? 0}
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>

            <div className="rounded-xl border border-accent-muted/40 bg-gradient-to-br from-promo-from to-promo-to p-4">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md border border-accent-muted/50 text-accent-soft">
                <BookIcon />
              </div>
              <p className="mb-1 text-[0.9rem] font-medium text-text">New to assessments?</p>
              <p className="mb-3 text-[0.8rem] leading-relaxed text-text-muted">
                Learn how to scope, discover, and prioritize findings with a practical starter plan.
              </p>
              <a href="#guide" className="inline-flex items-center gap-1 text-[0.85rem] font-medium text-accent-soft hover:text-accent">
                Read the starter guide
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="mt-auto flex items-center gap-2 text-[0.75rem] text-text-dim">
              <ShieldSmall className="h-3.5 w-3.5 text-accent-muted" />
              Knowledge for better security
            </p>
          </aside>

          <div>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row">
              <label className="relative flex-1">
                <SearchIcon className="h-4 w-4 pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-dim" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tools, capabilities, or keywords..."
                  className="w-full rounded-lg border border-border bg-bg-elevated py-2.5 pl-10 pr-3 text-[0.9rem] text-text placeholder:text-text-dim outline-none transition focus:border-accent-muted"
                />
              </label>
              <div className="relative">
                <select
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  className="h-full min-w-[150px] appearance-none rounded-lg border border-border bg-bg-elevated py-2.5 pl-3.5 pr-9 text-[0.875rem] text-text-muted outline-none transition focus:border-accent-muted"
                >
                  {licenses.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                <ChevronDown className="h-3.5 w-3.5 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-dim" />
              </div>
            </div>

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[0.85rem] text-text-dim">
                Showing <span className="text-text-muted">{filtered.length}</span> tools
              </p>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none rounded-md border border-transparent bg-transparent py-1 pl-0 pr-7 text-[0.85rem] text-text-muted outline-none"
                >
                  <option value="featured">Sort by: Featured first</option>
                  <option value="name">Sort by: Name</option>
                  <option value="license">Sort by: License</option>
                </select>
                <ChevronDown className="h-3.5 w-3.5 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-text-dim" />
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-border bg-bg-card px-6 py-16 text-center text-text-muted">
                No tools match your filters. Try another search or category.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    compared={compareIds.has(tool.id)}
                    onToggleCompare={onToggleCompare}
                  />
                ))}
              </div>
            )}

            <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-[0.8rem] text-text-dim sm:flex-row sm:justify-between">
              <span>You&apos;re exploring our curated collection.</span>
              <span>Built for discovery. Made for informed decisions.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
