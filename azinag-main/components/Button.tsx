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
  className?: string;
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
    'inline-flex items-center justify-center font-bold rounded-xl border-3 border-black shadow-neo hover:-translate-y-1 hover:shadow-neo-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-cartoon-yellow text-black focus-visible:ring-black',
    secondary:
      'bg-cartoon-pink text-black focus-visible:ring-black',
    ghost:
      'bg-white text-black focus-visible:ring-black',
  };

  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
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
