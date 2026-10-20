import { ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import PropertyCard from '../property/PropertyCard'
import { featuredProperties } from '../../data/properties'

export default function FeaturedProperties() {
  return (
    <section id="featured" className="relative mx-auto max-w-7xl scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        align="left"
        eyebrow="Featured listings"
        title={
          <>
            Handpicked homes of <em className="text-gold">distinction</em>
          </>
        }
        description="A selection of our most remarkable properties, each chosen for its design, location and lasting value."
        action={
          <Button to="/properties" variant="outline" icon={ArrowRight}>
            View all properties
          </Button>
        }
      />

      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProperties.map((property, i) => (
          <Reveal as="li" key={property.id} delay={(i % 3) * 0.1}>
            <PropertyCard property={property} />
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
