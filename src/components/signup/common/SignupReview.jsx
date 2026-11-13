import Button from "../../ui/Button.jsx";

export default function SignupReview({
  formData,
  detailItems,
  accountType = "teacher",
  onBack,
  onSubmit,
  isSubmitting = false,
  submitError = "",
}) {
  return (
    <section
      className="mx-auto w-full max-w-xl"
      aria-labelledby="signup-confirmation-heading"
    >
      <div className="mb-8 text-center">
        <h2
          id="signup-confirmation-heading"
          className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
        >
          Review your details
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Check everything before creating your TutorTrack {accountType} account.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <dl className="grid gap-3 sm:grid-cols-2">
          {detailItems.map(({ label, value }) => (
            <div key={label} className="rounded-xl bg-slate-50 p-4">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {label}
              </dt>
              <dd className="mt-1 break-words text-sm font-semibold text-slate-800">
                {value(formData) || "Not provided"}
              </dd>
            </div>
          ))}
          <div className="rounded-xl bg-slate-50 p-4">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Password
            </dt>
            <dd className="mt-1 text-sm font-semibold text-slate-800">
              hidden for your security
            </dd>
          </div>
        </dl>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          Your password is never shown in this review.
        </p>

        {submitError && (
          <p
            className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
            role="alert"
          >
            {submitError}
          </p>
        )}

        <div className="mt-6 flex gap-3">
          <Button
            type="button"
            variant="subtle"
            className="flex-1"
            onClick={onBack}
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button
            type="button"
            className="flex-1 shadow-lg shadow-indigo-600/20 focus-visible:ring-4 focus-visible:ring-indigo-200"
            onClick={onSubmit}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </div>
      </div>
    </section>
  );
}
