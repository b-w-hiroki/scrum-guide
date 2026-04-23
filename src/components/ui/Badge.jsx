const colorMap = {
  indigo: 'bg-indigo-900 text-indigo-300',
  green: 'bg-green-900 text-green-300',
  orange: 'bg-orange-900 text-orange-300',
  gray: 'bg-gray-700 text-gray-300',
}

export default function Badge({ label, color = 'gray', className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorMap[color] || colorMap.gray} ${className}`}>
      {label}
    </span>
  )
}
