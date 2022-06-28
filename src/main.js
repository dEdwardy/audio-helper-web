import { createApp } from "vue";
import "ant-design-vue/dist/antd.css";
// import VWave from "v-wave";
import router from "./router";
import Particles from "particles.vue3";
import App from "./App.vue";
import VueKinesis from "vue-kinesis";

const app = createApp(App);
// .use(VWave)
app.use(router).use(VueKinesis).use(Particles).mount("#app");
