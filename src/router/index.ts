import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Test from '@/views/Test.vue'
import BaseGraph from '@/components/BaseGraph.vue'
import GraphConfig from '@/components/GraphConfig.vue'
import GraphNodeAndEdge from '@/components/GraphNodeAndEdge.vue'
import GraphConnect from '@/components/GraphConnect.vue'
import GraphVueNode from '@/components/GraphVueNode.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
  },
  {
    path: '/dag',
    name: 'Gag',
    component: BaseGraph,
  },
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
