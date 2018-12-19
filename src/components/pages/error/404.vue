<template>
  <div class="error">
    <div class="middle-p">
      <i class="err-img"></i>
      <div>{{$t('err.hint')}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Error'
  }
</script>

<style lang="scss">
  .error {
    width: 1200px;
    margin: 90px auto;
    box-shadow: 0px 6px 10px 0px #ccc;
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
