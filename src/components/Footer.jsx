export default function Footer() {
  const links = [
    { id: 'terms', label: '用語集' },
    { id: 'process', label: '流れ' },
    { id: 'practical', label: '実践' },
    { id: 'companies', label: '企業' },
  ]

  return (
    <footer className="border-t border-slate-800 px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-slate-400 md:flex-row">
        <p>スクラム開発 完全ガイド</p>
        <div className="flex gap-3">
          {links.map((link) => <a key={link.id} href={`#${link.id}`} className="hover:text-slate-200">{link.label}</a>)}
        </div>
        <p>© 2026 Scrum Guide</p>
      </div>
    </footer>
  )
}
