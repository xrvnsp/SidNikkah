import { useScrollReveal } from '../hooks/useScrollReveal'

function CoupleCard({
  role,
  name,
  shortName,
  parentLabel,
  parents,
  imgUrl,
  revealClass,
  delay,
}: {
  role: string
  name: string
  shortName: string
  parentLabel: string
  parents: string
  imgUrl: string
  revealClass: string
  delay: string
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.15 })

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center text-center ${revealClass} ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: delay }}
    >
      {/* Photo with animated ring */}
      <div className="relative mb-8 group">
        {/* Animated glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-rose-400 opacity-20 blur-xl scale-110 group-hover:opacity-40 group-hover:scale-125 transition-all duration-700" />
        {/* Spinning border */}
        <div
          className="absolute -inset-1 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-500"
          style={{
            background: 'conic-gradient(from 0deg, #c084fc, #f472b6, #fcd34d, #c084fc)',
            animation: 'spin 8s linear infinite',
          }}
        />
        <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-primary-300/30 group-hover:shadow-primary-400/50 transition-shadow duration-500">
          <img
            src={imgUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        {/* Role badge */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-lg shadow-primary-600/30 whitespace-nowrap">
          {role}
        </div>
      </div>

      {/* Name */}
      <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-800 mt-4 mb-1">{name}</h3>
      <p className="font-sans text-primary-400 text-sm italic mb-5">"{shortName}"</p>

      {/* Parents */}
      <div className="bg-gradient-to-br from-primary-50 to-lavender-100 border border-primary-100 rounded-2xl px-6 py-4 max-w-xs hover:shadow-md hover:border-primary-200 transition-all duration-300">
        <p className="font-sans text-xs uppercase tracking-widest text-primary-400 mb-1">{parentLabel}</p>
        <p className="font-sans text-primary-700 text-sm font-medium leading-relaxed">{parents}</p>
      </div>
    </div>
  )
}

export default function CoupleSection() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal()
  const { ref: tagRef, isVisible: tagVisible } = useScrollReveal({ threshold: 0.3 })

  return (
    <section id="couple" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-64 bg-primary-50 rounded-full blur-3xl opacity-70" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headRef}
          className={`text-center mb-16 reveal ${headVisible ? 'visible' : ''}`}
        >
          <p className="section-subheading">The Blessed Union</p>
          <h2 className="section-heading">The Happy Couple</h2>
          <div className="decorative-line mt-4">
            <span className="ornament">✿</span>
          </div>
          <p className="font-sans text-primary-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            As we begin a beautiful journey of faith, love, and togetherness — your presence
            and duas will be a cherished blessing on this special occasion.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <CoupleCard
            role="Groom"
            name="Ar. Md. Aboobakkar Sidhique"
            shortName="Sidhiq"
            parentLabel="Son of"
            parents="Mrs. & Mr. Mohamed Jahaber Maricar"
            imgUrl="/images/Groom.jpeg"
            revealClass="reveal-left"
            delay="0s"
          />
          <CoupleCard
            role="Bride"
            name="Murshedha Sheerin"
            shortName="Sheerin"
            parentLabel="Daughter of"
            parents="Mrs. & Mr. Md. Anvar Husain Maricar"
            imgUrl="/images/Bride.png"
            revealClass="reveal-right"
            delay="0.15s"
          />
        </div>

        {/* Together tag */}
        <div
          ref={tagRef}
          className={`text-center mt-12 reveal ${tagVisible ? 'visible' : ''}`}
        >
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-primary-50 via-lavender-100 to-primary-50 border border-primary-100 rounded-2xl px-8 py-4 shadow-sm hover:shadow-md transition-shadow duration-300">
            <span className="text-primary-300 text-xl">✦</span>
            <span className="font-serif text-primary-700 text-lg italic">Together Forever</span>
            <span className="text-primary-300 text-xl">✦</span>
          </div>
        </div>
      </div>
    </section>
  )
}
