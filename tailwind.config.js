/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        cz: {
          bg: '#0B1220',
          dark: '#111827',
          card: '#131D31',
          border: 'rgba(255, 255, 255, 0.08)',
          primary: '#4263EB',
          'primary-hover': '#364FC7',
          blue: '#60A5FA',
          violet: '#8B5CF6',
          text: '#F8FAFC',
          muted: '#94A3B8',
          dim: '#64748B',
          light: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: []
};
