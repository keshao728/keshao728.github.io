// A single project / work card. Shows the image (or an icon placeholder when
// there's no image), with a hover overlay carrying the title, tools, and links.
export default function WorkCard({ item }) {
  return (
    <div className={`work-card ${item.wide ? 'lg:col-span-2' : ''}`}>
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="aspect-video w-full object-cover"
        />
      ) : (
        <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand-dark/40 to-[#1a1a2e] px-6 text-center">
          {item.placeholderIcon && (
            <i className={`${item.placeholderIcon} text-4xl text-brand-light`} />
          )}
          <h4 className="text-lg font-semibold text-white">{item.title}</h4>
        </div>
      )}

      <div className="work-overlay">
        <h3 className="text-xl font-semibold">{item.title}</h3>
        {item.tools && <p className="text-sm text-brand-light">({item.tools})</p>}
        <p className="text-sm leading-relaxed text-white/85">{item.description}</p>
        {item.links?.length > 0 && (
          <ul className="mt-2 flex gap-3">
            {item.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Project link"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-brand"
                >
                  <i className={link.icon} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
