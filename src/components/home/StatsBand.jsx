import AnimatedCounter from '../ui/AnimatedCounter'
import Reveal from '../ui/Reveal'
import { stats } from '../../data/content'

export default function StatsBand({ tone = 'dark' }) {
  const light = tone === 'dark'
  return (
    <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal
          key={s.label}
          delay={i * 0.1}
          className={`flex flex-col px-4 text-center lg:border-l lg:first:border-l-0 ${light ? 'lg:border-white/10' : 'lg:border-stone-200'}`}
        >
          <dt className={`order-2 mt-2 text-sm font-medium ${light ? 'text-white/55' : 'text-stone-500'}`}>{s.label}</dt>
          <dd className={`font-serif text-4xl font-semibold sm:text-5xl ${light ? 'text-white' : 'text-ink'}`}>
            <AnimatedCounter value={s.value} suffix={s.suffix} />
          </dd>
        </Reveal>
      ))}
    </dl>
  )
}
