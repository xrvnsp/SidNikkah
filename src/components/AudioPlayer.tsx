import { useEffect, useRef, useState } from 'react'

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    // Create audio element using the public folder reference
    const audio = new Audio('/bg-loop.mp3')
    audio.loop = true
    audioRef.current = audio

    // Attempt autoplay on first user interaction (click, touch)
    const handleFirstInteraction = () => {
      if (audioRef.current && !hasInteracted) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true)
            setHasInteracted(true)
            cleanupListeners()
          })
          .catch((err) => {
            console.log("Autoplay prevented by browser security policies:", err)
          })
      }
    }

    const cleanupListeners = () => {
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
    }

    window.addEventListener('click', handleFirstInteraction)
    window.addEventListener('touchstart', handleFirstInteraction)

    return () => {
      cleanupListeners()
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [hasInteracted])

  const togglePlay = () => {
    if (!audioRef.current) return

    // Ensure we mark user interaction as complete
    setHasInteracted(true)

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Playback error:", err))
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={togglePlay}
        className="relative group flex items-center justify-center w-12 h-12 rounded-full bg-primary-950/90 backdrop-blur-md border border-gold-400/50 text-gold-300 hover:text-gold-200 shadow-lg shadow-black/30 hover:scale-110 transition-all duration-300 active:scale-95"
        aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
      >
        {/* Pulsing ring around button when playing */}
        {isPlaying && (
          <div className="absolute inset-0 rounded-full border border-gold-400/30 animate-ping opacity-75" />
        )}
        
        {/* Hover Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gold-400/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {isPlaying ? (
          // Playing wave animation
          <div className="flex items-end justify-center gap-[3px] h-4 w-5">
            <span className="w-[3px] h-full bg-gold-400 rounded-full wave-bar" style={{ animationDelay: '0.1s', transformOrigin: 'bottom' }} />
            <span className="w-[3px] h-full bg-gold-400 rounded-full wave-bar" style={{ animationDelay: '0.4s', transformOrigin: 'bottom' }} />
            <span className="w-[3px] h-full bg-gold-400 rounded-full wave-bar" style={{ animationDelay: '0.2s', transformOrigin: 'bottom' }} />
            <span className="w-[3px] h-full bg-gold-400 rounded-full wave-bar" style={{ animationDelay: '0.6s', transformOrigin: 'bottom' }} />
          </div>
        ) : (
          // Play icon
          <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  )
}
