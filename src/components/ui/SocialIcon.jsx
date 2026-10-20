// Minimal brand glyphs (lucide no longer ships brand icons).
const paths = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>
  ),
  facebook: <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5.5v4H8v7h4v-7h3l.5-4H12V7.5c0-.6.4-1 1-1h2z" />,
  linkedin: (
    <>
      <rect x="3" y="9" width="4" height="12" rx="0.5" />
      <circle cx="5" cy="5" r="2" />
      <path d="M11 21V9h4v1.8c.8-1.3 2.2-2 3.8-2 2.4 0 3.2 1.6 3.2 4.4V21h-4v-6.6c0-1.3-.4-2.1-1.6-2.1s-1.4.9-1.4 2.1V21z" />
    </>
  ),
  x: <path d="M4 4l16 16M20 4L4 20" />,
}

export default function SocialIcon({ name, className = 'h-4 w-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name]}
    </svg>
  )
}
