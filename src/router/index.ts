import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import CatalogView from '../views/CatalogView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: CatalogView
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('../views/ProductView.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
