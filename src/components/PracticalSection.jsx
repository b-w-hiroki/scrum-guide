import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'

export default function PracticalSection({ practicalTips }) {
  const [sectionRef, isInView] = useInView()
  const [active, setActive] = useState(practicalTips[0]?.category)
  const [visible, setVisible] = useState(true)
  const timerRef = useRef(null)

  const current = practicalTips.find((tip) => tip.category === active) || practicalTips[0]

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleTabChange = (nextCategory) => {
    if (nextCategory === active) return
    setVisible(false)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setActive(nextCategory)
      setVisible(true)
    }, 120)
  }

  const handleTabKeyDown = (event, index) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const nextIndex =
      event.key === 'ArrowRight'
        ? (index + 1) % practicalTips.length
        : (index - 1 + practicalTips.length) % practicalTips.length
    const nextCategory = practicalTips[nextIndex]?.category
    if (!nextCategory) return
    handleTabChange(nextCategory)
    requestAnimationFrame(() => {
      document.getElementById(`tab-${nextCategory}`)?.focus()
    })
  }

  return (
    <section
      id="practical"
      ref={sectionRef}
      className={`mx-auto max-w-6xl border-t border-surface-200 bg-surface-50 px-4 py-20 transition-all duration-700 ease-out ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <h2 className="mb-8 font-serif text-3xl font-bold text-ink-900">実用的な使い方</h2>
      <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="実用的な使い方のカテゴリ">
        {practicalTips.map((tip, index) => (
          <button
            key={tip.category}
            type="button"
            role="tab"
            aria-selected={active === tip.category}
            aria-controls={`tabpanel-${tip.category}`}
            id={`tab-${tip.category}`}
            onClick={() => handleTabChange(tip.category)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
              active === tip.category
                ? 'bg-brand-500 text-white shadow-sm shadow-brand-200'
                : 'bg-surface-100 text-ink-500 hover:bg-surface-200'
            }`}
          >
            {tip.icon} {tip.category}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`tabpanel-${current.category}`}
        aria-labelledby={`tab-${current.category}`}
        tabIndex={0}
        className={`grid grid-cols-1 gap-4 transition-all duration-200 md:grid-cols-2 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
      >
        {current.items.map((item) => (
          <article key={item.name} className="rounded-2xl border border-surface-200 bg-white p-5 shadow-sm">
            <h3 className="mb-2 text-base font-semibold text-ink-900">{item.name}</h3>
            <p className="text-sm leading-relaxed text-ink-700">{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
