import { scrumReference } from '../data/scrumData'

export default function ReferenceNote() {
  return (
    <aside aria-label="この解説の参照版と出典" className="mx-auto max-w-6xl rounded-xl border border-surface-200 bg-surface-0 px-4 py-6 text-sm leading-relaxed text-ink-700">
      <p className="font-semibold">参照: Scrum Guide {scrumReference.edition}。公式資料の確認日: {scrumReference.checkedAt}（UTC）</p>
      <p>本サイトは独立した学習用解説です。正式な定義は {scrumReference.authors} のガイドで確認してください。</p>
      <div className="mt-3 flex flex-wrap gap-4">
        <a className="underline focus-visible:ring-2 focus-visible:ring-brand-400" href={scrumReference.officialUrl}>公式ガイド（英語）</a>
        <a className="underline focus-visible:ring-2 focus-visible:ring-brand-400" href={scrumReference.japaneseUrl}>日本語版PDF</a>
        <a className="underline focus-visible:ring-2 focus-visible:ring-brand-400" href={scrumReference.revisionsUrl}>改訂履歴</a>
      </div>
    </aside>
  )
}
