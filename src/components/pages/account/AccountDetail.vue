<template>
  <div class="account-detail">

    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$t('nav.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/blockchain/accountlist/1'}">{{$t('account.accounts')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('account.address')}}</el-breadcrumb-item>
    </el-breadcrumb>

    <!--主内容-->
    <div class="detail-content">

      <!--地址的概要信息-->
      <div class="overview">
        <div>
          <span class="detail-span">{{$t('account.address2')}}</span>
          <span>{{accountDetail.address}}</span>
        </div>
        <div>
          <span class="detail-span">{{$t('account.balance2')}}</span>
          <span>{{accountDetail.balance}}</span>
          <router-link class="inquire" :to="{path: '/blockchain/account/inquire', query: {address: address}}">{{$t('account.inquire')}}</router-link>
        </div>

        <div>
          <span class="detail-span">{{$t('account.votes')}}</span>
          <span v-if="accountDetail.stake">{{accountDetail.stake}}</span>
          <span v-else>0</span>
        </div>

        <div>
          <span class="detail-span">{{$t('contract.transactions')}}</span>
          <span>{{accountDetail.total}} txns</span>
        </div>

        <div>
          <span class="detail-span">{{$t('account.CTime')}}</span>
          <span>{{accountDetail.createTime}}</span>
        </div>

        <div>
          <span class="detail-span">{{$t('account.qrcode')}}</span>
          <canvas id="canvas"></canvas>
        </div>
      </div>


      <!--交易列表-->
      <div class="record">
        <div>
          <span class="tabs" v-for="(item, index) in tabs" :key="index" :class="{'tab-active': index === curTab}" @click="curTab = index">{{item}}</span>
        </div>

        <!--INT交易-->
        <div v-if="curTab === 0" key="atable">
          <div class="delare">
            <span>{{$t('transactionList.latest')}}&nbsp;{{totalTrans > 50 ? 50 : totalTrans}}&nbsp;{{$t('transactionList.txns')}}</span>
            <router-link :to="{path: '/blockchain/txlist/byAddress/1', query: { address: address}}" v-if="totalTrans >= 50">{{$t('blocksList.viewMore')}}</router-link>
          </div>
          <el-table
            :data="transactionlist"
            v-loading="isloading"
            style="width: 100%; border-bottom-right-radius: 4px !important; border-bottom-left-radius: 4px !important;">
            <el-table-column
              prop="hash"
              :label="$t('transactionList.txhash2')"
              width="160"
              align="left">
              <template slot-scope="scope">
                <span class="btn-common">
                  <i class="txfail" v-if="scope.row.returnCode !== 0 && scope.row.returnCode !== -1"></i>
                  <span @click="handleClickHash(scope.row.hash)" type="text" class="btn-hash">{{scope.row.hash}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="height"
              :label="$t('transactionList.height')"
              width="75"
              align="left">
              <template slot-scope="scope">
                <span @click="handleClickHeight(scope.row.height)" type="text" class="btn-height" v-if="scope.row.returnCode !== -1">{{ scope.row.height}}</span>
                <span v-else>pending</span>
              </template>
            </el-table-column>
            <el-table-column
              prop=""
              :label="$t('transactionList.timestamp')"
              width="100"
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
              width="160">
              <template slot-scope="scope">
                <span
                  @click="handleClickAddress(scope.row.from_address)"
                  type="text"
                  :disabled="scope.row.from_address == accountDetail.address"
                  class="btn-common"
                  :class="[scope.row.from_address != accountDetail.address ? 'btn-hash' : 'plain-btn']">{{scope.row.from_address}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label=""
              align="left"
              width="70">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.to_address"
                  :class="[scope.row.from_address != accountDetail.address ? 'success': 'fail']"
                  class="btn-status">{{scope.row.from_address != accountDetail.address ? 'IN' : 'OUT'}}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="to_address"
              :label="$t('transactionList.to2')"
              align="left"
              width="160">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.to_address"
                  @click="handleClickAddress(scope.row.to_address)"
                  type="text"
                  :disabled="scope.row.to_address == accountDetail.address || scope.row.to_address == null"
                  class="btn-common"
                  :class="[scope.row.to_address != accountDetail.address ? 'btn-hash' : 'plain-btn', {cur: scope.row.to_address == null}]">
                  {{scope.row.to_address}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('transactionList.value2')" align="left">
              <template slot-scope="scope">
                <span v-if="scope.row.method === 'transferTokenTo'">{{scope.row.amount}}</span>
                <span v-else>{{scope.row.value}}</span>
              </template>
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
            :current-page.sync="currentPage"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="totalTrans">
          </el-pagination>
        </div>

        <!--token交易-->
        <div v-if="curTab === 1" key="btable">
          <div class="delare">
            <span>{{$t('transactionList.latest')}}&nbsp;{{totalToken > 50 ? 50 : totalToken}}&nbsp;{{$t('transactionList.txns')}}</span>
            <router-link :to="{path: '/blockchain/tx/tokenlist/byAddress/1', query: { address: address}}" v-if="totalToken >= 50">{{$t('blocksList.viewMore')}}</router-link>
          </div>
          <el-table
            :data="tokenTranslist"
            v-loading="isloading"
            style="width: 100%; border-bottom-right-radius: 4px !important; border-bottom-left-radius: 4px !important;">
            <el-table-column
              prop="hash"
              :label="$t('transactionList.txhash2')"
              width="160"
              align="left">
              <template slot-scope="scope">
                <span class="btn-common">
                  <i class="txfail" v-if="scope.row.returnCode !== 0 && scope.row.returnCode !== -1"></i>
                  <span @click="handleClickHash(scope.row.hash)" type="text" class="btn-hash">{{scope.row.hash}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="height"
              :label="$t('transactionList.height')"
              width="75"
              align="left">
              <template slot-scope="scope">
                <span @click="handleClickHeight(scope.row.height)" type="text" class="btn-height" v-if="scope.row.returnCode !== -1">{{scope.row.height}}</span>
                <span v-else>pending</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="timestamp"
              :label="$t('transactionList.timestamp')"
              width="100"
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
              width="160">
              <template slot-scope="scope">
                <span
                  @click="handleClickAddress(scope.row.from_address)"
                  type="text"
                  class="btn-common"
                  :disabled="scope.row.from_address == accountDetail.address"
                  :class="[scope.row.from_address != accountDetail.address ? 'btn-hash' : 'plain-btn']">{{scope.row.from_address}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label=""
              align="left">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.to_address"
                  :class="[scope.row.from_address != accountDetail.address ? 'success': 'fail']"
                  class="btn-status">{{scope.row.from_address != accountDetail.address ? 'IN' : 'OUT'}}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="to_address"
              :label="$t('transactionList.to2')"
              align="left"
              width="160">
              <template slot-scope="scope">
                <span
                  @click="handleClickAddress(scope.row.to_address)"
                  type="text"
                  class="btn-common"
                  :disabled="scope.row.to_address == accountDetail.address || scope.row.to_address == null"
                  :class="[scope.row.to_address != accountDetail.address ? 'btn-hash' : 'plain-btn', {cur: scope.row.to_address == null}]"
                  >{{scope.row.to_address}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="amount" :label="$t('transactionList.value2')" align="left"></el-table-column>
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
            :current-page.sync="currentPage"
            @current-change="handleTokenChange"
            layout="prev, pager, next"
            :total="totalToken">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { BigNumber } from 'bignumber.js';
  import axios from 'axios'
  import QRCode from 'qrcode'
  import { formatPassTime, dataFilter } from '../../../utils/common.js'
  import {changeTime} from "../../../utils/common";
  export default {
    data () {
      return {
        accountDetail: {},
        transactionlist: [],
        tokenTranslist: [],
        address: '',
        currentPage: 1,
        pageSize: 10,
        totalTrans: 0,
        totalToken: 0,
        curTab: 0,
        tabs: [this.$t('transactionList.transactionListTitle'), this.$t('account.token')],
        isloading: false,
        now: ''
      }
    },
    watch: {
      curTab (val) {
        if (val === 1) {
          this.getTokenRecord(this.$route.query.address)
        } else {
          this.getAccountRecord(this.$route.query.address)
        }
      },
      $route (to) {
        this.getAccountDetail(to.query.address)
        this.getAccountRecord(to.query.address)
        this.address = to.query.address
      }
    },
    mounted () {
      this.address = this.$route.query.address
      this.getAccountDetail(this.address)
      this.getAccountRecord(this.address)
    },
    methods: {
      getAccountDetail (address) {
        let that = this
        axios.get('/api/wallet/walletDtail', {
          params: {
            address: address
          }
        })
          .then(function(res) {
            let result = res.data
            if (result.status === 'success') {
              that.accountDetail = result.data
              if (result.data.address) {
                that.accountDetail.address = that.accountDetail.address
                that.accountDetail.balance = dataFilter(+that.accountDetail.balance, 5) + ' ' + 'INT'
                QRCode.toCanvas(document.getElementById('canvas'), result.data.address, function() {
                })
              } else {
                that.accountDetail.address = that.address
                that.accountDetail.balance = '0' + ' ' + 'INT'
                QRCode.toCanvas(document.getElementById('canvas'), that.address, function() {
                })
              }
              that.accountDetail.createTime = that.accountDetail.createTime? changeTime (that.accountDetail.createTime) + ' (+08:00)' : '/';
            }
          })
          .catch(function(err) {
            alert(err)
          })
      },
      getTokenRecord (address) {
        let that = this
        that.isloading = true
        axios.get('/api/trans/transferTokenList', {
          params: {
            address: address,
            pageNum: that.currentPage,
            pageSize: that.pageSize
          }
        })
          .then(function(res) {
            let result = res.data
            if (result.status === 'success') {
              that.isloading = false
              if (result.total > 50) {
                that.totalToken = 50
              } else {
                that.totalToken = result.total
              }
              // that.currentPage = +that.$route.params.p
              that.tokenTranslist = result.data
              // 这个地方的处理有问题，页面渲染2遍，先是按直接拿过来的数据渲染一遍，然后再按处理过的数据渲染一遍
              that.tokenTranslist.forEach(item => {
                let input = JSON.parse(item.input);
                item.amount = new BigNumber(input.amount).dividedBy(Math.pow(10, 18)).toString();
                item.amount = dataFilter(+item.amount, 5) + ' ' + item.tokenSymbol;
                item.timestamp = formatPassTime(Date.parse(item.timestamp), result.time);
                // item.value = dataFilter(+item.value, 5) + ' ' + 'token'
                item.cost = dataFilter(+item.cost, 5) + ' ' + 'INT'
              })
            }
          })
          .catch(function(err) {
            alert(err)
          })
      },
      getAccountRecord (address) {
        let that = this
        that.isloading = true
        axios.get('/api/trans/searchByAddress', {
          params: {
            address: address,
            pageNum: that.$route.params.p,
            pageSize: that.pageSize
          }
        })
          .then(function(res) {
            let result = res.data
            if (result.status === 'success') {
              that.isloading = false
              if (result.total > 50) {
                that.totalTrans = 50
              } else {
                that.totalTrans = result.total
              }
              that.currentPage = +that.$route.params.p
              that.transactionlist = result.data
              // 这个地方的处理有问题，页面渲染2遍，先是按直接拿过来的数据渲染一遍，然后再按处理过的数据渲染一遍
              that.transactionlist.forEach(item => {
                if (item.method === 'transferTokenTo') {
                  let input = JSON.parse(item.input);
                  item.amount = new BigNumber(input.amount).dividedBy(Math.pow(10, 18)).toString();
                  item.amount = dataFilter(+item.amount, 5) + ' ' + item.tokenSymbol;
                }
                item.timestamp = formatPassTime(Date.parse(item.timestamp), result.time)
                item.value = dataFilter(+item.value, 5) + ' ' + 'INT'
                item.cost = dataFilter(+item.cost, 5) + ' ' + 'INT'
              })
            }
          })
          .catch(function(err) {
            alert(err)
          })
      },
      handleCurrentChange (index) {
        this.currentPage = index
        this.$router.push({path: `/blockchain/accountdetail/${index}`, query: {address: this.address}})
        this.getAccountRecord(this.address)
      },
      handleTokenChange (index) {
        this.currentPage = index
        // this.$router.push({path: `/blockchain/accountdetail/${index}`, query: {address: this.address}})
        this.getTokenRecord(this.address)
      },
      handleClickHeight (val) {
        this.$router.push({path: '/blockchain/blockdetail', query: {height: val}})
      },
      handleClickHash (val) {
        this.$router.push({path: '/blockchain/txdetail', query: {hash: val}})
      },
      handleClickAddress (val) {
        this.$router.push({path: '/blockchain/accountdetail/1', query: {address: val}})
      }
  }
}
</script>

<style lang="scss">
  .account-detail {
    width: 1200px;
    box-shadow: 0px 6px 10px 0px #ccc;
    background-color: #fff;
    .el-breadcrumb {
      padding: 21px 33px;
      border-bottom: 1px solid #ccc;
    }
    .detail-content {
      padding: 40px 44px;
      text-align: left;
      .overview {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 35px 56px;
        margin-bottom: 56px;
        .inquire {
          color: #3C31D7;
          text-decoration: none;
          margin-left: 30px;
          font-weight: 500;
        }
        .inquire:hover {
          text-decoration: underline;
        }
        & > div:not(:first-child) {
          margin-top: 22px;
        }
        & > div {
          .detail-span {
            display: inline-block;
            width: 150px;
            font-size: 15px;
          }
          .detail-span:last-of-type {
            vertical-align: top;
          }
          #canvas {
            margin-left: -13px;
            margin-top: -13px;
          }
        }
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
          border-radius: 0 !important;
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
          .plain-btn {
            color: #606266;
            cursor: default;
          }
          .btn-hash {
            color: #3C31D7;
            font-weight: 500;
            cursor: pointer;
          }
          .btn-hash:hover {
            text-decoration: underline;
          }
          .btn-common {
            padding: 6px 8px 6px 0;
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            width: 152px;
            text-overflow: ellipsis;
          }
          .btn-status {
            padding: 6px 6px;
            cursor: default;
            span {
              color: #fff;
              display: inline-block;
              width: 31px;
              font-size: 12px;
            }
          }
          .cell {
            padding-right: 0 !important;
          }
          .success {
            background: #31D7A8;
          }
          .fail {
            background: #D7316F;
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
