import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import ManageAccount from '../components/ManageAccount.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Index
  },
  {
    path:'/index',
    name:"index",
    component:Index
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
