import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS(),],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
      {
        find: 'antd/lib',
        replacement: 'antd/es',
      },
      {
        find: '@antv/x6',
        replacement: '@antv/x6/dist/x6.js',
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js',
      },
    ],
  },
  base: './',
  define: {
    // vm2
    process: {
      versions: {
        node: '16.5'
      }
    },
  },
  server: {
    port: 3600,
    open: true,
    cors: true,
  },
})
