import { createApp } from 'vue'
import 'ant-design-vue/dist/antd.css';
import VWave from 'v-wave'
import router from './router'
import App from './App.vue'

createApp(App).use(VWave).use(router).mount('#app')
