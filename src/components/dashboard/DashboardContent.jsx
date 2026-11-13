import { memo } from 'react'
import MetricCard from '../ui/MetricCard.jsx'
import ProgressBar from '../ui/ProgressBar.jsx'

function DashboardContent({
  dashboard,
  progress,
  isActive,
  transitionMode,
  transitionDuration,
  transitionEasing,
}) {
  const isManualTransition = transitionMode === 'manual'

  return (
    <div
      aria-hidden={!isActive}
      className={`min-h-[510px] transform transition-[opacity,transform,translate] motion-reduce:transition-none ${
        isActive
          ? 'relative z-10 translate-y-0 opacity-100'
          : `pointer-events-none absolute inset-x-0 top-0 z-0 ${
              isManualTransition ? 'translate-y-2' : 'translate-y-0'
            } opacity-0`
      }`}
      style={{
        transitionDuration: `${transitionDuration}ms`,
        transitionTimingFunction: transitionEasing,
      }}
    >
      <div className="mt-7 grid grid-cols-2 gap-4">
        {dashboard.metrics.map((metric) => (
          <div
            key={metric.title}
            aria-live="off"
            className={`transition-[transform,translate] motion-reduce:transition-none ${
              isActive
                ? 'translate-y-0'
                : isManualTransition
                  ? 'translate-y-1'
                  : 'translate-y-0'
            }`}
            style={{
              transitionDuration: `${transitionDuration}ms`,
              transitionTimingFunction: transitionEasing,
            }}
          >
            <MetricCard
              title={metric.title}
              value={metric.value(progress)}
              color={metric.color}
              sampleText="Illustrative"
            />
          </div>
        ))}
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{dashboard.progressTitle}</h3>
          <span className="text-xs text-slate-500">Sample</span>
        </div>

        {dashboard.progressItems.map((item) => {
          const currentProgress = item.progress * progress
          const displayedProgress = Math.round(currentProgress)

          return (
            <div
              key={item.name}
              role="progressbar"
              aria-label={`${item.name} progress`}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={displayedProgress}
            >
              <ProgressBar name={item.name} progress={currentProgress} />
            </div>
          )
        })}
      </div>

      <div className="mt-7 rounded-xl border border-slate-100 bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">{dashboard.detailTitle}</h3>
          <span className="text-xs text-slate-500">Illustrative</span>
        </div>
        <ul className="mt-3 space-y-3">
          {dashboard.details.map((detail) => (
            <li
              key={detail.label}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span className="text-slate-600">{detail.label}</span>
              <span className="font-medium text-slate-800">{detail.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default memo(DashboardContent)
