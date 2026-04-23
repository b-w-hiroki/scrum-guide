export default function SectionHeader({ label, title, className = '' }) {
  return (
    <div className={className}>
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-500">{label}</p>
      <h2 className="mb-12 font-serif text-3xl font-bold leading-tight text-ink-900 md:text-4xl">{title}</h2>
    </div>
  )
}
