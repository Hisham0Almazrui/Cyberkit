import { ShieldLogo, SunIcon, MoonIcon, ArrowUpRight } from './Icons'

const nav = [
  { id: 'directory', label: 'Tool directory', href: '#directory' },
  { id: 'compare', label: 'Compare tools', href: '#directory' },
  { id: 'learning', label: 'Learning hub', href: '#guide' },
]

export default function Header({ active = 'directory', theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 shrink-0 group">
          <ShieldLogo className="h-7 w-7 text-accent-deep transition-transform group-hover:scale-105" />
          <span className="text-[1.05rem] font-semibold tracking-tight text-text">
            CyberKit<span className="text-accent-soft">.</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {nav.map((item) => {
            const isActive = item.id === active
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative text-[0.9rem] transition-colors ${
                  isActive ? 'text-text' : 'text-text-muted hover:text-text'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-[1.35rem] left-0 right-0 h-[2px] rounded-full bg-accent-deep" />
                )}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-text-muted transition hover:border-accent-muted hover:text-text"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <a
            href="#guide"
            className="hidden sm:inline-flex items-center gap-1.5 text-[0.9rem] text-text-muted transition hover:text-text"
          >
            Assessment guide
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  )
}
