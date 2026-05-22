
function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 rounded-lg bg-slate-800 text-white outline-none border border-white/10 focus:border-indigo-500 transition ${className}`}
    />
  );
}

export default Input;