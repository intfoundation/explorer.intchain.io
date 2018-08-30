<template>
  <div id="app">
  <!-- 浏览器中的DOM是按照这个模板来编译的，这里的id随便取一个名字好像也没关系 -->
    <!-- <img src="./assets/logo.png"> -->
    <!-- 会注入一个模块依赖中，他们会基于你webpack输出配置，自动替换生成的URL -->
    <router-view/>
    <!-- 这是JSX（JavaScript XML）的写法，JavaScript衍生出来的另一种语法 -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
