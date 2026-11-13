import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../services/authService.js";
import Button from "../ui/Button.jsx";
import InputFeild from "../ui/InputField.jsx";
import PasswordField from "../ui/PasswordField.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await login({ email, password });
      setEmail("");
      setPassword("");
      setIsLoggedIn(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Could not log in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page-enter flex min-h-[90vh] items-center justify-center bg-[#faf9f6] px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome back
          </h1>
          <p className="mt-2 text-slate-600">
            Log in to manage your teaching workspace.
          </p>
        </div>

        {isLoggedIn ? (
          <div
            className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
            role="status"
            aria-live="polite"
          >
            Login successful.
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="text-sm font-medium text-slate-700">
              <InputFeild
                id="email"
                name="email"
                type="email"
                label="Email address"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="font-normal text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <PasswordField
              id="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            {submitError && (
              <p className="text-sm text-red-700" role="alert">
                {submitError}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </Button>
          </form>
        )}

        <p className="mt-7 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Sign up
          </Link>
        </p>

        <p className="mt-8 text-center text-xs text-slate-500">
          Your teaching, organized.
        </p>
      </div>
    </main>
  );
}
