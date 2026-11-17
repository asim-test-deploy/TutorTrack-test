import { useState } from "react";
import Button from "../../ui/Button.jsx";
import SelectField from "../../ui/SelectField.jsx";

const qualifications = [
  "12th / Higher Secondary",
  "Diploma",
  "Bachelor’s Degree",
  "Master’s Degree",
  "PhD / Doctorate",
  "Other",
];

export default function TeacherQualification({
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
      className="mx-auto w-full max-w-xl"
      aria-labelledby="teacher-qualification-heading"
    >
      <div className="mb-8 text-center">
        <h2
          id="teacher-qualification-heading"
          className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
        >
          Your qualifications
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Tell us about your educational background.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <SelectField
          id="teacher-qualification"
          name="qualification"
          label="Highest qualification"
          value={formData.qualification}
          onChange={handleChange}
          placeholder="Select your qualification"
          options={qualifications.map((item) => ({
            value: item,
            label: item,
          }))}
          invalid={invalidFields.includes("qualification")}
        />

        <div>
          <label
            htmlFor="teacher-specialization"
            className="block text-sm font-medium text-slate-700"
          >
            Field of Study / Specialization
            <span className="ml-1 text-red-600" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="teacher-specialization"
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="e.g. Computer Science, Mathematics"
            pattern=".*\S.*"
            title="Enter your field of study or specialization."
            aria-invalid={invalidFields.includes("specialization")}
            className={fieldClasses("specialization")}
            required
          />
        </div>

        <div>
          <label
            htmlFor="teacher-institution"
            className="block text-sm font-medium text-slate-700"
          >
            Institution / University
            <span className="ml-2 font-normal text-slate-500">(Optional)</span>
          </label>
          <input
            id="teacher-institution"
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            placeholder="Enter institution name"
            className={`${inputClasses} border-slate-200 bg-white focus:border-indigo-500 focus:ring-indigo-100`}
          />
        </div>

        {formData.qualification === "Other" && (
          <div>
            <label
              htmlFor="teacher-other-qualification"
              className="block text-sm font-medium text-slate-700"
            >
              Specify Qualification
              <span className="ml-1 text-red-600" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id="teacher-other-qualification"
              type="text"
              name="otherQualification"
              value={formData.otherQualification}
              onChange={handleChange}
              placeholder="Enter your qualification"
              pattern=".*\S.*"
              title="Specify your qualification."
              aria-invalid={invalidFields.includes("otherQualification")}
              className={fieldClasses("otherQualification")}
              required
            />
          </div>
        )}

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
