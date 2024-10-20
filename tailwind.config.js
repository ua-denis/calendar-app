module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'brand-blue': '#1e3a8a',
                'brand-light-blue': '#3b82f6',
            },
            screens: {
                'xs': '480px',
            },
        },
    },
    plugins: [],
}