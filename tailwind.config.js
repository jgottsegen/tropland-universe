/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './**/*.{js,ts,jsx,tsx}',
    '!./node_modules/**',
    '!./dist/**',
  ],
  theme: {
    extend: {
      /* Height-based variants. /links has to fit one screen with no scroll,
         so it needs to compress on short viewports (landscape phones) rather
         than clip. Tailwind ships width breakpoints only; these are raw. */
      screens: {
        short: { raw: '(max-height: 780px)' },
        tiny: { raw: '(max-height: 500px)' },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Roboto"', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        edit: ['"Fraunces"', 'Georgia', 'serif'],
        mono: ['"Spline Sans Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#0C0B09',
          2: '#14120F',
          3: '#1D1A16',
        },
        bone: {
          DEFAULT: '#F2EEE5',
          dark: '#E7E1D4',
        },
        ember: {
          DEFAULT: '#FF4D1C',
          deep: '#E03E12',
          soft: '#FF7448',
        },
        brand: {
          deep: '#0D0A1A',
          purple: '#1B0E36',
          'purple-mid': '#2A1B52',
          cream: '#F5F0EB',
          'cream-dark': '#E8E0D6',
          text: '#F0ECE4',
          'dark-text': '#1A1A1A',
          muted: '#888888',
          'muted-light': '#666666',
          accent: '#E85D3A',
          'accent-hover': '#FF6B45',
          border: '#2A2040',
          'border-light': '#D6CFC6',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marqueeReverse 35s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'border-shine': 'borderShine 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        borderShine: {
          '0%': { '--shine-angle': '0deg' },
          '100%': { '--shine-angle': '360deg' },
        },
      }
    }
  },
  plugins: [],
}
