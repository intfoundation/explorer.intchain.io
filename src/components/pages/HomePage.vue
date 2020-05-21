<template>
  <div>
    <div class="explorer-title">INT Explorer</div>
    <DataSheet ref="DataSheet"/>
    <div class="home-page">
    <p id="time"></p>
      <!--区块列表-->
      <div class="blocks-list common-list">
        <div class="st common-left-right">
          <span>{{$t('blocksList.blocksListTitle')}}</span>
          <router-link to="/blockchain/blocklist/1">{{$t('blocksList.viewMore')}}</router-link>
        </div>
        <div class="common-list-item block-item" v-for="item in blockList" :key="item.height">
          <div class="im">
            <div class="left blocks-left" style="width: 360px;">
              <div class="common-height common-title">
                <span style="font-size: 14px;">{{$t('blocksList.height')}}&nbsp;</span>
                <router-link :to="{ path: '/blockchain/blockdetail', query: { height: item.height }}">{{item.height}}</router-link>
              </div>
              <div class="miner">
                <span>{{$t('blocksList.miner')}}</span>
                <router-link :to="{ path: '/blockchain/accountdetail/1', query: {address: item.creator}}" class="format miner-address">{{item.creator}}</router-link>
              </div>
              <div class="in" style="display: inline-flex; align-items: center;">
                <span>{{$t('blocksList.txns')}}&nbsp;</span>
                <router-link :to="{ path: '/blockchain/txlist/byBlock/1', query: {height: item.height}}" class="format">{{item.transfer_num}}</router-link>
              </div>
            </div>
            <div class="block-rewards">
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
        <div class="common-list-item" v-for="item in transactionList" :key="item.hash" style="box-sizing: border-box;height: 140px;">
          <div class="iu">

            <!--交易左侧部分-->
            <div class="left ia">
              <div class="common-title">
                <span style="font-size: 14px;vertical-align: middle">{{$t('transactionList.txHash')}}&nbsp;</span> 
                <router-link
                  class="txtitle"
                  :to="{ path: '/blockchain/txdetail', query: { hash: item.hash }}">
                  {{item.hash}}</router-link>
              </div>
              <div class="il">
                <span v-if="item.method !== 'createToken' && item.method !== 'register' && item.method !== 'mortgage' && item.method !== 'vote' && item.method !== 'unmortgage'">{{$t('transactionList.from')}}&nbsp;</span>
                <span v-if="item.method == 'createToken' || item.method == 'register' || item.method == 'mortgage' || item.method == 'vote' || item.method == 'unmortgage'">{{$t('transactionList.by')}}&nbsp;</span>
                <router-link :to="{ path: '/blockchain/accountdetail/1', query: { address: item.from_address }}" class="txtitle format">{{item.from_address}}</router-link>
              </div>
              <div class="in" style="display: inline-flex; align-items: center;" v-if="item.method !== 'mortgage' && item.method !== 'vote' && item.method !== 'unmortgage'">
                <span>{{$t('transactionList.to')}}&nbsp;</span>
                <router-link :to="{ path: '/blockchain/accountdetail/1', query: { address: item.to_address }}" class="txtitle format">{{item.to_address}}</router-link>
              </div>
            </div>

            <!--交易右侧部分-->
            <div class="it" style="display: inline-block">
              <div class="tx-right-text">
                <span style="font-size: 14px;">{{$t('blocksList.height')}}</span>
                <span style="font-size: 14px;">{{item.height}}</span>
              </div>
              <div class="il">
                <span>{{$t('transactionList.value')}}&nbsp;</span>
                <span class="value">{{item.value}}</span>
              </div>
              <div class="in transactionIn">
                <span>{{$t('transactionList.txtype')}}</span>
                <span>{{item.method}}</span>
              </div>
              <div class="timestamp">{{item.timestamp}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
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
  .explorer-title {
    width: 1200px;
    margin: 0 auto 40px;
    text-align: left;
    font-size: 30px;
    font-weight: 700;
    position: relative;
    display: inline-block;
    padding-bottom: 10px;

    &::after {
      content: '';
      display: block;
      width: 120px;
      height: 2px;
      background: #d31515;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  .home-page {
    width: 1200px;
    margin: 50px auto;
    .blocks-list{
      vertical-align: top;
      margin-right: 42px;
      .miner {
        display: flex;
        align-items: center;
        &-address {
          width: 300px;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding-left: 8px;
        }
      }
      .block-rewards {
        display: inline-block;
        margin-left: 14px; 
        position: absolute;
        right: 20px;
        top: 20px;
      }
      .block-item {
        padding: 28px 0px;
        margin: 0 24px;
        text-align: left;
        border-bottom: 1px solid #e5e5e5;
        box-sizing: border-box;
        height: 140px;
        .im {
          
          color: #222222;
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
            font-size: 14px;
          }
          & div span:nth-child(even) {
            font-size: 14px;
          }
        }
      }
    }
    .transaction-list {
      .txtitle {
        width: 250px;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: text-top;
      }
      .iu {
        color: #222222;
        overflow: hidden;
        
        & div span:nth-of-type(odd) {
          font-weight: 500;
          font-size: 14px;
        }
        & div span:nth-of-type(even) {
          font-size: 14px;
        }
        .ia {
          vertical-align: top;
        }
        .tx-right-text {
          font-size: 16px;
        }
        .il {
          display: inline-flex;
          align-items: center;
        }
        .value {
          display: inline-block;
          width: 140px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          vertical-align: middle;
        }
        .it {
          margin-left: 14px;
          display: inline-flex;
          align-items: center;
          position: absolute;
          right: 0;
          top: 20px;
        }
      }
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
      margin-top: 6px;
      color: #777;
      font-size: 12px;
    }
    .timestamp {
      margin-top: 8px;
      font-size: 12px;
      color: #777;
    }
    .common-list {
      width: 574px;
      display: inline-block;
      border: 1px solid #ddd;
      background-color: #fff;
      .common-left-right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ddd;
        padding: 16px;
        box-sizing: border-box;
        text-align: left;
        font-size: 14px;
        & > span {
          font-size: 20px;
          font-weight: 700;
        }
        & > a {
          float: right;
          text-decoration: none;
          height: 30px;
          line-height: 30px;
          color: #1f80c1;
        }
      }
      .common-list-item {
        padding: 22px 0px;
        margin: 0 16px;
        text-align: left;
        border-bottom: 1px solid #e5e5e5;
        position: relative;
        &:last-child {
          border-bottom: 0;
        }
        .common-title {
          display: flex;
          align-items: center;
          font-weight: 500;
          & > a {
            text-decoration: none;
            color: #1f80c1;
            font-size: 14px;
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
          color: #1f80c1;
          font-weight: 500;
          font-size: 14px;
          text-decoration: none;
        }
        .format:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
