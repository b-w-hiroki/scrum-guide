import Card from './ui/Card'
import SectionHeader from './ui/SectionHeader'
import { useInView } from '../hooks/useInView'

const badgeMap = {
  purple: 'bg-purple-500',
  blue: 'bg-blue-500',
  teal: 'bg-teal-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
  pink: 'bg-pink-500',
}

export default function TermsSection({ terms }) {
  const [sectionRef, isInView] = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section
      id="terms"
      ref={sectionRef}
      className={`mx-auto max-w-6xl px-4 py-20 transition-all duration-500 ease-out ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <SectionHeader label="terms" title="スクラム用語集" />
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        {terms.map((item, idx) => (
          <Card key={item.id} className={`h-full flex flex-col bg-slate-900 transition-all duration-500 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`} style={{ transitionDelay: `${idx * 40}ms` }}>
            <span className={`mb-3 inline-block h-2 w-12 rounded ${badgeMap[item.color] || 'bg-slate-500'}`} />
            <h3 className="mb-2 text-lg font-semibold">{item.term}</h3>
            <p className="flex-grow text-sm leading-relaxed text-slate-300">{item.definition}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
