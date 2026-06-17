import { useState, FormEvent } from 'react'
import { submitRSVP } from '../lib/supabase'
import { useScrollReveal } from '../hooks/useScrollReveal'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function RSVPForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [guestCount, setGuestCount] = useState(1)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Hooks must be called unconditionally before any early returns
  const { ref: headRef, isVisible: headVisible } = useScrollReveal()
  const { ref: formRef, isVisible: formVisible } = useScrollReveal<HTMLFormElement>({ threshold: 0.1 })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return
    setStatus('loading')
    const { error } = await submitRSVP({
      name: name.trim(),
      phone: phone.trim(),
      guest_count: guestCount,
      message: message.trim() || undefined,
    })
    if (error) {
      setStatus('error')
      setErrorMsg(error)
    } else {
      setStatus('success')
      setName('')
      setPhone('')
      setGuestCount(1)
      setMessage('')
    }
  }

  if (status === 'success') {
    return (
      <section id="rsvp" className="py-24 animated-gradient-bg relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="max-w-lg mx-auto px-6 text-center">
          <div className="glass border border-white/20 rounded-3xl p-10 shadow-xl animate-fade-in-up">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gold-400/20 blur-md animate-pulse" />
              <div className="relative w-16 h-16 bg-gold-400/20 rounded-full flex items-center justify-center border border-gold-400/30">
                <svg className="w-8 h-8 text-gold-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="font-serif text-2xl font-bold text-white mb-3">JazakAllahu Khayran!</h2>
            <p className="font-sans text-primary-200 text-sm leading-relaxed mb-6">
              Your RSVP has been received. We are honored by your presence and look forward
              to celebrating this blessed occasion with you.
            </p>
            <p className="bismillah text-gold-300 text-xl">آمين يا رب العالمين</p>
            <p className="font-sans text-primary-300 text-xs mt-2">Ameen, Ya Rabb al-Alameen</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-8 border border-white/30 text-white hover:bg-white/10 px-6 py-2 rounded-full text-sm transition-colors"
            >
              Submit another RSVP
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-24 animated-gradient-bg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary-800/20 rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 max-w-xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headRef}
          className={`text-center mb-10 reveal ${headVisible ? 'visible' : ''}`}
        >
          <p className="font-sans text-xs uppercase tracking-widest text-primary-300 mb-3">Join the Celebration</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Confirm Your Attendance</h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-gold-400 opacity-50" />
            <span className="text-gold-300">✿</span>
            <span className="h-px w-12 bg-gold-400 opacity-50" />
          </div>
          <p className="font-sans text-primary-200 text-sm leading-relaxed max-w-sm mx-auto">
            Your presence and duas will be a cherished blessing on this special occasion.
          </p>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={`glass border border-white/20 rounded-3xl p-8 shadow-xl space-y-5 reveal ${formVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '0.15s' }}
        >
          <div>
            <label className="font-sans text-xs uppercase tracking-wider text-primary-200 block mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-primary-300 focus:outline-none focus:border-gold-400 focus:bg-white/15 transition-all text-sm font-sans"
            />
          </div>

          <div>
            <label className="font-sans text-xs uppercase tracking-wider text-primary-200 block mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-primary-300 focus:outline-none focus:border-gold-400 focus:bg-white/15 transition-all text-sm font-sans"
            />
          </div>

          <div>
            <label className="font-sans text-xs uppercase tracking-wider text-primary-200 block mb-2">
              Number of Guests
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                className="w-10 h-10 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/25 transition-colors flex items-center justify-center text-lg hover:scale-110 transition-all"
              >
                −
              </button>
              <span className="font-serif text-white text-2xl w-8 text-center">{guestCount}</span>
              <button
                type="button"
                onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                className="w-10 h-10 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/25 transition-colors flex items-center justify-center text-lg hover:scale-110 transition-all"
              >
                +
              </button>
              <span className="font-sans text-primary-300 text-sm">
                {guestCount === 1 ? 'guest' : 'guests'} including yourself
              </span>
            </div>
          </div>

          <div>
            <label className="font-sans text-xs uppercase tracking-wider text-primary-200 block mb-2">
              Dua / Message <span className="normal-case text-primary-400">(optional)</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share a dua or message for the couple..."
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-primary-300 focus:outline-none focus:border-gold-400 focus:bg-white/15 transition-all text-sm font-sans resize-none"
            />
          </div>

          {status === 'error' && (
            <p className="font-sans text-red-300 text-sm bg-red-900/20 border border-red-400/20 rounded-xl px-4 py-3">
              {errorMsg || 'Something went wrong. Please try again.'}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-60 disabled:cursor-not-allowed text-primary-900 font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/40 hover:-translate-y-0.5 text-sm tracking-wide flex items-center justify-center gap-2 glow-gold"
          >
            {status === 'loading' ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting...
              </>
            ) : (
              'Confirm My Attendance'
            )}
          </button>

          <p className="font-sans text-primary-300 text-xs text-center">
            In Sha Allah, we look forward to celebrating with you!
          </p>
        </form>
      </div>
    </section>
  )
}
