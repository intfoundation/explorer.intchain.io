<template>
  <div class="trans-details" v-if="isvalidHash">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$t('nav.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/blockchain/txlist/1'}">{{$t('detail.Trade_list')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('detail.Activity_list')}}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="details-list">
      <div class="trade-content one">
        <div class="trad-list">
          <span class="span-width">{{$t('transactionList.txhash2')}}：</span>
          <span>{{transObj.hash}}</span>
        </div>

        <div class="trad-list">
          <span class="span-width">{{$t('detail.block_height')}}：</span>
          <router-link
            class="format"
            :to="{ path: '/blockchain/blockdetail',
            query: {height: transObj.height}}"
            v-if="transObj.returnCode !== -1">{{transObj.height}}</router-link>
          <span v-else>(Pending)</span>
        </div>

        <div class="trad-list">
          <span class="span-width">{{$t('detail.Transaction_type')}}：</span>
          <span v-if="transObj.method === 'transferTokenTo' || transObj.method === 'createToken'">{{$t('contract.contract')}} ({{transObj.method}})</span>
          <span v-else>{{transObj.method}}</span>
        </div>

        <div class="trad-list">
          <span class="span-width">{{$t('detail.returnCode')}}：</span>
          <span>{{transObj.returnCode}}</span>
        </div>

        <div class="trad-list">
          <span class="span-width">{{$t('detail.Trading_state')}}：</span>
          <span
            v-if="transObj.returnCode !== undefined"
            class="trade-state"
            v-bind:class="{'sus': transObj.returnCode === 0, 'pending': transObj.returnCode === -1, 'fal': transObj.returnCode !== 0 && transObj.returnCode !== -1}"
            >{{ transObj.returnCode === 0 ? $t('detail.success') : transObj.returnCode === -1 ? $t('detail.pending') : $t('detail.fail')}}
          </span>
        </div>

        <div class="trad-list">
          <span class="span-width">{{$t('detail.time_stamp')}}：</span>
          <span v-if="transObj.returnCode !== -1">
            <span>{{transObj.timestamp}}</span>
            <span v-if="transObj.timestamp" style="margin-left: 10px;font-size: 15px;vertical-align: -1px;">({{timer}})</span>
          </span>
          <span v-else>Pending</span>
        </div>
        </div>

      <Txtype :transObj="transObj"/>
      <div class="">
        <span
          :class="['tabs', {'active-tab': curTab === item}]"
          v-for="(item) in tabs" :key="item"
          @click="curTab = item">{{item}}</span>
      </div>
      <div class="tab-content">
        <component
          v-bind:is="currentTabComponent"
          v-bind:input="input"
          v-bind:logs="transObj.logs">
        </component>
      </div>
    </div>
  </div>
  <div class="invalidHash" v-else>
    <div class="middle-p">
      <i class="err-img"></i>
      <div>{{$t('err.invalidHash')}}</div>
    </div>
  </div>
</template>

<script>
  import { BigNumber } from 'bignumber.js';
  import Vue from 'vue'
  import moment from 'moment'
  import Txtype from './TxType'
  import Request from '../api.js'
  import { formatPassTime } from '../../../utils/common.js'
  Vue.component('tab-input', {
    props: ['input'],
    template: '<div style="word-break: break-all;">{{input}}</div>'
  })
  Vue.component('tab-log', {
    props: ['logs'],
    template: '<div style="word-break: break-all;">{{logs}}</div>'
  })
  export default {
    name: 'TxDetail',
    components: {
      Txtype
    },
    data() {
      return {
        transObj: {},
        tabs: [this.$t('detail.input'), this.$t('detail.log2')],
        curTab: this.$t('detail.input'),
        hash: '',
        now: '',
        timer: '',
        input: null,
        isvalidHash: true
      }
    },
    created () {
      this.hash = this.$route.query.hash
      this.transDetail(this.hash)
    },
    watch: {
      $route (to) {
        this.transDetail(to.query.hash)
      }
    },
    computed: {
      currentTabComponent: function () {
        return 'tab-' + this.curTab.toLowerCase()
      }
    },
    methods: {
       transDetail(hash) {
        try {
          let url = '/api/trans/transDetail'
          Request(url, {hash: hash}).then(res => {
            let arr = res.data
            if (arr.length === 0) {
              this.isvalidHash = false
              return
            }
            this.transObj = res.data[0]
            this.timer = moment(new Date(this.transObj.timestamp)).format("YYYY-MM-DD HH:mm Z")
            this.transObj.timestamp=formatPassTime(Date.parse(this.transObj.timestamp), res.time)
            this.input = JSON.parse(this.transObj.input)
            if (this.input.amount) {
              this.input.amount = new BigNumber(this.input.amount).dividedBy(Math.pow(10, 18)).toString()
            }
          }, err => {

          })
        } catch (err) {
          Promise.resolve(err)
        }
      }
    }
  }

