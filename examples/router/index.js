import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './autoRoutes.js'

// const routes = [
// {
//   path: '/',
//   name: 'Home',
//   component: Home
// },
// {
//   path: '/checkbox',
//   name: 'Checkbox',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () =>
//     import(/* webpackChunkName: "about" */ '../views/Checkbox.vue')
// },
// {
//   path: '/dropdown',
//   name: 'Dropdown',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () =>
//     import(/* webpackChunkName: "about" */ '../views/Dropdown.vue')
// }
// {
//   path: '/button',
//   name: 'Button',
//   component: () => import(/* webpackChunkName: "about" */ '../docs/button.md')
// }
// ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
