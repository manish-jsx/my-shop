// const { nextui } = require("@nextui-org/react");

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     './node_modules/@nextui-org/theme/dist/**/*.{js,jsx}'
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   darkMode: "class",
//   plugins: [
//     nextui({
//       themes: {
//         light: {
//           colors: {
//             background: "#FFFFFF",
//             foreground: "#11181C",
//             primary: {
//               50: "#F0F9FF",
//               100: "#E0F2FE",
//               200: "#BAE6FD",
//               300: "#7DD3FC",
//               400: "#38BDF8",
//               500: "#0EA5E9",
//               600: "#0284C7",
//               700: "#0369A1",
//               800: "#075985",
//               900: "#0C4A6E",
//               DEFAULT: "#0EA5E9",
//               foreground: "#FFFFFF",
//             },
//             focus: "#0EA5E9",
//             content1: "hsl(var(--content1))",
//             content2: "hsl(var(--content2))",
//             content3: "hsl(var(--content3))",
//             content4: "hsl(var(--content4))",
//           },
//           layout: {
//             disabledOpacity: "0.3",
//             radius: {
//               small: "4px",
//               medium: "6px",
//               large: "8px",
//             },
//             borderWidth: {
//               small: "1px",
//               medium: "2px",
//               large: "3px",
//             },
//           },
//         },
//         dark: {
//           colors: {
//             background: "#0C0A09",
//             foreground: "#ECEDEE",
//             primary: {
//               50: "#F0F9FF",
//               100: "#E0F2FE",
//               200: "#BAE6FD",
//               300: "#7DD3FC",
//               400: "#38BDF8",
//               500: "#0EA5E9",
//               600: "#0284C7",
//               700: "#0369A1",
//               800: "#075985",
//               900: "#0C4A6E",
//               DEFAULT: "#0EA5E9",
//               foreground: "#FFFFFF",
//             },
//             focus: "#0EA5E9",
//             content1: "hsl(var(--content1))",
//             content2: "hsl(var(--content2))",
//             content3: "hsl(var(--content3))",
//             content4: "hsl(var(--content4))",
//           },
//           layout: {
//             disabledOpacity: "0.3",
//             radius: {
//               small: "4px",
//               medium: "6px",
//               large: "8px",
//             },
//             borderWidth: {
//               small: "1px",
//               medium: "2px",
//               large: "3px",
//             },
//           },
//         },
//       },
//     }),
//   ],
// };

const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/@nextui-org/theme/dist/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        layout: {
          disabledOpacity: "0.3",
          radius: {
            small: "4px",
            medium: "6px",
            large: "8px",
          },
          borderWidth: {
            small: "1px",
            medium: "2px",
            large: "3px",
          },
        },
      },
      dark: {
        layout: {
          disabledOpacity: "0.3",
          radius: {
            small: "4px",
            medium: "6px",
            large: "8px",
          },
          borderWidth: {
            small: "1px",
            medium: "2px",
            large: "3px",
          },
        },
      },
    },
  })],
};