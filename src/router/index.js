import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/home/Home")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/register/Register"),
    // 访问Login页面之前执行
    beforeEnter: (to, from, next) => {
      const { isLogin } = localStorage;
      isLogin ? next({ name: "Home" }) : next();
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/Login"),
    // 访问Login页面之前执行
    beforeEnter: (to, from, next) => {
      const { isLogin } = localStorage;
      isLogin ? next({ name: "Home" }) : next();
    }
  },
  {
    path: "/shop/:id",
    name: "Shop",
    component: () => import(/* webpackChunkName: "shop" */ "../views/shop/Shop")
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 每次做路由跳转之前都会执行这个方法
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage;
  const { name } = to;

  const isLoginOrRegister = name === "Login" || name === "Register";
  isLogin || isLoginOrRegister ? next() : next({ name: "Login" });
});

export default router;
