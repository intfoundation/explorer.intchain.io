<template>
  <div class="block-detail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$t('nav.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/blockchain/blocklist/1' }" style="cursor: pointer;">{{$t('blocksList.blocklist2')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('blocksList.blockdetail')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="detail-content">
      <div style="margin-bottom: 24px;">
        <div>
          <span class="detail-span">{{$t('blocksList.height')}}</span>
          <span>{{blockdetail.height}}</span>
        </div>
        <div>
          <span class="detail-span">{{$t('blocksList.hash')}}</span>
          <span>{{blockdetail.hash}}</span>
        </div>
        <div>
          <span class="detail-span">{{$t('blocksList.parent')}}</span>
          <span class="click-span" style="cursor: pointer;" @click="parentHash(blockdetail.preBlock)">{{blockdetail.preBlock}}</span>
        </div>
        <div>
          <span class="detail-span">{{$t('blocksList.timestamp')}}</span>
          <span>{{blockdetail.timestamp}}</span>
          <span style="margin-left: 10px;font-size: 15px;">({{timer}})</span>
        </div>
      </div>

      <div style="margin-bottom: 44px;">
        <div>
          <span class="detail-span">{{$t('blocksList.miner')}}</span>
          <router-link :to="{ path: '/blockchain/accountdetail/1', query: {address: blockdetail.creator} }" class="click-span">{{blockdetail.creator}}</router-link>
        </div>
        <div>
          <span class="detail-span">{{$t('blocksList.reward')}}</span>
          <span>{{blockdetail.reward}}</span>
        </div>
        <div>
          <span class="detail-span">{{$t('blocksList.total')}}</span>
          <span>{{blockdetail.totalFee}}</span>
        </div>
        <div>
          <span class="detail-span">{{$t('blocksList.avgGasPrice')}}</span>
          <span>{{blockdetail.avg_fee}}</span>
        </div>
        <div>
          <span class="detail-span">{{$t('blocksList.txns')}}</span>
          <router-link :to="{ path: '/blockchain/txlist/byBlock/1', query: {height: height}}" class="click-span">{{blockdetail.transfer_num}}</router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { formatPassTime, dataFilter } from '../../../utils/common.js'
  export default {
    name: 'BlockDetail',
    data () {
      return {
        blockdetail: {},
        height: 0,
        now: '',
        timer: ''
      }
    },
    mounted () {
      setTimeout(async () => {
        await this.getServerTime()
        this.height = this.$route.query.height
        this.getBlockDetail(this.height)
      }, 0)
    },
    watch: {
      $route (to) {
        this.getBlockDetail(to.query.height)
      }
    },
    methods: {
      async getServerTime () {
        // let that = this
        await axios.get('/api/trans/getTimes')
          .then(res => {
            let result = res.data
            if (result.status === 'success') {
               this.now = result.data
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      back () {
        this.$router.go(-1)
      },
      getBlockDetail (h) {
        let that = this
        axios.get('/api/block/blockDetail', {
          params: {
            height: h
          }
        })
          .then(function (res) {
            let result = res.data
            if (result.status === 'success') {
              that.blockdetail = result.data[0]
              that.timer = that.blockdetail.timestamp
              that.blockdetail.timestamp = formatPassTime(Date.parse(that.blockdetail.timestamp), that.now)
              that.blockdetail.avg_fee = dataFilter(+that.blockdetail.avg_fee, 5) + ' ' + 'INT'
              that.blockdetail.totalFee = dataFilter(+that.blockdetail.totalFee, 5) + ' ' + 'INT'
              that.blockdetail.reward = dataFilter(+that.blockdetail.reward, 5) + ' ' + 'INT'
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
     async parentHash (hash) {
        try {
          let that = this
          let result = await axios.get('/api/trans/search', {
            params: {
              param: hash
            }
          })
          let outcome = result.data
          if (outcome.status === 'success') {
            let h = outcome.data.data[0].height
            that.$router.push({path: '/blockchain/blockdetail', query: {height: h}})
            that.getBlockDetail(h)
          }
        } catch(error) {
          alert(error)
        }
      }
    }
  }
</script>

<style lang="scss">
  .block-detail {
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
    .ig {
      height: 64px;
      line-height: 64px;
      border-bottom: 1px solid #ccc;
      padding: 0 33px;
    }
    .detail-content {
      margin: 40px 44px;
      text-align: left;
      font-weight: 500;
      & > div {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 35px 56px;
        & > div:not(:first-child) {
          margin-top: 22px;
        }
        & > div {
          .detail-span {
            display: inline-block;
            width: 110px;
            font-size: 15px;
          }
          .detail-span + span {
            font-size: 15px;
          }
          .detail-span + a {
            font-size: 15px;
          }
          .click-span {
            color: #3C31D7;
            text-decoration: none;
          }
          .click-span:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>

