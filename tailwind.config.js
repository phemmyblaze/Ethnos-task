/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // or 'media' if you prefer
  theme: {
    extend: {
      colors: {
        // Customize dark mode colors
        background: {
          dark: '#1a202c',
        },
        text: {
          dark: '#f7fafc',
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
    },
  },
  plugins: [],
}

// tailwind.config.js
// module.exports = {
//   darkMode: 'class', // or 'media' if you prefer
//   theme: {
//     extend: {
//       colors: {
//         // Customize dark mode colors
//         background: {
//           dark: '#1a202c',
//         },
//         text: {
//           dark: '#f7fafc',
//         },
//       },
//     },
//   },
//   variants: {
//     extend: {
//       backgroundColor: ['dark'],
//       textColor: ['dark'],
//     },
//   },
//   plugins: [],
// };
