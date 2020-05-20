webpackJsonp([15],{D8WD:function(t,a){},MGRN:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("mtWM"),s=e.n(n),r=e("X2Oc"),o={name:"TotalTransList",data:function(){return{transactionsList:[],currentPage:1,pageSize:20,transTotal:0,contract:"",isloading:!1,now:""}},created:function(){this.contract=this.$route.query.contract},mounted:function(){this.getTokenTransaction()},methods:{getTokenTransaction:function(){var t=this;t.isloading=!0,s.a.get("/api/trans/searchByTokenid",{params:{tokenid:t.contract,pageNum:t.$route.params.p,pageSize:t.pageSize}}).then(function(a){var e=a.data;"success"===e.status&&(t.isloading=!1,t.transTotal=e.total,t.transactionsList=e.data,t.currentPage=+t.$route.params.p,t.transactionsList.forEach(function(t){t.timestamp=Object(r.c)(Date.parse(t.timestamp),e.time),t.value=Object(r.b)(+t.value,5)+" token",t.cost=Object(r.b)(+t.cost,5)+" INT"}))}).catch(function(t){alert(t)})},handleCurrentChange:function(t){this.currentPage=t,this.$router.push({path:"/blockchain/contract/transactions/"+t,query:{contract:this.contract}}),this.getTokenTransaction()},handleSizeChange:function(t){this.pageSize=t,this.getAccountRecord()},handleClickHeight:function(t){this.$router.push({path:"/blockchain/blockdetail",query:{height:t}})},handleClickHash:function(t){this.$router.push({path:"/blockchain/txdetail",query:{hash:t}})},handleClickAddress:function(t){this.$router.push({path:"/blockchain/accountdetail",query:{address:t}})},cross:function(){this.$router.push({path:"/blockchain/txlist/1"})}}},i={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"txlist-bytoken"},[e("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v(t._s(t.$t("nav.home")))]),t._v(" "),e("el-breadcrumb-item",{attrs:{to:{path:"/blockchain/txlist/1"}}},[t._v(t._s(t.$t("transactionList.transactions")))]),t._v(" "),e("el-breadcrumb-item",{staticClass:"crumb-spe"},[e("span",[t._v(t._s(t.$t("token.contract"))+": "+t._s(t.contract))]),t._v(" "),e("i",{staticClass:"cross",on:{click:t.cross}})])],1),t._v(" "),e("div",{staticStyle:{padding:"40px 44px"}},[e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isloading,expression:"isloading"}],staticStyle:{width:"100%"},attrs:{data:t.transactionsList}},[e("el-table-column",{attrs:{prop:"hash",label:t.$t("transactionList.txhash2"),width:"170",align:"left"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",{staticClass:"btn-common"},[0!==a.row.returnCode&&-1!==a.row.returnCode?e("i",{staticClass:"txfail"}):t._e(),t._v(" "),e("span",{staticClass:"btn-height",attrs:{type:"text"},on:{click:function(e){t.handleClickHash(a.row.hash)}}},[t._v(t._s(a.row.hash))])])]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"height",label:t.$t("transactionList.height"),align:"left"},scopedSlots:t._u([{key:"default",fn:function(a){return[-1!==a.row.returnCode?e("span",{staticClass:"btn-height",attrs:{type:"text"},on:{click:function(e){t.handleClickHeight(a.row.height)}}},[t._v(t._s(a.row.height))]):e("span")]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"",label:t.$t("transactionList.timestamp"),align:"left"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(-1!==a.row.returnCode?a.row.timestamp:"pending"))])]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"method",label:t.$t("transactionList.txtype2"),align:"left"}}),t._v(" "),e("el-table-column",{attrs:{prop:"from_address",label:t.$t("transactionList.from2"),align:"left",width:"170"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",{staticClass:"btn-height btn-common",attrs:{type:"text"},on:{click:function(e){t.handleClickAddress(a.row.from_address)}}},[t._v(t._s(a.row.from_address))])]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"to_address",label:t.$t("transactionList.to2"),align:"left",width:"170"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",{staticClass:"btn-height btn-common",attrs:{type:"text"},on:{click:function(e){t.handleClickAddress(a.row.to_address)}}},[t._v(t._s(a.row.to_address))])]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"value",label:t.$t("transactionList.value2"),align:"left"}}),t._v(" "),e("el-table-column",{attrs:{prop:"",label:t.$t("transactionList.txfee"),align:"left"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(-1!==a.row.returnCode?a.row.cost:"pending"))])]}}])})],1),t._v(" "),e("el-pagination",{staticClass:"ep",attrs:{"current-page":t.currentPage,"page-size":20,"page-sizes":[10,20,50,100],layout:"sizes, prev, pager, next, jumper",total:t.transTotal},on:{"update:currentPage":function(a){t.currentPage=a},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var c=e("VU/8")(o,i,!1,function(t){e("D8WD")},null,null);a.default=c.exports}});
//# sourceMappingURL=15.6e851ebb8b742d3e2025.js.map