<template>
  <div class="layout">
    <Navbar ref="Navbar"/>
    <router-view class="main"/>
    <FooterPanel ref="FooterPanel"/>
  </div>
</template>

<script>
  import Navbar from '@/components/layouts/Navbar';
  import FooterPanel from '@/components/layouts/FooterPanel';

  export default {
    name: 'Layout',
    components: {
      Navbar,
      FooterPanel
    }
  }
</script>

<style lang="scss">
  .layout {
    background-color: #f9f9f9;
    .main {
      min-height: 800px;
      margin: 72px auto 120px auto;
    }
  }
</style>
