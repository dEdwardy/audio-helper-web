import { defineConfig } from 'vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  // base:'/audio-helper/',
  plugins: [
    vue(),
    Components({
      dirs: ['src/components'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
      resolvers: [AntDesignVueResolver({ importStyle: false, resolveIcons: true })]
    })
  ],
  resolve:{
    alias:{
      "@": path.resolve(__dirname, 'src'),
    }
  }
})
