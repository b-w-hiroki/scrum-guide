# スクラム開発 完全ガイド

スクラム開発を初めて学ぶエンジニア・PM・デザイナー向けに、用語・役割・進め方を解説する日本語のシングルページサイトです。

## 公開サイト

https://b-w-hiroki.github.io/scrum-guide/

## 内容

- スクラム用語集（スプリント、プロダクトバックログ、デイリースクラムなど13語）
- 3つの責任（プロダクトオーナー、スクラムマスター、開発者）
- スクラムの流れ（計画 → デイリー → 開発 → レビュー → レトロスペクティブの5ステップ）
- 実用的な使い方（Jira、Notion、GitHub Projects、Miro）
- 注意点・アンチパターン
- 説明用ケース（実績未検証）
- 企業事例（一次資料との照合は未完了）

コンテンツは `src/data/scrumData.js` に集約し、セクションごとに `src/components/` のコンポーネントで表示します。

## 仕様

実装仕様は [docs/spec.md](docs/spec.md) を参照してください。

## 開発

```bash
npm install
npm run dev      # 開発サーバー
npm run build    # ビルド
npm run lint     # ESLint
```

React + Vite + Tailwind CSS で構築しています。`master` への push で GitHub Pages へ自動デプロイされます（`.github/workflows/deploy-pages.yml`）。


## 参照版と内容の確認

基準は Ken Schwaber / Jeff Sutherland の [Scrum Guide 2020年11月版](https://scrumguides.org/scrum-guide.html) です。2026-11-10（UTC）に公式配布ページで現行版を確認しました。[日本語版](https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-Japanese.pdf)と[改訂履歴](https://scrumguides.org/revisions.html)も参照できます。本サイトは独立した学習用解説で、公式ガイドではありません。

三つの質問・立ちミーティング・ストーリーポイント・2週間スプリントなど、チームが選べる方法を必須ルールと区別します。デイリーの参加者、イベントの上限時間、開発者の呼称、スプリント中の範囲調整、インクリメントの完成条件を2020年版へ合わせました。説明用ケースの成果・企業の現在の採用状況は未検証です。

依存不要の内容回帰: `node --test tests/*.test.mjs`。PRの検証workflowで内容回帰・lint・buildを行います。リンク先の到達性や内容の正確性をオフライン契約テストだけで保証するものではなく、公開前の内容レビューとキーボード/狭画面確認も必要です。
