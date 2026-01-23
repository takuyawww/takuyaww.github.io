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
          <h2 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Skills</h2>
          <div className="space-y-3 text-white/70">
            <div>
              <h3 className="text-sm text-white/50 mb-1">Languages</h3>
              <p>Go / Ruby / TypeScript / JavaScript</p>
            </div>
            <div>
              <h3 className="text-sm text-white/50 mb-1">Frameworks</h3>
              <p>Ruby on Rails / React</p>
            </div>
            <div>
              <h3 className="text-sm text-white/50 mb-1">Cloud / Infrastructure</h3>
              <p>AWS / Kubernetes / Terraform</p>
            </div>
            <div>
              <h3 className="text-sm text-white/50 mb-1">Databases</h3>
              <p>MySQL / PostgreSQL</p>
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
