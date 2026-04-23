import { useMemo, useState } from 'react'

const filters = [
  { key: 'all', label: '全て' },
  { key: 'tech', label: '海外テック' },
  { key: 'jp', label: '日本' },
  { key: 'non-tech', label: 'その他業界' },
]

export default function CompaniesSection({ companies }) {
  const [active, setActive] = useState('all')
  const list = useMemo(
    () => (active === 'all' ? companies : companies.filter((item) => item.category === active)),
    [active, companies],
  )

  return (
    <section id="companies" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="mb-8 text-3xl font-bold">活用している企業</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActive(f.key)}
            className={`rounded-full px-4 py-2 text-sm ${active === f.key ? 'bg-brand-purple text-white' : 'bg-slate-800 text-slate-300'}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {list.map((company) => (
          <article key={company.name} className="relative rounded-2xl border border-slate-700 bg-slate-900 p-5">
            <span className="absolute right-3 top-3 rounded-full bg-slate-800 px-2 py-1 text-xs">{company.category}</span>
            <h3 className="mb-1 text-xl font-semibold">{company.name}</h3>
            <p className="mb-2 text-sm text-brand-teal">{company.country}</p>
            <p className="text-sm text-slate-300">{company.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
