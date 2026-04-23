export default function ExamplesSection({ examples }) {
  return (
    <section id="examples" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="mb-8 text-3xl font-bold">実例・ケーススタディ</h2>
      <div className="space-y-5">
        {examples.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
            <h3 className="mb-1 text-xl font-semibold">{item.title}</h3>
            <p className="mb-4 text-sm text-slate-400">{item.context}</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-xl bg-slate-800 p-4">
                <p className="mb-1 text-sm font-semibold">Before</p>
                <p className="text-sm text-slate-300">{item.before}</p>
              </div>
              <div className="rounded-xl bg-green-900/40 p-4">
                <p className="mb-1 text-sm font-semibold text-green-300">After</p>
                <p className="text-sm text-slate-200">{item.after}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-1 text-sm">
              {item.points.map((point) => <li key={point}>✅ {point}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
