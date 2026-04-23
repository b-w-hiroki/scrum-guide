import { useInView } from '../hooks/useInView'

export default function Hero() {
  const [sectionRef, isInView] = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-900 px-4 py-24 transition-all duration-500 ease-out ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="mb-3 text-brand-teal">スクラムをゼロから理解する</p>
        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">チームで素早く、確実に届ける。</h1>
        <p className="mx-auto mb-10 max-w-2xl text-slate-300">
          スクラムは、短いサイクルで価値を届け続けるための実践的フレームワークです。
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="#terms" className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-900/50 hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">用語を学ぶ</a>
          <a href="#practical" className="rounded-xl border border-gray-600 px-8 py-3 font-semibold text-gray-300 hover:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">実践方法を見る</a>
        </div>
        <div className="mx-auto mt-12 grid max-w-xl grid-cols-3 gap-4">
          <div>
            <p className="text-3xl font-bold text-indigo-400">13</p>
            <p className="text-sm text-gray-500">用語</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-indigo-400">3</p>
            <p className="text-sm text-gray-500">役割</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-indigo-400">8</p>
            <p className="text-sm text-gray-500">導入事例</p>
          </div>
        </div>
      </div>
    </section>
  )
}
