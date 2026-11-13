import { useEffect, useRef, useState } from 'react'

const animationDuration = 1500

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined
    }

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setPrefersReducedMotion(motionPreference.matches)

    motionPreference.addEventListener('change', updateMotionPreference)

    return () => motionPreference.removeEventListener('change', updateMotionPreference)
  }, [])

  return prefersReducedMotion
}

function useDashboardAnimation(animationKey) {
  const previewRef = useRef(null)
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false)
  const [isInViewport, setIsInViewport] = useState(false)
  const [animationProgress, setAnimationProgress] = useState({
    key: animationKey,
    value: 0,
  })
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const preview = previewRef.current

    if (!preview || typeof window === 'undefined') {
      return undefined
    }

    if (!('IntersectionObserver' in window)) {
      const frameId = window.requestAnimationFrame(() => setHasEnteredViewport(true))
      return () => window.cancelAnimationFrame(frameId)
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return
        }

        setIsInViewport(entry.isIntersecting)
        if (entry.isIntersecting) {
          setHasEnteredViewport(true)
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(preview)
    return () => observer.disconnect()
  }, [])

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

      setAnimationProgress({ key: animationKey, value: easedProgress })

      if (linearProgress < 1) {
        frameId = window.requestAnimationFrame(animate)
      }
    }

    frameId = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(frameId)
  }, [animationKey, hasEnteredViewport, prefersReducedMotion])

  return {
    previewRef,
    visibleProgress: prefersReducedMotion
      ? 1
      : animationProgress.key === animationKey
        ? animationProgress.value
        : 0,
    isInViewport: !prefersReducedMotion && isInViewport,
    prefersReducedMotion,
  }
}

export default useDashboardAnimation
