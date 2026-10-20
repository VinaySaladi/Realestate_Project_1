export default function PageLoader() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-live="polite">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-sand border-t-gold" aria-hidden />
      <span className="sr-only">Loading page…</span>
    </div>
  )
}
