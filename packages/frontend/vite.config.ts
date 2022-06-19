import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteESLint from 'vite-plugin-eslint'
// element 按需引入组件自动导入1
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~assets': path.join(__dirname, 'src/assets'),
      '~': path.join(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "~assets/styles/variables.scss";`,
      },
    },
  },
  // 小于 4k 不打包
  build: {
    assetsInlineLimit: 4 * 1024,
  },
  plugins: [
    vue(),
    viteESLint(),
    // element-plus 自动导入组件
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    force: true,
    open: true,
  },
  optimizeDeps: {
    // 自定义预构建入口，默认就是 index.html
    entries: ['index.html'],
    // 配置强制构建依赖
    include: ['vue'],
  },
})
