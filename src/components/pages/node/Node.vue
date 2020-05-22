<template>
  <div class="node">
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$t('nav.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item to="">{{$t('node.nodes')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="node-content">
      <div>
        <span class="tabs" v-for="item in tabs" :key="item.id" :class="{'tab-active': curTab === item.id}" @click="switchTab(item)">{{item.name}}</span>
        <div class="common-inline-block row-input" @keyup.enter="search">
          <input type="text" :placeholder="$t('node.search')" v-model="search">
        </div>
      </div>
      <div>
        <component v-bind:is="currentComponent" v-bind:search="search"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import tabPlan from './tabPlan'
  import tabCandidate from './tabCandidate'
  import tabCurrent from './tabCurrent'
  export default {
    components: {
      tabPlan,
      // tabCandidate,
      tabCurrent
    },
    data () {
      return {
        curTab: 'tabCurrent',
        tabs: [
          {
            id: 'tabCurrent',
            name: this.$t('node.list')
          },
          {
            id: 'tabPlan',
            name: this.$t('node.plan')
          }
          // {
          //   id: 'tabCandidate',
          //   name: '候选节点'
          // },
        ],
        search: ''
      }
    },
    computed: {
      currentComponent () {
        return this.curTab
      }
    },
    methods: {
      switchTab (item) {
        this.curTab = item.id
      }
    }
  }
</script>

<style lang="scss">
  .node {
    width: 1200px;
    border: 1px solid #ddd;
    background-color: #fff;
    .el-breadcrumb {
      padding: 21px 33px;
      border-bottom: 1px solid #ddd;
       

      .el-breadcrumb__item:first-of-type {
        position: relative;
      }
    }
    .node-content {
      padding: 40px 44px;
      text-align: left;
      & > div:first-child {
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        padding-right: 20px;
        .row-input {
          height: 51px;
          line-height: 51px;
          float: right;
          position: relative;
          & > input {
            width: 330px;
            box-sizing: border-box;
            height: 37px;
            padding-left: 10px;
            border-radius: 0px;
            border: 1px solid #ddd;
            outline: none;
          }
        }
        .tabs {
          display: inline-block;
          padding: 16px 48px;
          cursor: pointer;
          border-right: 1px solid #ddd;
          font-weight: 500;
          font-size: 14px;
          border-top: none !important;
          border-left: none !important;
        }
        .tabs:nth-of-type(1) {
          border-top-left-radius: 0px;
        }
        .tabs:nth-of-type(2) {
          border-right: 1px solid #ddd;
        }
        .tabs:hover {
          background-color: #f8f8f8;
        }
        .tab-active {
          background-color: #f8f8f8;
        }
      }
    }
  }
</style>
