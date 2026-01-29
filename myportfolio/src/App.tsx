import './App.css'
import { About } from './components/About'
import BlogList from './components/BlogList'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import EmailSubscription from './components/EmailSubscription'
import FaqComp from './components/Faq'
import Footer from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import Pricing from './components/Pricing'
import Projects from './components/Projects'
import Services from './components/Services'
import Skills from './components/Skills'
import Stats from './components/Stats'
import Testimonial from './components/Testimonial'

function App() {

  return (
    <>
      <Navbar />
      <main className="pt-5">
        <Hero />
        <About />
        <Services />
        <Stats />
        <Skills />
        <Certificates />
        <Projects />
        <Testimonial />
        <Pricing />
        <BlogList />
        <Contact />
        <FaqComp />
        <EmailSubscription />
        <Footer />
        {/* Other sections will go here */}
      </main>
    </>
  )
}

export default App
