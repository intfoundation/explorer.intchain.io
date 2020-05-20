<template>
  <div class="blocklist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$t('nav.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/blockchain/accountlist/1'}">{{$t('account.accounts')}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/blockchain/accountdetail/1', query: {address: address}}">{{$t('account.address')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('account.otherToken')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="padding: 40px 44px;">
      <div class="vmp">
        <span style="float: left;">{{$t('token.inquire')}}</span>
        <div class="common-inline-block iv" style="margin-top: 4px;" @keyup.enter="search">
          <input type="text" :placeholder="$t('token.searchToken')" v-model="searchContent">
          <span @click="search"><i class="search-icon"></i></span>
        </div>
      </div>
      <el-table :data="otherTokenList" v-loading="isloading">
        <el-table-column :label="$t('token.token')" align="center">
          <template slot-scope="scope">
            <span @click="handleClickToken(scope.row.tokenid)" type="text" class="btn-height">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="balance" :label="$t('account.balance')" align="center"></el-table-column>
      </el-table>
      <el-pagination
        class="ep"
        current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="20"
        :page-sizes="[10, 20, 50, 100]"
        layout="sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        otherTokenList: [],
        currentPage: 1,
        total: 0,
        pageSize: 20,
        address: '',
        searchContent: '',
        isloading: false
      }
    },
    created () {
      this.address = this.$route.query.address
      this.getOtherToken()
    },
    methods: {
      search () {
        this.getOtherToken()
      },
      getOtherToken () {
        let that = this
        that.isloading = true
        axios.get('/api/wallet/walletList', {
          params: {
            address: that.address,
            tokenid: that.searchContent,
            pageNum: that.currentPage,
            pageSize: that.pageSize,
          }
        })
          .then(function(res) {
            let result = res.data
            if (result.status === 'success') {
              that.isloading = false
              that.otherTokenList = result.data.tokenList
              that.total = result.data.total
              that.searchContent = ''
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getOtherToken()
      },
      handleClickToken (val) {
        this.$router.push({path: '/blockchain/tokendetail/1', query: {tokenid: val}})
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.getOtherToken()
      }
    }
  }
</script>

<style lang="scss">
  .blocklist {
    width: 1200px;
    margin: 90px auto;
    box-shadow: 0px 6px 10px 0px #ccc;
    background-color: #fff;
    .el-breadcrumb {
      padding: 21px 33px;
      border-bottom: 1px solid #ccc;
       

      .el-breadcrumb__item:first-of-type {
        position: relative;
      }
    }
    .vmp {
      overflow: hidden;
      background-color: #f8f8f8;
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      padding: 0 33px;
      box-sizing: border-box;
      height: 62px;
      line-height: 62px;
    }
    .el-table {
      width: 100%;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      /*border-radius: 0px;*/
      th {
        background-color: #f1f1f1;
        height: 60px !important;
      }
      td {
        border-bottom: none;
      }
      .el-table__row:nth-of-type(even) {
        background-color: #f8f8f8;
      }
      .btn-height {
        color: #1f80c1;
        font-weight: 500;
        cursor: pointer;
      }
      .btn-height:hover {
        text-decoration: underline;
      }
      .el-loading-spinner .path {
        stroke: #1f80c1;
      }
    }
    .ep {
      margin: 30px 0 80px 0;
      text-align: right;
      .el-select-dropdown__item {
        font-size: 12px !important;
      }
      .el-pager {
        margin-top: 3px;
      }
      .el-pager li {
        min-width: 22px !important;
        height: 22px;
        line-height: 22px;
        margin: 0 5px;
      }
      .el-pager li:hover {
        color: #1f80c1;
      }
      .el-pager li.active {
        color: #fff;
        background-color: #1f80c1;
        border-radius: 5px;
      }
      .el-pager .more::before {
        line-height: 0px;
      }
      .el-select .el-input.is-focus .el-input__inner {
        border-color: #1f80c1;
      }
      .el-input__inner:focus {
        border-color: #1f80c1;
        outline: 0;
      }
      .el-pagination__sizes .el-input .el-input__inner:hover {
        border-color: #1f80c1;
      }
      .el-input__inner {
        box-shadow: none;
      }
    }
    .iv {
      height: 52px;
      line-height: 52px;
      float: right;
      position: relative;
      & input {
        width: 330px;
        box-sizing: border-box;
        height: 37px;
        padding-left: 10px;
        border-radius: 0px;
        border: 1px solid #ccc;
        outline: none;
      }
      & span {
        display: inline-block;
        width: 53px;
        height: 36px;
        line-height: 3;
        position: absolute;
        right: 0;
        top: 8px;
        text-align: center;
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
      }
      .search-icon {
        background-image: url("../../../assets/pure-search.png");
        background-size: cover;
        display: inline-block;
        width: 24px;
        height: 22px;
      }
    }
  }
</style>

