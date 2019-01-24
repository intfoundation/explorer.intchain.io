<template>
  <div class="candidate-node">
    <el-table
      :data="superlist.filter( data => !search || data.node.toLowerCase().indexOf(search.toLowerCase()) > -1 )"
      v-loading="isloading">
      <el-table-column
        :label="$t('account.rank')"
        align="left"
        type="index"
        width="70"
        >
      </el-table-column>
      <el-table-column
        prop=""
        :label="$t('node.name')"
        align="left"
        width="370">
        <template slot-scope="scope">
          <span style="margin-left: 10px;">{{ scope.row.node }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop=""
        :label="$t('node.team')"
        align="left">
        <template slot-scope="scope">
          <a
            :href="scope.row.webUrl"
            v-if="scope.row.webUrl !== null "
            class="format"
            style="display: block;margin-left: 10px;cursor: pointer;word-break: normal;"
            target="_blank">{{ scope.row.teamName }}</a>
          <div v-else style="margin-left: 10px;word-break: normal;">{{ scope.row.teamName }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        :label="$t('node.region')"
        width="160"
        align="left">
        <template slot-scope="scope">
          <span>{{scope.row.region}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        :label="$t('node.weight')"
        width="80"
        align="left">
      </el-table-column>
      <el-table-column
        prop="vote"
        width="120"
        :label="$t('node.count')"
        align="left">
      </el-table-column>
      <el-table-column
        align="right"
        class-name="slot-input"
        width="250">
        <template slot="header" slot-scope="scope" >
          <el-input
            v-model="search"
            :placeholder="$t('node.placeholder')"/>
        </template>
      </el-table-column>
    </el-table>

    <div class="seperator">
      <div>
        <!--<span class="declare">Top<span>13</span> nodes are INT super nodes</span>-->
        <span class="declare" style="font-size: 16px;">The top 13 candidate nodes with the most votes are Thearchy Nodes.</span>
      </div>
      <i class="no">NO</i>
    </div>

    <el-table
      :data="candidateList.filter( data => !search || data.node.toLowerCase().indexOf(search.toLowerCase()) > -1 )"
      class="candidate"
      style="border-bottom-right-radius: 4px !important; border-bottom-left-radius: 4px !important;">
      <el-table-column
        :label="$t('account.rank')"
        align="left"
        type="index"
        :index="index"
        width="70"
      >
      </el-table-column>
      <el-table-column
        prop=""
        :label="$t('node.name')"
        align="left"
        width="370">
        <template slot-scope="scope">
          <span style="margin-left: 10px;">{{ scope.row.node }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop=""
        :label="$t('node.team')"
        align="left">
        <template slot-scope="scope">
          <a
            :href="scope.row.webUrl"
            v-if="scope.row.webUrl !== null "
            class="format"
            style="display: block;margin-left: 10px;cursor: pointer;word-break: normal;"
            target="_blank">{{ scope.row.teamName }}</a>
          <div v-else style="margin-left: 10px;word-break: normal;">{{ scope.row.teamName }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        :label="$t('node.region')"
        width="160"
        align="left">
        <template slot-scope="scope">
          <span>{{scope.row.region}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        :label="$t('node.weight')"
        width="80"
        align="left">
      </el-table-column>
      <el-table-column
        prop="vote"
        :label="$t('node.count')"
        width="120"
        align="left">
      </el-table-column>
      <el-table-column
        align="right"
        class-name="slot-input"
        width="250">
        <template slot="header" slot-scope="scope" >
          <el-input
            v-model="search"
            :placeholder="$t('node.placeholder')"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios'
  // let nodelist = []
  // for (let i = 0; i < 100; i++) {
  //   nodelist.push({name: 'okb'})
  // }
  export default {
    data () {
      return {
        superlist: [],
        candidateList: [],
        currentPage: 1,
        // total: nodelist.length,
        pageSize: 10,
        isloading: false,
        search: '',
        totalVotes: null,
        index: 14
      }
    },
    created () {
      this.getCandidateNode()
    },
    methods: {
      getCandidateNode () {
        let that = this
        that.isloading = true
        axios.get('/api/node/nodeList')
          .then(function(res) {
            let result = res.data
            if (result.status === 'success') {
              that.isloading = false
              that.totalVotes = result.totalVote
              let nodelist = result.data
              for(let i in nodelist) {
                nodelist[i].weight = ((nodelist[i].vote / that.totalVotes) * 100).toFixed(2) + '%'
                if (nodelist[i].weight === '0.00%') {
                  nodelist[i].weight = '0%'
                }
                nodelist[i].vote = Math.round(nodelist[i].vote)
                if (nodelist[i].country === null) {
                  nodelist[i].country = '-'
                }
                if (nodelist[i].city === null) {
                  nodelist[i].city = '-'
                }
                nodelist[i].region = nodelist[i].country + '/' + nodelist[i].city
              }
              that.superlist = nodelist.slice(0, 13)
              that.candidateList = nodelist.slice(13)
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      handleCurrentChange () {

      }
    }
  }
</script>

<style lang="scss">
  .candidate-node {
    background-color: #fff;
    .candidate {
      thead {
        display: none;
      }
    }
    .el-table:nth-of-type(1) {
      border-top-right-radius: 4px !important;
    }
    .el-table {
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 0 !important;
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
      .el-loading-spinner .path {
        stroke: #3C31D7;
      }
      .icon-hyper-link {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url("../../../assets/hyper-link.png");
        background-size: cover;
        vertical-align: text-top;
      }
      .format {
        text-decoration: none;
        font-weight: 500;
        color: #3C31D7;
      }
      .format:hover {
        text-decoration: underline;
      }
      .slot-input {
        & > div:nth-of-type(1) {
          height: 40px;
        }
        .el-input {
          input {
            font-size: 12px;
            outline: none;
          }
        }
      }
    }
    .seperator {
      height: 56px;
      background-color: #3D93FA;
      position: relative;
      div {
        line-height: 56px;
        font-size: 14px;
        text-align: center;
        .declare {
          color: #fff;
          span:first-of-type {
            font-size: 22px;
            font-weight: 500;
          }
        }
      }
      .no {
        position: absolute;
        right: -6px;
        bottom: -12px;
        font-size: 36px;
        color: #fff;
        opacity: 0.5;
      }
    }
  }
</style>
