const HTTP = window.axios;
export default {
  signIn(credentials) {
    return new Promise((resolve, reject) => {
      HTTP.post("/auth/signin", credentials)
        .then((r) => {
          resolve(r.data);
        })
        .catch((err) => reject(err));
    });
  },
};
