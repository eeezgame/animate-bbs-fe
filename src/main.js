import Vue from "vue";
import "./styles/index.scss";
import App from "./App.vue";
import router from "./router";
Vue.prototype.$bus = new Vue();
Vue.prototype.$imgURL = process.env.VUE_APP_IMG_BASE_URL;
Vue.config.productionTip = false;
import VueTailwind from "vue-tailwind";
import VueTailwindsSettings from "@/config/vue-tailwind";
Vue.use(VueTailwind, VueTailwindsSettings);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
