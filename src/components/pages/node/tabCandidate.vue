<template>
  <div class="candidate-node">
    <el-table
      :data="nodelist"
    >
      <el-table-column
        :label="$t('account.rank')"
        align="center">
      </el-table-column>
      <el-table-column
        prop="timestamp"
        :label="$t('node.name')"
        align="center">
      </el-table-column>
      <el-table-column
        prop="transfer_num"
        :label="$t('account.address')"
        align="center">
      </el-table-column>
      <el-table-column
        prop="creator"
        :label="$t('node.count')"
        align="center">
      </el-table-column>
    </el-table>
    <el-pagination
      class="ep"
      current-page.sync="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 50, 100]"
      layout="sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        nodelist: [],
        currentPage: 1,
        total: 1,
        pageSize: 10
      }
    },
    created () {
      this.getCandidateNode()
    },
    methods: {
      getCandidateNode () {
        let that = this
        axios.get('/api/node/nodeList', {
          params: {
            pageNum: that.currentPage,
            pageSize: that.pageSize,
          }
        })
          .then(function(res) {
            let result = res.data
            if (result.status === 'success') {
              that.nodelist = result.data
              that.total = result.total
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getCandidateNode()
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.getCandidateNode()
      }
    }
  }
</script>

<style lang="scss">
  .candidate-node {
    background-color: #fff;
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
      .el-table__row:nth-of-type(even) {
        background-color: #f9f9ff;
      }
      .btn-height {
        span:hover {
          text-decoration: underline;
        }
      }
      .btn-hash {
        span {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          width: 300px;
          text-overflow: ellipsis;
        }
        span:hover {
          text-decoration: underline;
        }
      }
      .el-loading-spinner .path {
        stroke: #3C31D7;
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
    }
  }

</style>