</script>

<style lang="scss">
  .trans-details {
    width: 1200px;
    padding-bottom: 80px;
    box-shadow: 0px 6px 10px 0px #ccc;
    background-color: #fff;
    text-align: left;
    .el-breadcrumb {
      padding: 21px 33px;
      border-bottom: 1px solid #ccc;

      & .el-breadcrumb__item:first-of-type {
        position: relative;
        & span {
          margin-left: 30px;
        }
      }
      .el-breadcrumb__item:first-of-type:before {
        display: inline-block;
        content: url('../../../assets/home.png');
        position: absolute;
        top: -3px
      }
    }
    .details-list {
      margin: 40px 44px;
    }
  }

  .trade-content {
    border: 1px solid #CCCCCC;
    border-radius: 4px;
    font-size: 15px;
    padding-bottom: 16px;
  }

  .one {
    margin-bottom: 30px;
    padding: 35px 56px;
  }

  .two {
    padding-top: 40px;
    padding-left: 70px;
    padding-bottom: 16px !important;
  }

  .sus {
    background: #31D7A8;
  }

  .fal {
    background: #D7316F;
  }

  .pending {
    background: #E4BE33;
  }

  .trade-state {
    display: inline-block;
    width: 62px;
    height: 24px;
    border-radius: 4px;
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
    line-height: 24px;
  }

  .trad-list:not(:first-of-type) {
    margin-top: 22px;
  }


  .format{
    color:#372fd2;
    text-decoration: none;
  }

  .format:hover{
    text-decoration: underline;
  }

  .tablist {
    width: 200px;
    height: 62px;
    text-align: center;
    border: 1px solid #CCCCCC;
    display: inline-block;
    font-size:20px;
    line-height: 63px;

  }

  .input {
    border-top-left-radius: 4px;
    border-right-style: none;
    border-bottom-style: none;

  }

  .log {
    border-top-right-radius: 4px;
    border-bottom-style: none;
  }

  .tab_msg {
    background-color: #F9F9FF;
    border-radius: 0px 4px 4px 4px;
    width: 1100px;
    height: 260px;
    border: 1px solid #CCCCCC;
  }

  .tabs {
    display: inline-block;
    padding: 14px 48px;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    cursor: pointer;
    font-weight: 500;
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
  .active-tab {
    background-color: #F9F9FF;

  }
  .tab-content {
    border: 1px solid #ccc;
    background-color: #f9f9ff;
    color: #666;
    height: 208px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding-top: 25px;
    padding-left: 42px;
    padding-right: 42px;
    overflow: auto;
  }

  .span-width {
    display: inline-block;
    width: 220px;
  }
  .invalidHash {
    width: 1200px;
    margin: 90px auto;
    box-shadow: 0px 6px 10px 0px #ccc;
    background-color: #fff;
    position: relative;
    .middle-p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .err-img {
        width: 186px;
        height: 162px;
        display: inline-block;
        background-image: url("../../../assets/no-search-outcome.png");
        background-size: cover;
      }
      div {
        margin-top: 36px;
        font-size: 18px;
      }
    }

  }

</style>


