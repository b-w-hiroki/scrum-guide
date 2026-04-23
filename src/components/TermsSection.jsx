import Card from './ui/Card'
import SectionHeader from './ui/SectionHeader'
import { useInView } from '../hooks/useInView'

export default function TermsSection({ terms }) {
  const [sectionRef, isInView] = useInView({ threshold: 0.12, triggerOnce: true })

  return (
    <section
      id="terms"
      ref={sectionRef}
      className={`mx-auto max-w-6xl border-t border-surface-200 bg-surface-0 px-4 py-20 transition-all duration-700 ease-out ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <SectionHeader label="terms" title="スクラム用語集" />
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        {terms.map((item, idx) => (
          <Card
            key={item.id}
            className="transition-all duration-500 ease-out"
            style={{
              transitionDelay: isInView ? `${idx * 60}ms` : '0ms',
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            <div className={`mb-4 h-1 rounded-full ${item.accentClass || 'bg-gradient-to-r from-brand-400 to-brand-600'}`} />
            <h3 className="mb-2 font-serif text-lg font-semibold text-ink-900">{item.term}</h3>
            <p className="flex-grow text-sm leading-relaxed text-ink-700">{item.definition}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
