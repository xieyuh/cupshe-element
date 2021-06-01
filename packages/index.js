/*
 * @Author: your name
 * @Date: 2021-03-16 18:52:34
 * @LastEditTime: 2021-06-01 15:25:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cupshe-element/packages/index.js
 */
import Button from './Button'
import Icon from 'cupshe-icon'
const components = [Button]
Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2489304_9tjpddaxw0k.js'
})
const install = function(Vue) {
  Vue.use(Icon)
  if (install.installed) return
  components.map(component => {
    Vue.component(component.name, component)
  })
}
//  全局引用可自动安装
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install
}
