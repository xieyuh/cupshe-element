import pages from './pages.js'
export default [
  {
    name: 'Home',
    path: '/Home',
    component: () => pages['Home'],
    children: [],
    meta: { hidden: false }
  },
  {
    name: '404',
    path: '/404',
    component: () => pages['_404'],
    children: [],
    meta: { hidden: true }
  },
  {
    name: 'Login',
    path: '/Login',
    component: () => pages['_Login'],
    children: [],
    meta: { hidden: true }
  }
]
