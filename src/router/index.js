import { createRouter, createWebHashHistory } from 'vue-router'
import autoRoutes from './autoRoutes.js'
// 数据字典
import { LOGIN_SWITCH, NO_LOGIN_PAGE } from 'utils/dictionary.js'
import { getQueryString } from 'cupshe-utils'
// 自定义路由
const customerRouters = [
  {
    path: '/',
    redirect: '/home'
  }
]
/**
 * 数组合并
 */
const unique = (arr1, arr2) => {
  arr1.map(item => {
    const index = arr2.findIndex(subItem => {
      return subItem.name === item.name && subItem.path === item.path
    })
    if (index > -1) {
      arr2.splice(index, 1)
    }
  })
  return [
    ...arr1,
    ...arr2,
    {
      path: '/:catchAll(.*)', // 此处需特别注意置于最底部
      redirect: '/404'
    }
  ]
}
// 合并路由
const routes = unique(customerRouters, autoRoutes)
// 创建路由对象
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 路由钩子
/**
 * LOGIN_SWITCH 是否添加登录拦截的开关
 * NO_LOGIN_PAGE 配置无需登录的界面name
 */
router.beforeEach((to, from, next) => {
  // url上有token时设置到localStorage中
  if (getQueryString('token')) {
    localStorage.setItem('token', getQueryString('token') || '')
  }
  // 登录拦截
  if (
    LOGIN_SWITCH &&
    !NO_LOGIN_PAGE.includes(to.name) &&
    !localStorage.getItem('token')
  ) {
    parent.postMessage(40001, '*')
  } else {
    next()
  }
})

export default router
