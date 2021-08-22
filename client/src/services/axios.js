import Vue from "vue";
import axios from "axios";
import store from "@/store";
import router from "@/router";
import { errorHandler } from "../utils/errorHandler";

let config = {
  baseURL: process.env.VUE_APP_API_ROOT_URL || "",
};

const _axios = axios.create(config);

//  Intercepting request
_axios.interceptors.request.use(
  function (config) {
    // Injecting api if defined
    if (store.getters.isAuthenticated) {
      config.headers.authorization = "Bearer " + store.state.token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Intercepting response
_axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    // Handling errors and showing them in a toast message
    errorHandler(Vue, error);
    if (error.response.status == 401) {
      store.dispatch("unAuthenticate");
      if (window.location.pathname !== router.options.base)
        window.location = router.options.base;
    }

    return Promise.reject(error);
  }
);

export default _axios;
