import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          pastel: "var(--color-pastel)",
          ink: "#405352",
          muted: "#6B7C7A",
          line: "#D4D4D4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      aspectRatio: {
        a4: "210 / 297",
      },
      boxShadow: {
        page: "0 20px 60px rgba(64, 83, 82, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
