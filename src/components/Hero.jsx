export default function Hero() {
  return (
    <section id="hero" className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 px-4 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-brand-teal">スクラムをゼロから理解する</p>
        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">チームで素早く、確実に届ける。</h1>
        <p className="mx-auto mb-10 max-w-2xl text-slate-300">
          スクラムは、短いサイクルで価値を届け続けるための実践的フレームワークです。
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="#terms" className="rounded-xl bg-brand-purple px-5 py-3 font-semibold hover:opacity-90">用語を学ぶ</a>
          <a href="#practical" className="rounded-xl border border-slate-500 px-5 py-3 font-semibold hover:bg-slate-800">実践方法を見る</a>
        </div>
      </div>
    </section>
  )
}
