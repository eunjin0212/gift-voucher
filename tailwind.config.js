/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                main: {
                    DEFAULT: '#29ABE2',
                    light: '#24BCED'
                },
                blue: {
                    50: '#F1FAFE',
                    100: '#0066FF'
                },
                gray: {
                    50: '#F9FAFC',
                    100: '#F8FAFC',
                    200: '#F6F6F6',
                    300: '#F4F5F6',
                    400: '#FAFAFA',
                    500: '#EFEFEF',
                    600: '#E8EBEE',
                    700: '#E2E8F0',
                    800: '#DBDCDD',
                    900: '#C9C9C9',
                    950: '#94A3B8',
                },
                black: {
                    100: '#4B4F58',
                    200: '#38414F',
                    300: '#2F3440',
                },
                red: {
                    50: '#FFF1F1',
                    500: '#F43F5E',
                    600: '#F63B3B'
                },
                pink: {
                    500: '#E2296C'
                }
            },
            fontFamily: {
                'sans-bold': ["Source Sans Pro Bold", "sans-serif"],
                'roboto': ["Roboto", "sans-serif"],
            },
            screens: {
                'xs': '360px',
                'sm': '768px', // mobile
                'md': '1024px', // tablet
            },
            minWidth: {
                'xs': '360px', // min mobile
                'md': '1024px', // tablet
                'half-vw': '50vw',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('flowbite/plugin'),
    ],
}
