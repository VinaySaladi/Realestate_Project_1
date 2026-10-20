// Brand-level settings. Change these and the whole site follows.
export const site = {
  name: 'Aurelia Estates',
  shortName: 'Aurelia',
  tagline: 'Exceptional homes, effortlessly found.',
  phone: '+1 (310) 555-0142',
  email: 'hello@aureliaestates.com',
  hours: 'Mon – Sat, 9:00 AM – 7:00 PM',
  offices: [
    {
      city: 'Los Angeles',
      label: 'Headquarters',
      address: '9200 Sunset Blvd, Suite 1200, West Hollywood, CA 90069',
      phone: '+1 (310) 555-0142',
    },
    {
      city: 'New York',
      label: 'East Coast Office',
      address: '450 Park Avenue, 18th Floor, New York, NY 10022',
      phone: '+1 (212) 555-0187',
    },
    {
      city: 'Miami',
      label: 'Coastal Office',
      address: '1111 Brickell Avenue, Suite 900, Miami, FL 33131',
      phone: '+1 (305) 555-0123',
    },
  ],
  socials: [
    { label: 'Instagram', icon: 'instagram', href: 'https://instagram.com' },
    { label: 'Facebook', icon: 'facebook', href: 'https://facebook.com' },
    { label: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com' },
    { label: 'X', icon: 'x', href: 'https://x.com' },
  ],
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
