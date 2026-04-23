import SectionHeader from './ui/SectionHeader'
import { useInView } from '../hooks/useInView'

export default function RolesSection({ roles }) {
  const [sectionRef, isInView] = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section
      id="roles"
      ref={sectionRef}
      className={`mx-auto max-w-6xl px-4 py-20 transition-all duration-500 ease-out ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <SectionHeader label="roles" title="3つの役割" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {roles.map((role) => (
          <article key={role.id} className={`rounded-2xl bg-gradient-to-br ${role.color} p-[1px]`}>
            <div className="h-full rounded-2xl bg-slate-900 p-5">
              <div className="mb-3 text-2xl" aria-hidden="true">{role.icon}</div>
              <h3 className="mb-3 text-lg font-semibold">{role.title}</h3>
              <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-slate-300">
                {role.responsibilities.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="text-sm font-medium text-brand-teal">{role.mindset}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
