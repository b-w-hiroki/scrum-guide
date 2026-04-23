# scrum-guide コードレビュー結果
## コミット c386e81「Improve Scrum Guide UI and accessibility polish」
### レビュー実施: 2026年4月

> **前提**: docs/spec.md・claude-review-handoff.md・cursor-review-instructions.md を踏まえ、  
> 「仕様準拠の精度向上」と「UI/UXブラッシュアップ」の観点でレビュー。  
> コードはrobots.txtによりrawアクセス不可のため、仕様書・handoff・コミット差分・公開URLを根拠に作成。

---

## P1（必須 — 機能・仕様に直結する問題）

---

### P1-1｜`src/components/Navbar.jsx` — スクロール連動アクティブ表示

**問題**  
handoffの「Navbarブラッシュアップ候補」に明記されているが、  
`c386e81` のコミットメッセージには Navbar への言及がない。  
スクロール中にどのセクションにいるかユーザーが視覚的に確認できない状態の可能性が高い。

**最小修正案**

```jsx
// Navbar.jsx に追加
import { useState, useEffect } from 'react'

const SECTION_IDS = ['hero','terms','roles','process','practical','cautions','examples','companies']

export default function Navbar() {
  const [activeId, setActiveId] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id) })
      },
      { threshold: 0.4 }
    )
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // ナビリンクのclassNameを切り替える
  // アクティブ: 'text-indigo-400 font-medium border-b-2 border-indigo-400'
  // 通常:       'text-gray-400 hover:text-white transition-colors'
}
```

**Cursorへの指示**
```
Navbar.jsx に IntersectionObserver でスクロール連動アクティブ表示を実装してください。
対象セクションID: ['hero','terms','roles','process','practical','cautions','examples','companies']
threshold: 0.4。アクティブリンクは text-indigo-400 font-medium + 下線インジケーターを表示。
```

---

### P1-2｜`src/components/PracticalSection.jsx` — タブのWAI-ARIA未実装

**問題**  
タブUIのアクセシビリティ対応（`role="tab"` / `role="tabpanel"` / `aria-selected`）が  
`cursor-review-instructions.md` で指摘済みだが、コミットメッセージの「accessibility polish」が  
他コンポーネント中心であれば未実装の可能性がある。  
キーボードのみで操作できないとWCAG 2.1 AA違反になる。

**最小修正案**

```jsx
// タブボタン
<button
  role="tab"
  aria-selected={activeTab === cat.id}
  aria-controls={`tabpanel-${cat.id}`}
  id={`tab-${cat.id}`}
  onClick={() => setActiveTab(cat.id)}
  onKeyDown={(e) => {
    if (e.key === 'ArrowRight') /* 次タブへフォーカス */
    if (e.key === 'ArrowLeft')  /* 前タブへフォーカス */
  }}
  className={`... focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none`}
>

// タブパネル
<div
  role="tabpanel"
  id={`tabpanel-${activeTab}`}
  aria-labelledby={`tab-${activeTab}`}
  tabIndex={0}
>
```

**Cursorへの指示**
```
PracticalSection.jsx のタブUIにWAI-ARIAを追加してください。
role="tab" / role="tabpanel" / aria-selected / aria-controls を付与し、
左右矢印キーでタブ切り替えできるキーボード操作も実装してください。
```

---

### P1-3｜`src/App.jsx` または `index.html` — スキップリンク未実装

**問題**  
仕様書・handoffともにアクセシビリティ対応を要件に含んでいるが、  
スキップリンク（スクリーンリーダー・キーボードユーザーがナビをスキップしてメインへ飛ぶリンク）は  
通常、最初のコミットでは実装されない。WCAG 2.4.1（必達）の要件。

**最小修正案**

```jsx
// App.jsx の return の最上部に追加
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
             focus:z-[200] focus:bg-indigo-600 focus:text-white
             focus:px-4 focus:py-2 focus:rounded focus:outline-none"
>
  メインコンテンツへスキップ
</a>

// メインコンテンツのラッパーdivに
<main id="main-content">
```

**Cursorへの指示**
```
App.jsx の return 先頭にスキップリンク（sr-only / focus:not-sr-only）を追加し、
メインコンテンツラッパーを <main id="main-content"> に変更してください。
```

---

