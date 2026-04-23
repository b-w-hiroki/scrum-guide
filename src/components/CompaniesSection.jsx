import { useEffect, useMemo, useRef, useState } from 'react'
import SectionHeader from './ui/SectionHeader'
import Badge from './ui/Badge'
import { useInView } from '../hooks/useInView'

const FILTER_LABELS = {
  all: 'すべて',
  tech: '海外テック',
  jp: '日本企業',
  'non-tech': 'その他業界',
}

export default function CompaniesSection({ companies }) {
  const [sectionRef, isInView] = useInView()
  const [active, setActive] = useState('all')
  const [visible, setVisible] = useState(true)
  const timerRef = useRef(null)
  const list = useMemo(
    () => (active === 'all' ? companies : companies.filter((item) => item.category === active)),
    [active, companies],
  )
  const filters = useMemo(() => Object.entries(FILTER_LABELS).map(([key, label]) => ({ key, label })), [])

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
      className={`mx-auto max-w-6xl border-t border-surface-200 bg-surface-0 px-4 py-20 transition-all duration-700 ease-out ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <SectionHeader label="companies" title="活用している企業" />
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => handleFilterChange(f.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
              active === f.key
                ? 'border border-transparent bg-brand-500 text-white shadow-md shadow-brand-200 hover:bg-brand-600'
                : 'border-2 border-surface-300 text-ink-700 hover:border-brand-400 hover:text-brand-600'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className={`grid grid-cols-1 gap-4 transition-opacity duration-200 md:grid-cols-2 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {list.map((company, i) => (
          <article
            key={company.name}
            className="relative rounded-2xl border border-surface-200 bg-white p-5 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-md"
            style={{
              transitionDelay: isInView ? `${i * 60}ms` : '0ms',
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            <Badge label={FILTER_LABELS[company.category] || company.category} className="absolute right-3 top-3" />
            <h3 className="mb-1 text-base font-semibold text-ink-900">{company.name}</h3>
            <p className="mb-2 font-mono text-xs text-ink-500">{company.country}</p>
            <p className="text-sm leading-relaxed text-ink-700">{company.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
