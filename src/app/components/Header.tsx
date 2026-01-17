import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-black/10 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="text-lg font-semibold text-black hover:text-blue-600 transition-colors duration-200">
            takuyawww
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-sm text-black/60 hover:text-black transition-colors duration-200"
            >
              About
            </Link>
            <a
              href="https://github.com/takuyawww"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-black/60 hover:text-black transition-colors duration-200"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
