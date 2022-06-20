import { createApp } from 'vue'
import 'ant-design-vue/dist/antd.css';
import router from './router'
import App from './App.vue'

createApp(App).use(router).mount('#app')
