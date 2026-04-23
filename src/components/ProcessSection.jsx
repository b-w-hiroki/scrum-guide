export default function ProcessSection({ sprintProcess }) {
  return (
    <section id="process" className="mx-auto max-w-5xl px-4 py-20">
      <h2 className="mb-8 text-3xl font-bold">スクラムの流れ</h2>
      <div className="space-y-6">
        {sprintProcess.map((step, idx) => (
          <div key={step.step} className="relative border-l-2 border-slate-700 pl-6">
            <span className="absolute -left-3 top-0 grid h-6 w-6 place-items-center rounded-full bg-brand-purple text-xs font-bold">
              {step.step}
            </span>
            <h3 className="text-lg font-semibold">{step.name}</h3>
            <p className="mb-2 text-sm text-slate-400">{step.duration}</p>
            <p className="mb-2 text-slate-300">{step.description}</p>
            <div className="flex flex-wrap gap-2 pb-2">
              {step.participants.map((p) => (
                <span key={p} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-brand-teal">{p}</span>
              ))}
            </div>
            {idx === sprintProcess.length - 1 ? null : <div className="absolute -bottom-5 -left-[1px] h-5 border-l-2 border-slate-700" />}
          </div>
        ))}
      </div>
    </section>
  )
}
