"use strict";

import Vue from "vue";
import axios from "axios";
import store from "@/store";
import { errorHandler } from "../utils/errorHandler";

let config = {
  baseURL: process.env.VUE_APP_API_ROOT_URL || "",
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
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

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  async function (error) {
    errorHandler(Vue, error);
    if (error.response.status == 401) {
      store.dispatch("unAuthenticate");
      if (window.location.pathname !== "/") window.location = "/";
    }

    return Promise.reject(error);
  }
);

Plugin.install = function (Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
