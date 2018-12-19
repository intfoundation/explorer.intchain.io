<template>
  <div class="node-plan">

    <!--&lt;!&ndash;文字第一部分&ndash;&gt;-->
    <!--<div class="ii">-->
      <!--<div class="font-lg" style="margin-top: -36px;">{{$t('node.composition')}}</div>-->
      <!--<div class="font-sm">{{$t('node.content1')}}</div>-->
    <!--</div>-->

    <!--&lt;!&ndash;文字第二部分&ndash;&gt;-->
    <!--<div class="ii">-->
      <!--<div class="font-lg">{{$t('node.generation')}}</div>-->
      <!--<div class="font-sm">{{$t('node.content2')}}</div>-->
    <!--</div>-->

    <!--&lt;!&ndash;文字第三部分&ndash;&gt;-->
    <!--<div class="ii">-->
      <!--<div class="font-lg">{{$t('node.mechanism')}}</div>-->
      <!--<div class="font-sm">{{$t('node.content3')}}</div>-->
      <!--<div class="font-sm">{{$t('node.contentway1')}}</div>-->
      <!--<div class="font-sm">{{$t('node.contentway2')}}</div>-->
    <!--</div>-->

    <!--&lt;!&ndash;文字第四部分&ndash;&gt;-->
    <!--<div class="ii">-->
      <!--<div class="font-lg">{{$t('node.configuration')}}</div>-->
      <!--<div style="margin-top: 16px;">-->
        <!--<el-table-->
          <!--:data="list"-->
          <!--style="width: 100%"-->
          <!--border>-->
          <!--<el-table-column-->
            <!--prop="kind"-->
            <!--:label="$t('node.classfication')"-->
            <!--width="150"-->
            <!--align="center">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="config"-->
            <!--:label="$t('node.configurationText')"-->
            <!--align="center">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="comment"-->
            <!--:label="$t('node.remark')"-->
            <!--align="center">-->
          <!--</el-table-column>-->
        <!--</el-table>-->
      <!--</div>-->
    <!--</div>-->



  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: [
          { kind: 'CPU', config: this.$t('node.cpuConfig'), comment: '' },
          { kind: this.$t('node.ram'), config: '32G', comment: ''},
          { kind: this.$t('node.hardDisk'), config: '2T，7200PRM；SAS；SSD', comment: this.$t('node.diskRemark')},
          { kind: this.$t('node.network'), config: this.$t('node.networkConfig'), comment: this.$t('node.networkRemark')},
          { kind: this.$t('node.system'), config: 'Binance aims to build a world ....', comment: ''}
        ]
      }
    }
  }
</script>

<style lang="scss">
  .node-plan {
    border: 1px solid #ccc;
    padding: 22px 33px 48px 33px;
    background-color: #f9f9ff;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    .ii {
      margin-top: 36px;
      .font-lg {
        font-size: 18px;
      }
      .font-sm {
        color: #666;
        margin-top: 16px;
      }
      .el-table {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
        th {
          background-color: #f9f9ff;
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
          background-color: #f9f9ff;
        }
      }
    }
  }

</style>
