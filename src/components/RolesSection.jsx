import SectionHeader from './ui/SectionHeader'
import { useInView } from '../hooks/useInView'

export default function RolesSection({ roles }) {
  const [sectionRef, isInView] = useInView({ threshold: 0.12, triggerOnce: true })
  const roleAccentMap = {
    po: 'from-violet-400 to-indigo-500',
    sm: 'from-emerald-400 to-teal-500',
    dev: 'from-orange-400 to-rose-500',
  }

  return (
    <section
      id="roles"
      ref={sectionRef}
      className={`mx-auto max-w-6xl border-t border-surface-200 bg-surface-50 px-4 py-20 transition-all duration-700 ease-out ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <SectionHeader label="roles" title="3つの役割" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {roles.map((role) => (
          <article key={role.id} className="rounded-2xl border border-surface-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className={`h-1.5 rounded-t-2xl bg-gradient-to-r ${roleAccentMap[role.id] || 'from-brand-400 to-brand-600'}`} />
            <div className="flex h-full gap-4 p-5">
              <div className="text-2xl" aria-hidden="true">{role.icon}</div>
              <div className="flex-1">
                <h3 className="mb-3 text-base font-semibold text-ink-900">{role.title}</h3>
                <ul className="mb-4 space-y-1 text-sm leading-relaxed text-ink-700">
                  {role.responsibilities.map((item) => (
                    <li key={item} className="flex items-start">
                      <span className="mr-2 font-bold text-brand-500">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm font-medium text-brand-600">{role.mindset}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
