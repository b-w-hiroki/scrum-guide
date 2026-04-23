# Cursor レビュー＆ブラッシュアップ 実装指示書
## 対象リポジトリ: `b-w-hiroki/scrum-guide`（React + Vite + Tailwind CSS）

> このドキュメントをCursorに読み込ませ、優先度順に実装を依頼してください。
> 各項目に「Cursorへの依頼プロンプト（コピペ用）」を添付しています。

---

## ✅ 着手優先度マップ

| 優先度 | 対象 | 種別 | 工数感 |
|--------|------|------|--------|
| 🔴 1 | PracticalSection タブUI | UX改善 | 小 |
| 🔴 2 | Navbar スクロール連動アクティブ | UX改善 | 小〜中 |
| 🟠 3 | 共通コンポーネント抽出 | 設計改善 | 中 |
| 🟠 4 | TermsSection カード高さ統一 | UI改善 | 小 |
| 🟡 5 | ProcessSection タイムライン視認性 | UI改善 | 小 |
| 🟡 6 | CompaniesSection フィルターUI | UX改善 | 小 |
| 🟢 7 | Hero 視覚強化 | UI改善 | 小〜中 |
| 🟢 8 | Navbar モバイルメニューアニメーション | UI改善 | 小 |
| 🔵 9 | アクセシビリティ全体 | A11y | 中 |
| 🔵 10 | フェードインアニメーション | UI演出 | 小 |

---

## 🔴 優先度1：PracticalSection — タブUIの改善

### 問題点
- 選択中タブの視覚的強調が弱い（アクティブ状態がわかりにくい）
- フォーカスリングが未実装（キーボード操作不可）
- タブ切り替え時のコンテンツ遷移がぎこちない

### 修正仕様

```
【タブボタン】
・非アクティブ: bg-gray-800 text-gray-400 border border-gray-700
・アクティブ:   bg-indigo-600 text-white border border-indigo-600 shadow-md
・フォーカス:   focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none
・ホバー（非アクティブ）: hover:bg-gray-700 hover:text-gray-200

【コンテンツ切り替え】
・Tailwind の transition + opacity でフェード（duration-200）
  activeTab が変わったら opacity-0 → opacity-100

【aria属性】
・タブボタン: role="tab" aria-selected={active} aria-controls="tab-panel-{id}"
・パネル:     role="tabpanel" id="tab-panel-{id}"
```

### Cursorへの依頼プロンプト

```
src/components/PracticalSection.jsx を修正してください。

【変更内容】
1. タブボタンのアクティブ状態を視覚的に強調する
   - 非アクティブ: bg-gray-800 text-gray-400 border border-gray-700 rounded-lg
   - アクティブ:   bg-indigo-600 text-white border border-indigo-600 shadow-md rounded-lg
   - ホバー（非アクティブ）: hover:bg-gray-700 hover:text-gray-200

2. フォーカス可視化を追加する
   - focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none

3. タブ切り替え時にコンテンツをフェードさせる
   - useState で isVisible を管理
   - タブ切り替え時: isVisible=false（opacity-0）→ setTimeout 150ms → activeTab変更 → isVisible=true（opacity-100）
   - className: transition-opacity duration-200

4. WAI-ARIAを追加する
   - タブボタン: role="tab" aria-selected={active} aria-controls="tabpanel-{category}"
   - コンテンツDiv: role="tabpanel" id="tabpanel-{category}"
```

---

## 🔴 優先度2：Navbar — スクロール連動アクティブ表示

### 問題点
- どのセクションにいるかナビで確認できない
- モバイルメニューの開閉に transition がない

### 修正仕様

```
【アクティブリンク検出】
・IntersectionObserver でセクションを監視
・threshold: 0.4（セクションの40%が見えたらアクティブ）
・監視対象: ['hero','terms','roles','process','practical','cautions','examples','companies']

【アクティブスタイル】
・非アクティブ: text-gray-400 hover:text-white
・アクティブ:   text-indigo-400 font-medium
  + アンダーラインインジケーター: after疑似要素 w-full h-0.5 bg-indigo-400

【モバイルメニューアニメーション】
・max-h-0 overflow-hidden → max-h-96
・transition-all duration-300 ease-in-out
```

### Cursorへの依頼プロンプト

