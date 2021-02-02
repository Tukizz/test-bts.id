import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: Cookies.get("token") ? Cookies.get("token") : ""
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state) {
      state.status = "success";
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    }
  },
  actions: {
    login({ commit }, data) {
      commit("auth_request");
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.VUE_APP_API + "/login",
          method: "POST",
          data: {
            username: data.username,
            password: data.password
          }
        })
          .then(res => {
            Cookies.set("token", res.data.data.token, {
              expires: 1
            });

            commit("auth_success");
            resolve(res);
          })
          .catch(err => {
            Cookies.remove("token");
            commit("auth_error", err);
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        Cookies.remove("token");
        delete axios.defaults.headers.common["Authorization"];
        commit("logout");
        resolve();
      });
    }
  },
  modules: {},
  getters: {
    isLogin: state => !!state.token,
    authStatus: state => state.status
  }
});
