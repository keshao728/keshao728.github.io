import { useReveal } from '../hooks'

// Fades/slides children up the first time they enter the viewport. Content is
// rendered immediately (no flash-of-hidden) - the reveal is a progressive
// enhancement: it starts slightly down + faded and settles into place, but if
// the observer never fires the content is still fully visible within a beat.
export default function Reveal({ children, className = '', delay = 0 }) {
  const [ref, shown] = useReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
