export default function Card({ children, className = '', onClick, style }) {
  return (
    <div
      className={`h-full flex flex-col rounded-2xl border border-surface-200 bg-white p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  )
}
