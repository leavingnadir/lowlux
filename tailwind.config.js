/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        base: {
          50: '#f9fafb',
          100: '#f3f4f6',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        background: '#ffffff',
        foreground: '#111827',
        border: '#e5e7eb',
      },
    },
  },
  darkMode: 'class', // if using dark mode
};

module.exports = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: colors.stone,
        primary: colors.purple,
      },
      borderColor: {
        default: colors.stone["300"],
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        button: ["var(--font-button)"],
      },
      keyframes: {
        slideDown: {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
      },
      animation: {
        slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  plugins: [],
};

