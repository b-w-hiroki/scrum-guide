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
  const [sectionRef, isInView] = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section
      id="process"
      ref={sectionRef}
      className={`mx-auto max-w-5xl px-4 py-20 transition-all duration-500 ease-out ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <SectionHeader label="process" title="スクラムの流れ" />
      <div className="space-y-6">
        {sprintProcess.map((step, idx) => (
          <div key={step.step} className="relative ml-6 border-l-2 border-indigo-800 pl-10">
            <span className="absolute -left-6 top-0 grid h-12 w-12 place-items-center rounded-full bg-indigo-600 text-lg font-bold text-white ring-4 ring-indigo-900">
              {step.step}
            </span>
            <h3 className="text-lg font-semibold">{step.name}</h3>
            <p className="mb-2 font-mono text-xs text-gray-500">{step.duration}</p>
            <p className="mb-2 text-slate-300">{step.description}</p>
            <div className="flex flex-wrap gap-2 pb-2">
              {step.participants.map((p) => (
                <Badge key={p} label={p} color={PARTICIPANT_COLOR[p] || 'gray'} />
              ))}
            </div>
            {idx === sprintProcess.length - 1 ? null : <div className="absolute -bottom-5 -left-[1px] h-5 border-l-2 border-indigo-800" />}
          </div>
        ))}
      </div>
    </section>
  )
}
