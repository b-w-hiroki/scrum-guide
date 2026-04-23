export const terms = [
  { id: 1, term: 'スプリント（Sprint）', definition: '開発の基本サイクル。通常1〜4週間の固定期間で、計画→実行→レビュー→振り返りを繰り返す。', color: 'purple', accentClass: 'bg-gradient-to-r from-brand-400 to-brand-600' },
  { id: 2, term: 'プロダクトバックログ', definition: 'プロダクトに必要な機能・改善・バグ修正をすべてリスト化したもの。POが優先順位をつけて管理する。', color: 'blue', accentClass: 'bg-gradient-to-r from-brand-400 to-brand-600' },
  { id: 3, term: 'スプリントバックログ', definition: '1スプリントで実施するタスクの一覧。スプリント計画ミーティングでチームが選択する。', color: 'teal', accentClass: 'bg-gradient-to-r from-brand-400 to-brand-600' },
  { id: 4, term: 'デイリースクラム（Daily Scrum）', definition: '毎朝15分以内の立ちミーティング。昨日やったこと・今日やること・障害の3点を共有する。', color: 'green', accentClass: 'bg-gradient-to-r from-brand-400 to-brand-600' },
  { id: 5, term: 'スプリントレビュー', definition: 'スプリント終了時にステークホルダーに成果物をデモし、フィードバックをもらう会議。', color: 'yellow', accentClass: 'bg-gradient-to-r from-brand-400 to-brand-600' },
  { id: 6, term: 'スプリントレトロスペクティブ', definition: 'スプリントの進め方を振り返り、次スプリントの改善点を決める内部ミーティング。', color: 'orange', accentClass: 'bg-gradient-to-r from-brand-400 to-brand-600' },
  { id: 7, term: 'ベロシティ（Velocity）', definition: '1スプリントでチームが完了できる作業量の指標。ストーリーポイントで測定する。', color: 'red', accentClass: 'bg-gradient-to-r from-brand-400 to-brand-600' },
  { id: 8, term: 'ユーザーストーリー', definition: '「〇〇として、△△したい。なぜなら□□だから」の形式でユーザー視点の要求を記述したもの。', color: 'pink', accentClass: 'bg-gradient-to-r from-brand-400 to-brand-600' },
  { id: 9, term: 'ストーリーポイント', definition: 'タスクの複雑さ・不確実性・工数を相対的に見積もる単位。時間ではなく相対値を使う。', color: 'purple', accentClass: 'bg-gradient-to-r from-brand-400 to-brand-600' },
  { id: 10, term: 'Definition of Done（DoD）', definition: '「完了」と見なすための合意基準。コードレビュー・テスト通過・デプロイ完了など具体的に定義する。', color: 'blue', accentClass: 'bg-gradient-to-r from-brand-400 to-brand-600' },
  { id: 11, term: 'インクリメント', definition: 'スプリント終了時に得られる、動作する成果物の積み上げ。リリース可能な状態であることが望ましい。', color: 'teal', accentClass: 'bg-gradient-to-r from-brand-400 to-brand-600' },
  { id: 12, term: 'スクラムボード', definition: 'Todo・In Progress・Doneなどのカラムでタスク状況を可視化するボード。JiraやNotionで管理。', color: 'green', accentClass: 'bg-gradient-to-r from-brand-400 to-brand-600' },
  { id: 13, term: 'バーンダウンチャート', definition: 'スプリント内の残作業量を日々グラフ化したもの。進捗の遅れを早期に発見するために使う。', color: 'yellow', accentClass: 'bg-gradient-to-r from-brand-400 to-brand-600' },
]