### P1-4｜`src/components/CautionsSection.jsx` — 色だけによる情報伝達

**問題**  
仕様書でアンチパターン（赤系）と注意点（黄系）をカラーで区別する設計だが、  
色覚多様性ユーザーには区別できない。WCAG 1.4.1（必達）違反の可能性。

**最小修正案**

```jsx
// カード左上にアイコン＋ラベルテキストを追加
const cautionMeta = {
  antipattern: { icon: '❌', label: 'アンチパターン', badgeClass: 'bg-red-900/50 text-red-300' },
  caution:     { icon: '⚠️', label: '注意点',         badgeClass: 'bg-yellow-900/50 text-yellow-300' },
}

// カード内
<span aria-hidden="true">{cautionMeta[item.type].icon}</span>
<span className={`text-xs font-medium px-2 py-0.5 rounded ${cautionMeta[item.type].badgeClass}`}>
  {cautionMeta[item.type].label}
</span>
```

**Cursorへの指示**
```
CautionsSection.jsx の各カードに、typeに応じたアイコン（❌ / ⚠️）と
テキストラベル（「アンチパターン」「注意点」）バッジを追加してください。
色だけでなくテキストでも種別を伝えられるようにしてください。
```

---

## P2（重要 — UX・保守性に大きく影響）

---

### P2-1｜`src/components/TermsSection.jsx` — カード高さ不揃い

**問題**  
用語カードは説明文の長短でカード高さがバラバラになり、グリッド表示が乱れる。  
`cursor-review-instructions.md` でも指摘済み。

**最小修正案**

```jsx
// グリッドに items-stretch を追加
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">

// 各カードに h-full flex flex-col を追加
<div className="... h-full flex flex-col">
  {/* カラーバッジ・用語名 */}
  <p className="flex-grow leading-relaxed text-gray-300 text-sm">
    {term.definition}
  </p>
</div>
```

**Cursorへの指示**
```
TermsSection.jsx のグリッドに items-stretch を追加し、
各カードに h-full flex flex-col を付与してください。
説明文のdivに flex-grow を追加して、カード高さを揃えてください。
```

---

### P2-2｜`src/components/ProcessSection.jsx` — タイムラインの視認性

**問題**  
ステップ間の縦線が細く（border-l-2 gray-700）、ステップ番号の円が小さい可能性がある。  
スプリントサイクルという「順序」が重要なコンテンツのため、視覚的階層が弱いと誤読につながる。

**最小修正案**

```jsx
// 縦線: border-indigo-800 に変更
// ステップ番号バッジ: w-12 h-12 + ring-4 ring-indigo-900
<div className="w-12 h-12 flex-shrink-0 rounded-full bg-indigo-600 text-white
                font-bold text-lg flex items-center justify-center
                ring-4 ring-indigo-900">
  {step.step}
</div>

// 参加者バッジを役割別カラーに
const participantColor = {
  'PO':        'bg-purple-900 text-purple-300',
  'SM':        'bg-green-900  text-green-300',
  '開発チーム': 'bg-orange-900 text-orange-300',
  '全員':      'bg-blue-900   text-blue-300',
}
```

**Cursorへの指示**
```
ProcessSection.jsx のタイムラインを改善してください。
縦線を border-indigo-800 に、ステップ番号バッジを w-12 h-12 + ring-4 ring-indigo-900 に変更。
参加者バッジをPO/SM/開発チームで色分けしてください（PO:purple, SM:green, 開発:orange）。
```

---

### P2-3｜`src/components/CompaniesSection.jsx` — フィルターラベルが英語

**問題**  
`scrumData.js` の `category` フィールドが `'tech'` / `'jp'` / `'non-tech'` の英語値のまま  
UIに露出している可能性がある。日本語サイトとして統一感がない。

**最小修正案**

```jsx
const FILTER_LABELS = {
  all:        'すべて',
  tech:       '海外テック',
  jp:         '日本企業',
  'non-tech': 'その他業界',
}

// フィルターボタン
{Object.entries(FILTER_LABELS).map(([key, label]) => (
  <button key={key} onClick={() => setFilter(key)}
    className={activeFilter === key
      ? 'bg-indigo-600 text-white ...'
      : 'border border-gray-700 text-gray-400 ...'}
  >
    {label}
  </button>
))}
```

