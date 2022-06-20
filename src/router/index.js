import { createRouter,createWebHistory } from 'vue-router'

const routes = [
  { path:'',name:'index',component:() => import('@/views/HomeView.vue') }
]

const router = createRouter({
  routes,
  history: createWebHistory('/audio-helper')
})
export default router