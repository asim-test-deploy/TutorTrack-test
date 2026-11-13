export default function ProgressBar({ name, progress }) {
  const boundedProgress = Math.min(100, Math.max(0, progress))

  return (
    <div className="mt-5">
      <div className="mb-2 flex justify-between gap-3 text-sm">
        <span className="text-slate-600">{name}</span>
        <span className="font-semibold">{Math.round(boundedProgress)}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full w-full origin-left rounded-full bg-indigo-600 will-change-transform"
          style={{ transform: `scaleX(${boundedProgress / 100})` }}
        />
      </div>
    </div>
  );
}