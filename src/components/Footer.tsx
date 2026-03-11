export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-900 mt-auto">
      <div className="max-w-2xl mx-auto px-8 py-6 flex gap-6 font-mono text-xs text-gray-600">
        <a href="/impressum" className="hover:text-purple-400 transition-colors">
          impressum
        </a>
        <a href="/datenschutz" className="hover:text-purple-400 transition-colors">
          datenschutz
        </a>
      </div>
    </footer>
  )
}