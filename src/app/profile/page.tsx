export default function AboutPage() {
  return (
    <div className="py-6 sm:py-10 max-w-3xl mx-auto px-2 sm:px-0">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">プロフィール</h1>

      <div className="space-y-4 sm:space-y-6">
        <section>
          <h2 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">About</h2>
          <p className="text-sky-300/70">takuyawww</p>
        </section>

        <section>
          <h2 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Skills</h2>
          <div className="space-y-1 text-sky-300/70">
            <p>TypeScript / JavaScript</p>
            <p>React / Next.js</p>
          </div>
        </section>

        <section>
          <h2 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Links</h2>
          <a
            href="https://github.com/takuyawww"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-300/70 hover:text-sky-300 hover:underline"
          >
            GitHub
          </a>
        </section>
      </div>
    </div>
  );
}