```
src/components/Navbar.jsx を修正してください。

【変更1: スクロール連動アクティブ表示】
1. useEffect + IntersectionObserver でセクションを監視する
   const sectionIds = ['hero','terms','roles','process','practical','cautions','examples','companies']
   threshold: 0.4 でアクティブセクションを useState で管理

2. ナビリンクのスタイルを切り替える
   - 通常:   text-gray-400 hover:text-white transition-colors
   - アクティブ: text-indigo-400 font-medium
   - アクティブリンク下に h-0.5 bg-indigo-400 の下線を表示

【変更2: モバイルメニューアニメーション】
- メニュー開閉を max-h と overflow-hidden で実装
- 閉: max-h-0, 開: max-h-96
- transition-all duration-300 ease-in-out を付与
```

---

## 🟠 優先度3：共通コンポーネントの抽出

### 問題点
- セクションヘッダー（ラベル＋タイトル）が各コンポーネントに重複している
- カードの基本スタイルが散在している

### 抽出すべき共通コンポーネント

```
src/components/ui/
├── SectionHeader.jsx   ← ラベル（英字小文字）+ タイトル（日本語）
├── Card.jsx            ← 基本カード（bg + border + rounded + shadow + hover）
└── Badge.jsx           ← カテゴリ・参加者バッジ（Pill型）
```

### Cursorへの依頼プロンプト

```
以下の共通UIコンポーネントを src/components/ui/ に新規作成し、
既存コンポーネントに適用してください。

【1. SectionHeader.jsx】
props: { label: string, title: string, className?: string }
- label: font-mono text-xs tracking-widest text-indigo-400 uppercase mb-2
- title: text-3xl font-bold text-white mb-10（Noto Serif JP）

【2. Card.jsx】
props: { children, className?, onClick? }
- bg-gray-800 border border-gray-700 rounded-2xl p-6
- hover:-translate-y-1 hover:shadow-xl transition-all duration-200

【3. Badge.jsx】
props: { label: string, color?: 'indigo'|'green'|'orange'|'gray' }
- Pill型: inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
- color に応じて bg-{color}-900 text-{color}-300 を切り替え

作成後、TermsSection・RolesSection・ProcessSection の
セクションヘッダーと各カードをこれらに置き換えてください。
```

---

## 🟠 優先度4：TermsSection — カード高さ統一

### 問題点
- 用語の説明文が長短バラバラでカード高さが不揃い
- グリッドで並べたとき見た目が崩れる

### Cursorへの依頼プロンプト

```
src/components/TermsSection.jsx を修正してください。

1. カードのグリッドコンテナに items-stretch を追加する
   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch

2. 各カードに h-full flex flex-col を追加する

3. カードの定義テキスト部分に flex-grow を追加して
   下部を揃える（カラーバッジや用語名の下に定義文が伸びるように）

4. 定義テキストの行間を leading-relaxed に統一する
```

---

## 🟡 優先度5：ProcessSection — タイムライン視認性向上

### 問題点
- ステップ間の縦線が細く、視覚的なつながりが弱い
- ステップ番号の円バッジが小さい
- 参加者バッジが地味で役割の違いが伝わりにくい

### Cursorへの依頼プロンプト

```
src/components/ProcessSection.jsx を修正してください。

【タイムライン縦線】
- border-l-2 border-gray-700 → border-l-2 border-indigo-800
- 左margin: ml-6（ステップ番号円の中心に揃える）

【ステップ番号バッジ】
- サイズを w-12 h-12 に拡大（現状より大きく）
- bg-indigo-600 text-white font-bold text-lg rounded-full
- ring-4 ring-indigo-900 でグロー感を追加

【参加者バッジ】
- PO: bg-purple-900 text-purple-300
- SM: bg-green-900 text-green-300
- 開発チーム: bg-orange-900 text-orange-300
- 全員: bg-blue-900 text-blue-300
- ステークホルダー含む場合: bg-gray-700 text-gray-300

【所要時間テキスト】
- font-mono text-xs text-gray-500 でコードライク表示
```

---

## 🟡 優先度6：CompaniesSection — フィルターUI改善

### 問題点
- フィルターボタンのカテゴリ名が英語（tech / jp / non-tech）のまま
- フィルター選択中の視覚的強調が弱い

### Cursorへの依頼プロンプト

```
src/components/CompaniesSection.jsx を修正してください。

【フィルターラベルを日本語化】
const filterLabels = {
  all:      'すべて',
  tech:     '海外テック',
  jp:       '日本企業',
  'non-tech': 'その他業界',
}

【フィルターボタンのスタイル強化】
- 非アクティブ: border border-gray-700 text-gray-400 rounded-full px-4 py-1.5 text-sm
  hover:border-gray-500 hover:text-gray-200
- アクティブ:   bg-indigo-600 text-white border-transparent rounded-full px-4 py-1.5 text-sm
  shadow-sm shadow-indigo-900

【フィルター変更時のアニメーション】
- カードリスト全体に transition-opacity duration-200 を付与
- フィルター変更時に一瞬 opacity-0 → opacity-100 でリフレッシュ感を出す

【カード内カテゴリバッジを日本語表示に対応】
- filterLabels を使って企業カードのカテゴリバッジも日本語表示にする
```

