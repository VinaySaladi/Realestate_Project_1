import { LoaderCircle } from 'lucide-react'

/** Spinning loader icon; accepts the same props as a lucide icon (handy for Button's `iconLeft`). */
export default function Spinner({ className = 'h-4 w-4', ...props }) {
  return <LoaderCircle {...props} className={`${className} animate-spin`} aria-hidden />
}
