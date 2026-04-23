import { useState } from 'react'

export default function PracticalSection({ practicalTips }) {
  const [active, setActive] = useState(practicalTips[0]?.category)
  const current = practicalTips.find((tip) => tip.category === active) || practicalTips[0]

  return (
    <section id="practical" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="mb-8 text-3xl font-bold">実用的な使い方</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        {practicalTips.map((tip) => (
          <button
            key={tip.category}
            type="button"
            onClick={() => setActive(tip.category)}
            className={`rounded-full px-4 py-2 text-sm ${active === tip.category ? 'bg-brand-purple text-white' : 'bg-slate-800 text-slate-300'}`}
          >
            {tip.icon} {tip.category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {current.items.map((item) => (
          <article key={item.name} className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
            <h3 className="mb-2 font-semibold">{item.name}</h3>
            <p className="text-sm text-slate-300">{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
