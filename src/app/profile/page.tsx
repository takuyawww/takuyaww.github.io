export default function AboutPage() {
  return (
    <div className="py-8 sm:py-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-8">プロフィール</h1>

      <div className="space-y-6 text-white/70">
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">About</h2>
          <p>takuyawww</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Skills</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>TypeScript / JavaScript</li>
            <li>React / Next.js</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Links</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/takuyawww"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                GitHub
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
