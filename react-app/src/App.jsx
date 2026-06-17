import Navbar from './components/Navbar'
import Header from './components/Header'
import About from './components/About'
import Skills from './components/Skills'
import Marquee from './components/Marquee'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import CursorGlow from './components/CursorGlow'
import Preloader from './components/Preloader'

export default function App() {
  return (
    <>
      <Preloader />
      <CursorGlow />
      <Navbar />
      <main>
        <Header />
        <About />
        <Skills />
        <Marquee />
        <Work />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
