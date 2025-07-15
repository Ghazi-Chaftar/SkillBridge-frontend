import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1440px'
      }
    },
    extend: {
      backgroundImage: {
        'span-bg': 'var(--span-bg)'
      },
      // boxShadow: {
      //   custom: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;'
      // },
      colors: {
        background: 'var(--background)',
        foreground: 'hsl(var(--foreground))',
        'primary-background': 'var( --primary-background)',

        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'hsl(var(--primary-foreground))'
        },
        'soft-primary': 'var(--soft-primary)',
        gradient: 'var(--gradient)',
        'button-secondary': 'var(--button-secondary)',
        'blue-baground': 'var(--blue-baground)',
        'light-blue-background': 'var(--light-blue-bg)',
        'gray-baground': 'var(--gray-baground)',
        'button-text': 'var(--button-text)',
        'text-secondary': 'var(--text-secondary)',
        'text-chatbot': 'var(--text-chatbot)',
        'backgroud-primary-chatbot': 'var(--backgroud-primary-chatbot)',
        'backgroud-secondary-chatbot': 'var(--backgroud-secondary-chatbot)',
        'background-secondary-gray': 'var(--background-secondary-gray)',
        'background-secondary': 'var(--background-secondary)',
        'text-primary-chatbot': 'var(--text-primary-chatbot)',
        'clicked-item-background': 'var(--clicked-item-background)',
        '--line-gray': 'var(--line-gray)',
        'chatbot-chat-bubble': 'var(--chatbot-chat-bubble)',
        'hover-chatbot': 'var(--hover-chatbot)',
        'light-green': 'var(--light-green)',
        'pale-blue': 'var(--pale-blue)',
        green: 'var(--green)',
        'light-blue': 'var(--light-blue)',
        'gray-primary': 'var(--gray-primary)',
        'gray-border': 'var(--gray-border)',
        'gray-tertiary': 'var(--text-gray-tertiary)',
        'border-secondary': 'var(--border-secondary)',
        'primary-yellow': 'var(--primary-yellow)',
        'primary-blue': 'var(--primary-blue)',
        'secondary-green': 'var(--secondary-green)',
        secondary: 'var(--secondary)',
        'secondary-gray': 'var(--secondary-gray)',
        button: 'var(--button)',
        selected: 'var(--selected)',
        dropdown: 'var(--dropdown)',
        dropdownHover: 'var(--dropdown-hover)',
        buttonSecondary: 'var(--button-secondary)',
        success: 'var(--success)',
        destructive: 'var(--destructive)',
        border: 'var(--primary)',
        ring: 'var(--primary)',
        'blue-bg': 'var( --blue-bg)',
        'pending-yellow-label': 'var(--pending-yellow-label)',
        'pending-yellow-bg': 'var(--pending-yellow-bg)',
        muted: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--white)'
        },
        accent: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--white)'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'var(--primary)'
        },
        'dashboard-background': '#ffffff',
        'dashboard-foreground': '#010816',
        'dashboard-card': '#ffffff',
        'dashboard-card-foreground': '#010816',
        'dashboard-popover': '#ffffff',
        'dashboard-popover-foreground': '#010816',
        'dashboard-primary': '#2462ea',
        'dashboard-primary-foreground': '#f7f9fb',
        'dashboard-secondary': '#f1f5f9',
        'dashboard-secondary-foreground': '#0f172a',
        'dashboard-muted': '#f1f5f9',
        'dashboard-muted-foreground': '#5d6c82',
        'dashboard-accent': '#f1f5f9',
        'dashboard-accent-foreground': '#0f172a',
        'dashboard-destructive': '#dc2828',
        'dashboard-destructive-foreground': '#f7f9fb',
        'dashboard-border': '#e2e8f0',
        'dashboard-input': '#e2e8f0',
        'dashboard-ring': '#2462ea',
        'dashboard-chart-1': '#2462ea',
        'dashboard-chart-2': '#5fa8fa',
        'dashboard-chart-3': '#3b86f6',
        'dashboard-chart-4': '#8fc6fd',
        'dashboard-chart-5': '#bddbfe'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      screens: {
        custom: '1491px'
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' }
        },
        scaleFadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        pop: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        scaleFadeIn: 'scaleFadeIn 1s ease-in-out',
        pop: 'pop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        fadeIn: 'fadeIn 0.5s ease-in-out'
      },
      fontFamily: {
        sans: ['var(--lato)', 'Poppins', 'sans-serif']
      },
      dropShadow: {
        sx: '0 35px 35px rgba(0, 0, 0, 0.25)',
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
