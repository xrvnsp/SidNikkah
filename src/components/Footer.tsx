import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Footer() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })
  return (
    <footer className="bg-primary-950 text-white py-16 relative overflow-hidden">
      {/* Decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-600 to-transparent" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-primary-800/30 rounded-full blur-3xl" />

      <div ref={ref} className={`relative z-10 max-w-4xl mx-auto px-6 reveal ${isVisible ? 'visible' : ''}`}>
        {/* Main content */}
        <div className="text-center mb-12">
          {/* Arabic dua */}
          <p className="bismillah text-gold-300 text-2xl mb-2">
            اللَّهُمَّ بَارِكْ لَهُمَا وَبَارِكْ عَلَيْهِمَا وَاجْمَعْ بَيْنَهُمَا فِي خَيْرٍ
          </p>
          <p className="font-sans text-primary-300 text-xs tracking-wide mb-8">
            "O Allah, bless them and bestow blessings upon them and join them together in goodness."
          </p>

          {/* Names */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-gold-400 text-sm">✦</span>
            <h3 className="font-serif text-2xl text-white font-bold">Sidhiq & Sheerin</h3>
            <span className="text-gold-400 text-sm">✦</span>
          </div>
          <p className="font-sans text-primary-400 text-sm">Sunday, 28 June 2026</p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 my-8">
            <span className="h-px w-16 bg-primary-700" />
            <span className="text-primary-600 text-lg">✿</span>
            <span className="h-px w-16 bg-primary-700" />
          </div>

          {/* Blessing message */}
          <p className="font-serif italic text-primary-300 text-base max-w-xl mx-auto leading-relaxed mb-2">
            "May Allah (SWT) fill this union with barakah, mercy, and endless happiness."
          </p>
          <p className="font-sans text-primary-500 text-sm italic">— In Sha Allah</p>
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-10">
          {[
            { label: 'Home', href: '#home' },
            { label: 'The Couple', href: '#couple' },
            { label: 'Schedule', href: '#schedule' },
            { label: 'Venue', href: '#venue' },
            { label: 'RSVP', href: '#rsvp' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-primary-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-800 pt-6 text-center">
          <p className="font-sans text-primary-600 text-xs">
            Nikkah of Aboobakkar Sidhique & Murshedha Sheerin · 28 June 2026 · Karaikal
          </p>
          <p className="font-sans text-primary-500 text-xs mt-2 flex items-center justify-center gap-1">
            Made with <span className="text-red-500 animate-pulse">❤️</span> by Friends, for Mappilai
          </p>
          <p className="font-sans text-primary-700 text-xs mt-1">
            Alhamdulillah
          </p>
        </div>
      </div>
    </footer>
  )
}
