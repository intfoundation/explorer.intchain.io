<template>
  <div class="invalidHash">
    <div class="middle-p">
      <i class="err-img"></i>
      <div>{{$t('err.invalidHash')}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Error'
  }
</script>

<style lang="scss">
  .invalidHash {
    width: 1200px;
    margin: 90px auto;
    border: 1px solid #ddd;
    background-color: #fff;
    position: relative;
    .middle-p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .err-img {
        width: 186px;
        height: 162px;
        display: inline-block;
        background-image: url("../../../assets/no-search-outcome.png");
        background-size: cover;
      }
      div {
        margin-top: 36px;
        font-size: 18px;
      }
    }

  }
</style>
