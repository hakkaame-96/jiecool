import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/HomePage.vue')
    },
    {
      path: '/edit/:id?',
      name: 'Edit',
      component: () => import('@/pages/EditPage.vue')
    }
  ]
})

export default router
