//语言
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'zh', //默认显示的语言
  messages: {
    zh: require('../lang/zh.js') //引入语言文件
  }
})
//将i18n暴露出去，在main.js中引入挂载
export default i18n
