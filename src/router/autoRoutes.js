import pages from './pages.js'
export default [
  {
    name: 'Home',
    path: '/Home',
    component: () => pages['Home'],
    children: [],
    meta: { hidden: false }
  }
]
