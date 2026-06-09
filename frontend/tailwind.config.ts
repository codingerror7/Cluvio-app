import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card-bg)',
          elevated: 'var(--card-elevated)',
        },
        border: {
          custom: 'var(--border-color)',
          hover: 'var(--border-color-hover)',
        },
        brand: {
          primary: 'var(--brand-primary)',
          secondary: 'var(--brand-secondary)',
        },
        text: {
          muted: 'var(--text-muted)',
        },
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      boxShadow: {
        premium: 'var(--shadow-premium)',
        'premium-glow': 'var(--shadow-premium-glow)',
      },
      backgroundImage: {
        'glow-radial': 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.12) 0%, transparent 60%)',
        'glow-radial-secondary': 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
};

export default config;
