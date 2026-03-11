export default function Impressum() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex-1 px-8 py-16 max-w-2xl mx-auto font-mono">
        <p className="text-xs text-gray-600 mb-8 uppercase tracking-widest">
          impressum
        </p>

        <h1 className="text-white text-xl mb-8">
          <span className="text-purple-400 mr-3">›</span>
          Impressum
        </h1>

        <div className="text-gray-400 text-sm leading-relaxed space-y-6">
          <div>
            <p className="text-gray-600 text-xs uppercase tracking-widest mb-2">
              angaben gemäß § 5 DDG
            </p>
            <p>Felicitas Strickmann</p>
            <p>c/o CODE University Berlin</p>
            <p>Donaustraße 44</p>
            <p>12043 Berlin</p>
          </div>

          <div>
            <p className="text-gray-600 text-xs uppercase tracking-widest mb-2">
              kontakt
            </p>
            <p>
              E-Mail:{" "}
              <a
                href="mailto:felicitas.strickmann@code.berlin"
                className="text-purple-400 hover:underline"
              >
                felicitas.strickmann@code.berlin
              </a>
            </p>
          </div>
        </div>

        <a
          href="/"
          className="inline-block mt-12 px-8 py-3 border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-black transition-all text-sm tracking-widest uppercase"
        >
          [ back to quiz ]
        </a>
      </div>
    </div>
  )
}