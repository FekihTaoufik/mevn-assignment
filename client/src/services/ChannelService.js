import axios from "./axios";
export default {
  get(id = null) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/channel${id ? "/" + id : ""}`)
        .then((r) => {
          resolve(r.data);
        })
        .catch((err) => reject(err));
    });
  },
  remove(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/channel/${id}`)
        .then((r) => {
          resolve(r.data);
        })
        .catch((err) => reject(err));
    });
  },
};
