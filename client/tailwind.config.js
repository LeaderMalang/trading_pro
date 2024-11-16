/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontSize: {
                "fnt-a": "8px",
                "fnt-b": "12px",
                "fnt-c": "16px",
                "fnt-d": "24px",
                "fnt-e": "32px",
                "fnt-f": "40px",
                "fnt-g": "48px",
                "fnt-h": "64px",
                "fnt-i": "128px",
            },
            fontFamily: {
                poppins: "Poppins",
            },
            colors: {
                "voilet-dark": "#212634",
                "dark-clr": "#14171f",
                "light-dark-clr": "#212634",
                "light-bg-clr": "#2b3040",
                "primary-clr": "#4da64d",
                "text-clr": "hsl(224, 22%, 87%)",
                "light-text-clr": "#eaecef89",
                "success-clr": "#0FAF59",
                "danger-clr": "#db4635",
                "warning-clr": "#f3ba2f",
                "btn-clr": "#0FAF59",
            },
            screens: {
                tabletSize: { raw: "(min-width:1075px)" },
            },
        },
    },
    plugins: [],
};
