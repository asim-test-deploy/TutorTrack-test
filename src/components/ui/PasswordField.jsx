import { useState } from 'react'

export default function PasswordField({
  id,
  name,
  label,
  placeholder,
  required,
  autoComplete,
  minLength,
  value,
  onChange,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="flex items-center overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          value={value}
          onChange={onChange}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400"
        />
        <button
          type="button"
          onClick={() => setShowPassword((isVisible) => !isVisible)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          aria-pressed={showPassword}
          className="flex h-8 w-8 shrink-0 items-center justify-center bg-transparent text-slate-500 transition-colors hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            {showPassword ? (
              <>
                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </>
            ) : (
              <>
                <path d="M3 3l18 18" />
                <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                <path d="M9.9 5.1A10.9 10.9 0 0 1 12 4.9c5.5 0 9 7.1 9 7.1a14 14 0 0 1-3 3.8" />
                <path d="M6.6 6.6A14 14 0 0 0 3 12s3.5 7.1 9 7.1a10.9 10.9 0 0 0 5.4-1.4" />
              </>
            )}
          </svg>
        </button>
      </div>
    </div>
  )
}
