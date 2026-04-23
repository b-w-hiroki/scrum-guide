# Claude共有パッケージ（このまま貼り付け可）

## 0. 目的
- `scrum-guide` の品質を、仕様一致とUI/UX中心にもう一段上げたいです。
- 大改修ではなく、最小差分で改善したいです。

## 1. プロジェクト情報
- Repository: `https://github.com/b-w-hiroki/scrum-guide`
- Pages: `https://b-w-hiroki.github.io/scrum-guide/`
- Stack: React + Vite + Tailwind CSS
- 最新コミット: `c386e81 Improve Scrum Guide UI and accessibility polish.`

## 2. 先に読んでほしい資料
- `docs/spec.md`
- `docs/claude-review-handoff.md`
- `docs/cursor-review-instructions.md`

## 3. 現状（要点）
- 優先度の高いUI/UX改善を一通り反映済み（タブUI、ナビアクティブ、共通UI抽出など）。
- PagesデプロイはActionsで成功済み（run: `24825008113`）。
- Node 20 deprecation警告は出るが、現時点のビルド/デプロイは通過。

## 4. Claudeへの依頼（コピペ用）
```txt
このリポジトリ（React + Vite + Tailwind CSS）をレビューしてください。
目的は「仕様準拠の精度向上」と「UI/UXのブラッシュアップ」です。

まず以下を前提として把握してください：
- docs/spec.md
- docs/claude-review-handoff.md
- docs/cursor-review-instructions.md
- 最新コミット: c386e81
- 公開URL: https://b-w-hiroki.github.io/scrum-guide/

レビュー観点（優先順）:
1. 仕様漏れ・仕様とのズレ
2. UI/UX改善点（特にモバイル）
3. アクセシビリティ改善点
4. コンポーネント設計と保守性
5. パフォーマンス/将来拡張性

出力形式:
- 優先度P1/P2/P3で整理
- 各指摘に「対象ファイル」「問題」「最小修正案」を付ける
- 最後に「次に着手すべき上位5項目」を出す
- 可能ならそのままCursorに渡せる実装指示文（短文）を付ける
```

## 5. 返答フォーマット指定（任意で追加）
```txt
以下の形式で返してください：

## P1（必須）
- [file] 問題:
  修正案:

## P2（重要）
- [file] 問題:
  修正案:

## P3（改善）
- [file] 問題:
  修正案:

## 次の実装優先Top5
1.
2.
3.
4.
5.
```

