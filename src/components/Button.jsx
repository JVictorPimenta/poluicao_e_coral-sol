
export function Button({ onClick, children, variant = 'default', disabled }) {
  const base = "px-4 py-2 rounded text-white font-bold ";
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700",
    outline: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50",
    destructive: "bg-red-600 hover:bg-red-700"
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={base + (variants[variant] || variants.default)}
    >
      {children}
    </button>
  );
}
