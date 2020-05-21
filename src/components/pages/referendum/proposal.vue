<template>
  <div class="proposal">
      <div v-for="r in rfdList.slice((this.pageNo - 1) * this.pageSize, this.pageSize * this.pageNo)" :key="r.id">
        <p class="r-hash">hash: {{r.hash}} <span style="float:right">{{$t('referendum.endTime')}} {{moment(r.end).format("YYYY-MM-DD HH:mm:ss")}} (UTC+8)</span></p>
        <p class="r-title" :class="{thover:!!r.webUrl}" v-on:click.stop="toWebUrl(r,$event)">{{r.title}}</p>
        <div class="r-icon">
            <div style="float: left">
                <span class="icon iconfont icon-zantongfill"></span>
                <svg style="color:#2CC868" class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#icon-zantongfill"></use>
                </svg>
                <span style="color:#2CC868 ">{{$t('referendum.agree')}}</span>
                <span>{{r.Agree.stake}} INT（{{r.Agree.address?r.Agree.address.split(',').length:0}} {{$t('referendum.voters')}}）</span>
            </div>
            <div style="float: right">
                <svg style="color:#EE9221;" class="icon disagree svg-icon" aria-hidden="true">
                  <use xlink:href="#icon-zantongfill"></use>
                </svg>
                <span style="color:#EE9221 ">{{$t('referendum.disagree')}}</span>
                <span>{{r.Disagree.stake}} INT（{{r.Disagree.address?r.Disagree.address.split(',').length:0}} {{$t('referendum.voters')}}）</span>
            </div>
        </div>

        <div role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" class="el-progress el-progress--line el-progress--text-inside">
            <div class="el-progress-bar">
                <div class="el-progress-bar__outer" style="height: 18px;">
                    <span v-if="r.Agree.stake==0&&r.Disagree.stake==0" style="color:rgba(102, 102, 102, 1);margin-left: 10px ;font-size: 12px;">0%</span>
                    <div class="el-progress-bar__inner" v-bind:style="{width:getTotalWidth(r)}"  style="background-color:#EE9221">
                        <div class="el-progress-bar__innerText">{{r.Disagree.stake=='0'||(r.Disagree.stake/(r.Agree.stake+r.Disagree.stake)*100).toFixed(0)=='0'?'':(r.Disagree.stake/(r.Agree.stake+r.Disagree.stake)*100).toFixed(0)+'%'}}</div>
                    </div>
                    <div class="el-progress-bar__inner" v-bind:style="{width:getAgreeWidth(r)}" style="width: 40%;background-color:#2CC868;text-align:left">
                        <div class="el-progress-bar__innerText">{{r.Agree.stake=='0'||(r.Agree.stake/(r.Agree.stake+r.Disagree.stake)*100).toFixed(0)=='0'?'':(r.Agree.stake/(r.Agree.stake+r.Disagree.stake)*100).toFixed(0)+'%'}}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="line"></div>
      </div>

      <el-pagination
        class="ep"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page.sync="pageNo"
        :page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="sizes, prev, pager, next, jumper"
        :total="rfdList.length">
      </el-pagination>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  export default {
    data () {
      return {
         moment,
         data:[],
         rfdList:[],
         pageNo:1,
         pageSize:20
      }
    },
    props: {
      search: {
        type: String
      }
    },
    created () {
       this.queryProposal();
    },
    methods: {
      toWebUrl(opt, e) {
          if (!opt.webUrl) {
              return;
          }
          if (opt.webUrl) {
              window.open(opt.webUrl)
          }
          e.stopPropagation()
      },
        queryProposal(){
            axios.get("/api/wallet/queryProposalRfd").then(res=>{
                this.rfdList = res.data.data;
                this.data = res.data.data;
            })
        },
        handleSizeChange(val){
          this.pageSize = val;
        },
        handleCurrentChange(val){
          this.pageNo = val;
        },
        getTotalWidth(r) {
            if (!r.Agree.stake && !r.Disagree.stake) {
                return '0px';
            }
            let current = Date.now();
            let begin = new Date(r.begin).getTime();
            let end = new Date(r.end).getTime();
            let result = (current - begin) / (end - begin) > 1 ? 1 : (current - begin) / (end - begin);
            return result * 1030 + "px"

        },
        getAgreeWidth(r) {
            if (!r.Agree.stake) {
                return '0px';
            }
            let current = Date.now();
            let begin = new Date(r.begin).getTime();
            let end = new Date(r.end).getTime();
            let result = (current - begin) / (end - begin) > 1 ? 1 : (current - begin) / (end - begin);
            let agreeRate = r.Agree.stake / (r.Agree.stake + r.Disagree.stake);

            return result * agreeRate * 1030 + "px"
        },
    },
    watch:{
      search(val){
        this.pageNo = 1;
        let arr = [];
        for(let d of this.data){
          if(d.title.indexOf(val)>-1){
             arr.push(d)
          }
        }
        this.rfdList = [...arr]
      }
    }
  }
</script>

<style lang="scss">
 .proposal{
    border: 1px solid #ddd;
    padding:30px 40px;
 }
 .line{
     height:30px;
     border-bottom: 1px solid #ddd;
 }
 .suc{
     top:-19px;
     .el-progress-bar{
        .el-progress-bar__outer{
            background-color: rgba(235,238,245,0);
            .el-progress-bar__inner{
                    text-align: left;
            }
        }
     }
 }
  .r-hash {
        margin-top: 40px;
        color: rgba(102, 102, 102, 1);
        font-size: 14px;
        font-family: SourceHanSansCN-Normal;
    }

    .r-title {
        margin-top: 5px;
        color: rgba(51, 51, 51, 1);
        font-size: 18px;
        font-family: SourceHanSansCN-Medium;
    }

    .r-icon {
        height: auto;
        width: 100%;
        margin-top: 5px;
        color: rgba(102, 102, 102, 1);
        font-size: 18px;
        font-family: SourceHanSansCN-Medium;
    }
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.disagree{
    transform: rotate(180deg);
-ms-transform: rotate(180deg);		/* IE 9 */
-webkit-transform: rotate(180deg);	/* Safari and Chrome */
-o-transform: rotate(180deg);		/* Opera */
-moz-transform: rotate(180deg);
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
    .thover:hover {
            color: rgb(45, 140, 240);
        }
</style>
