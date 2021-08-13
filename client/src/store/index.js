import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, value) {
      state.user = value;
    },
    setApiKey(state, value) {
      state.token = value;
    },
  },
  actions: {
    authenticate({ commit }, auth) {
      commit("setUser", auth.user);
      commit("setApiKey", auth.token);
    },
    unAuthenticate({ commit }) {
      commit("setUser", null);
      commit("setApiKey", null);
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    isAdmin(state) {
      return state.token ? state.user.role === "admin" : false;
    },
    isUser(state) {
      return state.token ? state.user.role === "user" : false;
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      paths: ["token", "user"],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
