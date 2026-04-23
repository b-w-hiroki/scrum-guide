export default function RolesSection({ roles }) {
  return (
    <section id="roles" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="mb-8 text-3xl font-bold">3つの役割</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {roles.map((role) => (
          <article key={role.id} className={`rounded-2xl bg-gradient-to-br ${role.color} p-[1px]`}>
            <div className="h-full rounded-2xl bg-slate-900 p-5">
              <div className="mb-3 text-2xl">{role.icon}</div>
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
