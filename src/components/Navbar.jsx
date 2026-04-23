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
      { threshold: 0.4 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/70 bg-slate-950/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#hero" className="font-bold text-brand-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">スクラム開発 完全ガイド</a>
        <button
          className="md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
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
                className={`relative transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  activeId === link.id ? 'font-medium text-indigo-400 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-indigo-400 after:content-[""]' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul className="space-y-2 border-t border-slate-700/70 px-4 pb-4 pt-2">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`block py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  activeId === link.id ? 'font-medium text-indigo-400' : 'text-gray-400 hover:text-white'
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
