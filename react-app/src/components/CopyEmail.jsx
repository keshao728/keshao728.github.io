import { useState } from 'react'
import { profile } from '../data/content'

// Email chip with a mailto link + a copy-to-clipboard button that confirms
// with a green "Copied" state. Reused in About and Contact.
export default function CopyEmail() {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard?.writeText(profile.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <div className="group flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1.5 text-sm text-gray-300 backdrop-blur transition-all hover:border-brand/40">
      <a
        href={`mailto:${profile.email}`}
        className="inline-flex min-w-0 items-center gap-3 pl-1 transition-colors hover:text-white"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand-light">
          <i className="fa-solid fa-envelope text-xs" />
        </span>
        <span className="truncate font-mono">{profile.email}</span>
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3 font-mono text-xs transition-all ${
          copied
            ? 'bg-green-500/20 text-green-300'
            : 'bg-white/5 text-gray-400 hover:bg-brand/20 hover:text-brand-light'
        }`}
      >
        <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'} text-[11px]`} />
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
