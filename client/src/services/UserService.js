import axios from "./axios";
export default {
  get(id = null) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/user${id ? "/" + id : ""}`)
        .then((r) => {
          resolve(r.data);
        })
        .catch((err) => reject(err));
    });
  },
  create(user) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/user`, user)
        .then((r) => {
          resolve(r.data);
        })
        .catch((err) => reject(err));
    });
  },
  patch(id, user) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`/user/${id}`, user)
        .then((r) => {
          resolve(r.data);
        })
        .catch((err) => reject(err));
    });
  },
  remove(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/user/${id}`)
        .then((r) => {
          resolve(r.data);
        })
        .catch((err) => reject(err));
    });
  },
};
