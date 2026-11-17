export default function InputFeild(props) {
  const inputClasses = props.invalid
    ? "border-red-500 bg-red-50 font-normal text-slate-900 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
    : `border-slate-200 bg-white ${props.className ?? ""}`;

  return (
    <div className="flex flex-col">
      <label htmlFor={props.id}>
        {props.label}
        {props.required && (
          <span className="ml-1 text-red-600" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input
        type={props.type}
        id={props.id}
        name={props.name}
        required={props.required ?? false}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        aria-invalid={props.invalid ?? false}
        className={`mt-2 w-full rounded-xl border px-4 py-3 ${inputClasses}`}
      />
    </div>
  );
}
