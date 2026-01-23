export default function AboutPage() {
  return (
    <div className="py-8 sm:py-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-8">About</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-white/80 mb-4">プロフィール</h2>
          <dl className="space-y-3">
            <div className="flex gap-4">
              <dt className="text-white/50 w-24 shrink-0">名前</dt>
              <dd className="text-white/80">若園 拓哉</dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-white/50 w-24 shrink-0">生年月日</dt>
              <dd className="text-white/80">1995年11月1日</dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-white/50 w-24 shrink-0">年齢</dt>
              <dd className="text-white/80">30歳</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
