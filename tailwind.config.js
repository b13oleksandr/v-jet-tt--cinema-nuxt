module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      flex: {
        'grid-100': '0 1 100%',
        'grid-50': '0 1 50%',
        'grid-33': '0 1 33.33333%',
        'grid-25': '0 1 25%',
        'grid-20': '0 1 20%',
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
