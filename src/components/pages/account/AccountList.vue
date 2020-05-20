<template>
  <div class="account-list">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">{{$t('nav.home')}}</el-breadcrumb-item>
        <el-breadcrumb-item to="">{{$t('account.accounts')}}</el-breadcrumb-item>
      </el-breadcrumb>

    <div style="padding: 40px 44px;">
      <el-table
        :data="accountList"
        v-loading="isloading">
        <el-table-column
          prop=""
          :label="$t('account.rank')"
          width="65"
          align="left">
          <template slot-scope="scope">
            <span>{{getRank((currentPage-1)*pageSize,scope.row)}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="address"
          :label="$t('account.address')"
          width="345"
          align="left">
          <template slot-scope="scope">
            <span @click="handleClickAddress(scope.row.address)" type="text" class="btn-hash">{{scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('account.createTime')"
          width="170"
          align="left">
        </el-table-column>
        <el-table-column
          prop="balance"
          :label="$t('account.balance')"
          align="left">
        </el-table-column>
        <el-table-column
          prop=""
          :label="$t('account.voted')"
          width="100"
          align="left">
           <template slot-scope="scope">
            <span>{{scope.row.hasVoteNode==1?0:scope.row.stake}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="weight"
          :label="$t('account.weight')"
          align="left">
        </el-table-column>
        <el-table-column
          prop="txCount"
          :label="$t('blocksList.txns2')"
          width="70"
          align="left">
        </el-table-column>
        <el-table-column
          prop="reward"
          :label="$t('blocksList.accountReward')"
          align="left">
        </el-table-column>
      </el-table>
      <el-pagination
        class="ep"
        current-page.sync="currentPage"
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
  import { dataFilter } from '../../../utils/common.js'
  import {changeTime} from "../../../utils/common";
  export default {
    name: 'AccountList',
    data () {
      return {
        accountList: [],
        currentPage: 1,
        pageSize: 20,
        total: 0,
        totalVote:0,
        isloading: false
      }
    },
    created () {
      this.getAccountList()
    },
    methods: {
      getRank(a,row){
        for(let i in  this.accountList){
          let item = this.accountList[i]
          if(item.id == row.id){
            return +i + 1 +a
          }
        }
      },
      getAccountList () {
        let that = this
        let time
        that.isloading = true
        axios.get('/api/token/accountList', {
          params: {
            tokenid: 'INT',
            pageNum: that.$route.params.p,
            pageSize: that.pageSize
          }
        })
          .then(function(res) {
            let result = res.data
            if (result.status === 'success') {
              that.isloading = false
              that.total = result.data.total
              that.totalVote = result.data.totalVote
              that.currentPage = +that.$route.params.p
              that.accountList = result.data.accountList
              that.accountList.forEach(item => {
                item.createTime = changeTime(item.createTime);
                item.weight = (+item.balance+item.stake) / Math.pow(10, 9)
                item.weight = Math.floor(item.weight * 100 * Math.pow(10, 7)) / Math.pow(10, 7) + '%'
                item.balance = dataFilter(+item.balance, 5) + ' ' + 'INT'
                item.reward = 0
                if(item.hasVoteNode == 2){
                  item.reward = (item.stake/that.totalVote*10958.903424000002).toFixed(4) + " INT"
                }
              })
            }
          })
          .catch(function(err) {
            alert(err)
          })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.$router.push(`/blockchain/accountlist/${val}`)
        this.getAccountList()
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.getAccountList()
      },
      handleClickAddress (val) {
        this.$router.push({ path: '/blockchain/accountdetail/1', query: {address: val} })
      }
    }
  }

</script>

<style lang="scss">
  .el-table .cell {
    white-space: pre-line!important;
  }
  .account-list {
    width: 1200px;
    margin: 90px auto;
    box-shadow: 0px 2px 4px 0px #ccc;
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
      .btn-hash {
        color: #1f80c1;
        font-weight: 500;
        cursor: pointer;
      }
      .btn-hash:hover {
          text-decoration: underline;
      }
      .el-table__row:nth-of-type(even) {
        background-color: #f8f8f8;
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
