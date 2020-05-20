<template>
  <div class="contract-detail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$t('nav.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('contract.contract')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="detail-content">

      <!--智能合同的详情-->
      <div class="overview">
        <div>
          <!--Token名称-->
          <span class="detail-span">{{$t('account.token2')}}</span>
          <router-link class="detail-address" :to="{ path: '/blockchain/tokendetail/1', query: {tokenid: tokenDetail.tokenid}}">{{tokenDetail.name}}({{tokenDetail.symbol}})</router-link>
        </div>
        <div>
          <!--总发行量-->
          <span class="detail-span">{{$t('token.totalsupply')}}</span>
          <span>{{tokenDetail.amount}}</span>
        </div>
        <div>
          <!--持有账户-->
          <span class="detail-span">{{$t('token.holders')}}</span>
          <span>{{tokenDetail.total}}</span>
        </div>
        <!--交易笔数-->
        <div>
          <span class="detail-span">{{$t('contract.transactions')}}</span>
          <span>{{result.total}} txns</span>
        </div>
        <div>
          <span class="detail-span">{{$t('contract.creator')}}</span>
          <router-link :to="{path: '/blockchain/accountdetail/1', query: {address: tokenDetail.caller} }" class="detail-address"> {{tokenDetail.caller}} </router-link>
          <span>{{$t('contract.atTxn')}}</span>
          <router-link :to="{path: '/blockchain/txdetail', query: {hash: tokenDetail.hash} }" class="detail-address">{{ tokenDetail.hash }}</router-link>
        </div>
      </div>

      <div class="record">
        <div>
          <span :class="['tabs', 'tab-active']">{{tabs}}</span>
        </div>

        <!--token交易列表-->
        <div key="key1">
          <div class="delare">
            <span>{{$t('transactionList.latest')}}&nbsp;{{transTotal > 50 ? 50 : transTotal}}&nbsp;{{$t('transactionList.txns')}}</span>
            <router-link :to="{path: '/blockchain/contract/transactions/1', query: { contract: contract}}" v-if="transTotal >= 50">{{$t('blocksList.viewMore')}}</router-link>
          </div>
          <el-table
            :data="transactionsList"
            v-loading="isloading"
            style="width: 100%">
            <el-table-column
              prop="hash"
              :label="$t('transactionList.txhash2')"
              width="170"
              align="left">
              <template slot-scope="scope">
                <span class="btn-common">
                  <span class="txfail" v-if="scope.row.returnCode !== 0 && scope.row.returnCode !== -1"></span>
                  <span @click="handleClickHash(scope.row.hash)" type="text" class="btn-hash">{{scope.row.hash}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="height"
              :label="$t('transactionList.height')"
              align="left">
              <template slot-scope="scope">
                <span @click="handleClickHeight(scope.row.height)" type="text" class="btn-height" v-if="scope.row.returnCode !== -1">{{scope.row.height}}</span>
                <span v-else>pending</span>
              </template>
            </el-table-column>
            <el-table-column
              prop=""
              :label="$t('transactionList.timestamp')"
              align="left">
              <template slot-scope="scope">
                <span>{{scope.row.returnCode !== -1 ? scope.row.timestamp : 'pending'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="method"
              :label="$t('transactionList.txtype2')"
              align="left">
            </el-table-column>
            <el-table-column
              prop="from_address"
              :label="$t('transactionList.from2')"
              align="left"
              width="170">
              <template slot-scope="scope">
                <span @click="handleClickAddress(scope.row.from_address)" type="text" class="btn-hash btn-common">{{scope.row.from_address}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="to_address"
              :label="$t('transactionList.to2')"
              align="left"
              width="170">
              <template slot-scope="scope">
                <span @click="handleClickAddress(scope.row.to_address)" type="text" class="btn-hash btn-common">{{scope.row.to_address}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="value"
              :label="$t('transactionList.value2')"
              align="left">
            </el-table-column>
            <el-table-column
              prop=""
              :label="$t('transactionList.txfee')"
              align="left">
              <template slot-scope="scope">
                <span>{{ scope.row.returnCode !== -1 ? scope.row.cost : 'pending' }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="ep"
            :current-page.sync="pageNum"
            @current-change="handleCurrentChange"
            :page-size="20"
            :page-sizes="[10, 20, 50, 100]"
            layout="prev, pager, next"
            :total="transTotal">
          </el-pagination>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  // import router from '@/router/index'
  import { formatPassTime, dataFilter } from '../../../utils/common.js'
  export default {
    name: '',
    data () {
      return {
        tokenDetail: {},
        transactionsList: [],
        tokenAccountList: [],
        contract: '',
        transTotal: 0,
        accountTotal: 0,
        pageNum: 1,
        pageSize: 20,
        tabs: this.$t("transactionList.transactionListTitle"),
        isloading: false,
        address: '',
        result: {},
        now: ''
      }
    },
    created () {
      this.$router.beforeEach((to, from, next) => {
        if (from.path === '/404' && to.path === '/blockchain/contract/1') {
          next({path: 'blockchain/txlist/1'})
        }
        next()
      })
    },
    mounted () {
      this.contract = this.$route.query.contract
      this.getTokenTransaction()
      this.getTokenDetail()

    },
    methods: {
      getTokenDetail () {
        let that = this
        axios.get('/api/token/tokenDetail', {
          params: {
            tokenid: that.contract
          }
        })
          .then(function (res) {
            let result = res.data
            if (result.status === 'success') {
              if (JSON.stringify(result.data) === '{}') {
                that.$router.push('/404')
              } else {
                that.tokenDetail = result.data
                that.contract = that.tokenDetail.tokenid
              }
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      getTokenTransaction () {
        let that = this
        that.isloading = true
        axios.get('/api/trans/searchByTokenid', {
          params: {
            tokenid: that.contract,
            pageNum: +that.$route.params.p,
            pageSize: that.pageSize
          }
        })
          .then(function (res) {
            that.result = res.data
            if (that.result.status === 'success') {
              that.isloading = false
              if (that.result.total > 50) {
                that.transTotal = 50
              } else {
                that.transTotal = that.result.total
              }
              that.pageNum = +that.$route.params.p
              that.transactionsList = that.result.data
              that.transactionsList.forEach(item => {
                item.timestamp = formatPassTime(Date.parse(item.timestamp), that.result.time)
                item.value = dataFilter(+item.value, 5) + ' ' + 'INT'
                item.fee = dataFilter(+item.fee, 5) + ' ' + 'INT'
              })
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      handleCurrentChange (val) {
        this.pageNum = val
        this.$router.push( {path: `/blockchain/contract/${val}`, query: {contract: this.contract}} )
        this.getTokenTransaction()
      },
      handleClickHeight (val) {
        this.$router.push({path: '/blockchain/blockdetail', query: {height: val}})
      },
      handleClickHash (val) {
        this.$router.push({path: '/blockchain/txdetail', query: {hash: val}})
      },
      handleClickAddress (val) {
        this.$router.push({path: '/blockchain/accountdetail', query: {address: val}})
      }
    }
  }
</script>

<style lang="scss">
  .contract-detail {
    width: 1200px;
    box-shadow: 0px 6px 10px 0px #ccc;
    background-color: #fff;
    .el-breadcrumb {
      padding: 21px 33px;
      border-bottom: 1px solid #ccc;
       
      .el-breadcrumb__item:first-of-type {
        position: relative;
      }
    }
    .detail-content {
      margin: 40px 44px;
      padding-bottom: 40px;
      text-align: left;
      .overview {
        border: 1px solid #ccc;
        border-radius: 0px;
        padding: 35px 56px;
        margin-bottom: 56px;
        & > div:not(:first-child) {
          margin-top: 22px;
        }
        & > div {
          .detail-span {
            display: inline-block;
            width: 130px;
            font-size: 14px;
          }
        }
        .detail-address {
          display: inline-block;
          vertical-align: middle;
          width: 230px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-decoration: none;
          color: #1f80c1;
        }
        .detail-address:hover {
          text-decoration: underline;
        }
      }
      .record {
        .tabs {
          display: inline-block;
          padding: 14px 48px;
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          cursor: pointer;
        }
        .tabs:nth-of-type(1) {
          border-top-left-radius: 4px;
        }
        .tabs:nth-of-type(2) {
          border-right: 1px solid #ccc;
          border-top-right-radius: 4px;
        }
        .tabs:hover {
          background-color: #f8f8f8;
        }
        .tab-active {
          background-color: #f8f8f8;
        }
        .delare {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          padding: 18px 26px;
          border-top-right-radius: 4px;
          font-weight: 500;
          background-color: #f8f8f8;
          & a {
            float: right;
            text-decoration: none;
            color: #999;
          }
        }
        .el-table {
          border: 1px solid #ccc;
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
            padding: 6px 18px 6px 0;
            color: #1f80c1;
            font-weight: 500;
            cursor: pointer;
          }
          .btn-height:hover {
            text-decoration: underline;
          }
          .btn-common {
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            width: 152px;
            text-overflow: ellipsis;
          }
          .btn-hash {
            color: #1f80c1;
            font-weight: 500;
            cursor: pointer;
          }
          .btn-hash:hover {
            text-decoration: underline;
          }
          .el-loading-spinner .path {
            stroke: #1f80c1;
          }
          .txfail {
            display: inline-block;
            width: 12px;
            height: 12px;
            background-image: url("../../../assets/txfail.png");
            background-size: cover;
            margin-right: 2px;
          }
        }
        .el-pagination {
          margin: 30px 0 80px 0;
          text-align: right;
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
        }
      }
    }
  }
</style>
