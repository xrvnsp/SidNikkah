import { useEffect, useRef } from 'react'

const PETALS = [
  { left: 8, delay: 0, duration: 12, size: 18 },
  { left: 18, delay: 2, duration: 15, size: 14 },
  { left: 28, delay: 5, duration: 11, size: 20 },
  { left: 40, delay: 1, duration: 14, size: 16 },
  { left: 52, delay: 3.5, duration: 13, size: 22 },
  { left: 63, delay: 0.5, duration: 16, size: 12 },
  { left: 72, delay: 4, duration: 10, size: 18 },
  { left: 82, delay: 2.5, duration: 17, size: 14 },
  { left: 91, delay: 6, duration: 12, size: 20 },
  { left: 35, delay: 7, duration: 15, size: 10 },
  { left: 58, delay: 8, duration: 11, size: 16 },
  { left: 76, delay: 9, duration: 14, size: 12 },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const scrolled = window.scrollY
      el.style.setProperty('--parallax-y', `${scrolled * 0.3}px`)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient-bg"
    >
      {/* Parallax glow blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: 'translateY(var(--parallax-y, 0))' }}
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl bg-rose-400 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-15 blur-3xl bg-lavender-300 translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-3xl bg-gold-400" />
      </div>

      {/* Falling petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PETALS.map((p, i) => (
          <div
            key={i}
            className="petal text-rose-300"
            style={{
              left: `${p.left}%`,
              fontSize: `${p.size}px`,
              animationDuration: `${p.duration}s, ${p.duration * 0.7}s`,
              animationDelay: `${p.delay}s, 0s`,
              opacity: 0,
            }}
          >
            ✿
          </div>
        ))}
      </div>

      {/* Sparkle dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold-300 rounded-full"
            style={{
              left: `${(i * 5.1 + 3) % 100}%`,
              top: `${(i * 7.3 + 10) % 90}%`,
              animation: `sparkle ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.4) % 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-32 max-w-4xl mx-auto">
        {/* Bismillah */}
        <div className="animate-fade-in-down mb-6">
          <p className="bismillah text-gold-300 text-2xl md:text-3xl mb-2 drop-shadow-lg">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>
          <p className="font-sans text-primary-200 text-xs tracking-widest uppercase">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <span className="h-px w-12 bg-gold-400/40" />
          <span className="text-gold-400 text-xs">✦ ✦ ✦</span>
          <span className="h-px w-12 bg-gold-400/40" />
        </div>

        {/* Invitation text */}
        <p
          className="animate-fade-in font-sans text-primary-200 text-sm md:text-base tracking-wide mb-10 leading-relaxed max-w-xl mx-auto"
          style={{ animationDelay: '0.3s' }}
        >
          With the blessings of Allah (SWT), together with the prayers and love of our families,
          <br className="hidden md:block" /> we warmly invite you to witness and celebrate the Nikkah of
        </p>

        {/* Names — shimmer */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <h1 className="shimmer-text font-serif text-5xl md:text-7xl font-bold leading-tight drop-shadow-lg">
            Sidhique
          </h1>
          <div className="flex items-center justify-center gap-4 my-5">
            <span className="h-px w-16 md:w-28 bg-gold-400/50" />
            <span className="text-gold-300 text-3xl font-serif italic">&amp;</span>
            <span className="h-px w-16 md:w-28 bg-gold-400/50" />
          </div>
          <h1 className="shimmer-text font-serif text-5xl md:text-7xl font-bold leading-tight drop-shadow-lg">
            Sheerin
          </h1>
        </div>

        {/* In Sha Allah */}
        <p
          className="animate-fade-in font-serif italic text-gold-300 text-xl md:text-2xl mt-6 mb-10 animate-pulse-soft"
          style={{ animationDelay: '0.7s' }}
        >
          In Sha Allah
        </p>

        {/* Date & Venue card */}
        <div
          className="animate-fade-in-up glass rounded-2xl px-8 py-6 inline-block glow-purple"
          style={{ animationDelay: '0.9s' }}
        >
          <p className="font-sans text-primary-200 text-xs uppercase tracking-widest mb-2">On the blessed occasion</p>
          <p className="font-serif text-white text-2xl md:text-3xl font-bold">Sunday, 28 June 2026</p>
          <div className="mt-3 flex items-center justify-center gap-2 text-primary-200">
            <svg className="w-4 h-4 text-gold-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-sans text-sm">Sakthi Kalyan Mandapam, Nagore Main Road, Karaikal</span>
          </div>
        </div>

        {/* CTAs */}
        <div
          className="animate-fade-in mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animationDelay: '1.1s' }}
        >
          <a
            href="#rsvp"
            className="bg-gold-500 hover:bg-gold-400 text-primary-900 font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/40 hover:-translate-y-1 text-sm tracking-wide glow-gold"
          >
            Confirm Attendance
          </a>
          <a
            href="#schedule"
            className="glass hover:bg-white/20 text-white px-8 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 text-sm tracking-wide"
          >
            View Schedule
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="animate-bounce mt-16 text-primary-300 opacity-50">
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
