import { useEffect, useState } from 'react'

// A cool load-in screen: dark backdrop, the kelly.shao wordmark with a typing
// cursor, an animated purple progress bar, then it fades out and unmounts.
export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // animate a fake-but-smooth progress to 100, then fade out
    let p = 0
    const id = setInterval(() => {
      // ease toward 100 with small random-ish steps (deterministic enough)
      p += Math.max(2, (100 - p) * 0.18)
      if (p >= 100) {
        p = 100
        clearInterval(id)
        setProgress(100)
        setTimeout(() => setDone(true), 350) // hold a beat at 100
        // tell the rest of the app the intro is finishing so entrance
        // animations (hero) can start as the loader fades away
        setTimeout(() => window.dispatchEvent(new Event('preloader:done')), 500)
        setTimeout(() => setHidden(true), 1100) // unmount after fade
      } else {
        setProgress(p)
      }
    }, 90)
    return () => clearInterval(id)
  }, [])

  // lock scroll while loading
  useEffect(() => {
    document.body.style.overflow = hidden ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [hidden])

  if (hidden) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a14] transition-opacity duration-700 ${
        done ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* radial glow */}
      <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-brand/20 blur-[100px] animate-pulse-glow" />

      <div className="relative flex flex-col items-center gap-6">
        <div className="font-mono text-2xl font-semibold tracking-wider text-white">
          kelly<span className="text-brand-light">.shao</span>
          <span className="ml-1 inline-block h-5 w-2 animate-blink bg-brand-light align-middle" />
        </div>

        {/* progress bar */}
        <div className="h-[3px] w-56 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand to-brand-light shadow-glow transition-[width] duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500">
          {progress < 100 ? `loading ${Math.round(progress)}%` : 'welcome'}
        </div>
      </div>
    </div>
  )
}
