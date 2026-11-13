import { useEffect } from 'react'

const autoSwitchDelay = 6500

export default function useAutoDashboardSwitch({
  activeRole,
  onRoleChange,
  isInViewport,
  prefersReducedMotion,
  isDragging,
  manualResetKey,
}) {
  useEffect(() => {
    if (!isInViewport || prefersReducedMotion || isDragging) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      onRoleChange(activeRole === 'teacher' ? 'student' : 'teacher', 'automatic')
    }, autoSwitchDelay)

    return () => window.clearTimeout(timeoutId)
  }, [
    activeRole,
    isDragging,
    isInViewport,
    manualResetKey,
    onRoleChange,
    prefersReducedMotion,
  ])
}
