import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import CupsheUI from '../packages/index.js'
import 'cupshe-css'
createApp(App)
  .use(CupsheUI)
  .use(router)
  .mount('#app')
