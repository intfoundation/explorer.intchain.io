webpackJsonp([4],{FCmz:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("Xxa5"),a=r.n(n),i=r("exGp"),o=r.n(i),s=r("mtWM"),c=r.n(s),l=r("PJh5"),u=r.n(l),h=r("X2Oc"),f={name:"BlockDetail",data:function(){return{blockdetail:{},height:0,now:"",timer:""}},mounted:function(){this.height=this.$route.query.height,this.getBlockDetail(this.height)},watch:{$route:function(t){this.getBlockDetail(t.query.height)}},methods:{getBlockDetail:function(t){var e=this;c.a.get("/api/block/blockDetail",{params:{height:t}}).then(function(t){var r=t.data;"success"===r.status&&(e.blockdetail=r.data[0],e.timer=u()(new Date(e.blockdetail.timestamp)).format("YYYY-MM-DD HH:mm Z"),e.blockdetail.timestamp=Object(h.c)(Date.parse(e.blockdetail.timestamp),r.time),e.blockdetail.avg_fee=Object(h.b)(+e.blockdetail.avg_fee,5)+" INT",e.blockdetail.totalFee=Object(h.b)(+e.blockdetail.totalFee,5)+" INT",e.blockdetail.reward=Object(h.b)(+e.blockdetail.reward,5)+" INT")}).catch(function(t){console.log(t)})},parentHash:function(t){var e=this;return o()(a.a.mark(function r(){var n,i,o,s;return a.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,n=e,r.next=4,c.a.get("/api/trans/search",{params:{param:t}});case 4:i=r.sent,"success"===(o=i.data).status&&(s=o.data.data[0].height,n.height=s,n.$router.push({path:"/blockchain/blockdetail",query:{height:s}}),n.getBlockDetail(s)),r.next=12;break;case 9:r.prev=9,r.t0=r.catch(0),alert(r.t0);case 12:case"end":return r.stop()}},r,e,[[0,9]])}))()}}},p={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"block-detail"},[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v(t._s(t.$t("nav.home")))]),t._v(" "),r("el-breadcrumb-item",{staticStyle:{cursor:"pointer"},attrs:{to:{path:"/blockchain/blocklist/1"}}},[t._v(t._s(t.$t("blocksList.blocklist2")))]),t._v(" "),r("el-breadcrumb-item",[t._v(t._s(t.$t("blocksList.blockdetail")))])],1),t._v(" "),r("div",{staticClass:"detail-content"},[r("div",{staticStyle:{"margin-bottom":"24px"}},[r("div",[r("span",{staticClass:"detail-span"},[t._v(t._s(t.$t("blocksList.height")))]),t._v(" "),r("span",[t._v(t._s(t.blockdetail.height))])]),t._v(" "),r("div",[r("span",{staticClass:"detail-span"},[t._v(t._s(t.$t("blocksList.hash")))]),t._v(" "),r("span",[t._v(t._s(t.blockdetail.hash))])]),t._v(" "),r("div",[r("span",{staticClass:"detail-span"},[t._v(t._s(t.$t("blocksList.parent")))]),t._v(" "),r("span",{staticClass:"click-span",staticStyle:{cursor:"pointer"},on:{click:function(e){t.parentHash(t.blockdetail.preBlock)}}},[t._v(t._s(t.blockdetail.preBlock))])]),t._v(" "),r("div",[r("span",{staticClass:"detail-span"},[t._v(t._s(t.$t("blocksList.timestamp")))]),t._v(" "),r("span",[t._v(t._s(t.blockdetail.timestamp))]),t._v(" "),r("span",{staticStyle:{"margin-left":"10px","font-size":"14px"}},[t._v("("+t._s(t.timer)+")")])])]),t._v(" "),r("div",{staticStyle:{"margin-bottom":"44px"}},[r("div",[r("span",{staticClass:"detail-span"},[t._v(t._s(t.$t("blocksList.miner")))]),t._v(" "),r("router-link",{staticClass:"click-span",attrs:{to:{path:"/blockchain/accountdetail/1",query:{address:t.blockdetail.creator}}}},[t._v(t._s(t.blockdetail.creator))])],1),t._v(" "),r("div",[r("span",{staticClass:"detail-span"},[t._v(t._s(t.$t("blocksList.reward")))]),t._v(" "),r("span",[t._v(t._s(t.blockdetail.reward))])]),t._v(" "),r("div",[r("span",{staticClass:"detail-span"},[t._v(t._s(t.$t("blocksList.total")))]),t._v(" "),r("span",[t._v(t._s(t.blockdetail.totalFee))])]),t._v(" "),r("div",[r("span",{staticClass:"detail-span"},[t._v(t._s(t.$t("blocksList.avgGasPrice")))]),t._v(" "),r("span",[t._v(t._s(t.blockdetail.avg_fee))])]),t._v(" "),r("div",[r("span",{staticClass:"detail-span"},[t._v(t._s(t.$t("blocksList.txns")))]),t._v(" "),r("router-link",{staticClass:"click-span",attrs:{to:{path:"/blockchain/txlist/byBlock/1",query:{height:t.height}}}},[t._v(t._s(t.blockdetail.transfer_num))])],1)])])],1)},staticRenderFns:[]};var v=r("VU/8")(f,p,!1,function(t){r("dPu8")},null,null);e.default=v.exports},SldL:function(t,e){!function(e){"use strict";var r,n=Object.prototype,a=n.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag",l="object"==typeof t,u=e.regeneratorRuntime;if(u)l&&(t.exports=u);else{(u=e.regeneratorRuntime=l?t.exports:{}).wrap=b;var h="suspendedStart",f="suspendedYield",p="executing",v="completed",d={},m={};m[o]=function(){return this};var y=Object.getPrototypeOf,g=y&&y(y(P([])));g&&g!==n&&a.call(g,o)&&(m=g);var _=L.prototype=w.prototype=Object.create(m);x.prototype=_.constructor=L,L.constructor=x,L[c]=x.displayName="GeneratorFunction",u.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===x||"GeneratorFunction"===(e.displayName||e.name))},u.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,L):(t.__proto__=L,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(_),t},u.awrap=function(t){return{__await:t}},E(O.prototype),O.prototype[s]=function(){return this},u.AsyncIterator=O,u.async=function(t,e,r,n){var a=new O(b(t,e,r,n));return u.isGeneratorFunction(e)?a:a.next().then(function(t){return t.done?t.value:a.next()})},E(_),_[c]="Generator",_[o]=function(){return this},_.toString=function(){return"[object Generator]"},u.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},u.values=P,F.prototype={constructor:F,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(C),!t)for(var e in this)"t"===e.charAt(0)&&a.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,a){return s.type="throw",s.arg=t,e.next=n,a&&(e.method="next",e.arg=r),!!a}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],s=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var c=a.call(o,"catchLoc"),l=a.call(o,"finallyLoc");if(c&&l){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=t,o.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),C(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;C(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:P(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),d}}}function b(t,e,r,n){var a=e&&e.prototype instanceof w?e:w,i=Object.create(a.prototype),o=new F(n||[]);return i._invoke=function(t,e,r){var n=h;return function(a,i){if(n===p)throw new Error("Generator is already running");if(n===v){if("throw"===a)throw i;return S()}for(r.method=a,r.arg=i;;){var o=r.delegate;if(o){var s=j(o,r);if(s){if(s===d)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=v,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var c=k(t,e,r);if("normal"===c.type){if(n=r.done?v:f,c.arg===d)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=v,r.method="throw",r.arg=c.arg)}}}(t,r,o),i}function k(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}function w(){}function x(){}function L(){}function E(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function O(t){var e;this._invoke=function(r,n){function i(){return new Promise(function(e,i){!function e(r,n,i,o){var s=k(t[r],t,n);if("throw"!==s.type){var c=s.arg,l=c.value;return l&&"object"==typeof l&&a.call(l,"__await")?Promise.resolve(l.__await).then(function(t){e("next",t,i,o)},function(t){e("throw",t,i,o)}):Promise.resolve(l).then(function(t){c.value=t,i(c)},o)}o(s.arg)}(r,n,e,i)})}return e=e?e.then(i,i):i()}}function j(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,j(t,e),"throw"===e.method))return d;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var a=k(n,t.iterator,e.arg);if("throw"===a.type)return e.method="throw",e.arg=a.arg,e.delegate=null,d;var i=a.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,d):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function $(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function C(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function F(t){this.tryEntries=[{tryLoc:"root"}],t.forEach($,this),this.reset(!0)}function P(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(a.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return i.next=i}}return{next:S}}function S(){return{value:r,done:!0}}}(function(){return this}()||Function("return this")())},Xxa5:function(t,e,r){t.exports=r("jyFz")},dPu8:function(t,e){},exGp:function(t,e,r){"use strict";e.__esModule=!0;var n,a=r("//Fk"),i=(n=a)&&n.__esModule?n:{default:n};e.default=function(t){return function(){var e=t.apply(this,arguments);return new i.default(function(t,r){return function n(a,o){try{var s=e[a](o),c=s.value}catch(t){return void r(t)}if(!s.done)return i.default.resolve(c).then(function(t){n("next",t)},function(t){n("throw",t)});t(c)}("next")})}}},jyFz:function(t,e,r){var n=function(){return this}()||Function("return this")(),a=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,i=a&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,t.exports=r("SldL"),a)n.regeneratorRuntime=i;else try{delete n.regeneratorRuntime}catch(t){n.regeneratorRuntime=void 0}}});
//# sourceMappingURL=4.6816de096b0d8ad83d27.js.map