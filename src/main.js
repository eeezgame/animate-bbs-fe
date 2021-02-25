import Vue from "vue";
import "./styles/index.scss";
import App from "./App.vue";
import router from "./router";
Vue.prototype.$bus = new Vue();
Vue.prototype.$imgURL = process.env.VUE_APP_IMG_BASE_URL;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
