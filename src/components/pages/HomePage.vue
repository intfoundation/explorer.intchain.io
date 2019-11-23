<template>
  <div>
    <DataSheet ref="DataSheet"/>
    <div class="home-page">
    <p id="time"></p>
      <!--区块列表-->
      <div class="blocks-list common-list">
        <div class="st common-left-right">
          <span>{{$t('blocksList.blocksListTitle')}}</span>
          <router-link to="/blockchain/blocklist/1">{{$t('blocksList.viewMore')}}</router-link>
        </div>
        <div class="common-list-item block-item" v-for="item in blockList">
          <div class="common-height common-title">
            <span style="color: #3C31D7;font-size: 18px;">{{$t('blocksList.height')}}</span>
            <router-link :to="{ path: '/blockchain/blockdetail', query: { height: item.height }}">{{item.height}}</router-link>
          </div>
          <div class="im">
            <div class="left blocks-left">
              <div>
                <span>{{$t('blocksList.miner')}}</span>
                <router-link :to="{ path: '/blockchain/accountdetail/1', query: {address: item.creator}}" class="format">{{item.creator}}</router-link>
              </div>
              <div class="in">
                <span>{{$t('blocksList.txns')}}</span>
                <router-link :to="{ path: '/blockchain/txlist/byBlock/1', query: {height: item.height}}" class="format">{{item.transfer_num}}</router-link>
              </div>
            </div>
            <div style="display: inline-block;margin-left: 15px;">
              <div>
                <span>{{$t('blocksList.reward')}}</span>
                <span>{{item.reward}}</span>
              </div>
              <div class="in">
                <span>{{$t('blocksList.avgGasPrice')}}</span>
                <span>{{item.avg_fee}}</span>
              </div>
              <div class="is">{{item.timestamp}}</div>
            </div>
          </div>
        </div>
      </div>

      <!--交易列表-->
      <div class="transaction-list common-list">
        <div class="common-left-right">
          <span>{{$t('transactionList.transactionListTitle')}}</span>
          <router-link to="/blockchain/txlist/1">{{$t('blocksList.viewMore')}}</router-link>
        </div>
        <div class="common-list-item" v-for="item in transactionList" style="box-sizing: border-box;height: 160px;">
          <div class="iu">

            <!--交易左侧部分-->
            <div class="left ia">
              <div class="common-title" style="color: #3C31D7">
                <span style="font-size: 18px;vertical-align: middle">{{$t('transactionList.txHash')}}</span>
                <router-link
                  class="txtitle"
                  :to="{ path: '/blockchain/txdetail', query: { hash: item.hash }}">
                  {{item.hash}}</router-link>
              </div>
              <div class="il">
                <span>{{$t('transactionList.from')}}</span>
                <router-link :to="{ path: '/blockchain/accountdetail/1', query: { address: item.from_address }}" class="txtitle format">{{item.from_address}}</router-link>
              </div>
              <div class="in">
                <span>{{$t('transactionList.to')}}</span>
                <router-link :to="{ path: '/blockchain/accountdetail/1', query: { address: item.to_address }}" class="txtitle format">{{item.to_address}}</router-link>
              </div>
            </div>

            <!--交易右侧部分-->
            <div class="it" style="display: inline-block">
              <div class="tx-right-text">
                <span style="font-size: 18px;">{{$t('blocksList.height')}}</span>
                <span style="font-size: 18px;">{{item.height}}</span>
              </div>
              <div class="il">
                <span>{{$t('transactionList.value')}}</span>
                <span v-if="item.amount">{{item.amount}}</span>
                <span v-if="!item.amount">{{item.value}}</span>
              </div>
              <div class="in transactionIn">
                <span>{{$t('transactionList.txtype')}}</span>
                <span>{{item.method}}</span>
              </div>
              <div style="margin-top: 10px">{{item.timestamp}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { BigNumber } from 'bignumber.js';
  import axios from 'axios'
  import DataSheet from './DataSheet'
  import io from 'socket.io-client'
  import { formatPassTime, dataFilter } from '../../utils/common.js'
  export default {
    name: 'HomePage',
    components: {
      DataSheet
    },
    data () {
      return {
        blockList: [],
        refresh: '',
        transactionList: [],
        socket: null,
        formatPassTime
      }
    },
    mounted () {
      // setTimeout(async () => {
        // await this.getServerTime()
      this.getBlockData()
      this.getTransactionList()
      this.getSocket()
      // }, 0)
      // this.refresh = setInterval(()=>{
      //   this.getBlockData();
      //   this.getTransactionList()
      // },10000)
    },
    methods: {
      getSocket () {
        let that = this
         that.socket = io();
         that.socket.on('transList',function(res){
          if (res.status === 'success') {
            let result = res.data
            that.transactionList = result
            that.transactionList.forEach(item => {
              item.timestamp = formatPassTime(Date.parse(item.timestamp), res.time)
              item.value = dataFilter(+item.value, 5) + ' ' + 'INT'
            })
          }
        });
        that.socket.on('blockList',function(res){
          if (res.status === 'success') {
            let result = res.data
            that.blockList = result
            that.blockList.forEach(item => {
              item.timestamp = formatPassTime(Date.parse(item.timestamp), res.time)
              item.reward = dataFilter(Number(item.reward), 5) + ' ' + 'INT'
              item.avg_fee = dataFilter(Number(item.avg_fee), 5) + ' ' + 'INT'
            })
          }
        });
      },
      getBlockData () {
        let that = this
        axios.get('/api/block/blockList').then(res => {
          let result = res.data
          if (result.status === 'success') {
            that.blockList = result.data
            that.blockList.forEach(item => {
              item.timestamp = formatPassTime(Date.parse(item.timestamp), result.time)
              item.reward = dataFilter(Number(item.reward), 5) + ' ' + 'INT'
              item.avg_fee = dataFilter(Number(item.avg_fee), 5) + ' ' + 'INT'
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
      },
      getTransactionList () {
        let that = this
        axios.get('/api/trans/transList').then(res => {
          let result = res.data
          if (result.status === 'success') {
            that.transactionList = result.data
            that.transactionList.forEach(item => {
              if (item.method === 'transferTokenTo') {
                let input = JSON.parse(item.input);
                item.amount = new BigNumber(input.amount).dividedBy(Math.pow(10, 18)).toString();
                item.amount = dataFilter(+item.amount, 5) + ' ' + item.tokenSymbol;
              }
              item.timestamp = formatPassTime(Date.parse(item.timestamp), result.time)
              item.value = dataFilter(+item.value, 5) + ' ' + 'INT'
            })
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    destroyed () {
      // clearTimeout(this.refresh)
      this.socket.close('transList', function() {})
      this.socket.close('blockList', function() {})
    }
  }
</script>

<style lang="scss" scoped>
  .home-page {
    width: 1200px;
    margin: 50px auto;
    .blocks-list{
      vertical-align: top;
      margin-right: 42px;
      .block-item {
        padding: 28px 0px;
        margin: 0 24px;
        text-align: left;
        border-bottom: 1px solid #e5e5e5;
        box-sizing: border-box;
        height: 160px;
        .im {
          margin-top: 10px;
          color: #666;
          .blocks-left {
            vertical-align: top;
            & div:first-child {
              width: 320px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          & div span:nth-child(odd) {
            font-weight: 500;
            font-size: 15px;
          }
          & div span:nth-child(even) {
            font-size: 15px;
          }
        }
      }
    }
    .transaction-list {
      .txtitle {
        width: 220px;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: text-top;
      }
      .iu {
        color: #666;
        overflow: hidden;
        & div span:nth-of-type(odd) {
          font-weight: 500;
          font-size: 15px;
        }
        & div span:nth-of-type(even) {
          font-size: 15px;
        }
        .ia {
          vertical-align: top;
        }
        .tx-right-text {
          font-size: 18px;
        }
        .il {
          margin-top: 10px;
        }
        .it {
          margin-left: 15px;
        }
      }
    }
    .in {
      margin-top: 4px;
    }
    .transactionIn {
      & > span:nth-of-type(1) {
        vertical-align: middle;
      }
      & > span:nth-of-type(2) {
        display: inline-block;
        width: 137px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: middle;
      }
    }
    .is {
      margin-top: 12px;
      color: #999;
    }
    .common-list {
      width: 574px;
      display: inline-block;
      box-shadow: 0px 6px 10px 0px #ccc;
      border-radius: 4px;
      background-color: #fff;
      .common-left-right {
        border-bottom: 1px solid #ccc;
        padding: 22px 18px;
        box-sizing: border-box;
        text-align: left;
        & > span {
          font-size: 22px;
          font-weight: 500;
        }
        & > a {
          float: right;
          text-decoration: none;
          height: 30px;
          line-height: 30px;
          color: #666;
        }
      }
      .common-list-item {
        padding: 22px 0px;
        margin: 0 18px;
        text-align: left;
        border-bottom: 1px solid #e5e5e5;
        .common-title {
          font-weight: 500;
          & > a {
            text-decoration: none;
            color: #3C31D7;
            font-size: 18px;
          }
          & > a:hover {
            text-decoration: underline;
          }
        }
        .left {
          display: inline-block;
          width: 324px;
        }
        .right {
          float: right;
        }
        .format {
          color: #3C31D7;
          font-weight: 500;
          font-size: 15px;
          text-decoration: none;
        }
        .format:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
