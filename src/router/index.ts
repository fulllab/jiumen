import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'
import Test from '@/views/Test.vue'
import BaseGraph from '@/components/BaseGraph.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: BaseGraph,
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
  },
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
