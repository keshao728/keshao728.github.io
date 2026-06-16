export default function CallToAction() {
  return (
    <section
      className="relative bg-cover bg-center py-24"
      style={{ backgroundImage: 'url(images/call-to-action.jpg)' }}
    >
      <div className="absolute inset-0 bg-ink/70" />
      <div className="container relative text-center">
        <h2 className="mb-8 text-3xl font-semibold text-white sm:text-4xl">
          Interested to know me more?
        </h2>
        <a href="#contact" className="main-btn-outline">
          Contact Me
        </a>
      </div>
    </section>
  )
}
