global.webpackJsonp([24],{DCER:function(t,s,a){"use strict";var e={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"home order-items"},[t._l(t.list,function(s,e){return a("div",{key:e,staticClass:"kuang order-item"},[a("div",{staticClass:"head"},[a("span",{staticClass:"h-title"},[t._v(t._s(t.shopName))]),t._v(" "),a("span",{staticClass:"h-text"},[t._v("\n        "+t._s(t.state[s.refundType])+",\n        "+t._s(t.stateName[s.state])+"\n      ")])]),t._v(" "),a("div",{staticClass:"nav",attrs:{eventid:"0-"+e},on:{click:function(a){t.goodsList(s.goodsList)}}},[t._l(s.goodsList,function(s,e){return e<3?a("img",{key:e,staticClass:"n-img",attrs:{src:s.image,alt:""}}):t._e()}),t._v(" "),a("i",{staticClass:"n-icon"})],2),t._v(" "),a("div",{staticClass:"below"},[a("div",{staticClass:"van-cell"},[a("div",{staticClass:"van-cell__title"},[a("span",{staticClass:"goods-buy__info"},[t._v("共"),a("span",{staticClass:"goods-buy__num"},[t._v(t._s(s.goodsList.length))]),t._v("个款  "),a("span",{staticClass:"goods-buy__num"},[t._v(t._s(s.countGoodsNum))]),t._v("件商品  ")])]),t._v(" "),a("div",{staticClass:"van-cell__value"},[a("span",{staticClass:"goods-buy__total"},[t._v("合计:")]),t._v(" "),a("span",{staticClass:"goods-buy__price"},[t._v("￥"+t._s(s.price))])])]),t._v(" "),t._e(),t._v(" "),a("div",{staticClass:"btn van-cell van-hairline"},[a("div",{staticClass:"van-cell__title"}),t._v(" "),a("div",{staticClass:"van-cell__value"},[a("span",{staticClass:"b-xq",attrs:{eventid:"1-"+e},on:{click:function(a){t.refundDetails(s.id,s.refundType)}}},[t._v("查看详情")])])])])])}),t._v(" "),t.loading?a("div",[a("zan-loading",{attrs:{mpcomid:"0"}})],1):t._e(),t._v(" "),!t.list.length&&t.lastPage?a("div",[a("zan-loadmore",{attrs:{type:"text",text:"暂无数据",mpcomid:"1"}})],1):t._e(),t._v(" "),t.list.length&&t.lastPage?a("div",[a("zan-loadmore",{attrs:{type:"text",mpcomid:"2"}})],1):t._e()],2)},staticRenderFns:[]};s.a=e},GxUa:function(t,s){},jLf8:function(t,s,a){"use strict";var e=a("lKj8"),i=a("DCER");var n=function(t){a("GxUa")},o=a("ybqe")(e.a,i.a,n,"data-v-1c578564",null);s.a=o.exports},lKj8:function(t,s,a){"use strict";var e=a("woOf"),i=a.n(e),n=a("Xxa5"),o=a.n(n),l=a("exGp"),c=a.n(l),r=a("qTHA"),d=a("xzGo");s.a={components:{},data:function(){return{loading:!1,lastPage:!1,shopName:"",state:["退款","退货","换货"],stateName:["等待商家处理","已完成","商家已拒绝","商家已同意","等待商家确认收货","已撤销","确认收货"],list:[]}},methods:{refundDetails:function(t,s){2===s?this.$router.push({path:"/pages/refund/barterDetails",query:{id:t}}):this.$router.push({path:"/pages/refund/refundDetails",query:{id:t}})},goodsList:function(t){},getList:function(){var t=this;return c()(o.a.mark(function s(){var a,e;return o.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return t.loading=!0,s.next=3,d.a.afterService();case 3:a=s.sent,t.loading=!1,1===a.code&&(t.list=t.list.concat(a.data.list),t.lastPage=a.data.lastPage),e=t,r.a.getStorage({key:"shopName",success:function(t){e.shopName=t.data}});case 8:case"end":return s.stop()}},s,t)}))()}},onReachBottom:function(){this.lastPage||this.getList()},mounted:function(){this.getList()},onUnload:function(){i()(this,this.$options.data())}}}},["T7Zv"]);