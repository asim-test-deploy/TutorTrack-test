export default function SignupSuccess({ accountType = "teacher" }) {
  const journey = accountType === "teacher" ? "teaching" : "learning";

  return (
    <section
      className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10"
      aria-labelledby="signup-success-heading"
    >
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8"
        >
          <path d="m5 12 4 4L19 6" />
        </svg>
      </span>
      <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-indigo-700">
        WELCOME TO TUTORTRACK
      </p>
      <h2
        id="signup-success-heading"
        className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
      >
        You&apos;re all set!
      </h2>
      <p className="mx-auto mt-3 max-w-md text-base leading-7 text-slate-600">
        Your {accountType} account is ready. We&apos;re so glad to have you with
        us on your {journey} journey.
      </p>
      <p className="mt-6 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-800">
        You&apos;re officially enrolled in TutorTrack.
      </p>
    </section>
  );
}
