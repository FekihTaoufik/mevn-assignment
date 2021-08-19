import axios from "./axios";
import store from "@/store";
import router from "@/router";
export default {
  logIn(credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("/auth/signin", credentials)
        .then((r) => {
          store.dispatch("authenticate", r.data);
          if (router.currentRoute.name !== "Comments")
            router.push({ name: "Comments" });
          resolve(r.data);
        })
        .catch((err) => reject(err));
    });
  },
  logOut() {
    return new Promise((resolve, reject) => {
      try {
        store.dispatch("unAuthenticate");

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
};
