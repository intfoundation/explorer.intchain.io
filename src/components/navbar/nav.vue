<style lang="scss">
  @import './nav';
</style>

<template>
  <div>
    <div class="l-c-combination">
      <div class="qi home-page-height"></div>
      <div class="circle home-page">首页</div>
    </div>

    <div class="l-c-combination">
      <div class="qi text-page-height"></div>
      <!-- <a class="circle text-page">文字</a> -->
      <router-link to="/hello" class="circle text-page">文字</router-link>
    </div>

    <div class="l-c-combination">
      <div class="qi about-page-height"></div>
      <div class="circle about-page">关于我</div>
    </div>

    <div class="l-c-combination">
      <div class="qi message-page-height"></div>
      <div class="circle message-page">留言</div>
    </div>

    <div class="l-c-combination">
      <div class="qi book-page-height"></div>
      <div class="circle book-page">书籍</div>
    </div>

    <div class="l-c-combination">
      <div class="qi code-page-height"></div>
      <div class="circle code-page ">代码</div>
    </div>

  </div>

</template>

<script>
  // window.onload = function () {
  //   var cvs = document.getElementById('cvs') // 画布
  //   var ctx = cvs.getContext('2d') // 画笔
  //   ctx.arc(0, 0, 200, 200, Math.PI / 2, 0)
  //   ctx.stroke()

  //   // ctx.moveTo(0, 0)
  //   // ctx.lineTo(10, 10)

  //   // ctx.lineWidth = 2
  //   // ctx.strokeStyle = 'rgba(173, 139, 121, 0.5)'
  //   // ctx.stroke()
  // }
  export default {
    data () {
      return {
        texts: ['首页', '文字', '关于我', '留言', '书籍']
      }
    }
  }
</script>