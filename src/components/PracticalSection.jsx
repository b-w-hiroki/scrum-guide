import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'

export default function PracticalSection({ practicalTips }) {
  const [sectionRef, isInView] = useInView({ threshold: 0.15, triggerOnce: true })
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
    }, 150)
  }

  return (
    <section
      id="practical"
      ref={sectionRef}
      className={`mx-auto max-w-6xl px-4 py-20 transition-all duration-500 ease-out ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <h2 className="mb-8 text-3xl font-bold">実用的な使い方</h2>
      <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="実用的な使い方のカテゴリ">
        {practicalTips.map((tip) => (
          <button
            key={tip.category}
            type="button"
            role="tab"
            aria-selected={active === tip.category}
            aria-controls={`tabpanel-${tip.category}`}
            onClick={() => handleTabChange(tip.category)}
            className={`rounded-lg border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
              active === tip.category
                ? 'border-indigo-600 bg-indigo-600 text-white shadow-md'
                : 'border-gray-700 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
            }`}
          >
            {tip.icon} {tip.category}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`tabpanel-${current.category}`}
        className={`grid grid-cols-1 gap-4 transition-opacity duration-200 md:grid-cols-2 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
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
