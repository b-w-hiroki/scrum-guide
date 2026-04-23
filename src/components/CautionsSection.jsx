import { useInView } from '../hooks/useInView'

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
      <h2 className="mb-8 text-3xl font-bold">注意点・アンチパターン</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cautions.map((item) => {
          const style = item.type === 'antipattern'
            ? 'border-red-700/60 bg-red-950/30'
            : 'border-yellow-700/60 bg-yellow-950/20'
          const label = item.type === 'antipattern' ? '❌ アンチパターン' : '⚠️ 注意点'
          return (
            <article key={item.title} className={`rounded-2xl border p-5 ${style}`}>
              <p className="mb-2 text-xs font-semibold tracking-wide text-slate-300">{label}</p>
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
