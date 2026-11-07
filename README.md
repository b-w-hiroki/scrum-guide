# スクラム開発 完全ガイド

スクラム開発を初めて学ぶエンジニア・PM・デザイナー向けに、用語・役割・進め方を解説する日本語のシングルページサイトです。

## 公開サイト

https://b-w-hiroki.github.io/scrum-guide/

## 内容

- スクラム用語集（スプリント、プロダクトバックログ、デイリースクラムなど13語）
- 3つの役割（プロダクトオーナー、スクラムマスター、開発チーム）
- スクラムの流れ（計画 → デイリー → 開発 → レビュー → レトロスペクティブの5ステップ）
- 実用的な使い方（Jira、Notion、GitHub Projects、Miro）
- 注意点・アンチパターン
- 実例・ケーススタディ
- スクラムを活用している企業

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
