export default function SectionHeader({ label, title, className = '' }) {
  return (
    <div className={className}>
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-indigo-400">{label}</p>
      <h2 className="mb-10 text-3xl font-bold text-white">{title}</h2>
    </div>
  )
}
