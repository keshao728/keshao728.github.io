import SpotlightCard from './SpotlightCard'

// A project card styled like a code/terminal window. Content stays visible
// (no hover-to-reveal) so the descriptions and stack are always readable; the
// image sits in the "window" with a faux title bar, and tools render as chips.
export default function WorkCard({ item }) {
  const tools = item.tools ? item.tools.split(',').map((t) => t.trim()) : []

  return (
    <SpotlightCard className="neon-card group flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      {/* faux window title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
        <span className="h-3 w-3 rounded-full bg-green-400/70" />
        <span className="ml-2 truncate font-mono text-xs text-gray-500">
          ~/projects/{item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
        </span>
      </div>

      {/* media */}
      <div className="relative overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-brand-dark/30 to-[#12121f]">
            {item.placeholderIcon && (
              <i className={`${item.placeholderIcon} text-5xl text-brand-light/80`} />
            )}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a14] to-transparent opacity-60" />
      </div>

      {/* body */}
      <div className="relative flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-brand-light">
            {item.title}
          </h3>
          {item.links?.length > 0 && (
            <div className="flex shrink-0 gap-2">
              {item.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Project link"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 transition-all hover:border-brand/50 hover:text-brand-light"
                >
                  <i className={link.icon} />
                </a>
              ))}
            </div>
          )}
        </div>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-400">
          {item.description}
        </p>

        {tools.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1 font-mono text-xs text-brand-light"
              >
                {tool}
              </span>
            ))}
          </div>
        )}
      </div>
    </SpotlightCard>
  )
}
