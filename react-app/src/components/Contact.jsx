import { useState } from 'react'
import { profile } from '../data/content'

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

  return (
    <section id="contact" className="relative py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.12),transparent_60%)]" />
      <div className="container relative">
        <div className="mb-10 text-center">
          <h2 className="section-title">Get In Touch</h2>
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-gray-400">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-envelope text-brand-light" />
              {profile.email}
            </span>
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-phone text-brand-light" />
              {profile.phone}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-gray-200 placeholder-gray-500 outline-none backdrop-blur transition focus:border-brand focus:ring-2 focus:ring-brand/30"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-gray-200 placeholder-gray-500 outline-none backdrop-blur transition focus:border-brand focus:ring-2 focus:ring-brand/30"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={5}
            required
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-gray-200 placeholder-gray-500 outline-none backdrop-blur transition focus:border-brand focus:ring-2 focus:ring-brand/30"
          />

          {status === 'success' && (
            <p className="text-sm font-medium text-green-600">
              Thanks! Your message has been sent.
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm font-medium text-red-500">
              Something went wrong. Please try again or email me directly.
            </p>
          )}

          <button type="submit" className="main-btn disabled:opacity-60" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}
