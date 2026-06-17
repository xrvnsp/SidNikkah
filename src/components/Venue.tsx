import { useScrollReveal } from '../hooks/useScrollReveal'

function MapCard({ mapsUrl }: { mapsUrl: string }) {
  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-3xl overflow-hidden shadow-2xl shadow-primary-300/30 border border-primary-200 h-80 lg:h-96 relative hover:shadow-primary-400/40 transition-shadow duration-500 cursor-pointer"
      aria-label="Open venue in Google Maps"
    >
      {/* Map-like gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-lavender-100 to-primary-200" />

      {/* Subtle grid overlay — mimics a map grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#7c3aed" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Decorative "roads" */}
      <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#9333ea" strokeWidth="6" strokeDasharray="none" />
        <line x1="0" y1="62%" x2="100%" y2="62%" stroke="white" strokeWidth="1" strokeDasharray="12 8" />
        <line x1="35%" y1="0" x2="35%" y2="100%" stroke="#9333ea" strokeWidth="4" />
        <line x1="65%" y1="0" x2="72%" y2="100%" stroke="#9333ea" strokeWidth="3" />
        {/* Block shapes */}
        <rect x="36%" y="15%" width="28%" height="20%" rx="4" fill="#a855f7" opacity="0.15" />
        <rect x="5%" y="30%" width="22%" height="15%" rx="4" fill="#a855f7" opacity="0.1" />
        <rect x="70%" y="65%" width="25%" height="20%" rx="4" fill="#a855f7" opacity="0.1" />
      </svg>

      {/* Center pin */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* Pulsing rings */}
        <div className="relative flex items-center justify-center mb-3">
          <span className="absolute w-20 h-20 rounded-full bg-primary-500/20 animate-ping" />
          <span className="absolute w-14 h-14 rounded-full bg-primary-500/30 animate-ping" style={{ animationDelay: '0.3s' }} />
          <div className="relative w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center shadow-xl shadow-primary-600/50 border-4 border-white group-hover:scale-110 transition-transform duration-300">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
        </div>

        {/* Venue label */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg text-center border border-primary-100">
          <p className="font-serif text-primary-800 font-bold text-base leading-tight">Sakthi Kalyan Mandapam</p>
          <p className="font-sans text-primary-500 text-xs mt-0.5">Nagore Main Road, Karaikal</p>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/10 transition-colors duration-300 flex items-end justify-center pb-5 z-20">
        <span className="bg-primary-600 text-white text-xs font-medium px-4 py-1.5 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5 shadow-lg">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Open in Google Maps
        </span>
      </div>
    </a>
  )
}

export default function Venue() {
  const mapsUrl = 'https://maps.app.goo.gl/jwCxwUEp8tFN6zH56'
  const { ref: headRef, isVisible: headVisible } = useScrollReveal()
  const { ref: mapRef, isVisible: mapVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })
  const { ref: detailRef, isVisible: detailVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section id="venue" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
      <div className="absolute -bottom-32 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-60" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headRef}
          className={`text-center mb-16 reveal ${headVisible ? 'visible' : ''}`}
        >
          <p className="section-subheading">Join Us At</p>
          <h2 className="section-heading">The Venue</h2>
          <div className="decorative-line mt-4">
            <span className="ornament">✿</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Map card */}
          <div
            ref={mapRef}
            className={`reveal-left ${mapVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <MapCard mapsUrl={mapsUrl} />
            <p className="mt-3 font-sans text-primary-400 text-xs text-center">
              Click the map to open exact location in Google Maps
            </p>
          </div>

          {/* Details */}
          <div
            ref={detailRef}
            className={`reveal-right space-y-5 ${detailVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-800 mb-2">
                Sakthi Kalyan Mandapam
              </h3>
              <div className="flex items-start gap-2 text-primary-500">
                <svg className="w-5 h-5 mt-0.5 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-sans text-sm leading-relaxed">
                  Nagore Main Road, Karaikal, India
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  ),
                  label: 'Date',
                  value: 'Sunday\n28 June 2026',
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ),
                  label: 'Starts',
                  value: 'From\n10:00 AM IST',
                },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="bg-primary-50 rounded-2xl p-4 border border-primary-100 hover:border-primary-300 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-primary-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {icon}
                    </svg>
                    <span className="font-sans text-xs uppercase tracking-wider text-primary-400">{label}</span>
                  </div>
                  <p className="font-serif text-sm font-semibold text-primary-700 whitespace-pre-line">{value}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-lavender-100 rounded-2xl p-5 border border-primary-100 hover:shadow-md transition-all duration-300">
              <p className="font-sans text-xs uppercase tracking-wider text-primary-400 mb-2">Event Note</p>
              <p className="font-sans text-sm text-primary-600 leading-relaxed">
                Dress modestly as befitting the occasion. Kindly arrive 15 minutes early.
                Your presence and duas are a cherished blessing.
              </p>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-primary-600/30 hover:-translate-y-0.5 text-sm group"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
