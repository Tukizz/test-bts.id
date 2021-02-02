import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import Cookies from "js-cookie";
import axios from "axios";

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

const token = Cookies.get("token");

if (token) {
  Vue.prototype.$http.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
