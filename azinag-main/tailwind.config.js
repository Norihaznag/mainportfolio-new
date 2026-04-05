module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
    './app/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
        arabic: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Copybook light theme
        canvas: '#FFFFFF',
        ink: '#111118',
        'ink-muted': '#52525B',
        'ink-faint': '#A1A1AA',
        accent: '#1D4ED8',
        'accent-light': '#EFF6FF',
        'surface': '#F8FAFC',
        'surface-raised': '#F1F5F9',
        'border-subtle': '#E2E8F0',
        // Keep cartoon colors for admin compatibility
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        cartoon: {
          yellow: '#FFDE59',
          pink: '#FF90E8',
          blue: '#3B82F6',
          green: '#2CF6B3',
          purple: '#A855F7',
          orange: '#FF7A00',
          bg: '#FFFDF0'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 16px 0 rgba(0,0,0,0.12), 0 1px 4px -1px rgba(0,0,0,0.08)',
        'subtle': '0 0 0 1px rgba(0,0,0,0.06)',
        'glow': '0 0 32px 0 rgba(29,78,216,0.20)',
        // Keep for admin
        'neo-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
        'neo': '4px 4px 0px 0px rgba(0,0,0,1)',
        'neo-md': '6px 6px 0px 0px rgba(0,0,0,1)',
        'neo-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'neo-xl': '12px 12px 0px 0px rgba(0,0,0,1)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.5s ease-out both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
};