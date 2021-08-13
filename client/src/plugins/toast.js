import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true,
  timeout: 2000,
  position: "top-center",
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: false,
  showCloseButtonOnHover: true,
  hideProgressBar: true,
  icon: true,
  rtl: false,
};

Vue.use(Toast, options);
