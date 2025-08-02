
export function Card({ children, className }) {
  return <div className={`shadow-lg p-4 bg-white rounded ${className}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
