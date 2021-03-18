import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NProgress from "nprogress"; // progress bar
import "@/config/nprogress/index.css";
NProgress.configure({
  template: `
  <div class="bar" role="bar">
    <div class="peg"><img width="40' height="40" src="${require("@/assets/miku_negi.jpg")}"</div>
  </div>
  <div class="spinner" role="spinner">
    <div class="spinner-icon"></div>
  </div>`
});
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/send-post",
    name: "SendPost",
    component: () =>
      import(/* webpackChunkName: "send-post" */ "../views/SendPost.vue")
  },
  {
    path: "/post/:id",
    name: "Post",
    component: () =>
      import(/* webpackChunkName: "post" */ "../views/Post/index.vue")
  },
  {
    path: "/space/:id",
    name: "Space",
    component: () =>
      import(/* webpackChunkName: "space" */ "../views/Space/index.vue")
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import(/* webpackChunkName: "shop" */ "../views/Shop.vue")
  },
  {
    path: "/my-orders",
    name: "MyOrders",
    component: () =>
      import(/* webpackChunkName: "my-orders" */ "../views/MyOrders.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
export default router;
