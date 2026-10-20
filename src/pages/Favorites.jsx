import { HeartOff } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import PageHeader from '../components/layout/PageHeader'
import PropertyGrid from '../components/property/PropertyGrid'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'
import { useFavorites } from '../context/FavoritesContext'
import { properties } from '../data/properties'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Favorites() {
  useDocumentTitle('Saved homes')
  const { ids } = useFavorites()
  const saved = properties.filter((p) => ids.includes(p.id))

  return (
    <PageTransition>
      <PageHeader
        eyebrow="Your shortlist"
        title="Saved homes"
        description="Every property you've hearted, in one place. Saved on this device, so they're here when you come back."
        image="photo-1600607687939-ce8a6c25118c"
      />
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        {saved.length === 0 ? (
          <EmptyState
            icon={HeartOff}
            title="No saved homes yet"
            description="Tap the heart on any property to add it to your shortlist."
            action={
              <Button to="/properties" variant="dark">
                Browse properties
              </Button>
            }
          />
        ) : (
          <>
            <p className="mb-8 text-sm text-stone-500">
              <strong className="font-bold text-ink">{saved.length}</strong> saved {saved.length === 1 ? 'home' : 'homes'}
            </p>
            <PropertyGrid properties={saved} />
          </>
        )}
      </section>
    </PageTransition>
  )
}
