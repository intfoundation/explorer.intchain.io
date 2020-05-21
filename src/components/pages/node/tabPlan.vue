<template>
  <div class="node-plan">

    <!--概要-->
    <div class="ii">
      <div class="font-lg" style="margin-top: -36px;">{{$t('node.abstract')}}</div>
      <div class="font-sm">{{$t('node.content1')}}</div>
    </div>

    <!--生态蓝图-->
    <div class="ii">
      <div class="font-lg">{{$t('node.blueprint')}}</div>
      <div style="margin-bottom: 10px;">INT Chain Node plan is divided into two phases:</div>
      <div class="font-sm">{{$t('node.blueContent1')}}</div>
      <div class="font-sm">{{$t('node.blueContent2')}}</div>
    </div>

    <!--节点竞选机制-->
    <div class="ii">
      <div class="font-lg">{{$t('node.election')}}</div>
      <div class="font-sm">{{$t('node.electionContent1')}}</div>
      <div class="font-sm">{{$t('node.electionContent2')}}</div>
      <div class="font-sm">{{$t('node.electionContent3')}}</div>
      <div class="font-sm">{{$t('node.electionContent4')}}</div>
      <div class="font-sm">{{$t('node.electionContent5')}}</div>
      <div class="font-sm">{{$t('node.electionContent6')}}</div>
    </div>

    <!--节点奖励机制-->
    <div class="ii">
      <div class="font-lg">{{$t('node.reward')}}</div>
      <div class="font-sm">{{$t('node.rewardText1')}}</div>
      <div class="font-sm">{{$t('node.rewardText2')}}</div>
      <div class="font-sm">{{$t('node.reward1')}}</div>
      <div class="font-sm">{{$t('node.reward2')}}</div>
      <div class="font-sm">{{$t('node.reward3')}}</div>
      <div class="font-sm">{{$t('node.rewardText3')}}</div>
      <div style="margin-bottom: 10px;">{{$t('node.rewardText4')}}</div>
      <div style="margin-bottom: 10px;">{{$t('node.rewardText5')}}</div>
    </div>

    <!--节点奖励机制详情-->
    <div class="ii">
      <div class="font-lg">{{$t('node.rewardDetail')}}</div>

      <div style="margin-bottom: 5px;">{{$t('node.rewardDetail1')}}</div>
      <div>
        <i class="circle"></i>
        <span>{{$t('node.rewardDetailText1')}}</span>
      </div>
      <div>{{$t('node.rewardDetailText2')}}</div>
      <div class="bottom-interval">{{$t('node.rewardDetailText3')}}</div>

      <div>
        <i class="circle"></i>
        <span>{{$t('node.rewardDetailText4')}}</span>
      </div>
      <div class="bottom-interval">{{$t('node.rewardDetailText5')}}</div>

      <div style="margin-bottom: 5px;">{{$t('node.rewardDetail2')}}</div>
      <div class="font-sm">{{$t('node.rewardDetailText6')}}</div>
      <div class="font-sm">{{$t('node.rewardDetailText7')}}</div>
      <div class="font-sm">{{$t('node.rewardDetailText8')}}</div>
      <div style="margin-bottom: 5px;">{{$t('node.rewardDetail3')}}</div>
      <div class="font-sm">{{$t('node.rewardDetailText9')}}</div>
      <el-table
        :data="votelist"
        style="width: 100%"
        border>
        <el-table-column
          prop="voter"
          :label="$t('node.voter')"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="firstVoting"
          :label="$t('node.firstRound')"
          align="center">
        </el-table-column>
        <el-table-column
          prop="secondVoting"
          :label="$t('node.secondRound')"
          align="center">
        </el-table-column>
      </el-table>
      <div style="margin: 16px 0 10px;">{{$t('node.rewardDetailText10')}}</div>
      <div class="font-sm">{{$t('node.rewardDetailText11')}}</div>
      <div class="font-sm">{{$t('node.rewardDetailText12')}}</div>
      <div class="font-sm">{{$t('node.rewardDetailText13')}}</div>
      <div class="font-sm">{{$t('node.rewardDetailText14')}}</div>
      <div class="font-sm">{{$t('node.rewardDetailText15')}}</div>
    </div>

    <div class="ii">
      <div class="font-lg">{{$t('node.penalty')}}</div>
      <div class="font-sm">{{$t('node.penaltyContent')}}</div>
    </div>


    <!--文字第四部分-->
    <div class="ii">
      <div class="font-lg">{{$t('node.configuration')}}</div>
      <div class="font-sm">{{$t('node.configurationContent')}}</div>
      <div style="margin-top: 16px;">
        <el-table
          :data="list"
          style="width: 100%"
          border>
          <el-table-column
            prop="kind"
            :label="$t('node.classfication')"
            width="150"
            align="center">
          </el-table-column>
          <el-table-column
            prop="config"
            :label="$t('node.configurationText')"
            align="center">
          </el-table-column>
          <el-table-column
            prop="comment"
            :label="$t('node.remark')"
            align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="more-detail">
      <a href="/static/node/nodePlan-en.docx" target="_blank">Please check Annex for node plan</a>
    </div>



  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: [
          { kind: 'CPU', config: this.$t('node.cpuConfig'), comment: '' },
          { kind: this.$t('node.ram'), config: '16G', comment: ''},
          { kind: this.$t('node.hardDisk'), config: '2T，7200RPM；SAS，HDD/SSD', comment: ''},
          { kind: this.$t('node.network'), config: this.$t('node.networkConfig'), comment: ''},
          { kind: this.$t('node.system'), config: 'Windows or Linux', comment: 'All systems need to be installed in English.'}
        ],
        votelist: [
          { voter: 'Voter A', firstVoting: '50', secondVoting: '40'},
          { voter: 'Voter B', firstVoting: '50', secondVoting: '50'},
          { voter: 'Voter C', firstVoting: '50', secondVoting: '100'}
        ]
      }
    }
  }
</script>

<style lang="scss">
  .node-plan {
    border: 1px solid #ddd;
    padding: 22px 33px 48px 33px;
    background-color: #f8f8f8;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    .ii {
      margin-top: 36px;
      .font-lg {
        font-size: 18px;
        text-align: center;
        margin-bottom: 16px;
        font-weight: 500;
      }
      .font-sm {
        /*color: #666;*/
        margin-bottom: 16px;
      }
      .circle {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #333;
        vertical-align: middle;
        margin-right: 3px;
      }
      .circle + span {
        vertical-align: middle;
      }
      .bottom-interval {
        margin-bottom: 10px;
      }
      .el-table {
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 0px;
        th {
          background-color: #f8f8f8;
          height: 62px;
        }
        td {
          padding: 16px 0;
          border-bottom: none;
        }
        .cell {
          word-break: break-word;
        }
        .el-table__row:nth-of-type(even) {
          background-color: #f8f8f8;
        }
      }
    }
    .more-detail {
      text-align: right;
      margin-top: 12px;
      & > a {
        color: #222222;
        text-decoration: none;
      }
      & > a:hover {
        text-decoration: underline;
      }
    }
  }

</style>
