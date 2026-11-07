const situations = [
  ['何から着手するか迷う', '今回のスプリントゴールに近づく最小の成果は何か？', 'process'],
  ['途中で依頼が増えた', 'ゴールを守りながら、プロダクトオーナーと何を再交渉できるか？', 'roles'],
  ['デイリーが報告会になる', 'ゴールに近づくため、今日の計画をどう調整するか？', 'process'],
  ['振り返りが改善につながらない', '次のスプリントで試す改善を一つ選ぶなら何か？', 'practical'],
]
export default function QuickHelp() {
  return <section id="quick-help" className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="quick-help-title">
    <h2 id="quick-help-title" className="mb-3 font-serif text-3xl font-bold">困った場面から探す</h2>
    <p className="mb-6 text-ink-700">チームで話し合うための問いです。役割やイベントの定義は公式ガイドで確認できます。</p>
    <div className="grid gap-4 md:grid-cols-2">{situations.map(([title, question, target]) =>
      <article key={title} className="rounded-xl border border-surface-200 bg-white p-5">
        <h3 className="font-semibold">{title}</h3><p className="my-3">{question}</p>
        <a href={'#' + target} className="underline">関連する解説へ</a>
      </article>)}</div>
    <p className="mt-6 text-sm">出典：<a className="underline" href="https://scrumguides.org/download.html">Scrum Guide 2020（公式・日本語版あり）</a>。この早見表の問いは実践用の補助で、公式ガイドの引用ではありません。</p>
  </section>
}
