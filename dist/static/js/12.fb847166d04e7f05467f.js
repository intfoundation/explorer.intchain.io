webpackJsonp([12],{"/Q8K":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("mtWM"),n=a.n(s),r=a("X2Oc"),i={name:"TxList",data:function(){return{txlist:[],currentPage:1,pageSize:20,total:0,isloading:!1,now:""}},created:function(){},mounted:function(){this.getTxList()},methods:{getTxList:function(){var t=this;t.isloading=!0,n.a.get("/api/trans/transList",{params:{pageNum:t.$route.params.p,pageSize:t.pageSize}}).then(function(e){var a=e.data;"success"===a.status&&(t.isloading=!1,t.txlist=a.data,t.total=a.total,t.currentPage=+t.$route.params.p,t.txlist.forEach(function(t){"transferTokenTo"==t.method?t.to_address=t.tokenid:t.to_address=t.to_address,t.timestamp=Object(r.c)(Date.parse(t.timestamp),a.time),t.value=Object(r.b)(+t.value,5),t.value=t.value+" INT"}))}).catch(function(t){console.log(t)})},handleCurrentChange:function(t){this.currentPage=t,this.$router.push("/blockchain/txlist/"+t),this.getTxList()},handleSizeChange:function(t){this.pageSize=t,this.getTxList()},handleClickHeight:function(t){this.$router.push({path:"/blockchain/blockdetail",query:{height:t}})},handleClicktxHash:function(t){this.$router.push({path:"/blockchain/txdetail",query:{hash:t}})},handleClickTo:function(t,e){"transferTokenTo"===t.method?this.$router.push({path:"/blockchain/contract/1",query:{contract:e}}):this.$router.push({path:"/blockchain/accountdetail/1",query:{address:e}})},handleClickFrom:function(t){this.$router.push({path:"/blockchain/accountdetail/1",query:{address:t}})}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"txlist"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v(t._s(t.$t("nav.home")))]),t._v(" "),a("el-breadcrumb-item",{attrs:{to:""}},[t._v(t._s(t.$t("transactionList.transactions")))])],1),t._v(" "),a("div",{staticStyle:{padding:"40px 44px"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isloading,expression:"isloading"}],attrs:{data:t.txlist}},[a("el-table-column",{attrs:{prop:"hash",label:t.$t("transactionList.txhash2"),width:"170",align:"left"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"btn-hash",staticStyle:{color:"#1f80c1"},attrs:{type:"text"},on:{click:function(a){t.handleClicktxHash(e.row.hash)}}},[t._v(t._s(e.row.hash))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"height",label:t.$t("transactionList.height"),align:"left",width:"85"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"btn-height",staticStyle:{color:"#1f80c1"},attrs:{type:"text"},on:{click:function(a){t.handleClickHeight(e.row.height)}}},[t._v(t._s(e.row.height))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"timestamp",label:t.$t("transactionList.timestamp"),align:"left",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"method",label:t.$t("transactionList.txtype2"),align:"left"}}),t._v(" "),a("el-table-column",{attrs:{prop:"from_address",label:t.$t("transactionList.from2"),width:"170",align:"left"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"btn-hash",staticStyle:{color:"#1f80c1"},attrs:{type:"text"},on:{click:function(a){t.handleClickFrom(e.row.from_address)}}},[t._v(t._s(e.row.from_address))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"to_address",label:t.$t("transactionList.to2"),width:"170",align:"left"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.to_address?a("span",{staticClass:"btn-hash",staticStyle:{color:"#1f80c1"},attrs:{type:"text"},on:{click:function(a){t.handleClickTo(e.row,e.row.to_address)}}},[t._v(t._s(e.row.to_address))]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"value",label:t.$t("transactionList.value2"),align:"left"}}),t._v(" "),a("el-table-column",{attrs:{prop:"returnCode",label:t.$t("transactionList.status"),align:"left"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"btn-status",class:[0===e.row.returnCode?"success":-1===e.row.returnCode?"pending":"fail"]},[t._v("\n            "+t._s(0===e.row.returnCode?t.$t("detail.success"):-1===e.row.returnCode?t.$t("detail.pending"):t.$t("detail.fail"))+"\n          ")])]}}])})],1),t._v(" "),a("el-pagination",{staticClass:"ep",attrs:{"current-page":t.currentPage,"page-size":20,"page-sizes":[10,20,50,100],layout:"sizes, prev, pager, next, jumper",total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var l=a("VU/8")(i,o,!1,function(t){a("mHyw")},null,null);e.default=l.exports},mHyw:function(t,e){}});
//# sourceMappingURL=12.fb847166d04e7f05467f.js.map