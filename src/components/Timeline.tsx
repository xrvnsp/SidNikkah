import { useScrollReveal } from '../hooks/useScrollReveal'

const events = [
  {
    time: '10:00 AM',
    title: 'Garland Ceremony',
    subtitle: 'Home Sweet Home',
    icon: '🏡',
    description: 'The celebration begins with a warm and heartfelt garland ceremony at the family home.',
    color: 'from-primary-500 to-primary-600',
  },
  {
    time: '10:45 AM',
    title: 'Grand Entrance',
    subtitle: 'Sakthi Kalyan Mandapam',
    icon: '✨',
    description: 'The couple makes their grand entrance into the beautifully decorated mandapam.',
    color: 'from-lavender-500 to-lavender-600',
  },
  {
    time: '11:00 AM',
    title: 'Nikkah Ceremony',
    subtitle: 'Union',
    icon: '💍',
    description: 'The Nikkah ceremony — the blessed union witnessed by all and blessed by Allah (SWT).',
    color: 'from-primary-600 to-rose-500',
  },
  {
    time: '12:00 PM',
    title: 'Walimah Feast',
    subtitle: 'Grand Celebration Meal',
    icon: '🍽️',
    description: 'A grand Walimah feast is served — a sunnah to share the joy with family and friends.',
    color: 'from-gold-500 to-gold-600',
  },
  {
    time: '4:00 PM',
    title: 'Thalikettu (Ladies Only)',
    subtitle: 'Cherished Tradition',
    icon: '∞',
    description: 'A cherished and private traditional ceremony held exclusively for the ladies.',
    color: 'from-rose-500 to-primary-500',
    isBold: true,
  },
  {
    time: '6:00 PM',
    title: 'Signing Off Newly Weds',
    subtitle: 'Until We Meet Again',
    icon: '🚗',
    description: 'The happy couple departs, embarking on their beautiful journey together.',
    color: 'from-primary-700 to-lavender-600',
  },
]

function TimelineItem({
  event,
  index,
}: {
  event: typeof events[0]
  index: number
}) {
  const isLeft = index % 2 === 0
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={`relative flex items-start md:items-center gap-4 md:gap-0 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } reveal ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      {/* Desktop content card */}
      <div className={`hidden md:block w-[calc(50%-2.5rem)] ${isLeft ? 'pr-8' : 'pl-8'}`}>
        <div
          className={`inline-block bg-white rounded-2xl px-6 py-5 shadow-md border border-primary-100
            hover:shadow-xl hover:border-primary-300 hover:-translate-y-1 transition-all duration-300
            max-w-xs ${isLeft ? 'ml-auto text-right' : 'mr-auto text-left'} group`}
        >
          <span
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${event.color} text-white mb-2`}
          >
            {event.time}
          </span>
          <h3 className="font-serif text-lg font-bold text-primary-800 group-hover:text-primary-600 transition-colors">
            {event.title}
          </h3>
          <p className="font-sans text-primary-400 text-xs italic mb-2">{event.subtitle}</p>
          <p className={`font-sans text-xs leading-relaxed ${event.isBold ? 'font-bold text-primary-900' : 'text-primary-600'}`}>{event.description}</p>
        </div>
      </div>

      {/* Center icon */}
      <div
        className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
          shadow-lg border-4 border-white md:absolute md:left-1/2 md:-translate-x-1/2
          bg-gradient-to-br ${event.color} text-xl
          hover:scale-110 transition-transform duration-300`}
      >
        {event.icon === '∞' ? (
          <span className="text-white text-lg font-bold">∞</span>
        ) : (
          <span>{event.icon}</span>
        )}
      </div>

      {/* Mobile content */}
      <div className="md:hidden flex-1 bg-white rounded-2xl px-5 py-4 shadow-md border border-primary-100 ml-2 hover:shadow-lg hover:border-primary-200 transition-all duration-300 group">
        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${event.color} text-white mb-2`}>
          {event.time}
        </span>
        <h3 className="font-serif text-base font-bold text-primary-800">{event.title}</h3>
        <p className="font-sans text-primary-400 text-xs italic mb-1">{event.subtitle}</p>
        <p className={`font-sans text-xs leading-relaxed ${event.isBold ? 'font-bold text-primary-900' : 'text-primary-600'}`}>{event.description}</p>
      </div>

      {/* Desktop empty side */}
      <div className="hidden md:block w-[calc(50%-2.5rem)]" />
    </div>
  )
}

export default function Timeline() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal()

  return (
    <section id="schedule" className="py-24 bg-lavender-gradient relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
      <div className="absolute -top-32 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headRef}
          className={`text-center mb-16 reveal ${headVisible ? 'visible' : ''}`}
        >
          <p className="section-subheading">Program of the Day</p>
          <h2 className="section-heading">Wedding Day Schedule</h2>
          <div className="decorative-line mt-4">
            <span className="ornament">✿</span>
          </div>
          <p className="font-sans text-primary-500 text-sm mt-4">
            Sunday, 28 June 2026 — Sakthi Kalyan Mandapam, Karaikal
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2">
            <div className="w-full h-full bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200 opacity-60" />
          </div>

          <div className="space-y-10">
            {events.map((event, index) => (
              <TimelineItem key={index} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
