import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="group fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#0a0a14]/70 text-gray-300 backdrop-blur transition-all hover:-translate-y-1 hover:border-brand/50 hover:text-brand-light hover:shadow-glow"
    >
      <i className="fa-solid fa-arrow-up text-sm transition-transform group-hover:-translate-y-0.5" />
    </button>
  )
}