export const roles = [
  {
    id: 'po',
    title: 'プロダクトオーナー（PO）',
    icon: '🎯',
    responsibilities: ['プロダクトバックログの作成・優先順位付け', 'ビジネス価値の最大化に責任を持つ', 'ステークホルダーとの調整・合意形成', 'スプリントレビューでのフィードバック収集', 'ROIを考慮した意思決定'],
    mindset: '「何を作るか」を決める人',
    color: 'from-purple-600 to-blue-600',
  },
  {
    id: 'sm',
    title: 'スクラムマスター（SM）',
    icon: '🛡️',
    responsibilities: ['スクラムプロセスの正しい実践を支援', 'チームの障害・ブロッカーを除去', '各種セレモニーのファシリテーション', 'チームの自己組織化を促進', '組織へのスクラム文化の定着支援'],
    mindset: '「どう進めるか」を守る人',
    color: 'from-green-600 to-teal-600',
  },
  {
    id: 'dev',
    title: '開発チーム',
    icon: '⚙️',
    responsibilities: ['スプリントバックログの実行', '自己組織的にタスクを分担・完了', 'クロスファンクショナルなスキルを持つ（3〜9人推奨）', 'デイリースクラムでの透明な進捗共有', 'Definition of Doneを満たす品質の担保'],
    mindset: '「作る」責任を持つ人たち',
    color: 'from-orange-600 to-red-600',
  },
]

export const sprintProcess = [
  { step: 1, name: 'スプリント計画', duration: 'スプリント開始日（2〜4時間）', description: 'バックログから今スプリントでやるタスクを選定し、スプリントゴールを設定する。', participants: ['PO', 'SM', '開発チーム'] },
  { step: 2, name: 'デイリースクラム', duration: '毎朝15分', description: '進捗・今日の作業・ブロッカーを共有。問題解決は別途オフラインで行う。', participants: ['SM', '開発チーム'] },
  { step: 3, name: '開発・実装', duration: 'スプリント期間中', description: 'チームが自律的にタスクを実行。ボードを随時更新し、透明性を保つ。', participants: ['開発チーム'] },
  { step: 4, name: 'スプリントレビュー', duration: 'スプリント最終日（1〜2時間）', description: '完成した成果物をデモ。ステークホルダーからフィードバックをもらい、バックログを更新。', participants: ['全員 + ステークホルダー'] },
  { step: 5, name: 'レトロスペクティブ', duration: 'スプリント最終日（1〜1.5時間）', description: 'チーム内部でKPT（Keep/Problem/Try）などを使い、プロセス改善点を議論して次に活かす。', participants: ['SM', '開発チーム'] },
]

export const practicalTips = [
  { category: 'ツール', icon: '🛠️', items: [{ name: 'Jira', desc: 'バックログ・スプリント管理の定番ツール。自動バーンダウンチャート生成可' }, { name: 'Notion', desc: '軽量チームにおすすめ。テンプレートでスクラムボードを素早く構築' }, { name: 'GitHub Projects', desc: 'エンジニア中心チームに最適。PRと連動したカンバン管理' }, { name: 'Miro', desc: 'レトロスペクティブやプランニングポーカーをオンラインで実施' }] },
  { category: '見積もり手法', icon: '🃏', items: [{ name: 'プランニングポーカー', desc: '全員が同時にカードを出すことで、バイアスなく見積もる手法' }, { name: 'Tシャツサイジング', desc: 'XS/S/M/L/XLで相対的な大きさを決める簡易見積もり' }, { name: 'フィボナッチ数列', desc: '1,2,3,5,8,13…を使ったストーリーポイント標準スケール' }] },
  { category: 'チーム運営', icon: '👥', items: [{ name: 'チームアグリーメント', desc: '作業時間・コミュニケーションルール・定義などをチームで合意し文書化' }, { name: 'ワーキングアグリーメント', desc: 'スクラムイベントの時間・場所・期待値をスプリント開始前に確認' }, { name: 'ふりかえりの型', desc: 'KPT・YWT・Fun/Done/Learnなど複数の型をローテーションして飽きを防ぐ' }] },
]

export const cautions = [
  { type: 'antipattern', title: 'スクラムの形だけやる', description: 'セレモニーはやるが、バックログが整理されていない・チームに自律性がない状態。', solution: 'SMがプロセスの目的を繰り返し説明し、各イベントの意義を体感させる。' },
  { type: 'antipattern', title: 'スプリント中に要件変更を受け入れる', description: 'スプリントゴールが守られず、チームの集中が分散する。', solution: 'スプリント中の割り込みはバックログに積み、次スプリントで対応する運用ルールを設ける。' },
  { type: 'antipattern', title: 'デイリーが進捗報告会になる', description: 'SMやPOへの報告の場になり、チームの協力・障害除去の機能が失われる。', solution: '「チームのための15分」という認識を徹底。報告ではなく同期と障害共有の場にする。' },
  { type: 'antipattern', title: 'ベロシティを目標にする', description: 'ポイントを稼ぐためにタスクを細分化・水増しする本末転倒な状態になる。', solution: 'ベロシティは計画精度向上のための参考値。ビジネス価値の提供を最優先指標にする。' },
  { type: 'caution', title: 'スプリント期間は短すぎず長すぎず', description: '1週間では計画コストが高くなり、4週間では方向転換が遅れる。', solution: '2週間スプリントから始めるのが多くのチームに合う黄金標準。' },
  { type: 'caution', title: 'POが忙しすぎる問題', description: 'POが不在がちだとバックログが陳腐化し、チームが迷走する。', solution: 'POは週の20〜30%をスクラム関連活動に充てる体制を組織レベルで確保する。' },
]

