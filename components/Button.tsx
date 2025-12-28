import Link from 'next/link';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  target,
  rel,
  ariaLabel,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-600',
    secondary:
      'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-600 border border-gray-300',
    ghost:
      'text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    // External link with _blank
    if (target === '_blank') {
      return (
        <a 
          href={href} 
          target={target} 
          rel={rel || 'noopener noreferrer'} 
          className={classes}
          aria-label={ariaLabel}
        >
          {children}
          <span className="sr-only">(opens in new window)</span>
        </a>
      );
    }
    // Internal link
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} aria-label={ariaLabel} {...props}>
      {children}
    </button>
  );
}
