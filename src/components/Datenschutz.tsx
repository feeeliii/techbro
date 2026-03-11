export default function Datenschutz() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex-1 px-8 py-16 max-w-2xl mx-auto font-mono">
        <p className="text-xs text-gray-600 mb-8 uppercase tracking-widest">
          datenschutz
        </p>

        <h1 className="text-white text-xl mb-8">
          <span className="text-purple-400 mr-3">›</span>
          Datenschutzerklärung
        </h1>

        <div className="text-gray-400 text-sm leading-relaxed space-y-8">
          {/* Verantwortliche */}
          <section>
            <p className="text-gray-600 text-xs uppercase tracking-widest mb-2">
              1. verantwortliche
            </p>
            <p>Felicitas Strickmann</p>
            <p>c/o CODE University Berlin</p>
            <p>Donaustraße 44, 12043 Berlin</p>
            <p>
              E-Mail:{" "}
              <a
                href="mailto:felicitas.strickmann@code.berlin"
                className="text-purple-400 hover:underline"
              >
                felicitas.strickmann@code.berlin
              </a>
            </p>
          </section>

          {/* Überblick */}
          <section>
            <p className="text-gray-600 text-xs uppercase tracking-widest mb-2">
              2. überblick
            </p>
            <p>
              Diese Website erhebt so wenig personenbezogene Daten wie möglich.
              Es werden keine Cookies gesetzt, keine Analytics-Tools
              eingebunden und kein Tracking durchgeführt.
            </p>
          </section>

          {/* Hosting */}
          <section>
            <p className="text-gray-600 text-xs uppercase tracking-widest mb-2">
              3. hosting
            </p>
            <p>
              Diese Website wird bei{" "}
              <span className="text-white">Hetzner Online GmbH</span>{" "}
              (Industriestr. 25, 91710 Gunzenhausen, Deutschland) gehostet.
              Beim Aufruf der Website werden automatisch technische Daten
              in Server-Logfiles erfasst:
            </p>
            <ul className="list-none mt-3 space-y-1 ml-4">
              <li>
                <span className="text-purple-400 mr-2">·</span>IP-Adresse
                (anonymisiert)
              </li>
              <li>
                <span className="text-purple-400 mr-2">·</span>Datum und
                Uhrzeit der Anfrage
              </li>
              <li>
                <span className="text-purple-400 mr-2">·</span>aufgerufene
                Seite / Datei
              </li>
              <li>
                <span className="text-purple-400 mr-2">·</span>Browser-Typ und
                Betriebssystem
              </li>
            </ul>
            <p className="mt-3">
              Diese Daten werden nicht mit anderen Datenquellen zusammengeführt.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse am sicheren Betrieb der Website).
            </p>
            <p className="mt-2">
              Auftragsverarbeitungsvertrag (AVV) mit Hetzner liegt vor.
              Datenschutzhinweise von Hetzner:{" "}
              <a
                href="https://www.hetzner.com/de/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:underline"
              >
                hetzner.com/legal/privacy-policy
              </a>
            </p>
          </section>

          {/* Datenbank */}
          <section>
            <p className="text-gray-600 text-xs uppercase tracking-widest mb-2">
              4. datenbank (supabase)
            </p>
            <p>
              Die Quiz-Ergebnisse werden in einer Datenbank bei{" "}
              <span className="text-white">Supabase Inc.</span> (970 Toa Payoh
              North, Singapur / Server in der EU) gespeichert. Dabei werden
              folgende Daten erfasst:
            </p>
            <ul className="list-none mt-3 space-y-1 ml-4">
              <li>
                <span className="text-purple-400 mr-2">·</span>
                Geschlechtskontext (man / not-man)
              </li>
              <li>
                <span className="text-purple-400 mr-2">·</span>Gesamtscore
              </li>
              <li>
                <span className="text-purple-400 mr-2">·</span>einzelne
                Antworten (agree/disagree)
              </li>
            </ul>
            <p className="mt-3">
              Es werden <span className="text-white">keine</span> Namen,
              E-Mail-Adressen, IP-Adressen oder sonstige personenbezogenen
              Daten in der Datenbank gespeichert. Die gespeicherten Daten sind
              vollständig anonymisiert und können keiner Einzelperson
              zugeordnet werden.
            </p>
            <p className="mt-2">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an der Auswertung anonymisierter Ergebnisse).
            </p>
            <p className="mt-2">
              Datenschutzhinweise von Supabase:{" "}
              <a
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:underline"
              >
                supabase.com/privacy
              </a>
            </p>
          </section>

          {/* Cookies */}
          <section>
            <p className="text-gray-600 text-xs uppercase tracking-widest mb-2">
              5. cookies & tracking
            </p>
            <p>
              Diese Website verwendet{" "}
              <span className="text-white">keine Cookies</span> und{" "}
              <span className="text-white">keine Tracking- oder Analytics-Tools</span>.
            </p>
          </section>

          {/* Rechte */}
          <section>
            <p className="text-gray-600 text-xs uppercase tracking-widest mb-2">
              6. ihre rechte
            </p>
            <p>
              Da keine personenbezogenen Daten gespeichert werden, die Ihnen
              zugeordnet werden könnten, sind Auskunfts-, Berichtigungs- und
              Löschungsansprüche in der Regel gegenstandslos. Sollten Sie
              dennoch Fragen haben, wenden Sie sich an:{" "}
              <a
                href="mailto:felicitas.strickmann@code.berlin"
                className="text-purple-400 hover:underline"
              >
                felicitas.strickmann@code.berlin
              </a>
            </p>
            <p className="mt-2">
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde
              zu beschweren. Zuständig ist die Berliner Beauftragte für
              Datenschutz und Informationsfreiheit (
              <a
                href="https://www.datenschutz-berlin.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:underline"
              >
                datenschutz-berlin.de
              </a>
              ).
            </p>
          </section>

          {/* Stand */}
          <section>
            <p className="text-gray-600 text-xs uppercase tracking-widest mb-2">
              7. stand
            </p>
            <p>März 2026</p>
          </section>
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