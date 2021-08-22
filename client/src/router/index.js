import Vue from "vue";
import VueRouter from "vue-router";
import { Comments, Login, Channels, Users, UserEditor } from "@/views";
import { isAuthenticatedAdmin } from "./guards";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Comments",
    component: Comments,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    beforeEnter: isAuthenticatedAdmin,
  },
  {
    path: "/users/:id?/editor",
    name: "UserEditor",
    component: UserEditor,
    beforeEnter: isAuthenticatedAdmin,
  },
  {
    path: "/channels",
    name: "Channels",
    component: Channels,
    beforeEnter: isAuthenticatedAdmin,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  base: process.env.VUE_APP_PUBLIC_PATH,
});

export default router;
