const HTTP = window.axios;
export default {
  get(id = null) {
    return new Promise((resolve, reject) => {
      HTTP.get(`/comment${id ? "/" + id : ""}`)
        .then((r) => {
          resolve(r);
        })
        .catch((err) => reject(err));
    });
  },
  create(id, comment) {
    return new Promise((resolve, reject) => {
      HTTP.post(`/comment`, comment)
        .then((r) => {
          resolve(r);
        })
        .catch((err) => reject(err));
    });
  },
  patch(id, comment) {
    return new Promise((resolve, reject) => {
      HTTP.patch(`/comment/${id}`, comment)
        .then((r) => {
          resolve(r);
        })
        .catch((err) => reject(err));
    });
  },
  remove(id) {
    return new Promise((resolve, reject) => {
      HTTP.delete(`/comment/${id}`)
        .then((r) => {
          resolve(r);
        })
        .catch((err) => reject(err));
    });
  },
};
