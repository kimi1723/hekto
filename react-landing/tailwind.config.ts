import type { Config } from "tailwindcss";

import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./helpers/constants/*.ts",
  ],
  theme: {
    fontFamily: {
      lato: ["var(--font-lato)", "sans-serif"],
      josefin: ["var(--font-josefin)", "serif"],
    },
    fontSize: {
      body: [
        "1rem",
        {
          lineHeight: "1.25rem",
        },
      ],
      "body-sm": [
        "0.875rem",
        {
          lineHeight: "1rem",
        },
      ],
      "body-lg": [
        "1.125rem",
        {
          lineHeight: "1.5rem",
        },
      ],
      "body-bold": [
        "1rem",
        {
          lineHeight: "1.25rem",
          fontWeight: "700",
          letterSpacing: "1px",
        },
      ],
    },
    colors: {
      white: "#fff",
      "grey-1": "#F8F8FD",
      "grey-2": "#E5E0FC",
      "grey-3": "#8A8FB9",
      black: "#101750",
      primary: "#FB2E86",
      "primary-dark": "#F0056A",
      "primary-light": "#FC5FA2",
      secondary: "#F9BA00",
      "secondary-light": "#FFF3CE",
      tertiary: "#7E33E0",
      danger: "#FB2448",
      "danger-light": "#FEB9C4",
      info: "#603EFF",
      "info-light": "#DDD6FF",
      success: "#0CC562",
      "success-dark": "#00994C",
      "success-light": "#92F2BF",
    },
    boxShadow: {
      md: "8px 24px 32px -16px #10175026",
      lg: "8px 64px 80px -16px #10175026",
    },
    extend: {
      keyframes: {
        dropdown: {
          "0%": {
            opacity: "0",
            filter: "blur(3px)",
            translate: "0 -15px",
          },
          "100%": {
            opacity: "1",
            filter: "blur(0)",
            translate: "0 0",
          },
        },
        "dropdown-exit": {
          "0%": {
            opacity: "1",
            filter: "blur(0)",
            translate: "0 0",
          },
          "100%": {
            opacity: "0",
            filter: "blur(3px)",
            translate: "0 -15px",
            visibility: "hidden",
          },
        },
      },
      animation: {
        dropdown: "dropdown 0.3s ease-out",
        "dropdown-exit": "dropdown-exit 0.3s ease-in forwards",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus"]);
    }),
  ],
};
export default config;
