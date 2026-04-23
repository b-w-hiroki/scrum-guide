export default function Footer() {
  const links = [
    { id: 'terms', label: '用語集' },
    { id: 'process', label: '流れ' },
    { id: 'practical', label: '実践' },
    { id: 'companies', label: '企業' },
  ]

  return (
    <footer className="border-t border-surface-200 bg-ink-900 px-4 py-8 text-surface-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm md:flex-row">
        <p className="font-serif font-semibold text-white">スクラム開発 完全ガイド</p>
        <div className="flex gap-3">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="font-mono text-xs text-ink-300">© 2026 Scrum Guide</p>
      </div>
    </footer>
  )
}
