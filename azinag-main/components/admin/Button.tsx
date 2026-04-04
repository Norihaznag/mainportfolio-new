'use client';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variantClasses = {
  primary: 'bg-cartoon-yellow text-black border-3 border-black shadow-neo hover:-translate-y-1 hover:shadow-neo-md active:translate-y-1 active:shadow-none',
  secondary: 'bg-white text-black border-3 border-black shadow-neo hover:-translate-y-1 hover:shadow-neo-md active:translate-y-1 active:shadow-none',
  danger: 'bg-cartoon-pink text-black border-3 border-black shadow-neo hover:-translate-y-1 hover:shadow-neo-md active:translate-y-1 active:shadow-none',
};

const sizeClasses = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide ${className}`}
      {...props}
    />
  );
}
