import { createApp } from "vue";
import "ant-design-vue/dist/antd.css";
// import VWave from "v-wave";
import router from "./router";
// import VueKinesis from "vue-kinesis";
import Particles from "particles.vue3";
import App from "./App.vue";

const app = createApp(App);
app.use(router)
  // .use(VWave)
  // .use(VueKinesis)
  .use(Particles)
  .mount("#app");
