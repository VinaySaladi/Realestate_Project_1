import PageTransition from '../components/layout/PageTransition'
import Hero from '../components/home/Hero'
import FeaturedProperties from '../components/home/FeaturedProperties'
import PopularLocations from '../components/home/PopularLocations'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Testimonials from '../components/home/Testimonials'
import CallToAction from '../components/home/CallToAction'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Home() {
  useDocumentTitle()
  return (
    <PageTransition>
      <Hero />
      <FeaturedProperties />
      <PopularLocations />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </PageTransition>
  )
}
