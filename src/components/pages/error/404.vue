<template>
  <div class="error">
    <div class="middle-p">
      <!--<i class="err-img"></i>-->
      <!--<div>{{$t('err.hint')}}</div>-->
      <div>Oops!</div>
      <div>The search string you entered was:</div>
      <div>{{q}}</div>
      <div>Sorry! This is an invalid search string.</div>
      <button @click="$router.push('/')">Back Home</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Error',
    data () {
      return {
        q: ''
      }
    },
    created () {
      this.q = this.$route.query.q
    }
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
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      & > div:nth-of-type(1) {
        font-size: 30px;
      }
      & > div:nth-of-type(2) {
        margin: 30px 0 20px;
      }
      & > div:nth-of-type(3) {
        border: 1px solid #ccc;
        padding: 5px 10px;
      }
      & > div:nth-of-type(4) {
        margin: 20px 0;
      }
      button {
        background-color: #1f80c1;
        color: #fff;
        padding: 8px 16px;
        border-radius: 3px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        outline: none;
      }
    }

  }


</style>
