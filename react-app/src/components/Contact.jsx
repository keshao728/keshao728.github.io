import { useState } from 'react'
import { socials } from '../data/content'
import Reveal from './Reveal'
import CopyEmail from './CopyEmail'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqkjrjlw'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'peer w-full rounded-lg border border-white/10 bg-white/5 px-4 pb-2 pt-6 text-gray-200 placeholder-transparent outline-none backdrop-blur transition focus:border-brand focus:ring-2 focus:ring-brand/30'
  const labelClass =
    'pointer-events-none absolute left-4 top-2 font-mono text-xs text-brand-light/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-light'

  return (
    <section id="contact" className="relative py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.12),transparent_60%)]" />
      <div className="container relative">
        <Reveal className="mb-12 text-center">
          <p className="mono-label mb-4">get in touch</p>
          <h2 className="section-title">Let&apos;s Build Something</h2>
        </Reveal>

        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          {/* Left: pitch + links */}
          <Reveal className="flex">
            <div className="neon-card flex flex-1 flex-col justify-between gap-8 p-8">
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-white">
                  Have an idea or a role in mind?
                </h3>
                <p className="leading-relaxed text-gray-400">
                  I&apos;m always happy to talk frontend, UI/UX, or interesting
                  product work. Drop a message and I&apos;ll get back to you - or
                  reach me directly at the links below.
                </p>
              </div>

              <div className="flex">
                <CopyEmail />
              </div>

              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gray-500">
                  find me online
                </p>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-all hover:-translate-y-1 hover:border-brand/50 hover:text-brand-light hover:shadow-glow"
                    >
                      <i className={s.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={120} className="flex">
            <form
              onSubmit={handleSubmit}
              className="neon-card flex flex-1 flex-col gap-5 p-8"
            >
              <div className="relative">
                <input id="name" type="text" name="name" placeholder="Name" required className={inputClass} />
                <label htmlFor="name" className={labelClass}>your name</label>
              </div>
              <div className="relative">
                <input id="email" type="email" name="email" placeholder="Email" required className={inputClass} />
                <label htmlFor="email" className={labelClass}>your email</label>
              </div>
              <div className="relative">
                <textarea id="message" name="message" placeholder="Message" rows={5} required className={`${inputClass} resize-none`} />
                <label htmlFor="message" className={labelClass}>your message</label>
              </div>

              {status === 'success' && (
                <p className="font-mono text-sm text-green-400">
                  &gt; message sent. talk soon!
                </p>
              )}
              {status === 'error' && (
                <p className="font-mono text-sm text-red-400">
                  &gt; something went wrong - email me directly?
                </p>
              )}

              <button
                type="submit"
                className="main-btn mt-auto justify-center disabled:opacity-60"
                disabled={status === 'sending'}
              >
                <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                <i className={`fa-solid ${status === 'sending' ? 'fa-spinner fa-spin' : 'fa-paper-plane'} text-xs`} />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
