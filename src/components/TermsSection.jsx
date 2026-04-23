const badgeMap = {
  purple: 'bg-purple-500',
  blue: 'bg-blue-500',
  teal: 'bg-teal-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
  pink: 'bg-pink-500',
}

export default function TermsSection({ terms }) {
  return (
    <section id="terms" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="mb-8 text-3xl font-bold">スクラム用語集</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {terms.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow transition hover:-translate-y-1 hover:shadow-lg">
            <span className={`mb-3 inline-block h-2 w-12 rounded ${badgeMap[item.color] || 'bg-slate-500'}`} />
            <h3 className="mb-2 text-lg font-semibold">{item.term}</h3>
            <p className="text-sm text-slate-300">{item.definition}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
