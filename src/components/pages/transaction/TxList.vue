<template>
  <div class="txlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$t('nav.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item to="">{{$t('transactionList.transactions')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="padding: 40px 44px;">
      <el-table :data="txlist" v-loading="isloading">

        <el-table-column :label="$t('transactionList.txhash2')" width="170" align="left">
          <template slot-scope="scope">
            <span type="text" @click="handleClicktxHash(scope.row.hash)" class="btn-hash" style="color: #3C31D7">{{scope.row.hash}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="height" :label="$t('transactionList.height')" align="left" width="85">
          <template slot-scope="scope">
            <span type="text" @click="handleClickHeight(scope.row.height)" class="btn-height" style="color: #3C31D7">{{scope.row.height}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="timestamp" :label="$t('transactionList.timestamp')" align="left" width="110">
        </el-table-column>

        <el-table-column prop="method" :label="$t('transactionList.txtype2')" align="left">
        </el-table-column>

        <el-table-column prop="from_address" :label="$t('transactionList.from2')" width="170" align="left">
          <template slot-scope="scope">
            <span type="text" @click="handleClickFrom(scope.row.from_address)" class="btn-hash" style="color: #3C31D7">{{scope.row.from_address}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="to_address" :label="$t('transactionList.to2')" width="170" align="left">
          <template slot-scope="scope">
            <span type="text" @click="handleClickTo(scope.row, scope.row.to_address)" class="btn-hash" style="color: #3C31D7" v-if="scope.row.to_address">{{scope.row.to_address}}</span>
          </template>
        </el-table-column>

<!--        <el-table-column prop="value" :label="$t('transactionList.value2')" align="left">-->
<!--        </el-table-column>-->
        <el-table-column :label="$t('transactionList.value2')" align="left">
          <template slot-scope="scope">
            <span v-if="scope.row.method === 'transferTokenTo'">{{scope.row.amount}}</span>
            <span v-else>{{scope.row.value}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="returnCode" :label="$t('transactionList.status')" align="left">
          <template slot-scope="scope">
            <el-button
              :class="[scope.row.returnCode === 0 ? 'success': scope.row.returnCode === -1 ? 'pending' : 'fail']"
              class="btn-status">
              {{scope.row.returnCode === 0 ? $t('detail.success') : scope.row.returnCode === -1 ? $t('detail.pending') : $t('detail.fail')}}
            </el-button>
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
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { BigNumber } from 'bignumber.js';
  import axios from 'axios'
  import { formatPassTime, dataFilter } from '../../../utils/common.js'
  export default {
    name: 'TxList',
    data () {
      return {
        txlist: [],
        currentPage: 1,
        pageSize: 20,
        total: 0,
        isloading: false,
        now: ''
      }
    },
    created () {
    },
    mounted () {
      this.getTxList()
    },
    methods: {
      getTxList () {
        let that = this
        that.isloading = true
        axios.get('/api/trans/transList', {
          params: {
            pageNum: that.$route.params.p,
            pageSize: that.pageSize
          }
        })
          .then(function(res) {
            let result = res.data
            if (result.status === 'success') {
              that.isloading = false
              that.txlist = result.data
              that.total = result.total
              that.currentPage = +that.$route.params.p
              that.txlist.forEach(item => {
                if (item.method === 'transferTokenTo') {
                  item.to_address = item.tokenid;
                  let input = JSON.parse(item.input);
                  item.amount = new BigNumber(input.amount).dividedBy(Math.pow(10, 18)).toString();
                  item.amount = dataFilter(+item.amount, 5) + ' ' + item.tokenSymbol;
                } else {
                  item.to_address = item.to_address;
                }
                item.timestamp = formatPassTime(Date.parse(item.timestamp), result.time);
                item.value = dataFilter(+item.value, 5);
                item.value = item.value + ' ' + 'INT'

              })
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.$router.push(`/blockchain/txlist/${val}`)
        this.getTxList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getTxList()
      },
      handleClickHeight (val) {
        this.$router.push({path: '/blockchain/blockdetail', query: {height: val}})
      },
      handleClicktxHash (val) {
        this.$router.push({path: '/blockchain/txdetail', query: {hash: val}})
      },
      handleClickTo (row, val) {
        if (row.method === 'transferTokenTo') {
          this.$router.push({path: '/blockchain/contract/1', query: {contract: val}})
        } else {
          this.$router.push({path: '/blockchain/accountdetail/1', query: {address: val}})
        }
      },
      handleClickFrom (val) {
        this.$router.push({path: '/blockchain/accountdetail/1', query: {address: val}})
      }
    }
  }
</script>

<style lang="scss">
  .txlist {
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
        display: inline-block;
        content: url('../../../assets/home.png');
        width: 19px;
        height: 19px;
        position: absolute;
        top: -3px;
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
      .el-button {
        padding: 6px 18px;
        outline: none;
        cursor: pointer;
      }
      .btn-status {
        cursor: default;
        padding: 6px 6px;
        width: 84px;
        span {
          color: #fff;
          font-size: 13px;
        }
      }
      .btn-height {
        padding: 6px 18px 6px 0;
        color: #3C31D7;
        font-weight: 500;
        cursor: pointer;
      }
      .btn-height:hover {
        text-decoration: underline;
      }
      .btn-hash {
        cursor: pointer;
        padding: 6px 18px 6px 0;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        width: 152px;
        text-overflow: ellipsis;
        color: #3C31D7;
        font-weight: 500;
      }
      .btn-hash:hover {
        text-decoration: underline;
      }
      .success {
        background: #31D7A8;
      }
      .fail {
        background: #D7316F;
      }
      .pending {
        background: #E4BE33;
      }
      .el-table__row:nth-of-type(even) {
        background-color: #f9f9ff;
      }
      .el-loading-spinner .path {
        stroke: #3C31D7;
      }
      .cell {
        padding-right: 0 !important;
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

