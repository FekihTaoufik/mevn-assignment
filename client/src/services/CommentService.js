const HTTP = window.axios;
import { pickBy } from "lodash";
export default {
  get(id = null) {
    return new Promise((resolve, reject) => {
      HTTP.get(`/comment${id ? "/" + id : ""}`)
        .then((r) => {
          resolve(r.data);
        })
        .catch((err) => reject(err));
    });
  },
  create(comment) {
    // Api doesn't like null values => return type validation error (unwanted)
    // lodash's "pickBy" function removes null attributes

    return new Promise((resolve, reject) => {
      HTTP.post(`/comment`, pickBy(comment))
        .then((r) => {
          resolve(r.data);
        })
        .catch((err) => reject(err));
    });
  },
  remove(id) {
    return new Promise((resolve, reject) => {
      HTTP.delete(`/comment/${id}`)
        .then((r) => {
          resolve(r.data);
        })
        .catch((err) => reject(err));
    });
  },
};
