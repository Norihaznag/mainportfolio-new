interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border-3 border-black shadow-neo p-6 transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-neo-md ${className}`}
    >
      {children}
    </div>
  );
}
