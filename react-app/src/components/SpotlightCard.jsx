// A card whose CSS spotlight (.spotlight::before) follows the cursor. Sets
// --mx / --my from the pointer position relative to the card.
export default function SpotlightCard({ className = '', children, ...rest }) {
  function onMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }
  return (
    <div className={`spotlight ${className}`} onMouseMove={onMove} {...rest}>
      {children}
    </div>
  )
}
