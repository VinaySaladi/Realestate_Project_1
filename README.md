# Realestate Project 1: Aurelia Estates

A premium, fully static real estate website built with **React + Vite (JavaScript)**, **Tailwind CSS v4**,
**framer-motion**, **react-router-dom** and **lucide-react**. It doesn't need a backend: listings are mock data.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # preview the production build
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero with Buy / Rent / Sell search, featured listings, popular locations, why choose us, testimonials, CTA |
| `/properties` | Listings: keyword search, filters (status, location, type, price, beds), sort, removable filter chips, load more |
| `/properties/:slug` | Property details: gallery + lightbox, specs, description, amenities, map, agent contact form, similar homes |
| `/about` | Story, mission & vision, animated stats, team, testimonials |
| `/contact` | Validated contact form, offices, socials, map placeholder |
| `/favorites` | Saved homes (stored in `localStorage`) |
| `*` | Styled 404 |

Filters live in the URL (`/properties?status=sale&city=Miami&beds=3`), so searches can be shared and still work after a refresh.

## Where to edit things

| What | File |
| --- | --- |
| Brand name, phone, email, offices, socials, nav | `src/config/site.js` |
| Listings | `src/data/properties.js` |
| Agents / team | `src/data/agents.js` |
| Locations, features, stats, testimonials, mission | `src/data/content.js` |
| Filter options (types, price bands, sort) | `src/data/filters.js` |
| Colours & fonts | `src/index.css` (`@theme`) |

Images are Unsplash photo ids, served resized through `src/utils/image.js`. If an image fails to load, it falls back to
a neutral placeholder.

## Project structure

```
src/
  components/
    layout/    Navbar, Footer, Logo, PageHeader, PageTransition
    ui/        Button, Modal, Reveal, SectionHeading, SmartImage, FormField, SelectField, AnimatedCounter, ...
    property/  PropertyCard, PropertyGrid, SearchBar, Gallery, FavoriteButton, AmenityList, ContactAgentForm
    home/      Hero, FeaturedProperties, PopularLocations, WhyChooseUs, StatsBand, Testimonials, CallToAction
  context/     FavoritesContext (wishlist)
  hooks/       useForm, useSimulatedLoading, useDocumentTitle
  pages/       Home, Properties, PropertyDetails, About, Contact, Favorites, NotFound
  utils/       filterProperties, format, image, validation
```

## Going live with real data

- Replace `useSimulatedLoading` with real fetching and point the pages at your API.
- The forms call `fakeRequest()` in `src/hooks/useForm.js`. Swap it for your form endpoint (Formspree, Netlify Forms, your API).

## Deploy

The repo includes `public/_redirects` (Netlify) and `vercel.json` (Vercel), so deep links like `/properties/skyline-penthouse` work on refresh.
