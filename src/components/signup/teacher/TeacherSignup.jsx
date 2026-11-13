import Button from "../../ui/Button.jsx";
import SelectField from "../../ui/SelectField.jsx";

const genders = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

export default function TeacherBasicDetails({
  formData,
  onChange,
  onBack,
  onContinue,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onContinue();
  };

  const inputClasses =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

  return (
    <section
      className="mx-auto w-full max-w-xl"
      aria-labelledby="teacher-details-heading"
    >
      <div className="mb-8 text-center">
        <h2
          id="teacher-details-heading"
          className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
        >
          Let&apos;s get to know you
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Tell us a little about yourself.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div>
          <label
            htmlFor="teacher-name"
            className="block text-sm font-medium text-slate-700"
          >
            Full name
          </label>
          <input
            id="teacher-name"
            type="text"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Enter your full name"
            pattern=".*\S.*"
            title="Enter your full name."
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label
            htmlFor="teacher-age"
            className="block text-sm font-medium text-slate-700"
          >
            Age
          </label>
          <input
            id="teacher-age"
            type="number"
            name="age"
            value={formData.age}
            onChange={onChange}
            placeholder="Enter your age"
            min="18"
            max="100"
            step="1"
            className={inputClasses}
            required
          />
        </div>

        <SelectField
          id="teacher-gender"
          name="gender"
          label="Gender"
          value={formData.gender}
          onChange={onChange}
          placeholder="Select your gender"
          options={genders}
        />

        <div className="flex gap-3 pt-3">
          <Button
            type="button"
            variant="subtle"
            className="flex-1"
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 shadow-lg shadow-indigo-600/20 focus-visible:ring-4 focus-visible:ring-indigo-200"
          >
            Continue
          </Button>
        </div>
      </form>
    </section>
  );
}
