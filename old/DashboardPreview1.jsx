import { useEffect, useRef, useState } from 'react'

const animationDuration = 1500

// DashboardPreview displays illustrative sample metrics and student progress.
function DashboardPreview() {
  const previewRef = useRef(null)
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false)
  const [progress, setProgress] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  // Each object provides the label and percentage used by one progress row.
  const progressItems = [
    { name: 'Python fundamentals', progress: 72 },
    { name: 'Conditional logic', progress: 85 },
    { name: 'Loops and iteration', progress: 48 },
  ]

  // Monitor reduced-motion changes so the preview can show final values without animating.
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined
    }

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setPrefersReducedMotion(motionPreference.matches)

    motionPreference.addEventListener('change', updateMotionPreference)

    return () => motionPreference.removeEventListener('change', updateMotionPreference)
  }, [])

  // Start the count-up when the preview is visible; fall back gracefully if unsupported.
  useEffect(() => {
    const preview = previewRef.current

    if (!preview || prefersReducedMotion || typeof window === 'undefined') {
      return undefined
    }

    if (!('IntersectionObserver' in window)) {
      const frameId = window.requestAnimationFrame(() => setHasEnteredViewport(true))
      return () => window.cancelAnimationFrame(frameId)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredViewport(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(preview)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  // Animate a single 0-to-1 value; the counters, labels, and bars all use that same progress.
  useEffect(() => {
    if (!hasEnteredViewport || prefersReducedMotion) {
      return undefined
    }

    let frameId
    let startTime

    const animate = (time) => {
      if (startTime === undefined) {
        startTime = time
      }

      const elapsed = time - startTime
      const linearProgress = Math.min(elapsed / animationDuration, 1)
      const easedProgress = 1 - (1 - linearProgress) ** 3

      setProgress(easedProgress)

      if (linearProgress < 1) {
        frameId = window.requestAnimationFrame(animate)
      }
    }

    frameId = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(frameId)
  }, [hasEnteredViewport, prefersReducedMotion])

  const visibleProgress = prefersReducedMotion ? 1 : progress
  const teachingHours = 24.5 * visibleProgress
  const earnings = Math.round(8400 * visibleProgress)

  return (
    <div id="preview" ref={previewRef} className="relative">
      <div className="absolute -inset-5 rounded-[2rem] bg-indigo-200/30 blur-3xl" />

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/5 sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Your workspace</p>
            <h2 className="mt-1 text-xl font-semibold">Overview</h2>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            Dashboard preview
          </span>
        </div>

        {/* These two cards show the sample totals from the original page. */}
        <div className="mt-7 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-indigo-50 p-5">
            <p className="text-sm text-indigo-700">Teaching hours</p>
            <p className="mt-3 text-3xl font-semibold" aria-live="off">
              {teachingHours === 0 ? '0' : teachingHours.toFixed(1)}
            </p>
            <p className="mt-1 text-xs text-slate-500">Sample data</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-5">
            <p className="text-sm text-emerald-700">Earnings</p>
            <p className="mt-3 text-3xl font-semibold" aria-live="off">
              ₹{earnings.toLocaleString('en-IN')}
            </p>
            <p className="mt-1 text-xs text-slate-500">Sample data</p>
          </div>
        </div>

        <div className="mt-7">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Student progress</h3>
            <span className="text-xs text-slate-500">Illustrative</span>
          </div>

          {/* map creates one progress row for every item in the data list. */}
          {progressItems.map((item) => (
            <div key={item.name} className="mt-5">
              <div className="mb-2 flex justify-between gap-3 text-sm">
                <span className="text-slate-600">{item.name}</span>
                <span className="font-semibold" aria-live="off">
                  {Math.round(item.progress * visibleProgress)}%
                </span>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-label={`${item.name} progress`}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={Math.round(item.progress * visibleProgress)}
              >
                <div
                  className="h-full rounded-full bg-indigo-600"
                  style={{ width: `${item.progress * visibleProgress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-7 rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm font-medium">Your teaching, at a glance.</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            A preview of the reports and learning insights we'll build.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPreview
