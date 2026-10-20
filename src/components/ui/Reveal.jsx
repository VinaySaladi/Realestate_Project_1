import { motion } from 'framer-motion'

export const easeOut = [0.22, 1, 0.36, 1]

/** Fades + slides its children in the first time they scroll into view. */
export default function Reveal({ as = 'div', children, delay = 0, y = 36, className = '', ...props }) {
  const Component = motion[as]
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: easeOut, delay }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  )
}
