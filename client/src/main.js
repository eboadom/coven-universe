import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { apolloClient } from "./plugins/apollo";
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  apolloClient,
  render: h => h(App)
}).$mount("#app");
