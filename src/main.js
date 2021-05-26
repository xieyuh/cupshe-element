import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/index.scss'
import 'ant-design-vue/dist/antd.css'

import Antd from 'ant-design-vue'
import VueI18n from './lang/index.js'
import component from './components/index.js'
import 'cupshe-css'
import 'cupshe-icon/lib/cupshe-icon.css'
import cupsheIcon from 'cupshe-icon'
// 配置引用iconfont图标的symbol链接
cupsheIcon.createFromIconfontCN({
  scriptUrl: ''
})
const app = createApp(App)
app
  .use(component)
  .use(Antd)
  .use(cupsheIcon)
  .use(store)
  .use(router)
  .use(VueI18n)
  .mount('#app')
