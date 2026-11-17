
import { useState } from "react";
import Button from "../../ui/Button.jsx";
import PasswordField from "../../ui/PasswordField.jsx";

export default function AccountDetails({
  formData,
  onChange,
  onBack,
  onContinue,
}) {
  const [passwordError, setPasswordError] = useState("");
  const [invalidFields, setInvalidFields] = useState([]);

  const handleChange = (event) => {
    const { name } = event.target;
    setInvalidFields((currentFields) =>
      currentFields.filter((fieldName) => fieldName !== name),
    );
    setPasswordError("");
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

    if (formData.password !== formData.confirmPassword) {
      setInvalidFields(["confirmPassword"]);
      setPasswordError("Those passwords don’t match. Please try again.");
      return;
    }

    setInvalidFields([]);
    setPasswordError("");
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
      aria-labelledby="account-details-heading"
    >
      <div className="mb-8 text-center">
        <h2
          id="account-details-heading"
          className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
        >
          Secure your account
        </h2>

        <p className="mt-3 text-base leading-7 text-slate-600">
          Create your login credentials to get started.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        {/* Email */}
        <div>
          <label
            htmlFor="signup-email"
            className="block text-sm font-medium text-slate-700"
          >
            Email address
            <span className="ml-1 text-red-600" aria-hidden="true">
              *
            </span>
          </label>

          <input
            id="signup-email"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            aria-invalid={invalidFields.includes("email")}
            className={fieldClasses("email")}
            required
          />
        </div>

        <div>
          <PasswordField
            id="signup-password"
            name="password"
            label="Password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            minLength={8}
            required
            invalid={invalidFields.includes("password")}
          />
          <p className="mt-2 text-xs text-slate-500">
            Use at least 8 characters.
          </p>
        </div>

        <PasswordField
          id="signup-confirm-password"
          name="confirmPassword"
          label="Confirm password"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter your password"
          minLength={8}
          required
          invalid={invalidFields.includes("confirmPassword")}
          aria-invalid={
            Boolean(passwordError) ||
            invalidFields.includes("confirmPassword")
          }
          aria-describedby={
            passwordError ? "confirm-password-error" : undefined
          }
        />

        {passwordError && (
          <p
            id="confirm-password-error"
            className="text-sm text-red-700"
            role="alert"
          >
            {passwordError}
          </p>
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
            Review details
          </Button>
        </div>
      </form>
    </section>
  );
}
