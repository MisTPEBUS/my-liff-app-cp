import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // ✅ 支援 class-based dark mode
  theme: {
    container: {
      center: true, // ✅ 預設置中
      padding: {
        DEFAULT: "1rem", // ✅ 全斷點預設 padding
        sm: "1rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        sm: "640px",
      },
    },
    extend: {
      fontFamily: {
        noto: ["var(--font-noto-sans)"],
      },
      textColor: {
        DEFAULT: "#18181B",
      },
      keyframes: {
        fadeIn: {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "85" },
        },
        "accordion-up": {
          from: { height: "85" },
          to: { height: "0" },
        },
      },
      animation: {
        fadeIn: "fadeIn 3s infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#40E0D0",
          hover: "#079A91",
          dark: "#0F514E",
          light: "#D6F4F0",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#FE4710",
          hover: "#EF2D07",
          dark: "#EF2D07",
          light: "#FFEFD8",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "#D4D4D8",
        ring: "#0F514E",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        black: {
          DEFAULT: "#18181B",
          foreground: "hsl(var(--black-foreground))",
        },
        white: {
          DEFAULT: "#FDFBF8",
          pure: "#FFFFFF",
          foreground: "hsl(var(--white-foreground))",
        },
        gray: {
          DEFAULT: "#71717A",
          100: "#F4F4F5",
          200: "#D4D4D8",
          400: "#A1A1AA",
          500: "#71717A",
          600: "#52525B",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-to-top-desktop":
          "linear-gradient(to top, #d6f4f0 267px, transparent 0%)",
        "gradient-to-top-mobile":
          "linear-gradient(to top, #d6f4f0 363px, transparent 0%)",
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default config;
