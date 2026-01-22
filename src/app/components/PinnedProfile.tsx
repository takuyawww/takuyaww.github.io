import Link from "next/link";

export default function PinnedProfile() {
  return (
    <Link href="/about" className="block group">
      <article className="relative overflow-hidden rounded-xl p-[1px] bg-gradient-to-r from-accent/50 via-purple-500/50 to-accent/50">
        <div className="rounded-xl bg-mainbg p-5 relative">
          {/* 背景のグロー効果 */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-500" />

          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20">
                  <svg
                    className="w-3 h-3 text-accent"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 4a1 1 0 0 1 .117 1.993L16 6h-.001L15 14l2.994 3.006A1 1 0 0 1 17.5 19H13v3a1 1 0 1 1-2 0v-3H6.5a1 1 0 0 1-.5-1.866L9 14l-1-8H8a1 1 0 0 1 0-2h8z" />
                  </svg>
                </span>
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">Pinned</span>
              </div>
              <svg
                className="w-4 h-4 text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
              About Me
            </h2>
            <p className="text-sm text-white/50 leading-relaxed">
              プロフィール・経歴・スキルセットはこちらからご覧いただけます
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
