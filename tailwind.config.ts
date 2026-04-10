import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fafaf8",
        surface: "#ffffff",
        "surface-elevated": "#f4f4ef",
        border: "#e2e2db",
        input: "#e2e2db",
        primary: {
          DEFAULT: "#6b9e7a",
          hover: "#5a8d69",
          light: "#eef5f0",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#f59e4a",
          light: "#fef3e2",
        },
        foreground: "#1c1c27",
        muted: {
          DEFAULT: "#f4f4ef",
          foreground: "#7a7a8a",
        },
        destructive: "#e53e3e",
        secondary: {
          DEFAULT: "#f4f4ef",
          foreground: "#1c1c27",
        },
        ring: "#6b9e7a",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.625rem",
        sm: "0.375rem",
        md: "0.625rem",
        lg: "0.875rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 1px 3px 0 rgba(28,28,39,0.06), 0 1px 2px -1px rgba(28,28,39,0.04)",
        card: "0 4px 16px 0 rgba(28,28,39,0.06), 0 2px 4px -2px rgba(28,28,39,0.04)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
