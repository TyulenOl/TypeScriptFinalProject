import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import CatalogView from '../views/CatalogView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: CatalogView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
