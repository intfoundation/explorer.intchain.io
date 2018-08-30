// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 注意这里直接引入的是router文件夹
import VueLazyload from 'vue-lazyload'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 如果不引入样式，则根本没有element的样式，
// 但是上面不是引入了整个element了吗？为什么还要单独引入，这难道是element的一个bug吗？出现问题的原因还是要去查一下的。

Vue.config.productionTip = false

Vue.use(VueLazyload)
Vue.use(Element)

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  template: `<App/>`,
  components: { App } // 这应该是解构赋值的方式，代表一个模块
}).$mount('#app')
// mount挂载到 index.html文件，div标签的id
// import from 引入文件是JS的写法，与通过<script>引入JS文件的方式相比，更符合JS的写法，也更加模块化
// Vue是项目的依赖，
