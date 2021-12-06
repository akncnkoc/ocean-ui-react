module.exports = {
  mode: 'jit' ,
  purge: {
    enabled: process.env.NODE_ENV === 'publish',
    content: ['./src/**/*.{js,jsx,ts,tsx}']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: ['responsive', 'group-hover', 'hover', 'focus', 'active'],
  plugins: []
}
