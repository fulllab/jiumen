// import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
// import pkg from './package.json'
// import moment from 'moment'
import { resolve } from 'path'

// function pathResolve(dir: string) {
//   return resolve(process.cwd(), '.', dir)
// }

// const { dependencies, devDependencies, name, version } = pkg

// const __APP_INFO__ = {
//   pkg: { dependencies, devDependencies, name, version },
//   lastBuildTime: moment().format('YYYY-MM-DD HH:mm:ss'),
// }

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue(), WindiCSS(),],
//   resolve: {
//     alias: [
//       {
//         find: '@',
//         replacement: resolve(__dirname, 'src'),
//       },
//       {
//         find: 'antd/lib',
//         replacement: 'antd/es',
//       },
//       {
//         find: '@antv/x6',
//         replacement: '@antv/x6/dist/x6.js',
//       },
//       {
//         find: 'vue',
//         replacement: 'vue/dist/vue.esm-bundler.js',
//       },
//     ],
//   },
//   base: './',
//   server: {
//     port: 3600,
//     open: true,
//     cors: true,
//   },
// })

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  // const viteEnv = wrapperEnv(env)

  // const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  // const isBuild = command === 'build'

  return {
    base: './',
    root,
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
    server: {
      port: 3600,
      open: true,
      cors: true,
    },
    // The vite plugin used by the project. The quantity is large, so it is separately extracted and managed
    plugins: [vue(), WindiCSS()],
  }
}
