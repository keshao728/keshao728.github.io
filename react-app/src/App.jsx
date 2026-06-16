import Navbar from './components/Navbar'
import Header from './components/Header'
import About from './components/About'
import Skills from './components/Skills'
import Marquee from './components/Marquee'
import CallToAction from './components/CallToAction'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Header />
        <About />
        <Skills />
        <Marquee />
        <Work />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
