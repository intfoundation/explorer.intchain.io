<template>
  <div class="token-detail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$t('nav.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/blockchain/tokenlist/1'}">{{$t('token.tokens')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{tokenid}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="detail-content">
      <div class="overview">
        <!--token名字-->
        <div>
          <span class="detail-span">{{$t('token.name2')}}</span>
          <span>{{tokenDetail.name }}</span>
          <span style="margin-left: 5px;" v-if="tokenDetail.symbol">({{tokenDetail.symbol}})</span>
        </div>

        <!--总发行量-->
        <div>
          <span class="detail-span">{{$t('token.totalsupply')}}</span>
          <span>{{tokenDetail.amount}}</span>
        </div>

        <!--持有账户-->
        <div>
          <span class="detail-span">{{$t('token.holders')}}</span>
          <span>{{tokenDetail.total}}</span>
        </div>

        <!--总交易量-->
        <div>
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
              width="100"
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
              width="120"
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
              prop="amount"
              :label="$t('transactionList.value2')"
              width="150"
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
              prop="index"
              :label="$t('account.rank')"
              width="200"
              align="left">
            </el-table-column>
            <el-table-column
              :label="$t('account.address')"
              align="left">
              <template slot-scope="scope">
                <span @click="handleClickAddress(scope.row.address)" type="text" class="btn-height">{{scope.row.address}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="balance"
              :label="$t('account.balance')"
              width="200"
              align="left">
            </el-table-column>
            <el-table-column
              prop="percentage"
              :label="$t('account.percentage')"
              width="100"
              align="left">
            </el-table-column>
          </el-table>
          <el-pagination
            class="ep"
            :current-page.sync="holdNum"
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
  import axios from 'axios';
  import { BigNumber } from 'bignumber.js';
  import { formatPassTime, dataFilter, percentageFilter } from '../../../utils/common.js'
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
        holdNum: 1,
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
      this.getTokenTransaction()
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
                let input = JSON.parse(item.input);
                item.amount = new BigNumber(input.amount).dividedBy(Math.pow(10, 18)).toString();
                item.amount = dataFilter(+item.amount, 4) + ' ' + item.tokenSymbol;
                item.timestamp = formatPassTime(Date.parse(item.timestamp), result.time)
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
            pageNum: that.holdNum,
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
              for (let i = 0; i < that.tokenAccountList.length; i++) {
                if (that.holdNum == 1 ) {
                  that.tokenAccountList[i].index = i + 1;
                } else {
                  that.tokenAccountList[i].index = (that.holdNum-1)*10 + 1 + i;
                }
                that.tokenAccountList[i].percentage = dataFilter(that.tokenAccountList[i].balance / +that.tokenDetail.amount,4);
                that.tokenAccountList[i].percentage = percentageFilter(that.tokenAccountList[i].percentage, 4)
              }
            }
          })
          .catch(function (error) {
            throw new Error(error)
          })
      },
      handleCurrentChange (val) {
        this.holdNum = val;
        // this.$router.push( {path: `/blockchain/tokendetail/${val}`, query: {tokeid: this.tokenid}} )
        this.getTokenAccount()
      },
      handleAccountChange (val) {
        this.pageNum = val
        this.$router.push( {path: `/blockchain/tokendetail/${val}`, query: {tokenid: this.tokenid}} )
        this.getTokenTransaction()
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
          background-color: #f1f1ff;
        }
        .tab-active {
          background-color: #f1f1ff;
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
