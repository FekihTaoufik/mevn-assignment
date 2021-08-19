import axios from "./axios";
import { pickBy } from "lodash";
export default {
  get(id = null) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/comment${id ? "/" + id : ""}`)
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
      axios
        .post(`/comment`, pickBy(comment))
        .then((r) => {
          resolve(r.data);
        })
        .catch((err) => reject(err));
    });
  },
  remove(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/comment/${id}`)
        .then((r) => {
          resolve(r.data);
        })
        .catch((err) => reject(err));
    });
  },
};
