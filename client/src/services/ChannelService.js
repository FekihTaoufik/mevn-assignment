const HTTP = window.axios;
export default {
  get(id = null) {
    return new Promise((resolve, reject) => {
      HTTP.get(`/channel${id ? "/" + id : ""}`)
        .then((r) => {
          resolve(r.data);
        })
        .catch((err) => reject(err));
    });
  },
  remove(id) {
    return new Promise((resolve, reject) => {
      HTTP.delete(`/channel/${id}`)
        .then((r) => {
          resolve(r.data);
        })
        .catch((err) => reject(err));
    });
  },
};
