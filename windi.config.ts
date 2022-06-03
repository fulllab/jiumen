import { defineConfig } from 'vite-plugin-windicss'
import { primaryColor } from './src/settings/themeConfig';

export default defineConfig({
  darkMode: 'class',
  plugins: [],
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
      },
      textColor: {
        primary: primaryColor,
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px',
      },
    },
  },
})
