import { useInView } from '../hooks/useInView'
import SectionHeader from './ui/SectionHeader'

const CAUTION_META = {
  antipattern: {
    icon: '❌',
    label: 'アンチパターン',
    badgeClass: 'bg-red-900/50 text-red-300 border border-red-800',
  },
  caution: {
    icon: '⚠️',
    label: '注意点',
    badgeClass: 'bg-yellow-900/50 text-yellow-300 border border-yellow-800',
  },
}

export default function CautionsSection({ cautions }) {
  const [sectionRef, isInView] = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section
      id="cautions"
      ref={sectionRef}
      className={`mx-auto max-w-6xl px-4 py-20 transition-all duration-500 ease-out ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <SectionHeader label="cautions" title="注意点・アンチパターン" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cautions.map((item) => {
          const meta = CAUTION_META[item.type] || CAUTION_META.caution
          const style = item.type === 'antipattern'
            ? 'border-red-700/60 bg-red-950/30'
            : 'border-yellow-700/60 bg-yellow-950/20'
          return (
            <article key={item.title} className={`rounded-2xl border p-5 ${style}`}>
              <div className="mb-2 flex items-center gap-2">
                <span aria-hidden="true">{meta.icon}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${meta.badgeClass}`}>
                  {meta.label}
                </span>
              </div>
              <h3 className="mb-2 font-semibold">{item.title}</h3>
              <p className="mb-2 text-sm text-slate-300"><span className="font-semibold">問題:</span> {item.description}</p>
              <p className="text-sm text-slate-200"><span className="font-semibold">解決策:</span> {item.solution}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