export const examples = [
  { title: '新機能リリースサイクルの短縮', context: '30人規模のSaaS企業・開発チーム8名', before: 'ウォーターフォールで半年に1度リリース。要件ずれが多発し手戻りコスト大。', after: '2週間スプリントに切り替え、月1〜2回のリリースを実現。顧客フィードバックループが劇的に改善。', points: ['スプリントレビューに顧客を招待', 'バックログをユーザーストーリー形式に統一', 'CIパイプライン整備でDoD達成コストを削減'] },
  { title: 'リモートチームでのスクラム導入', context: 'フルリモート・4カ国分散チーム', before: '非同期コミュニケーションが主で、進捗が不透明。タスクの重複や抜け漏れが頻発。', after: 'Miro + Jira でスクラムボードをオンライン化。デイリースクラムをビデオ会議で実施し、透明性が向上。', points: ['タイムゾーンを考慮した固定スプリントカレンダー設定', 'レトロはMiroの付箋ボードを活用', 'チームアグリーメントをNotionで可視化'] },
  { title: 'スタートアップの初期プロダクト開発', context: '5人スタートアップ（エンジニア3・デザイナー1・PO兼CEO1）', before: 'タスクが属人化し、何が終わっているか誰も把握できない状態。', after: '1週間スプリントでMVP機能を週次でリリース。投資家へのデモ資料がスプリントレビューそのものになった。', points: ['SMはエンジニアリーダーが兼任（小規模チームのため）', 'プランニングポーカーで見積もりの認識合わせ', 'レトロでスタックしている技術的負債を定期的に棚卸し'] },
]

export const companies = [
  { name: 'Spotify', country: '🇸🇪 スウェーデン', description: 'スクラムを独自進化させた「Spotifyモデル」（Squad/Tribe/Chapter/Guild）を開発・公開。自律的チーム編成の先駆け。', category: 'tech' },
  { name: 'Amazon', country: '🇺🇸 アメリカ', description: '「2枚のピザルール」（チームは2枚のピザで養える人数＝6〜8人）でアジャイルチームを組織。AWSの継続的デリバリーを支える。', category: 'tech' },
  { name: 'Microsoft', country: '🇺🇸 アメリカ', description: 'Azure DevOpsチームが大規模スクラムを導入。数千人規模のエンジニアリング組織でSAFe（スケールドアジャイル）と組み合わせて実践。', category: 'tech' },
  { name: '楽天グループ', country: '🇯🇵 日本', description: '複数の事業部でスクラムを採用。アジャイルコーチを組織内に配置し、スクラムの文化的定着を推進している。', category: 'jp' },
  { name: 'サイボウズ', country: '🇯🇵 日本', description: '自社製品（kintone・Garoon）の開発にスクラムを全面採用。社内にスクラムマスター制度を設け、継続的改善を組織文化にしている。', category: 'jp' },
  { name: 'メルカリ', country: '🇯🇵 日本', description: '急成長フェーズでスクラムを活用してリリースサイクルを短縮。スクラムマスターを専任職として採用・育成している。', category: 'jp' },
  { name: 'ING Bank', country: '🇳🇱 オランダ', description: '銀行業界でSpotifyモデルを参考にした大規模アジャイル変革を実施。3,500人の組織再編でスクラムを基盤に採用。', category: 'non-tech' },
  { name: 'Bosch', country: '🇩🇪 ドイツ', description: '製造業・ハードウェア開発にスクラムを導入。組み込みソフトウェアチームでスプリントとハードウェア試作サイクルを同期。', category: 'non-tech' },
]
