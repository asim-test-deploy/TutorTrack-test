import { useState } from "react";
import Button from "../../ui/Button.jsx";
import SelectField from "../../ui/SelectField.jsx";

const genders = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

const grades = [
//   { value: "Pre-K / Early years", label: "Pre-K / Early years" },
//   { value: "Kindergarten", label: "Kindergarten" },
  ...Array.from({ length: 12 }, (_, index) => {
    const grade = index + 1;
    return { value: `Grade ${grade}`, label: `Grade ${grade}` };
  }),
  { value: "College / Undergraduate", label: "College / Undergraduate" },
  { value: "Postgraduate", label: "Postgraduate" },
  { value: "Vocational / Technical", label: "Vocational / Technical" },
  { value: "Other / equivalent", label: "Other / equivalent" },
  { value: "Not currently studying", label: "Not currently studying" },
];

export default function StudentBasicDetails({
  formData,
  onChange,
  onBack,
  onContinue,
}) {
  const [invalidFields, setInvalidFields] = useState([]);

  const handleChange = (event) => {
    const { name } = event.target;
    setInvalidFields((currentFields) =>
      currentFields.filter((fieldName) => fieldName !== name),
    );
    onChange(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setInvalidFields(
        Array.from(form.elements)
          .filter((field) => field.willValidate && !field.validity.valid)
          .map((field) => field.name),
      );
      return;
    }

    setInvalidFields([]);
    onContinue();
  };

  const inputClasses =
    "mt-2 w-full rounded-xl border px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4";
  const fieldClasses = (name) =>
    `${inputClasses} ${
      invalidFields.includes(name)
        ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-100"
        : "border-slate-200 bg-white focus:border-indigo-500 focus:ring-indigo-100"
    }`;

  return (
    <section
      className="mx-auto w-full max-w-3xl"
      aria-labelledby="student-details-heading"
    >
      <div className="mb-8 text-center">
        <h2
          id="student-details-heading"
          className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
        >
          Let&apos;s get to know you
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Tell us a little about yourself and what you&apos;re studying.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="grid grid-cols-1 gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8"
      >
        <div>
          <label
            htmlFor="student-name"
            className="block text-sm font-medium text-slate-700"
          >
            Full name
            <span className="ml-1 text-red-600" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="student-name"
            type="text"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            pattern=".*\S.*"
            title="Enter your full name."
            aria-invalid={invalidFields.includes("name")}
            className={fieldClasses("name")}
            required
          />
        </div>

        <div>
          <label
            htmlFor="student-age"
            className="block text-sm font-medium text-slate-700"
          >
            Age
            <span className="ml-1 text-red-600" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="student-age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            min="3"
            max="120"
            step="1"
            aria-invalid={invalidFields.includes("age")}
            className={fieldClasses("age")}
            required
          />
        </div>

        <SelectField
          id="student-gender"
          name="gender"
          label="Gender"
          value={formData.gender}
          onChange={handleChange}
          placeholder="Select your gender"
          options={genders}
          invalid={invalidFields.includes("gender")}
        />

        <div>
          <label
            htmlFor="student-country"
            className="block text-sm font-medium text-slate-700"
          >
            Country
            <span className="ml-1 text-red-600" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="student-country"
            type="text"
            name="country"
            autoComplete="country-name"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter your country"
            pattern=".*\S.*"
            aria-invalid={invalidFields.includes("country")}
            className={fieldClasses("country")}
            required
          />
        </div>

        <SelectField
          id="student-grade"
          name="grade"
          label="Class / Grade (Optional)"
          value={formData.grade}
          onChange={handleChange}
          placeholder="Select your level of study"
          options={grades}
          invalid={invalidFields.includes("grade")}
          required={false}
        />

        <div>
          <label
            htmlFor="student-education-board"
            className="block text-sm font-medium text-slate-700"
          >
            Education board / system
            <span className="ml-2 font-normal text-slate-500">(Optional)</span>
          </label>
          <input
            id="student-education-board"
            type="text"
            name="educationBoard"
            value={formData.educationBoard}
            onChange={handleChange}
            placeholder='Enter your board or "Not applicable"'
            pattern=".*\S.*"
            aria-invalid={invalidFields.includes("educationBoard")}
            className={fieldClasses("educationBoard")}
          />
        </div>

        <div className="flex gap-3 pt-3 sm:col-span-2">
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