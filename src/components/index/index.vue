<style lang="scss">
  @import './index';
</style>

<template>
  <div class="index_app">
    <navbar></navbar>
    <contentPage></contentPage>
    <footerPanel></footerPanel>
  </div>
</template>

<script>
  import navbar from '../navbar/nav'
  import contentPage from '../content/content'
  import footerPanel from '../footerPanel/footerPanel'

  export default {
    data () {
      return {

      }
    },

    components: {
      navbar,
      contentPage,
      footerPanel
    }
  }
</script>