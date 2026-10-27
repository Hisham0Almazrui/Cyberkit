import { ArrowRight, ArrowUpRight } from './Icons'

const licenseStyles = {
  Commercial: 'text-license-commercial border-license-commercial/30 bg-license-commercial/10',
  Freemium: 'text-license-freemium border-license-freemium/30 bg-license-freemium/10',
  Free: 'text-license-free border-license-free/30 bg-license-free/10',
  'Open source': 'text-license-oss border-license-oss/30 bg-license-oss/10',
}

const licenseDot = {
  Commercial: 'bg-license-commercial',
  Freemium: 'bg-license-freemium',
  Free: 'bg-license-free',
  'Open source': 'bg-license-oss',
}

export default function ToolCard({ tool, compared, onToggleCompare }) {
  return (
    <article className="group flex flex-col rounded-xl border border-border bg-bg-card p-5 transition duration-200 hover:border-accent-muted hover:bg-bg-card-hover">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[0.85rem] font-semibold text-white"
          style={{ background: tool.color }}
        >
          {tool.initials}
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-medium ${licenseStyles[tool.license] || licenseStyles['Open source']}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${licenseDot[tool.license] || licenseDot['Open source']}`} />
          {tool.license}
        </span>
      </div>

      <div className="mb-2 flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-1.5 text-[1.05rem] font-semibold tracking-tight text-text">
            <span className="truncate">{tool.name}</span>
            <a
              href={tool.url}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 text-text-dim opacity-60 transition group-hover:opacity-100 hover:text-accent-soft"
              aria-label={`Open ${tool.name}`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </h3>
          <p className="mt-0.5 text-[0.8rem] text-text-dim">by {tool.vendor}</p>
        </div>
      </div>

      <p className="mb-4 flex-1 text-[0.875rem] leading-relaxed text-text-muted line-clamp-3">
        {tool.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-border px-2 py-0.5 text-[0.7rem] text-text-dim"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border/70 pt-3.5">
        <a
          href={tool.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-accent-soft transition hover:text-accent"
        >
          View tool
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
        <label className="inline-flex cursor-pointer items-center gap-2 text-[0.8rem] text-text-dim select-none">
          <input
            type="checkbox"
            checked={compared}
            onChange={() => onToggleCompare(tool.id)}
            className="h-3.5 w-3.5 appearance-none rounded-[3px] border border-border bg-transparent checked:border-accent-deep checked:bg-accent-deep transition"
          />
          Compare
        </label>
      </div>
    </article>
  )
}
