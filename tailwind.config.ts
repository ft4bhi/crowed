import type { Config } from "tailwindcss";
const textShadowPlugin = require('tailwindcss-textshadow');

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-blue': '#2BD1CF',
        'custom-dark': '#27272A',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        slideUp: 'slideUp 0.5s ease-out',
        fadeIn: 'fadeIn 0.5s ease-out',
      },
    },
  },
  plugins: [
    textShadowPlugin,
  ],
} satisfies Config;
