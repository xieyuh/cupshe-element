import _ from 'lodash'
import { createRouter, createWebHistory } from 'vue-router'

let routers = require.context('../views/', true, /[a-zA-Z]+\.vue$/i).keys()
let routes = []
const loadComponent = name => {
  return () => require(`../views/${name}.vue`)
}
routers.forEach(item => {
  if (item.endsWith('.vue')) {
    const name = item.match(/[a-zA-Z]+/g)[0]

    routes.push({
      name: _.upperFirst(name),
      path: '/' + _.lowerCase(name),
      component: loadComponent(name)
    })
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: '/',
      path: '/',
      redirect: '/button'
    },
    ...routes
  ]
})

export default router
