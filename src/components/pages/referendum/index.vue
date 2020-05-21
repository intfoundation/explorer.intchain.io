<template>
  <div class="node">
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$t('nav.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item to="">{{$t('referendum.referendum')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="node-content">
      <div>
        <span class="tabs" :key="item.id" v-for="item in tabs" :class="{'tab-active': curTab === item.id}" @click="switchTab(item)">{{item.name}}</span>
        <div v-show="curTab==='proposal'" class="common-inline-block row-input">
          <input type="text" :placeholder="$t('referendum.search')" v-model="searchProposal">
        </div>
        <div v-show="curTab==='opinion'" class="common-inline-block row-input">
          <input type="text" :placeholder="$t('referendum.search')" v-model="searchOpinion">
        </div>
      </div>
      <div>
        <proposal v-show="curTab==='proposal'" :search="searchProposal"></proposal>
        <opinion v-show="curTab==='opinion'" :search="searchOpinion"></opinion>
      </div>
    </div>
  </div>
</template>

<script>
  import opinion from './opinion'
  import proposal from './proposal'
  export default {
    components: {
      opinion,
      // tabCandidate,
      proposal
    },
    data () {
      return {
        curTab: 'proposal',
        tabs: [
          {
            id: 'proposal',
            name: this.$t('referendum.proposal')
          },
          {
            id: 'opinion',
            name: this.$t('referendum.opinion')
          }
        ],
        searchProposal: '',
        searchOpinion:'',

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
          padding: 14px 48px;
          cursor: pointer;
          border-right: 1px solid #ddd;
          font-weight: 500;
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
