<template>
  <div class="token-detail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$t('nav.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/blockchain/tokenlist/1'}">{{$t('token.tokens')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{tokenid}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="detail-content">
      <div class="overview">
        <div>
          <!--总发行量-->
          <span class="detail-span">{{$t('token.totalsupply')}}</span>
          <span>{{tokenDetail.amount}}</span>
        </div>
        <!--<div>-->
          <!--<span class="detail-span">{{$t('token.price2')}}</span>-->
          <!--&lt;!&ndash;<span></span>&ndash;&gt; 这个数据从coinmarket获取-->
        <!--</div>-->
        <div>
          <!--持有账户-->
          <span class="detail-span">{{$t('token.holders')}}</span>
          <span>{{tokenDetail.total}}</span>
        </div>
        <div>
          <!--总交易量-->
          <span class="detail-span">{{$t('contract.transactions')}}</span>
          <span>{{transTotal}} txns</span>
        </div>
        <div>
          <span class="detail-span">{{$t('token.contract')}}</span>
          <router-link class="click-span" :to="{path: '/blockchain/contract/1', query: {contract: tokenDetail.tokenid}}">{{tokenDetail.tokenid}}</router-link>
        </div>

      </div>

      <div class="record">
        <div>
          <span class="tabs" v-for="(item, index) in tabs" :class="{'tab-active': curTab === index}" @click="curTab = index">{{item}}</span>
        </div>

        <!--token交易列表-->
        <div v-if="curTab === 0" key="key1">
          <div class="delare">
            <span>{{$t('transactionList.latest')}}&nbsp;{{transTotal > 50 ? 50 : transTotal}}&nbsp;{{$t('transactionList.txns')}}</span>
            <router-link :to="{path: '/blockchain/txlist/byToken/1', query: { tokenid: tokenid}}" v-if="transTotal >= 50">{{$t('blocksList.viewMore')}}</router-link>
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
                  <i class="txfail" v-if="scope.row.returnCode !== 0 && scope.row.returnCode !== -1"></i>
                  <span @click="handleClicktxHash(scope.row.hash)" type="text" class="btn-height">{{scope.row.hash}}</span>
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
                <span>{{ scope.row.returnCode !== -1 ? scope.row.timestamp : 'pending' }}</span>
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
                <span @click="handleClickAddress(scope.row.from_address)" type="text" class="btn-height btn-common">{{scope.row.from_address}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="to_address"
              :label="$t('transactionList.to2')"
              align="left"
              width="170">
              <template slot-scope="scope">
                <span
                  @click="handleClickAddress(scope.row.to_address)"
                  type="text"
                  :disabled="scope.row.to_address == null"
                  class="btn-height btn-common"
                  :class="{cur: scope.row.to_address == null}">{{scope.row.to_address}}</span>
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
            @current-change="handleAccountChange"
            layout="prev, pager, next"
            :total="transTotal">
          </el-pagination>
        </div>

        <!--token持有账户-->
        <div v-if="curTab === 1" key="key2">
          <div class="delare">
            <span>{{$t('transactionList.latest')}}&nbsp;{{accountTotal > 50 ? 50 : accountTotal}}&nbsp;{{$t('transactionList.holders')}}</span>
            <router-link :to="{path: '/blockchain/accountlist/byToken/1', query: { tokenid: tokenid}}" v-if="accountTotal >= 50">{{$t('blocksList.viewMore')}}</router-link>
          </div>
          <el-table
            :data="tokenAccountList"
            v-loading="isloading"
            style="width: 100%">
            <el-table-column
              prop=""
              type="index"
              :label="$t('account.rank')"
              width="200"
              align="left">
            </el-table-column>
            <el-table-column
              prop=""
              :label="$t('account.address')"
              align="left">
              <template slot-scope="scope">
                <span @click="handleClickAddress(scope.row.address)" type="text" class="btn-height">{{scope.row.address}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="ep"
            :current-page.sync="pageNum"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="accountTotal">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { formatPassTime, dataFilter } from '../../../utils/common.js'
  export default {
    name: '',
    data () {
      return {
        tokenDetail: {},
        transactionsList: [],
        tokenAccountList: [],
        tokenid: '',
        transTotal: 0,
        accountTotal: 0,
        pageNum: 1,
        pageSize: 10,
        curTab: 0,
        tabs: [this.$t('transactionList.transactionListTitle'), this.$t('token.holders2')],
        isloading: false,
        now: ''
      }
    },
    mounted () {
      this.tokenid = this.$route.query.tokenid
      this.getTokenDetail()
      setTimeout(async () => {
        await this.getServerTime()
        this.getTokenTransaction()
      }, 0)
    },
    watch: {
      curTab (val) {
        if (val === 1) {
          this.getTokenAccount()
        } else {
          this.getTokenTransaction()
        }
      }
    },
    methods: {
      async getServerTime () {
         await axios.get('/api/trans/getTimes')
          .then((res) => {
            let result = res.data
            if (result.status === 'success') {
              this.now = result.data
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      getTokenDetail () {
        let that = this
        axios.get('/api/token/tokenDetail', {
          params: {
            tokenid: that.tokenid
          }
        })
          .then(function (res) {
            let result = res.data
            if (result.status === 'success') {
              that.tokenDetail = result.data
            }
          })
          .catch(function (error) {
            alert(error)
          })
      },
      getTokenTransaction () {
        let that = this
        that.isloading = true
        axios.get('/api/trans/searchByTokenid', {
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
              if (result.total > 50) {
                that.transTotal = 50
              } else {
                that.transTotal = result.total
              }
              that.pageNum = +that.$route.params.p
              that.transactionsList = result.data
              that.transactionsList.forEach(item => {
                item.timestamp = formatPassTime(Date.parse(item.timestamp), that.now)
                item.value = dataFilter(+item.value, 5)
                item.fee = dataFilter(+item.fee, 5) + ' ' + 'INT'
              })
            }
          })
          .catch(function (error) {
            alert(error)
          })
      },
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
              if (result.data.total > 50) {
                that.accountTotal = 50
              } else {
                that.accountTotal = result.data.total
              }
              that.pageNum = +that.$route.params.p
              that.tokenAccountList = result.data.accountList
            }
          })
          .catch(function (error) {
            alert(error)
          })
      },
      handleCurrentChange (val) {
        this.pageNum = val
        // this.$router.push( {path: `/blockchain/tokendetail/${val}`, query: {tokeid: this.tokenid}} )
        this.getTokenTransaction()
      },
      handleAccountChange (val) {
        this.pageNum = val
        this.$router.push( {path: `/blockchain/tokendetail/${val}`, query: {tokenid: this.tokenid}} )
        this.getTokenAccount()
      },
      handleClickHeight (val) {
        this.$router.push({path: '/blockchain/blockdetail', query: {height: val}})
      },
      handleClicktxHash (val) {
        this.$router.push({path: '/blockchain/txdetail', query: {hash: val}})
      },
      handleClickAddress (val) {
        this.$router.push({path: '/blockchain/accountdetail/1', query: {address: val}})
      }
    }
  }
</script>

<style lang="scss">
  .token-detail {
    width: 1200px;
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
        display: inline-block;
        content: url('../../../assets/home.png');
        position: absolute;
        top: -3px;
      }
    }
    .detail-content {
      margin: 40px 44px;
      padding-bottom: 40px;
      text-align: left;
      .overview {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 35px 56px;
        margin-bottom: 56px;
        & > div:not(:first-child) {
          margin-top: 22px;
        }
        & > div {
          .detail-span {
            display: inline-block;
            width: 110px;
            font-size: 15px;
          }
        }
      }
      .click-span {
        color: #3C31D7;
        text-decoration: none;
      }
      .click-span:hover {
        text-decoration: underline;
      }
      .record {
        .tabs {
          display: inline-block;
          padding: 14px 48px;
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
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
          background-color: #f9f9ff;
        }
        .tab-active {
          background-color: #f9f9ff;
        }
        .delare {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          padding: 18px 26px;
          border-top-right-radius: 4px;
          font-weight: 500;
          background-color: #f9f9ff;
          & a {
            float: right;
            text-decoration: none;
            color: #999;
          }
        }
        .el-table {
          border: 1px solid #ccc;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          th {
            background-color: #f1f1ff;
            height: 60px !important;
          }
          td {
            border-bottom: none;
          }
          .el-table__row:nth-of-type(even) {
            background-color: #f9f9ff;
          }
          .btn-height {
            color: #3C31D7;
            font-weight: 500;
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
          .el-loading-spinner .path {
            stroke: #3C31D7;
          }
          .cur {
            cursor: default;
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
            color: #3C31D7;
          }
          .el-pager li.active {
            color: #fff;
            background-color: #3C31D7;
            border-radius: 5px;
          }
        }
      }
    }
  }
</style>
