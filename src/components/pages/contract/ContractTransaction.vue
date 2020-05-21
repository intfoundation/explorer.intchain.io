<template>
  <div class="txlist-bytoken">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$t('nav.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/blockchain/txlist/1'}">{{$t('transactionList.transactions')}}</el-breadcrumb-item>
      <el-breadcrumb-item class="crumb-spe">
        <span>{{$t('token.contract')}}: {{contract}}</span>
        <i class="cross" @click="cross"></i>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div style="padding: 40px 44px;">
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
                <span @click="handleClickHash(scope.row.hash)" type="text" class="btn-height">{{scope.row.hash}}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="height"
          :label="$t('transactionList.height')"
          align="left">
          <template slot-scope="scope">
            <span @click="handleClickHeight(scope.row.height)" type="text" class="btn-height" v-if="scope.row.returnCode !== -1">{{scope.row.height}}</span>
            <span v-else></span>
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
            <span @click="handleClickAddress(scope.row.to_address)" type="text" class="btn-height btn-common">{{scope.row.to_address}}</span>
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
        :total="transTotal"></el-pagination>
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
        transactionsList: [],
        currentPage: 1,
        pageSize: 20,
        transTotal: 0,
        contract: '',
        isloading: false,
        now: ''
      }
    },
    created () {
      this.contract = this.$route.query.contract
    },
    mounted () {
      this.getTokenTransaction()
    },
    methods: {
      getTokenTransaction () {
        let that = this
        that.isloading = true
        axios.get('/api/trans/searchByTokenid', {
          params: {
            tokenid: that.contract,
            pageNum: that.$route.params.p,
            pageSize: that.pageSize
          }
        })
          .then(function (res) {
            let result = res.data
            if (result.status === 'success') {
              that.isloading = false
              that.transTotal = result.total
              that.transactionsList = result.data
              that.currentPage = +that.$route.params.p
              that.transactionsList.forEach(item => {
                item.timestamp = formatPassTime(Date.parse(item.timestamp), result.time)
                item.value = dataFilter(+item.value, 5) + ' ' + 'token'
                item.cost = dataFilter(+item.cost, 5) + ' ' + 'INT'
              })
            }
          })
          .catch(function (error) {
            alert(error)
          })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.$router.push( {path: `/blockchain/contract/transactions/${val}`, query: {contract: this.contract}} )
        this.getTokenTransaction()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getAccountRecord()
      },
      handleClickHeight (val) {
        this.$router.push({path: '/blockchain/blockdetail', query: {height: val}})
      },
      handleClickHash (val) {
        this.$router.push({path: '/blockchain/txdetail', query: {hash: val}})
      },
      handleClickAddress (val) {
        this.$router.push({path: '/blockchain/accountdetail', query: {address: val}})
      },
      cross () {
        this.$router.push({path: '/blockchain/txlist/1'})
      }
    }
  }
</script>

<style lang="scss">
  .txlist-bytoken {
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
        span {
          color: #fff;
        }
      }
      .btn-height {
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
        border-radius: 5px;
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

