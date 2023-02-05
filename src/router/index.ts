import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'
import Test from '@/views/Test.vue'
import BaseGraph from '@/components/BaseGraph.vue'
import GraphList from '@/components/GraphList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'GraphList',
    component: GraphList,
  },
  {
    path: '/graph/:id',
    name: 'Home',
    component: () => import('@/components/BaseGraph.vue'),
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
