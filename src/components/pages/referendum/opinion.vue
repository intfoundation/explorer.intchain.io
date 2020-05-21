<template>
  <div class="opinion">
      <div v-for="r in rfdList.slice((this.pageNo - 1) * this.pageSize, this.pageSize * this.pageNo)" :key="r.id">
        <p class="r-hash">hash: {{r.hash}} <span style="float:right">{{$t('referendum.endTime')}} {{moment(r.end).format("YYYY-MM-DD HH:mm:ss")}}</span></p>
        <p class="r-title" @click="isShowOpts(r)">{{r.title}} <a style="color: #2d8cf0;text-decoration:none" v-show="!!r.webUrl" v-on:click.stop="toWebUrl(r,$event)" href="javascript:;">{{$t('referendum.viewAll')}}</a></p>
        <div class="r-options" v-show="!!r.showOpts">
            <div class="opt-item" :class="{opts:!!o.webUrl}" v-for="o in r.options" :key="o.optId" @click="toWebUrl(o)">
               <div style="display:inline-block;width:100px">
                  <el-tooltip class="item" effect="light" :content="o.name" placement="top">
                    <span class="o-name">{{o.name}}</span>
                  </el-tooltip>
               </div>
               <div class="pro" v-bind:style="{width:getWidth(o.stake,r.options[0].stake)}"></div>
               <span style="float:right;margin-top:5px"> {{o.stake.toFixed(0)}} INT </span>
            </div>
        </div>
        <div class="o-line"></div>
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
//||'#'+Math.floor(Math.random()*256).toString(10)
  import axios from 'axios'
  import moment from 'moment'
  export default {
    data () {
      return {
         moment,
         //colors:['#ff2600','#ff9300','#00f900','#00fa92','#00fdff','#0096ff','#0433ff','#9437ff','#ff40ff','#ff2f92','#ff8ad8','#ff85ff','#d783ff','#7a81ff','#76d6ff','#73fdff','#73fcd6','#73fa79','#d4fb79','#ffd479','#ff7e79','#ff2600','#ff9300','#00f900','#00fa92','#00fdff','#0096ff','#0433ff','#9437ff','#ff40ff','#ff2f92','#ff8ad8','#ff85ff','#d783ff','#7a81ff','#76d6ff','#73fdff','#73fcd6','#73fa79','#d4fb79','#ffd479','#ff7e79'],                                                                                             
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
       this.queryOpinion();
    },
    methods: {
        getWidth(s,s0){
          if(s.toFixed(0)=="0"){
            return "0px";
          }
          if(s==s0){
            return "750px"
          }

          return ((s/s0)*750)+"px"
        },
        queryOpinion(){
            axios.get("/api/wallet/queryOpinion").then(res=>{
                this.rfdList = res.data.data;
                this.data = res.data.data;
            })
        },
        toWebUrl(o){
          if(!o.webUrl){
            return;
          }
          window.open(o.webUrl)
        },
        isShowOpts(r) {
            let arr = [];
            for (let rfd of this.rfdList) {
                if(r.id===rfd.id){
                  rfd.showOpts = !rfd.showOpts
                }                
                arr.push(rfd)
            }
            this.rfdList = [...arr]
        },
        handleSizeChange(val){
          this.pageSize = val;
        },
        handleCurrentChange(val){
          this.pageNo = val;
        }
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
 .opinion{
    border: 1px solid #ddd;
    padding:30px 40px;
 }
 .o-line{
     height:5px;
     border-bottom: 1px solid #ddd;
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
        cursor: pointer;
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
  .r-options{
    font-size: 14px;
    max-height: 500px;
    overflow-y: scroll
  }
  .opts{
    cursor: pointer
  }
  .opts:hover{
    color: rgb(45, 140, 240);

  }
  .opt-item:hover{
    color: rgb(45, 140, 240);
  }
  .opt-item{
    padding: 4px 20px;
  }
  .opt-item:nth-child(2n+1){
     background-color: #f8f8f8
  }
  .o-name{
    display: inline-block;
    max-width: 100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  .pro{
    display: inline-block;
    width: 100px;
    height: 25px;
    background-color: #f7806d;
    border-top-right-radius: 12.5px;
    border-bottom-right-radius: 12.5px;
    vertical-align: bottom;
  }
  .p-tip{
    width:50px;
  }
</style>
