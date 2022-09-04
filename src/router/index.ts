import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

// 路由树
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('/@/views/home/home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('/@/views/login/login.vue'),
  },
];

// 创建路由
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
});

// 注册路由
export const setupRouter = (app: App): void => {
  app.use(router);
};

// 路由守卫
router.beforeEach((from, to) => {
  return true;
});
