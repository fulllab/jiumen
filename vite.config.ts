import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import WindiCSS from 'vite-plugin-windicss'
import commonjsExternals from 'vite-plugin-commonjs-externals'
import { resolve } from 'path'

const commonjsPackages = [
  'stream',
  'electron/main',
  'electron/common',
  'electron/renderer',
  'original-fs',
] as const

// https://vitejs.dev/config/
export default defineConfig({
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
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
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
  server: {
    port: 3600,
    open: true,
    cors: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
    //@ts-ignore
    exclude: commonjsPackages,
  },
  define: {
    'process.env': {},
    global:{}
  },
  plugins: [
    vue(),
    vueJsx(),
    WindiCSS(),
    commonjsExternals({ externals: commonjsPackages }),
  ],
})
