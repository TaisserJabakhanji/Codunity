/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // مهم عشان shadcn ThemeProvider
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#3B82F6", // أزرق فاتح
          dark: "#1E3A8A",  // أزرق غامق
        },
        secondary: {
          light: "#FBBF24", // أصفر فاتح
          dark: "#B45309",  // أصفر غامق
        },
        accent: {
          light: "#10B981", // أخضر فاتح
          dark: "#064E3B",  // أخضر غامق
        },
        neutral: {
          light: "#F3F4F6", // رمادي فاتح
          dark: "#111827",  // رمادي غامق
        },
        info: "#3B82F6",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
      },
    },
  },
  plugins: [],
};
