import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeaturedIntro from '@/components/FeaturedIntro'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import Approach from '@/components/Approach'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="page-home">
      <Navbar />
      <Hero />
      <FeaturedIntro />
      <Services />
      <Testimonials />
      <Approach />
      <Contact />
      <Footer />
    </main>
  )
}
