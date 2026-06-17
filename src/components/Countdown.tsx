import { useState, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const target = new Date('2026-06-28T10:00:00+05:30').getTime()
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function CountBox({ value, label, delay }: { value: number; label: string; delay: string }) {
  return (
    <div className="flex flex-col items-center group" style={{ transitionDelay: delay }}>
      <div className="relative">
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-2xl bg-primary-400/20 blur-md scale-110 group-hover:bg-primary-400/40 transition-all duration-500" />
        <div className="relative glass rounded-2xl w-20 h-20 md:w-28 md:h-28 flex items-center justify-center border border-white/20 hover:border-gold-400/50 transition-all duration-300 hover:-translate-y-1">
          <span className="font-serif text-3xl md:text-5xl font-bold text-white tabular-nums group-hover:text-gold-300 transition-colors duration-300">
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="font-sans text-xs uppercase tracking-widest text-primary-200 mt-3">{label}</span>
    </div>
  )
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft)
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const isOver = Object.values(timeLeft).every((v) => v === 0)

  return (
    <section className="py-20 animated-gradient-bg relative overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div
        ref={ref}
        className={`relative z-10 max-w-4xl mx-auto px-6 text-center reveal ${isVisible ? 'visible' : ''}`}
      >
        <p className="font-sans text-xs uppercase tracking-widest text-primary-300 mb-3">Save the Date</p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
          {isOver ? 'May Allah bless this union!' : 'Counting Down to the Big Day'}
        </h2>
        <p className="font-sans text-primary-200 text-sm mb-12">Sunday, 28 June 2026 — 10:00 AM IST</p>

        {!isOver ? (
          <div className="flex items-start justify-center gap-3 md:gap-6">
            <CountBox value={timeLeft.days} label="Days" delay="0s" />
            <div className="text-white/40 text-3xl md:text-4xl font-bold mt-6 md:mt-8 animate-pulse">:</div>
            <CountBox value={timeLeft.hours} label="Hours" delay="0.1s" />
            <div className="text-white/40 text-3xl md:text-4xl font-bold mt-6 md:mt-8 animate-pulse">:</div>
            <CountBox value={timeLeft.minutes} label="Minutes" delay="0.2s" />
            <div className="text-white/40 text-3xl md:text-4xl font-bold mt-6 md:mt-8 animate-pulse">:</div>
            <CountBox value={timeLeft.seconds} label="Seconds" delay="0.3s" />
          </div>
        ) : (
          <div className="text-gold-300 font-serif text-2xl animate-pulse-soft">
            Alhamdulillah — The blessed day has arrived!
          </div>
        )}

        <div className="mt-14 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-gold-400/30" />
          <p className="font-serif italic text-gold-300 text-base md:text-lg max-w-sm">
            "May Allah fill this union with barakah, mercy, and endless happiness"
          </p>
          <span className="h-px w-12 bg-gold-400/30" />
        </div>
      </div>
    </section>
  )
}
