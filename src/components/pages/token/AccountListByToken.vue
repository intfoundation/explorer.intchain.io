<template>
  <div class="txlist-bytoken">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$t('nav.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/blockchain/txlist'}">{{$t('transactionList.transactions')}}</el-breadcrumb-item>
      <el-breadcrumb-item class="crumb-spe">
        <span>{{$t('token.token')}}: {{tokenid}}</span>
        <i class="cross" @click="cross"></i>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div style="padding: 40px 44px;">
      <el-table
        :data="tokenAccountList"
        v-loading="isloading"
        style="width: 100%">
        <el-table-column
          prop=""
          :label="$t('account.rank')"
          type="index"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          prop="address"
          :label="$t('account.address')"
          align="left">
          <template slot-scope="scope">
            <span @click="handleClickAddress(scope.row.address)" type="text" class="btn-col">{{scope.row.address}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="ep"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="20"
        :page-sizes="[10, 20, 50, 100]"
        layout="sizes, prev, pager, next, jumper"
        :total="accountTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { formatPassTime, dataFilter } from '../../../utils/common.js'
  export default {
    name: 'TotalTransList',
    data () {
      return {
        tokenAccountList: [],
        currentPage: 1,
        pageSize: 20,
        accountTotal: 0,
        tokenid: '',
        isloading: false
      }
    },
    created () {
      this.tokenid = this.$route.query.tokenid
    },
    mounted () {
      this.getTokenAccount()
    },
    methods: {
      getTokenAccount () {
        let that = this
        that.isloading = true
        axios.get('/api/token/accountList', {
          params: {
            tokenid: that.tokenid,
            pageNum: that.$route.params.p,
            pageSize: that.pageSize
          }
        })
          .then(function (res) {
            let result = res.data
            if (result.status === 'success') {
              that.isloading = false
              that.accountTotal = result.data.total
              that.currentPage = +that.$route.params.p
              that.tokenAccountList = result.data.accountList
            }
          })
          .catch(function (error) {
            alert(error)
          })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.$router.push( {path: `/blockchain/accountlist/byToken/${val}`, query: {tokenid: tokenid} } )
        this.getTokenAccount()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getTokenAccount()
      },
      handleClickAddress (val) {
        this.$router.push({path: '/blockchain/accountdetail', query: {address: val} })
      },
      cross () {
        this.$router.push({path: '/blockchain/txlist'})
      }
    }
  }
</script>

<style lang="scss">
  .txlist-bytoken {
    width: 1200px;
    margin: 90px auto;
    box-shadow: 0px 6px 10px 0px #ccc;
    background-color: #fff;
    .el-breadcrumb {
      padding: 21px 33px;
      border-bottom: 1px solid #ccc;
      & .el-breadcrumb__item:first-of-type {
        & span {
          margin-left: 30px;
        }
      }

      .el-breadcrumb__item:first-of-type {
        position: relative;
      }
      .el-breadcrumb__item:first-of-type:before {
        content: url('../../../assets/home.png');
        position: absolute;
        top: -2px;
      }

      .crumb-spe {
        background-color: #f1f1ff;
        height: 26px;
        line-height: 26px;
        margin-top: -4px;
        text-align: left;
        padding: 0 10px;
        border-radius: 3px;
        & > span {
          font-size: 12px;
        }
        .cross {
          background-image: url("../../../assets/cross.png");
          background-size: cover;
          width: 16px;
          height: 16px;
          display: inline-block;
          margin: 5px 0;
          float: right;
          cursor: pointer;
          margin-left: 30px;
        }
      }
    }
    .el-table {
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 4px;
      th {
        background-color: #f1f1ff;
        height: 60px !important;
      }
      td {
        border-bottom: none;
      }
      .el-table__row {
        & > td:nth-of-type(1) div{
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        & > td:nth-of-type(5) div{
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        & > td:nth-of-type(6) div{
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .el-button {
        padding: 6px 18px 6px 0;
        outline: none;
        cursor: default;
      }
      .btn-status {
        span {
          color: #fff;
        }
      }
      .btn-col {
        color: #3C31D7;
        font-weight: 500;
        cursor: pointer;
      }
      .btn-col:hover {
        text-decoration: underline;
      }
      .success {
        background: #31D7A8;
      }
      .fail {
        background: #D7316F;
      }
      .el-table__row:nth-of-type(even) {
        background-color: #f9f9ff;
      }
      .el-loading-spinner .path {
        stroke: #3C31D7;
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
        color: #3C31D7;
      }
      .el-pager li.active {
        color: #fff;
        background-color: #3C31D7;
        border-radius: 5px;
      }
      .el-pager .more::before {
        line-height: 0px;
      }
      .el-select .el-input.is-focus .el-input__inner {
        border-color: #3C31D7;
      }
      .el-input__inner:focus {
        border-color: #3C31D7;
        outline: 0;
      }
      .el-pagination__sizes .el-input .el-input__inner:hover {
        border-color: #3C31D7;
      }
      .el-input__inner {
        box-shadow: none;
      }
    }
  }

</style>

