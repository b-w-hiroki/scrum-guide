const colorMap = {
  indigo: 'bg-brand-100 text-brand-700',
  blue: 'bg-brand-100 text-brand-700',
  green: 'bg-emerald-100 text-emerald-700',
  orange: 'bg-orange-100 text-orange-700',
  purple: 'bg-violet-100 text-violet-700',
  gray: 'bg-surface-200 text-ink-700',
}

export default function Badge({ label, color = 'gray', className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs font-medium ${colorMap[color] || colorMap.gray} ${className}`}>
      {label}
    </span>
  )
}
