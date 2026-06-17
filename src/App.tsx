import Header from './components/Header'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import CoupleSection from './components/CoupleSection'
import Timeline from './components/Timeline'
import Venue from './components/Venue'
import RSVPForm from './components/RSVPForm'
import Footer from './components/Footer'
import AudioPlayer from './components/AudioPlayer'

export default function App() {
  return (
    <div className="min-h-screen bg-primary-50">
      <Header />
      <AudioPlayer />
      <main>
        <Hero />
        <Countdown />
        <CoupleSection />
        <Timeline />
        <Venue />
        <RSVPForm />
      </main>
      <Footer />
    </div>
  )
}
