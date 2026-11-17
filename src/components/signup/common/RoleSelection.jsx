import Button from "../../ui/Button.jsx";
const roles = [
  {
    value: "student",
    title: "Student",
    description: "Track subjects, learning progress and homework.",
    caption: "Your personal learning space",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <path d="m2 10 10-5 10 5-10 5-10-5Z" />
        <path d="M6 12v5c3.3 2.7 8.7 2.7 12 0v-5" />
        <path d="M22 10v6" />
      </svg>
    ),
  },
  {
    value: "teacher",
    title: "Teacher",
    description: "Manage classes, students and teaching progress.",
    caption: "Your educator workspace",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <path d="M12 7v14" />
        <path d="M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-4a3 3 0 0 0-3 2 3 3 0 0 0-3-2H5a2 2 0 0 1-2-2Z" />
      </svg>
    ),
  },
];

function RoleSelection({ selectedRole, onSelectRole, onContinue }) {
  return (
    <section
      className="mx-auto w-full max-w-[800px]"
      aria-labelledby="role-selection-heading"
    >
      <div className="text-center">
        <h2
          id="role-selection-heading"
          className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
        >
          How will you use TutorTrack?
          {/* <span className="ml-1 text-red-600" aria-hidden="true">
            *
          </span> */}
        </h2>
        <p
          id="role-selection-subtitle"
          className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-600"
        >
          Choose the role that best fits your goals. You can personalize your
          workspace from there.
        </p>
      </div>

      <div
        className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2"
        role="radiogroup"
        aria-required="true"
        aria-labelledby="role-selection-heading"
        aria-describedby="role-selection-subtitle"
      >
        {roles.map((role) => {
          const isSelected = selectedRole === role.value;

          return (
            <label key={role.value} className="block h-full cursor-pointer">
              <input
                className="peer sr-only"
                type="radio"
                name="role"
                value={role.value}
                checked={isSelected}
                aria-labelledby={`${role.value}-title`}
                aria-describedby={`${role.value}-description ${role.value}-caption`}
                onChange={() => onSelectRole(role.value)}
              />
              <div
                className={`relative flex h-full min-h-[300px] flex-col rounded-2xl border p-6 text-left transition duration-200 sm:p-8 peer-focus-visible:outline-none peer-focus-visible:ring-4 peer-focus-visible:ring-indigo-200 ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                    : "border-slate-200 bg-white shadow-sm hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-950/5"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                      isSelected
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {role.icon}
                  </span>
                  {isSelected && (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-6 w-6 text-indigo-600"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="m8.5 12 2.2 2.2 4.8-4.8" />
                    </svg>
                  )}
                </div>

                <h3
                  id={`${role.value}-title`}
                  className="mt-7 text-xl font-semibold tracking-tight text-slate-900"
                >
                  {role.title}
                </h3>
                <p
                  id={`${role.value}-description`}
                  className="mt-2 text-sm leading-6 text-slate-600"
                >
                  {role.description}
                </p>

                <div className="mt-auto pt-8">
                  <p
                    id={`${role.value}-caption`}
                    className="border-t border-slate-200/80 pt-4 text-xs font-medium tracking-wide text-slate-500"
                  >
                    {role.caption}
                  </p>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      <div className="mt-9 flex justify-center">
        <Button
          type="button"
          onClick={onContinue}
          disabled={!selectedRole}
          className="inline-flex min-w-52 items-center justify-center gap-3 px-7 py-4 text-sm shadow-lg shadow-indigo-600/20 focus-visible:ring-4 focus-visible:ring-indigo-200 disabled:shadow-none"
        >
          Continue
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Button>
      </div>
    </section>
  );
}

export default RoleSelection;