**Cursorへの指示**
```
CompaniesSection.jsx のフィルターボタンラベルを日本語化してください。
{ all:'すべて', tech:'海外テック', jp:'日本企業', 'non-tech':'その他業界' }
カード内のカテゴリバッジも同様に日本語表示にしてください。
```

---

### P2-4｜`src/components/Hero.jsx` — CTAの優先度が不明確

**問題**  
仕様書では「プライマリCTA・セカンダリCTAの優先度明確化」を要件としているが、  
2つのボタンが同等の見た目になっている可能性がある。

**最小修正案**

```jsx
// プライマリ（塗りつぶし）
<a href="#terms"
   className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl
              font-semibold shadow-lg shadow-indigo-900/40 transition-colors">
  用語を学ぶ
</a>

// セカンダリ（アウトライン）
<a href="#practical"
   className="border border-gray-600 hover:border-gray-400 text-gray-300
              hover:text-white px-8 py-3 rounded-xl transition-colors">
  実践方法を見る
</a>
```

**Cursorへの指示**
```
Hero.jsx のCTAボタンを2つ、優先度を明確に区別してください。
プライマリ: bg-indigo-600 塗りつぶし + shadow-lg
セカンダリ: border border-gray-600 アウトラインのみ
```

---

### P2-5｜`src/components/ui/` — 共通コンポーネント抽出の完成度確認

**問題**  
`cursor-review-instructions.md` で `SectionHeader.jsx` / `Card.jsx` / `Badge.jsx` の抽出を指示したが、  
実際に全セクションに適用されているか確認が必要。  
セクションヘッダーが各コンポーネント内にコピペされていると、後の変更が大変になる。

**確認ポイント**
- `src/components/ui/` ディレクトリが存在するか
- TermsSection / RolesSection / ProcessSection / CautionsSection が `<SectionHeader>` を使っているか
- カードのホバースタイルが `Card.jsx` に集約されているか

**Cursorへの指示**
```
src/components/ を確認し、SectionHeader / Card / Badge が ui/ フォルダに存在しない場合は
それぞれ作成し、各Sectionコンポーネントに適用してください。
SectionHeaderのprops: label（英字小文字・大文字化）, title（日本語）
```

---

## P3（改善 — 品質向上・将来拡張性）

---

### P3-1｜`src/hooks/useInView.js` — フェードインアニメーション

**問題**  
現状はアニメーションなし（もしくは一部のみ）。  
セクションが唐突に表示されるため、スクロール体験が単調になる。

**最小修正案**

```jsx
// src/hooks/useInView.js を新規作成
import { useState, useEffect, useRef } from 'react'
export function useInView({ threshold = 0.15, triggerOnce = true } = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsInView(true); if (triggerOnce) observer.disconnect() } },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, isInView]
}

// 各Sectionコンポーネントで
const [ref, isInView] = useInView()
<section ref={ref}
  className={`transition-all duration-500 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
>
```

**Cursorへの指示**
```
src/hooks/useInView.js を作成し、各Sectionコンポーネントのルートdivに適用してください。
isInView=false で opacity-0 translate-y-6、true で opacity-100 translate-y-0。
transition-all duration-500 ease-out を付与してください。
```

---

### P3-2｜`index.html` — `<title>` と `<meta description>` の最適化

**問題**  
Viteデフォルトの `<title>Vite + React</title>` が残っている可能性がある。  
`<meta name="description">` も未設定の場合、SEO・OGP共有時に問題になる。

**最小修正案**

```html
<!-- index.html の <head> -->
<title>スクラム開発 完全ガイド | 用語・役割・実践方法を解説</title>
<meta name="description"
  content="スクラム開発の用語・3つの役割・スプリントサイクル・実践Tips・注意点・導入企業事例を一覧でまとめた学習サイトです。">
<meta property="og:title" content="スクラム開発 完全ガイド">
<meta property="og:description" content="スクラム開発の用語・役割・実践方法をわかりやすく解説。">
<meta property="og:url" content="https://b-w-hiroki.github.io/scrum-guide/">
```

**Cursorへの指示**
```
index.html の <title> を「スクラム開発 完全ガイド | 用語・役割・実践方法を解説」に変更し、
<meta name="description"> と基本的なOGタグを追加してください。
```

---

### P3-3｜`src/data/scrumData.js` — データとUIロジックの分離

**問題**  
カラー値（`color: 'purple'`）がデータ側にあるため、  
Tailwindのパージ設定によって本番ビルドでスタイルが消える可能性がある（動的クラス問題）。

**最小修正案**

```js
// scrumData.js ではクラス文字列を直接定義するか
colorClass: 'bg-purple-900/30 border-purple-800 text-purple-300'

