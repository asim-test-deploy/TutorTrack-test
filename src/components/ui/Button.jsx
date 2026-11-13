const variants = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500',
  subtle: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-500',
}

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  ...buttonProps
}) {
  const variantClasses = variants[variant] ?? variants.primary

  return (
    <button
      type={type}
      className={`rounded-xl px-4 py-3 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
