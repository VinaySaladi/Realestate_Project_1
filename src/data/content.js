import { Gem, Handshake, Headset, ShieldCheck, Target, Eye, Award } from 'lucide-react'

export const popularLocations = [
  { city: 'Los Angeles', state: 'California', image: 'photo-1534190760961-74e8c1c5c3da', tagline: 'Hillside estates & ocean villas' },
  { city: 'New York', state: 'New York', image: 'photo-1496442226666-8d4d0e62e6e9', tagline: 'Penthouses & prewar classics' },
  { city: 'Miami', state: 'Florida', image: 'photo-1506966953602-c20cc11f75e3', tagline: 'Waterfront living' },
  { city: 'Austin', state: 'Texas', image: 'photo-1531218150217-54595bc2b934', tagline: 'Modern family homes' },
  { city: 'San Francisco', state: 'California', image: 'photo-1501594907352-04cda38ebc29', tagline: 'Bay-view apartments' },
  { city: 'Aspen', state: 'Colorado', image: 'photo-1605540436563-5bca919ae766', tagline: 'Mountain chalets' },
]

export const features = [
  {
    icon: ShieldCheck,
    title: 'Verified listings',
    text: 'Every home is inspected and verified by our team before it reaches you. No surprises.',
  },
  {
    icon: Gem,
    title: 'Curated luxury',
    text: 'A hand-picked portfolio of exceptional homes, including off-market opportunities.',
  },
  {
    icon: Handshake,
    title: 'Expert negotiation',
    text: 'Seasoned agents who secure the best terms, whether you are buying, selling or renting.',
  },
  {
    icon: Headset,
    title: 'Concierge support',
    text: 'From the first viewing to moving day, a dedicated advisor is with you at every step.',
  },
]

export const stats = [
  { value: 15, suffix: '+', label: 'Years of experience' },
  { value: 2400, suffix: '+', label: 'Properties sold' },
  { value: 12000, suffix: '+', label: 'Happy clients' },
  { value: 98, suffix: '%', label: 'Client satisfaction' },
]

export const testimonials = [
  {
    name: 'Olivia Carter',
    role: 'Bought in Beverly Hills',
    image: 'photo-1544005313-94ddf0286df2',
    quote:
      'Sophia understood exactly what we wanted before we did. We saw five homes, fell in love with the fourth, and closed in three weeks. Truly a white-glove experience.',
    rating: 5,
  },
  {
    name: 'Daniel Brooks',
    role: 'Sold in Manhattan',
    image: 'photo-1472099645785-5658abf4ff4e',
    quote:
      'Aurelia’s marketing was on another level: stunning photography, a private preview event and multiple offers above asking within ten days.',
    rating: 5,
  },
  {
    name: 'Amara Singh',
    role: 'Rented in Miami',
    image: 'photo-1534528741775-53994a69daeb',
    quote:
      'Relocating from London felt daunting, but Elena handled everything remotely. Video tours, paperwork and even setting up utilities. Flawless.',
    rating: 5,
  },
  {
    name: 'Ethan Morales',
    role: 'Investor in Austin',
    image: 'photo-1506794778202-cad84cf45f1d',
    quote:
      'James brought data, not just opinions. His market insight helped me build a rental portfolio that outperformed my expectations in year one.',
    rating: 5,
  },
]

export const missionVision = [
  {
    icon: Target,
    title: 'Our Mission',
    text: 'To make finding an exceptional home a joyful, transparent experience, pairing world-class properties with advisors who genuinely care.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    text: 'To be the most trusted name in luxury real estate, known for integrity, discretion and results that speak for themselves.',
  },
  {
    icon: Award,
    title: 'Our Promise',
    text: 'Honest advice, meticulous attention to detail and a relationship that continues long after the keys change hands.',
  },
]
