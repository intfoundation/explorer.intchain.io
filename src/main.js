// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

Vue.use(VueI18n)
Vue.use(Element)



// 设置语言
locale.use(lang)

Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'en',  // 语言标识
  messages: {
    'en': require('./lang/en') //英文语言包
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app', // 挂载的是index.html中的id，不是App.vue中的id
  router,
  i18n,
  components: {App}, // 是API文档选项/资源中的一个内容，它是一个对象，也可以写成{App: App}
  template: '<App/>' // 是一个字符串，也可以写成'<App></App>'
})
