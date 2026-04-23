import { useState } from 'react'

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

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/70 bg-slate-950/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#hero" className="font-bold text-brand-purple">スクラム開発 完全ガイド</a>
        <button className="md:hidden" onClick={() => setOpen((v) => !v)} type="button">
          ☰
        </button>
        <ul className="hidden gap-4 text-sm md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} className="text-slate-200 hover:text-brand-teal">{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      {open && (
        <ul className="space-y-2 border-t border-slate-700/70 px-4 pb-4 md:hidden">
          {links.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} className="block py-1 text-slate-200" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
