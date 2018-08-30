import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/Home/HelloWorld'
// ../代表上层文件夹，该文件index.js的上层是router，router是跟components是平等的关系
// import HelloWorld from '@/components/HelloWorld'，感觉这种写法是一种绝对路径的写法
// in vue webpack template,webpack is configured to replace @/ with src path
// import Main from '../components/main/main'
// import Navbar from '../components/navbar/nav'
// import Footer from '../components/footer/footer'
import Index from '../components/index/index'
import Test from '../components/test'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/hello', // http://localhost:8080/#/  路由里默认有个#号
      name: 'HelloWorld',
      component: HelloWorld
      // beforeEnter: (to, from, next) => { // 与beforeEach有相同的参数，奇怪加上这个，两个组件的内容也显示不出来了
      //   console.log('*****', to, from)
      // }
      // children: [
      //   {
      //     path: '/post',
      //     name: 'Post',
      //     component: Post
      //   }
      // ]
    },
    {
      path: '/home',
      name: 'Index',
      alias: '/', // 如果上面HelloWorld的path也是这个的话，则该别名失效
      component: Index
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})

router.afterEach((to, from) => { // 为什么换成beforeEach，以上的两个组件就显示不出来呢？
  // console.log('---to---', to)
  // console.log('-----from---', from)
})

export default router
