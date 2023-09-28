import { createRouter, createWebHistory } from 'vue-router';
const getRouter = () => {
  const router = createRouter({
    history: createWebHistory(),
    base: import.meta.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import('./views/Home.vue'),
      },
      {
        path: '/a11y',
        name: 'a11y',
        component: () => import('./views/A11y.vue'),
      },
      {
        path: '/security',
        name: 'security',
        component: () => import('./views/Security.vue'),
      },
      {
        path: '/performance',
        name: 'performance',
        component: () => import('./views/Performance.vue'),
      },
      {
        path: '/html',
        name: 'html',
        component: () => import('./views/HTML.vue'),
      },
      {
        path: '/:pathMatch(.*)',
        redirect: '/',
      },
    ],
  });

  return router;
};

export default getRouter;
