/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dark-bg': '#0f172a',
                'dark-card': '#1e293b',
                'dark-muted': '#94a3b8',
                'primary': '#eab308', // yellow-500
                'primary-hover': '#ca8a04', // yellow-600
                // Legacy colors migrated from index.html
                "yellow-accent": "#F4C430",
                "soft-gray": "#F2F3F5",
                "card-hover-gray": "#E5E5E5",
                "primary-text": "#111111",
                "secondary-text": "#666666",
                "muted-gray": "#A0A0A0",
                "dark-background": "#0D0D0D",
                "dark-surface": "#1A1A1A",
                "dark-muted-text": "#BDBDBD",
            },
            fontFamily: {
                display: ["Inter", "sans-serif"],
                sans: ["Inter", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.75rem", // 12px
            },
        },
    },
    plugins: [],
}
