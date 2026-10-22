/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0866E8',        // Azul eléctrico
          dark: '#07162E',        // Azul oscuro / navy
          secondary: '#1247A8',   // Azul secundario
          light: '#F3F6FA',       // Gris claro de fondo
          text: '#151C2C',        // Texto oscuro
          subtle: '#64748B',      // Gris para textos secundarios
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(7, 22, 46, 0.06), 0 2px 6px -1px rgba(7, 22, 46, 0.04)',
        'card': '0 10px 30px -4px rgba(7, 22, 46, 0.08), 0 4px 10px -2px rgba(7, 22, 46, 0.03)',
        'card-hover': '0 20px 35px -5px rgba(8, 102, 232, 0.15), 0 8px 16px -3px rgba(7, 22, 46, 0.06)',
        'glow': '0 0 25px rgba(8, 102, 232, 0.35)',
      }
    },
  },
  plugins: [],
}