---

## 🟢 優先度7：Hero — 視覚的な主役感の強化

### Cursorへの依頼プロンプト

```
src/components/Hero.jsx を修正してください。

【背景強化】
- 既存の単色背景に グラデーションメッシュ を追加
  bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-900

- 右上と左下に ぼかし円 を追加（absolute配置）
  右上: w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl -top-20 -right-20
  左下: w-72 h-72 rounded-full bg-purple-600/10 blur-3xl -bottom-10 -left-10

【CTAボタンの優先度明確化】
- プライマリCTA: bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl
  font-semibold shadow-lg shadow-indigo-900/50
- セカンダリCTA: border border-gray-600 hover:border-gray-400 text-gray-300 px-8 py-3 rounded-xl

【キャッチコピー下にサブスタット追加（任意）】
- 「13の用語」「3つの役割」「8社の導入事例」を横並びの数字で表示
  text-3xl font-bold text-indigo-400 + text-sm text-gray-500 でラベル
```

---

## 🟢 優先度8：Navbar — モバイルメニューアニメーション

### Cursorへの依頼プロンプト（優先度2と合わせて依頼可能）

```
src/components/Navbar.jsx のモバイルメニュー開閉に
アニメーションを追加してください。

- メニューコンテナに overflow-hidden transition-all duration-300 ease-in-out を付与
- isOpen=false: max-h-0 opacity-0
- isOpen=true:  max-h-96 opacity-100
- ハンバーガーアイコンを ☰ / ✕ でトグルするか、
  Line→X のCSSアニメーション（rotate transform）を実装
```

---

## 🔵 優先度9：アクセシビリティ全体対応

### Cursorへの依頼プロンプト

```
プロジェクト全体のアクセシビリティを改善してください。

【見出し構造】
- h1 はページ全体で1つ（Hero のメインタイトル）
- 各セクションタイトルは h2
- カード内の用語名・役割名は h3
- 現状の見出しタグを確認・修正する

【フォーカス管理】
- すべてのインタラクティブ要素（ボタン・リンク）に
  focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none を付与

【色だけに頼らない情報伝達】
- CautionsSection のアンチパターン（赤）と注意点（黄）に
  アイコン（⚠️ / ❌）またはラベルテキストを追加して
  色覚異常ユーザーでも判別できるようにする

【alt・aria-label】
- アイコンのみのボタン（ハンバーガーメニュー等）に aria-label="メニューを開く" を付与
- 装飾的な絵文字に aria-hidden="true" を付与

【スキップリンク】
- <body> 直下に
  <a href="#main" class="sr-only focus:not-sr-only ...">メインコンテンツへスキップ</a>
  を追加
- main要素に id="main" を設定
```

---

## 🔵 優先度10：スクロールフェードインアニメーション

### Cursorへの依頼プロンプト

```
各セクションの要素にスクロールトリガーのフェードインを追加してください。

【実装方針】
- カスタムフック src/hooks/useInView.js を作成
  IntersectionObserver で要素が viewport に入ったら isInView=true にする
  threshold: 0.15, triggerOnce: true

【useInView.js の実装】
import { useState, useEffect, useRef } from 'react'
export function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        if (options.triggerOnce) observer.disconnect()
      }
    }, options)
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, isInView]
}

【各セクションへの適用】
- セクションのルートdivに useInView を適用
- isInView=false: opacity-0 translate-y-6
- isInView=true:  opacity-100 translate-y-0
- transition-all duration-500 ease-out を付与
- カードが複数ある場合は staggered delay（delay-[0ms], delay-[100ms], ...）を適用
```

---

## 📌 まとめ：Cursorへの最初の一言

```
このReact + Tailwind CSSプロジェクト（scrum-guide）を
cursor-review-instructions.md の指示に従って改善してください。
優先度🔴から順番に取り組み、各修正後にビルドエラーがないか確認してください。
共通コンポーネント（優先度3）は他の修正と並行して抽出してください。
```

---

*作成日: 2026年4月 / 対象: b-w-hiroki/scrum-guide（React + Vite + Tailwind CSS）*
