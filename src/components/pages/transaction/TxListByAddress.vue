<template>
  <div class="txlistByAddress">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$t('nav.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/blockchain/txlist/1'}">{{$t('transactionList.transactions')}}</el-breadcrumb-item>
      <el-breadcrumb-item class="crumb-spe">
        <span>{{$t('account.address')}}: {{address}}</span>
        <i class="cross" @click="cross"></i>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div style="padding: 40px 44px;">
      <el-table
        :data="transactionlist"
        v-loading="isloading"
        style="width: 100%">
        <el-table-column
          prop="hash"
          :label="$t('transactionList.txhash2')"
          width="180"
          align="left">
          <template slot-scope="scope">
            <span class="btn-common">
              <i class="txfail" v-if="scope.row.returnCode !== 0 && scope.row.returnCode !== -1"></i>
              <span @click="handleClicktxHash(scope.row.hash)" type="text" class="btn-hash">{{scope.row.hash}}</span>
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
          width="120"
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
            <span
              @click="handleClickAddress(scope.row.from_address)"
              type="text"
              :disabled="scope.row.from_address == address"
              class="btn-common" :class="[scope.row.from_address != address ? 'btn-hash' : 'plain-btn']">{{scope.row.from_address}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.to_address"
              :class="[scope.row.from_address != address ? 'success': 'fail']"
              class="btn-status">{{scope.row.from_address != address ? 'IN' : 'OUT'}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="to_address"
          :label="$t('transactionList.to2')"
          align="left"
          width="170">
          <template slot-scope="scope">
            <span
              v-if="scope.row.to_address"
              @click="handleClickAddress(scope.row.to_address)"
              type="text"
              :disabled="scope.row.to_address == address"
              class="btn-common"
              :class="[scope.row.to_address != address ? 'btn-hash' : 'plain-btn']">{{scope.row.to_address}}</span>
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
  import { formatPassTime, dataFilter } from '../../../utils/common.js'
  export default {
    name: 'TotalTransList',
    data () {
      return {
        transactionlist: [],
        currentPage: 1,
        pageSize: 20,
        total: 0,
        address: '',
        isloading: false,
        now: ''
      }
    },
    created () {
      this.address = this.$route.query.address
    },
    mounted () {
      this.getAccountRecord()
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
      getAccountRecord () {
        let that = this
        that.isloading = true
        axios.get('/api/trans/searchByAddress', {
          params: {
            address: that.address,
            pageNum: that.$route.params.p,
            pageSize: that.pageSize
          }
        })
          .then(function(res) {
            let result = res.data
            if (result.status === 'success') {
              that.isloading = false
              that.total = result.total
              that.currentPage = +that.$route.params.p
              that.transactionlist = result.data
              // 这个地方的处理有问题，页面渲染2遍，先是按直接拿过来的数据渲染一遍，然后再按处理过的数据渲染一遍
              that.transactionlist.forEach(item => {
                item.timestamp = formatPassTime(Date.parse(item.timestamp), result.time)
                item.value = dataFilter(+item.value, 5) + ' ' + 'INT'
                item.fee = dataFilter(+item.fee, 5) + ' ' + 'INT'
              })
            }
          })
          .catch(function(err) {
            alert(err)
          })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.$router.push( {path: `/blockchain/txlist/byAddress/${val}`, query: {address: this.address}} )
        this.getAccountRecord()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getAccountRecord()
      },
      handleClickHeight (val) {
        this.$router.push({path: '/blockchain/blockdetail', query: {height: val}})
      },
      handleClicktxHash (val) {
        this.$router.push({path: '/blockchain/txdetail', query: {hash: val}})
      },
      handleClickAddress (val) {
        this.$router.push({path: '/blockchain/accountdetail/1', query: {address: val}})
      },
      cross () {
        this.$router.push({path: '/blockchain/txlist/1'})
      }
    }
  }
</script>

<style lang="scss">
  .txlistByAddress {
    width: 1200px;
    margin: 90px auto;
    border: 1px solid #ddd;
    background-color: #fff;
    .el-breadcrumb {
      padding: 21px 33px;
      border-bottom: 1px solid #ddd;
       

      .el-breadcrumb__item:first-of-type {
        position: relative;
      }

      .crumb-spe {
        background-color: #f1f1f1;
        height: 26px;
        line-height: 26px;
        margin-top: -4px;
        text-align: left;
        padding: 0 10px;
        border-radius: 3px;
        & > span {
          font-size: 12px;
        }
        .cross {
          background-image: url("../../../assets/cross.png");
          background-size: cover;
          width: 16px;
          height: 16px;
          display: inline-block;
          margin: 5px 0;
          float: right;
          cursor: pointer;
          margin-left: 30px;
        }
      }
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
      .el-table__row {
        & > td:nth-of-type(1) div{
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        & > td:nth-of-type(5) div{
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        & > td:nth-of-type(6) div{
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .el-button {
        padding: 6px 18px 7px;
        outline: none;
        cursor: default;
      }
      .btn-status {
        padding: 6px 12px !important;
        span {
          display: inline-block;
          color: #fff;
          width: 31px;
        }
      }
      .btn-height {
        color: #1f80c1;
        font-weight: 500;
        padding: 6px 18px 7px 0;
        cursor: pointer;
      }
      .btn-height:hover {
        text-decoration: underline;
      }
      .plain-btn {
        color: #222222;
        font-weight: 500;
      }
      .btn-hash {
        color: #1f80c1 !important;
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
      .success {
        background: #3fcf64;
      }
      .fail {
        background: #dc4056;
      }
      .el-table__row:nth-of-type(even) {
        background-color: #f8f8f8;
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
        border-radius: 0px;
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

</style>

