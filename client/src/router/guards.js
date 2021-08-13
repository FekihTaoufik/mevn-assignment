import store from "@/store";
import vue from "vue";
export const isAuthenticatedAdmin = (to, from, next) => {
  if (!store.getters.isAdmin) {
    vue.$toast("You are not allowed to access that page", { type: "error" });
    return next({
      name: "Comments",
    });
  } else return next();
};
