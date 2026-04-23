export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden border-t border-surface-200 bg-gradient-to-br from-surface-50 via-brand-50 to-surface-100 px-4 py-24"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-brand-100 to-brand-200 opacity-60 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-violet-100 to-brand-100 opacity-50 blur-2xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="mb-3 font-mono text-xs uppercase tracking-wider text-brand-500">スクラムをゼロから理解する</p>
        <h1 className="mb-6 font-serif text-5xl font-bold leading-[1.1] text-ink-900 md:text-7xl">チームで素早く、確実に届ける。</h1>
        <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-ink-700">
          スクラムは、短いサイクルで価値を届け続けるための実践的フレームワークです。
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#terms"
            className="rounded-xl bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-200 transition-all duration-150 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-200 active:scale-95 active:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            用語を学ぶ
          </a>
          <a
            href="#practical"
            className="rounded-xl border-2 border-surface-300 px-6 py-2.5 text-sm font-semibold text-ink-700 transition-all duration-150 hover:border-brand-400 hover:text-brand-600 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            実践方法を見る
          </a>
        </div>
        <div className="mx-auto mt-12 grid max-w-xl grid-cols-3 gap-4">
          <div>
            <p className="font-mono text-4xl font-bold text-brand-500">13</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-300">用語</p>
          </div>
          <div>
            <p className="font-mono text-4xl font-bold text-brand-500">3</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-300">役割</p>
          </div>
          <div>
            <p className="font-mono text-4xl font-bold text-brand-500">8</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-300">導入事例</p>
          </div>
        </div>
      </div>
    </section>
  )
}
