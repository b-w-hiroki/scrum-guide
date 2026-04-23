import Badge from './ui/Badge'
import SectionHeader from './ui/SectionHeader'
import { useInView } from '../hooks/useInView'

const PARTICIPANT_COLOR = {
  PO: 'purple',
  SM: 'green',
  開発チーム: 'orange',
  全員: 'blue',
  '全員 + ステークホルダー': 'blue',
}

export default function ProcessSection({ sprintProcess }) {
  const [sectionRef, isInView] = useInView()

  return (
    <section
      id="process"
      ref={sectionRef}
      className={`mx-auto max-w-5xl border-t border-surface-200 bg-surface-0 px-4 py-20 transition-all duration-700 ease-out ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <SectionHeader label="process" title="スクラムの流れ" />
      <div className="space-y-6">
        {sprintProcess.map((step, idx) => (
          <div key={step.step} className="relative ml-6 pl-10">
            <div
              className="absolute bottom-0 left-0 top-0 border-l-2 border-brand-200 transition-transform duration-700 ease-out delay-300"
              style={{ transformOrigin: 'top', transform: isInView ? 'scaleY(1)' : 'scaleY(0)' }}
            />
            <span className="absolute -left-6 top-0 grid h-12 w-12 place-items-center rounded-full bg-brand-500 font-mono text-lg font-bold text-white ring-4 ring-brand-100">
              {step.step}
            </span>
            <h3 className="text-base font-semibold text-ink-900">{step.name}</h3>
            <p className="mb-2 font-mono text-xs text-ink-500">{step.duration}</p>
            <p className="mb-2 text-sm leading-relaxed text-ink-700">{step.description}</p>
            <div className="flex flex-wrap gap-2 pb-2">
              {step.participants.map((p) => (
                <Badge key={p} label={p} color={PARTICIPANT_COLOR[p] || 'gray'} />
              ))}
            </div>
            {idx === sprintProcess.length - 1 ? null : <div className="absolute -bottom-5 left-0 h-5 border-l-2 border-brand-200" />}
          </div>
        ))}
      </div>
    </section>
  )
}
