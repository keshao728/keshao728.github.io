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
    <section id="contact" className="bg-gray-bg py-20 lg:py-28">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="section-title">Get In Touch</h2>
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-muted">
            <span className="flex items-center gap-2">
              <i className="lni-envelope fa-solid fa-envelope text-brand" />
              {profile.email}
            </span>
            <span className="flex items-center gap-2">
              <i className="lni-phone-handset fa-solid fa-phone text-brand" />
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
            className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={5}
            required
            className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
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
