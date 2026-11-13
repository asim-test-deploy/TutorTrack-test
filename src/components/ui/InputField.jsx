export default function InputFeild(props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id}>{props.label}</label>

      <input
        type={props.type}
        id={props.id}
        name={props.name}
        required={props.required ?? false}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className={`mt-2 w-full border border-slate-200 rounded-xl py-3 px-4 bg-white ${props.className ?? ""}`}
      />
    </div>
  );
}
