import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, description, align = 'center', tone = 'dark', action }) {
  const centered = align === 'center'
  const light = tone === 'light'

  return (
    <div
      className={`mb-12 flex flex-col gap-6 sm:mb-16 ${
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'
      }`}
    >
      <Reveal className={centered ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && (
          <p
            className={`mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gold ${
              centered ? 'justify-center' : ''
            }`}
          >
            <span className="h-px w-8 bg-gold" aria-hidden />
            {eyebrow}
          </p>
        )}
        <h2
          className={`font-serif text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl ${
            light ? 'text-white' : 'text-ink'
          }`}
        >
          {title}
        </h2>
        {description && (
          <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? 'text-white/65' : 'text-stone-500'}`}>
            {description}
          </p>
        )}
      </Reveal>
      {action && <Reveal delay={0.15}>{action}</Reveal>}
    </div>
  )
}
