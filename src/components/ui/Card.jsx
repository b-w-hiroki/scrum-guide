export default function Card({ children, className = '', onClick, style }) {
  return (
    <article
      className={`rounded-2xl border border-gray-700 bg-gray-800 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </article>
  )
}
