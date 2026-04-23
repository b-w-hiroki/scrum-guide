import { useEffect, useMemo, useRef, useState } from 'react'
import SectionHeader from './ui/SectionHeader'
import Badge from './ui/Badge'
import { useInView } from '../hooks/useInView'

const filters = [
  { key: 'all', label: 'すべて' },
  { key: 'tech', label: '海外テック' },
  { key: 'jp', label: '日本企業' },
  { key: 'non-tech', label: 'その他業界' },
]

export default function CompaniesSection({ companies }) {
  const [sectionRef, isInView] = useInView({ threshold: 0.15, triggerOnce: true })
  const [active, setActive] = useState('all')
  const [visible, setVisible] = useState(true)
  const timerRef = useRef(null)
  const list = useMemo(
    () => (active === 'all' ? companies : companies.filter((item) => item.category === active)),
    [active, companies],
  )
  const filterLabels = useMemo(() => Object.fromEntries(filters.map((f) => [f.key, f.label])), [])

  const handleFilterChange = (nextKey) => {
    if (nextKey === active) return
    setVisible(false)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setActive(nextKey)
      setVisible(true)
    }, 120)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <section
      id="companies"
      ref={sectionRef}
      className={`mx-auto max-w-6xl px-4 py-20 transition-all duration-500 ease-out ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <SectionHeader label="companies" title="活用している企業" />
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => handleFilterChange(f.key)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
              active === f.key
                ? 'border border-transparent bg-indigo-600 text-white shadow-sm shadow-indigo-900'
                : 'border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className={`grid grid-cols-1 gap-4 transition-opacity duration-200 md:grid-cols-2 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {list.map((company) => (
          <article key={company.name} className="relative rounded-2xl border border-slate-700 bg-slate-900 p-5">
            <Badge label={filterLabels[company.category]} className="absolute right-3 top-3" />
            <h3 className="mb-1 text-xl font-semibold">{company.name}</h3>
            <p className="mb-2 text-sm text-brand-teal">{company.country}</p>
            <p className="text-sm text-slate-300">{company.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
