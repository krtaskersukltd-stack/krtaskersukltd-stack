import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeaturedIntro from '@/components/FeaturedIntro'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import Approach from '@/components/Approach'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'

export default function Home() {
  return (
    <main className="page-home">
      <StructuredData
        type="Organization"
        data={{
          name: 'KR Tasker Digital',
          url: 'https://www.krtaskerdigital.com',
          logo: 'https://www.krtaskerdigital.com/images/logo.png',
          sameAs: [
            'https://linkedin.com',
            'https://twitter.com',
            'https://instagram.com',
          ],
        }}
      />
      <StructuredData
        type="WebSite"
        data={{
          name: 'KR Tasker Digital',
          url: 'https://www.krtaskerdigital.com',
        }}
      />
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