// または tailwind.config.js の safelist に追加
safelist: [
  'bg-purple-900/30', 'border-purple-800', 'text-purple-300',
  'bg-blue-900/30',   'border-blue-800',   'text-blue-300',
  // ... 全カラーバリアント
]
```

**Cursorへの指示**
```
scrumData.js の color プロパティ（'purple', 'blue' 等）が動的クラス生成に使われている場合、
tailwind.config.js の safelist に使用するクラス全パターンを追加してください。
または colorClass プロパティにTailwindクラス文字列を直接定義する方式に変更してください。
```

---

### P3-4｜`.github/workflows/deploy-pages.yml` — Node 20 deprecation警告

**問題**  
handoffに記載の「Node 20の非推奨警告」は現在ビルドは通るが、  
GitHub ActionsがNode 20サポートを終了した際に突然ビルドが失敗するリスクがある。

**最小修正案**

```yaml
# deploy-pages.yml
- uses: actions/setup-node@v4
  with:
    node-version: '22'   # 20 → 22 に変更（現在のLTS）
```

**Cursorへの指示**
```
.github/workflows/deploy-pages.yml の node-version を '20' から '22' に変更してください。
```

---

### P3-5｜全体 — Noto Serif JP フォントの読み込み確認

**問題**  
仕様書でNoto Serif JPを見出しフォントに指定しているが、  
`index.html` にGoogle Fontsの `<link>` が追加されていないと適用されない。  
デフォルトのサンセリフにフォールバックしている可能性がある。

**最小修正案**

```html
<!-- index.html <head> に追加 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Serif+JP:wght@400;600;700&display=swap" rel="stylesheet">
```

```js
// tailwind.config.js
theme: {
  extend: {
    fontFamily: {
      serif: ['"Noto Serif JP"', 'serif'],
      sans:  ['"Noto Sans JP"', 'sans-serif'],
    }
  }
}
```

**Cursorへの指示**
```
index.html にNoto Serif JPとNoto Sans JPのGoogle Fonts linkタグを追加し、
tailwind.config.js の fontFamily に serif / sans を設定してください。
見出しに font-serif クラスが当たっているか各Sectionコンポーネントで確認してください。
```

---

## 次に着手すべき上位5項目

| 順位 | 項目 | ファイル | 理由 |
|------|------|----------|------|
| 1 | **スキップリンク追加** (P1-3) | `App.jsx` | 1行追加で WCAG 必達要件を満たせる。コストが最小 |
| 2 | **CautionsSection 色+テキスト対応** (P1-4) | `CautionsSection.jsx` | アクセシビリティ違反のリスク除去。変更箇所が局所的 |
| 3 | **Navbar スクロールアクティブ** (P1-1) | `Navbar.jsx` | UXの核心。見た目の完成度が一気に上がる |
| 4 | **PracticalSection ARIA + キーボード操作** (P1-2) | `PracticalSection.jsx` | タブUIはARIAパターンが確立されており実装コストが低い |
| 5 | **Tailwind動的クラスのsafelist化** (P3-3) | `tailwind.config.js` | 本番でスタイルが消えるバグを予防。今対処しないと後で気づきにくい |

---

## レビューの根拠について

> GitHubのrobots.txtによりrawファイルへの直接アクセスはできませんでした。  
> このレビューは以下を根拠に作成しています：
> - `docs/claude-review-handoff.md`（ブラッシュアップ候補の明記）
> - `docs/cursor-review-instructions.md`（前回作成の指示書）
> - コミットメッセージ `c386e81: Improve Scrum Guide UI and accessibility polish`
> - 仕様書の設計要件
> - React + Tailwind CSS プロジェクトの典型的な実装パターン
>
> 実際のコードを確認した上でズレがある項目はCursorに伝えてください。

---

*作成日: 2026年4月 / 対象コミット: c386e81*
