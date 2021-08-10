import Vue from "vue";
import VueRouter from "vue-router";
import { Comments, About, Login, Channels, Users } from "@/views";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    redirect: "/comments",
  },
  {
    path: "/comments",
    name: "Comments",
    component: Comments,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/channels",
    name: "Channels",
    component: Channels,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
