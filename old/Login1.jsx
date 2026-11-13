import { useState } from "react";
import { Link } from "react-router-dom";

const loginEndpoint = "http://localhost:3000/api/auth/login";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const responseText = await response.text();
      let responseData = {};

      if (responseText) {
        try {
          const parsedResponse = JSON.parse(responseText);
          responseData =
            parsedResponse && typeof parsedResponse === "object"
              ? parsedResponse
              : {};
        } catch {
          responseData = {};
        }
      }

      if (!response.ok) {
        throw new Error(
          responseData.message ||
            responseData.error ||
            `Login failed with status ${response.status}.`,
        );
      }

      form.reset();
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
    <main className="page-enter min-h-[90vh] bg-[#faf9f6] flex items-center justify-center px-6 py-12">
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
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="flex items-center overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((isVisible) => !isVisible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="shrink-0 px-4 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {submitError && (
              <p className="text-sm text-red-700" role="alert">
                {submitError}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </button>
          </form>
        )}
        {/* Signup link — we will connect this later */}
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
