<template>
  <div class="blocklist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$t('nav.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item to="">{{$t('blocksList.blocklist2')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="padding: 40px 44px;">
      <el-table
        :data="blocklist"
        v-loading="isloading">
        <el-table-column
          :label="$t('transactionList.height')"
          align="left">
          <template slot-scope="scope">
            <span @click="handleClickHeight(scope.row.height)" type="text" class="btn-height">{{scope.row.height}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="timestamp"
          :label="$t('transactionList.timestamp')"
          align="left">
        </el-table-column>
        <el-table-column
          prop="transfer_num"
          :label="$t('blocksList.txns2')"
          width="90"
          align="left">
          <template slot-scope="scope">
            <span @click="handleClickTxns(scope.row.height)" type="text" class="btn-height">{{scope.row.transfer_num}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="creator"
          :label="$t('blocksList.miner2')"
          width="350"
          align="left">
          <template slot-scope="scope">
            <span @click="handleClickCreator(scope.row.creator)" type="text" class="btn-hash">{{scope.row.creator}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="total_fee"
          :label="$t('blocksList.totalfee')"
          align="left">
        </el-table-column>
        <el-table-column
          prop="reward"
          :label="$t('blocksList.reward2')"
          align="left">
        </el-table-column>
        <el-table-column
          prop="avg_fee"
          :label="$t('blocksList.avgGasPrice2')"
          align="left">
        </el-table-column>
      </el-table>
      <!--<el-pagination-->
        <!--class="ep"-->
        <!--:current-page.sync="currentPage"-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:page-sizes="[10, 20, 50, 100]"-->
        <!--layout="sizes, prev, pager, next, jumper"-->
        <!--:total="total">-->
      <!--</el-pagination>-->
      <el-pagination
        class="ep"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page.sync="currentPage"
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
    name: 'BlockList',
    data () {
      return {
        blocklist: [],
        currentPage: 1,
        total: 0,
        pageSize: 20,
        isloading: false,
        now: ''
      }
    },
    mounted () {
      this.getBlockList()
    },
    methods: {
      getBlockList () {
        // let that = this
        this.isloading = true
        axios.get('/api/block/blockList', {
          params: {
            pageNum: this.$route.params.p||1,
            pageSize: this.pageSize,
          }
        })
          .then( res => { // 箭头函数的外部词法作用域为什么是Vue，不是axios？？？
            let result = res.data
            if (result.status === 'success') {
              this.isloading = false
              this.blocklist = result.data
              this.total = result.total
               this.currentPage = +this.$route.params.p
              this.blocklist.forEach(item => {
                item.timestamp = formatPassTime(Date.parse(item.timestamp), result.time)
                item.avg_fee = dataFilter(+item.avg_fee, 5) + ' ' + 'INT'
                item.total_fee = dataFilter(+item.total_fee, 5) + ' ' + 'INT'
                item.reward = dataFilter(+item.reward, 5) + ' ' + 'INT'
              })
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.$router.push (`/blockchain/blocklist/${val}`)
        this.getBlockList()
      },
      handleClickHeight (val) {
        this.$router.push({path: '/blockchain/blockdetail', query: {height: val}})
        // router.push值针对不一样的路径
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.getBlockList()

      },
      handleClickTxns (val) {
        this.$router.push({path: '/blockchain/txlist/byBlock/1', query: {height: val}})
      },
      handleClickCreator (val) {
        this.$router.push({path: '/blockchain/accountdetail/1', query: {address: val}})
      }
    }
  }
</script>

<style lang="scss">
  .blocklist {
    width: 1200px;
    margin: 90px auto;
    box-shadow: 0px 6px 10px 0px #ccc;
    background-color: #fff;
    .el-breadcrumb {
      padding: 21px 33px;
      border-bottom: 1px solid #ccc;
       

      .el-breadcrumb__item:first-of-type {
        position: relative;
      }
    }
    .el-table {
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 0px;
      th {
        background-color: #f1f1f1;
        height: 60px !important;
      }
      td {
        border-bottom: none;
      }
      .el-table__row:nth-of-type(even) {
        background-color: #f8f8f8;
      }
      .btn-height {
        color: #1f80c1;
        font-weight: 500;
        cursor: pointer;
      }
      .btn-height:hover {
        text-decoration: underline;
      }
      .btn-hash {
        cursor: pointer;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        width: 300px;
        text-overflow: ellipsis;
        color: #1f80c1;
        font-weight: 500;
      }
      .btn-hash:hover {
        text-decoration: underline;
      }
      .el-loading-spinner .path {
        stroke: #1f80c1;
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

