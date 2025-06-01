export default function ProfilePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 mt-2">takuya wakazono</h1>
      <ul className="space-y-4 text-lg mb-12">
        <li className="px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">1995/11/01</li>
        <li className="px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">Fukuoka/Japan</li>
        <li className="px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
          <a
            href="https://github.com/takuyawww"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub: takuyawww
          </a>
        </li>
      </ul>

      <section className="w-full max-w-3xl mb-12 px-2">
        <h2 className="text-2xl font-semibold mb-6">職務経歴</h2>
        <div className="mb-10 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-3">株式会社スタメン <span className="text-base font-normal text-gray-500">(2020 ~ 2023)</span></h3>
          <div className="mb-4 text-sm text-gray-700 dark:text-gray-300">
            <p className="mb-2">
              事業内容: 組織課題の分析から改善施策の実行までを一元化する組織改善クラウドサービス「TUNAG（ツナグ）」の企画・開発・運営。<br />
              離職率改善や生産性向上、人材定着、情報共有促進など、企業ごとの多様な組織課題に対応し、組織状態の可視化・分析や最適な施策のカスタマイズ、社内コミュニケーション機能を提供。
            </p>
            <ul className="list-disc pl-7">
              <li>AIによる自動要約</li>
            </ul>
          </div>
          <ul className="list-disc pl-7 space-y-4 text-gray-800 dark:text-gray-200">
            <li>
              <span className="font-semibold">管理画面リプレイス</span><br />
              カスタマーサクセス部門のペイン解消のためリプレイスを実施した。仕様策定やリリーススケジュール管理、フロントエンドからバックエンドまで一貫して実装した。<br />
              デザイナーと協力し、UIコンポーネント管理のためStorybookを導入した。
              <div className="text-xs mt-2">
                <a href="https://tech.stmn.co.jp/entry/2021/04/23/091310" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                  参考記事
                </a>
              </div>
            </li>
            <li>
              <span className="font-semibold">投稿ピックアッププロジェクト・依頼機能プロジェクト (2021年11月〜2022年3月)</span><br />
              TUNAG内の利用促進を目的に新機能開発を行った。メイン開発者として仕様策定、DB設計、実装を担当した。<br />
              依頼機能は複雑なステータス管理が必要だったが、リリース後大きなバグなく実装完了した。
            </li>
            <li>
              <span className="font-semibold">カスタムダッシュボードプロジェクト (2022年3月〜2022年7月)</span><br />
              企業ごとにカスタマイズされたダッシュボード開発を行った。ビジネス側と連携し仕様策定・BIツール検討を行った。<br />
              Amazon QuickSightを導入し、機能開発を担当した。SaaS on AWS Day 2022に登壇した。
              <div className="text-xs mt-2 space-x-3">
                <a href="https://tech.stmn.co.jp/entry/2022/04/18/135545" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                  参考記事1
                </a>
                <a href="https://tech.stmn.co.jp/entry/2022/08/08/090850" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                  参考記事2
                </a>
                <a href="https://pages.awscloud.com/rs/112-TZM-766/images/stmn%E6%A7%98SaaS_on_AWS_day_2022.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                  参考記事3
                </a>
              </div>
            </li>
            <li>
              <span className="font-semibold">その他</span><br />
              担当プロジェクト以外の個人の動きとしては、SRE活動に力を入れた。モニタリング体制の強化（アラートへの即時対応、スロークエリの改善、メトリクスダッシュボードの改善、毎日の監視体制の効率化）を主体的に行った。<br />
              担当プロジェクトと個人での動きが評価され、2022年度上半期におけるベストエンジニア賞として社内表彰を受けた。
            </li>
          </ul>
          <div className="mt-10">
            <h4 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">利用技術</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="font-semibold text-gray-600 dark:text-gray-300 mb-2">バックエンド</div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 mb-3">Ruby, Ruby on Rails (monolithic)</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600 dark:text-gray-300 mb-2">フロントエンド</div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 mb-3">TypeScript, React</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600 dark:text-gray-300 mb-2">CI/CD</div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 mb-3">CircleCI, CodeDeploy</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600 dark:text-gray-300 mb-2">DB</div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 mb-3">MySQL (Aurora)</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600 dark:text-gray-300 mb-2">モニタリング</div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 mb-3">CloudWatch, Bugsnag</div>
              </div>
              <div className="sm:col-span-2">
                <div className="font-semibold text-gray-600 dark:text-gray-300 mb-2">インフラ</div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 mb-3">AWS (ECS, Fargate, S3, SQS, SES, SNS, Lambda, Athena, Glue, StepFunction, ElastiCache, QuickSight etc...)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-3">株式会社グラファー <span className="text-base font-normal text-gray-500">(2023 ~ 現在)</span></h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            <p className="mb-2">
              株式会社グラファーは「プロダクトの力で 行動を変え 社会を変える」をミッションに掲げ、社会課題の解決に取り組むスタートアップ企業です。<br />
              主な事業は、全国200以上の自治体に導入されているデジタル行政プラットフォーム「Graffer Platform」による行政DX（Govtech）事業、企業向けに生成AIの業務活用を支援する「Graffer AI Solution」などの生成AI活用支援事業、そして公的支援制度を簡単に調べられる「Graffer お悩みハンドブック」などの個人向けサービスです。<br />
              テクノロジーの恩恵を誰もが等しく受けられる社会の実現を目指し、行政・企業・個人の多様な課題解決に取り組んでいます。
            </p>
            <ul className="list-disc pl-7">
              <li>AIによる自動要約</li>
            </ul>
            <div className="text-xs mt-2">
              <a href="https://graffer.jp/about" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                参考: 公式サイト
              </a>
            </div>
            <div className="mt-3">
              <span>現在は「スマート申請」というプロダクトのテックリードを担当。</span>
            </div>
          </div>
          <ul className="list-disc pl-7 space-y-3 text-gray-800 dark:text-gray-200 mt-4">
            <li>
              <span className="font-semibold">インボイス制度対応を主導</span><br />
            </li>
            <li>
              <span className="font-semibold">PayPay決済機能の導入</span><br />
            </li>
            <li>
              <span className="font-semibold">クレジットカード 3-Dセキュア対応の実装</span><br />
            </li>
            <li>
              <span className="font-semibold">マイナンバーカードによる公的個人認証・署名検証機能の安定化・高速化</span><br />
            </li>
            <li>
              <span className="font-semibold">Kubernetes manifestの管理改善</span><br />
            </li>
            <li>
              <span className="font-semibold">CI/CDパイプラインの高速化</span><br />
            </li>
            <li>
              <span className="font-semibold">MongoDBのバージョンアップ対応</span><br />
            </li>
            <li>
              <span className="font-semibold">生成AI活用</span>
            </li>
            <li>
              <span className="font-semibold">PullRequest、PRD(要求仕様書のレビュー)レビュー</span><br />
            </li>
          </ul>
          <div className="mt-10">
            <h4 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">利用技術</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="font-semibold text-gray-600 dark:text-gray-300 mb-2">バックエンド</div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 mb-3">Golang, Typescript (micro services)</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600 dark:text-gray-300 mb-2">フロントエンド</div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 mb-3">Typescript, React, Next.js</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600 dark:text-gray-300 mb-2">CI/CD</div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 mb-3">Github Actions, ArgoCD</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600 dark:text-gray-300 mb-2">DB</div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 mb-3">MongoDB, MySQL (Aurora), PostgreSQL (Aurora)</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600 dark:text-gray-300 mb-2">モニタリング</div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 mb-3">Datadog, Sentry</div>
              </div>
              <div className="sm:col-span-2">
                <div className="font-semibold text-gray-600 dark:text-gray-300 mb-2">インフラ</div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 mb-3">AWS (EKS, S3, SQS, SES, SNS, Lambda, KMS)</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}