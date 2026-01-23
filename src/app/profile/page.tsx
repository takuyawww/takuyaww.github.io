export default function AboutPage() {
  return (
    <div className="py-6 sm:py-10 max-w-3xl mx-auto px-2 sm:px-0">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">プロフィール</h1>

      <div className="space-y-4 sm:space-y-6">
        <section>
          <h2 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">About</h2>
          <dl className="space-y-2 text-white/70">
            <div className="flex gap-4">
              <dt className="text-white/50 w-24 shrink-0">名前</dt>
              <dd>若園 拓哉</dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-white/50 w-24 shrink-0">生年月日</dt>
              <dd>1995年11月1日</dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-white/50 w-24 shrink-0">年齢</dt>
              <dd>30歳</dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Hobbies</h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-white/10 rounded text-sm text-white/70">ランニング</span>
            <span className="px-2 py-1 bg-white/10 rounded text-sm text-white/70">サウナ</span>
          </div>
        </section>

        <section>
          <h2 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Skills</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm text-white/50 mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white/10 rounded text-sm text-white/70">Go</span>
                <span className="px-2 py-1 bg-white/10 rounded text-sm text-white/70">Ruby</span>
                <span className="px-2 py-1 bg-white/10 rounded text-sm text-white/70">TypeScript</span>
                <span className="px-2 py-1 bg-white/10 rounded text-sm text-white/70">JavaScript</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm text-white/50 mb-2">Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white/10 rounded text-sm text-white/70">Ruby on Rails</span>
                <span className="px-2 py-1 bg-white/10 rounded text-sm text-white/70">React</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm text-white/50 mb-2">Cloud / Infrastructure</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white/10 rounded text-sm text-white/70">AWS</span>
                <span className="px-2 py-1 bg-white/10 rounded text-sm text-white/70">Kubernetes</span>
                <span className="px-2 py-1 bg-white/10 rounded text-sm text-white/70">Terraform</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm text-white/50 mb-2">Databases</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white/10 rounded text-sm text-white/70">MySQL</span>
                <span className="px-2 py-1 bg-white/10 rounded text-sm text-white/70">PostgreSQL</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Work Experience</h2>
          <div className="space-y-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                <a
                  href="https://stmn.co.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white hover:underline"
                >
                  株式会社スタメン
                </a>
                <span className="text-sm text-white/50">2020/04 - 2023/01</span>
              </div>
              <p className="text-sm text-white/60">
                エンゲージメントプラットフォーム「TUNAG」等を提供するスタートアップ
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Links</h2>
          <a
            href="https://github.com/takuyawww"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white hover:underline"
          >
            GitHub
          </a>
        </section>
      </div>
    </div>
  );
}
