export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center">
          <p className="text-sm text-black/50">
            © {new Date().getFullYear()} takuyawww
          </p>
        </div>
      </div>
    </footer>
  );
}
