import { useInView } from '../hooks/useInView'
import SectionHeader from './ui/SectionHeader'

export default function ExamplesSection({ examples }) {
  const [sectionRef, isInView] = useInView()

  return (
    <section
      id="examples"
      ref={sectionRef}
      className={`mx-auto max-w-6xl border-t border-surface-200 bg-surface-50 px-4 py-20 transition-all duration-700 ease-out ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <SectionHeader label="examples" title="実例・ケーススタディ" />
      <div className="space-y-5">
        {examples.map((item) => (
          <article key={item.title} className="rounded-2xl border border-surface-200 bg-white p-5 shadow-sm">
            <h3 className="mb-1 text-base font-semibold text-ink-900">{item.title}</h3>
            <p className="mb-4 font-mono text-xs text-ink-500">{item.context}</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-xl bg-surface-100 p-4">
                <p className="mb-1 text-sm font-semibold text-ink-900">Before</p>
                <p className="text-sm leading-relaxed text-ink-700">{item.before}</p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="mb-1 text-sm font-semibold text-emerald-700">After</p>
                <p className="text-sm leading-relaxed text-ink-700">{item.after}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-1 text-sm text-ink-700">
              {item.points.map((point) => <li key={point}><span className="mr-2 font-bold text-brand-500">✓</span>{point}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
