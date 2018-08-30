<template>
    <div class="page-wrap">
      <ul v-show="prePage" class="li-page" v-tap="{methods: goPrePage}">上一页</ul>
      <ul>
        <li v-for="i in showPageBtn" :class="{active: i === currentPage, pointer: i, hover: i && i !== currentPage}"
            v-tap="{methods: goPage, i: i}">
          <a v-if="i" class="notPointer">{{i}}</a>
          <a v-else>···</a>
        </li>
      </ul>
      <ul v-show="nextPage" class="li-page" v-tap="{methods: goNextPage}">下一页</ul>
    </div>

</template>

<style lang="scss">
  .l {
    width: 200px;
  }
  // button {
  //   border: 1px solid #dedede;
  //   &:hover {
  //     background-color: #fe89dd;
  //   }
  //   &:focus {
  //     background-color: red;
  //   }
  //   &:disabled {
  //     background-color: #fefefe;
  //     cursor: not-allowed;
  //   }
  // }

</style>

<script>
let that
export default {
  data () {
    that = this
    return {
      num: 30,
      limit: 5
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(that.num / that.limit)
    }
  },
  created () {
    this.total = Math.ceil(that.list.length / 10)
  },
  methods: {

  }
}
</script>