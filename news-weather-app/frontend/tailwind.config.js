/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            borderRadius: {
                DEFAULT: "0.75rem", // 12px
            },
            fontFamily: {
                galena: ['Galena Pro', 'sans-serif'],
                display: ['Galena Pro', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
