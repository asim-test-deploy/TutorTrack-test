import { useCallback, useState } from 'react'
import useAutoDashboardSwitch from '../hooks/useAutoDashboardSwitch.js'
import useDashboardAnimation from '../hooks/useDashboardAnimation.js'
import DashboardContent from './dashboard/DashboardContent.jsx'
import { dashboardData, dashboardRoles } from './dashboard/dashboardData.js'
import DashboardSwitcher from './dashboard/DashboardSwitcher.jsx'

function DashboardPreview({
  activeRole,
  onRoleChange,
  transitionMode,
  transitionDuration,
  transitionEasing,
  manualAnimationKey,
}) {
  const [manualResetKey, setManualResetKey] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const {
    previewRef,
    visibleProgress,
    isInViewport,
    prefersReducedMotion,
  } = useDashboardAnimation(manualAnimationKey)

  useAutoDashboardSwitch({
    activeRole,
    onRoleChange,
    isInViewport,
    prefersReducedMotion,
    isDragging,
    manualResetKey,
  })

  const handleManualSelect = useCallback(
    (role) => {
      setManualResetKey((currentKey) => currentKey + 1)
      onRoleChange(role, 'manual')
    },
    [onRoleChange],
  )

  return (
    <div id="preview" ref={previewRef} className="relative">
      <div className="absolute inset-x-0 -inset-y-5 rounded-[2rem] bg-indigo-200/30 blur-3xl sm:-inset-5" />

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/5 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Workspace preview</p>
            <h2 className="mt-1 text-xl font-semibold">
              {dashboardData[activeRole].title}
            </h2>
          </div>
          <DashboardSwitcher
            activeRole={activeRole}
            transitionDuration={transitionDuration}
            transitionEasing={transitionEasing}
            onSelectRole={handleManualSelect}
            onDraggingChange={setIsDragging}
          />
        </div>

        <p className="mt-4 text-xs font-medium text-slate-500">
          Illustrative sample data
        </p>

        <div className="relative mt-4 min-h-[510px]">
          {dashboardRoles.map((role) => {
            const isActive = activeRole === role

            return (
              <DashboardContent
                key={role}
                dashboard={dashboardData[role]}
                progress={isActive ? visibleProgress : 1}
                isActive={isActive}
                transitionMode={transitionMode}
                transitionDuration={transitionDuration}
                transitionEasing={transitionEasing}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DashboardPreview
