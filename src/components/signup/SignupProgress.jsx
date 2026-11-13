export default function SignupProgress({ currentStep, totalSteps = 5 }) {
  const progress = `${(currentStep / totalSteps) * 100}%`

  return (
    <div className="mb-6 flex items-center justify-center gap-3">
      <span className="text-xs font-semibold tracking-[0.16em] text-indigo-700">
        STEP {currentStep} OF {totalSteps}
      </span>
      <span
        className="h-1 w-[120px] overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-label="Signup progress"
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-valuenow={currentStep}
      >
        <span
          className="block h-full rounded-full bg-indigo-600 transition-[width] duration-500 ease-out"
          style={{ width: progress }}
        />
      </span>
    </div>
  )
}
