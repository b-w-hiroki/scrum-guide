import { useEffect, useState } from 'react'

const links = [
  { id: 'hero', label: '概要' },
  { id: 'terms', label: '用語集' },
  { id: 'roles', label: '役割' },
  { id: 'process', label: '流れ' },
  { id: 'practical', label: '実践' },
  { id: 'cautions', label: '注意点' },
  { id: 'examples', label: '実例' },
  { id: 'companies', label: '企業' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sectionIds = ['hero', 'terms', 'roles', 'process', 'practical', 'cautions', 'examples', 'companies']
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { threshold: 0.45 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 border-b border-surface-200 bg-white/80 backdrop-blur-md transition-shadow duration-200 ${scrolled ? 'shadow-sm' : ''}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#hero" className="font-serif font-semibold text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">スクラム開発 完全ガイド</a>
        <button
          className="text-ink-700 transition-transform duration-100 active:scale-95 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          onClick={() => setOpen((v) => !v)}
          type="button"
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
        >
          {open ? '✕' : '☰'}
        </button>
        <ul className="hidden gap-4 text-sm md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`relative text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                  activeId === link.id
                    ? "text-brand-600 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-brand-500"
                    : 'text-ink-500 hover:text-ink-900'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${open ? 'max-h-[400px] opacity-100' : 'pointer-events-none max-h-0 opacity-0'}`}>
        <ul className="space-y-2 border-t border-surface-200 px-4 pb-4 pt-2">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`block text-sm font-medium py-1 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                  activeId === link.id ? 'text-brand-600' : 'text-ink-500 hover:text-ink-900'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
