import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import CoupleSection from './components/CoupleSection'
import Timeline from './components/Timeline'
import Venue from './components/Venue'
import RSVPForm from './components/RSVPForm'
import Footer from './components/Footer'
import AudioPlayer from './components/AudioPlayer'
import AdminDashboard from './components/AdminDashboard'

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdmin = () => {
      const isPathAdmin = window.location.pathname === '/admin' || window.location.pathname === '/admin/'
      const isParamAdmin = window.location.search.includes('admin=true')
      setIsAdmin(isPathAdmin || isParamAdmin)
    }
    checkAdmin()
    
    // Also poll location to support history navigation/updates
    const interval = setInterval(checkAdmin, 500)
    return () => clearInterval(interval)
  }, [])

  if (isAdmin) {
    return <AdminDashboard />
  }

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
