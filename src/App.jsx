import { useState, useCallback, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Directory from './components/Directory'
import GuideCTA from './components/GuideCTA'
import CompareBar from './components/CompareBar'

export default function App() {
  const [compareIds, setCompareIds] = useState(() => new Set())
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const onToggleTheme = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }, [])

  const onToggleCompare = useCallback((id) => {
    setCompareIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else {
        if (next.size >= 4) return prev
        next.add(id)
      }
      return next
    })
  }, [])

  const onRemove = useCallback((id) => {
    setCompareIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }, [])

  const onClear = useCallback(() => setCompareIds(new Set()), [])

  return (
    <div id="top" className="min-h-screen bg-bg text-text">
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <main>
        <Hero />
        <Directory compareIds={compareIds} onToggleCompare={onToggleCompare} />
        <GuideCTA />
      </main>

      <footer className="border-t border-border/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-[0.8rem] text-text-dim sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-2">
            <span className="font-medium text-text-muted">CyberKit.</span>
            <span>Independently curated security toolkit.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#directory" className="hover:text-text-muted">Directory</a>
            <a href="#guide" className="hover:text-text-muted">Assessment guide</a>
          </div>
        </div>
      </footer>

      <CompareBar compareIds={compareIds} onClear={onClear} onRemove={onRemove} />
    </div>
  )
}
