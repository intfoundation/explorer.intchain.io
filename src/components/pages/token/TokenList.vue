<template>
  <div class="details">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$t('nav.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('token.tokens')}}</el-breadcrumb-item>
    </el-breadcrumb>

      <div class="" style="padding: 40px 44px;">
        <el-table
          :data="tokenlist"
          v-loading="isloading">
          <el-table-column
            prop=""
            :label="$t('token.name')"
            align="left">
            <template slot-scope="scope">
              <img :src="scope.row.logoUrl" class="tokenImg" alt="" v-if="scope.row.logoUrl"><img src="../../../assets/token-logo.png" class="tokenImg" alt="" v-if="!scope.row.logoUrl"><span type="text" class="tokenName">{{getTokenName(scope.row.name, scope.row.symbol)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="tokenid"
            :label="$t('token.id')"
            align="left"
          >
            <template slot-scope="scope">
              <span @click="handleClickTokenId(scope.row.tokenid)" type="text" class="btn-height">{{scope.row.tokenid}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="amount"
            :label="$t('token.totalsupply2')"
            align="left">
          </el-table-column>
          <!--<el-table-column-->
            <!--prop=""-->
            <!--:label="$t('token.marketcap')"-->
            <!--align="left">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop=""-->
            <!--:label="$t('token.change')"-->
            <!--align="left">-->
          <!--</el-table-column>-->
        </el-table>
        <el-pagination
          class="ep"
          :current-page.sync="currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="20"
          :page-sizes="[10, 20, 50, 100]"
          layout="sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { formatPassTime } from '../../../utils/common.js'
  export default {
    name: 'TokenList',
    data () {
      return {
        tokenlist: [],
        currentPage: 1,
        pageSize: 20,
        total: 0,
        isloading: false
      }
    },
    created () {
      this.getTokenList()
    },
    methods: {
      getTokenName (name, symbol) {
        return name + ' ' + '(' + symbol + ')'
      },
      getTokenList () {
        let that = this
        that.isloading = true
        axios.get('/api/token/tokenList', {
          params: {
            pageNum: that.$route.params.p,
            pageSize: that.pageSize
          }
        })
          .then(function(res) {
            let result = res.data;
            if (result.status === 'success') {
              that.isloading = false;
              that.tokenlist = result.data.accountList;
              that.total = result.data.total;
              that.currentPage = +that.$route.params.p;
            }
          })
          .catch(function(error) {
            console.log(error)
          })

      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.$router.push(`/blockchain/tokenlist/${val}`)
        this.getTokenList()
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.getTokenList()
      },
      handleClickTokenId (val) {
        this.$router.push({ path: '/blockchain/tokendetail/1', query: {tokenid: val}})
      }
  }
}

</script>

<style lang="scss">
  .details {
    width: 1200px;
    border: 1px solid #ddd;
    background-color: #fff;
    text-align: left;
    .el-breadcrumb {
      padding: 21px 33px;
      border-bottom: 1px solid #ddd;
       

      .el-breadcrumb__item:first-of-type {
        position: relative;
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
  }
  .details-list {
    padding-bottom: 100px;
    padding-left: 50px !important;
  }

  .el-table {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 0px;
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
    .tokenImg {
      width: 30px;
      height: 30px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 8px;
    }
    .tokenName {
      display: inline-block;
      cursor: default;
      color: #222222;
      vertical-align: middle;
    }
  }
</style>
