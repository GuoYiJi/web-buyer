global.webpackJsonp([23],{DCER:function(t,a,s){"use strict";var e={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"home order-items"},[t._l(t.list,function(a,e){return s("div",{key:e,staticClass:"kuang order-item"},[s("div",{staticClass:"head"},[s("span",{staticClass:"h-title"},[t._v(t._s(t.shopName))]),t._v(" "),s("span",{staticClass:"h-text"},[t._v("\n        "+t._s(t.state[a.refundType])+",\n        "+t._s(t.stateName[a.state])+"\n      ")])]),t._v(" "),s("div",{staticClass:"nav",attrs:{eventid:"0-"+e},on:{click:function(s){t.handleShopListClick(a.goodsList)}}},[t._l(a.goodsList,function(a,e){return e<3?s("img",{key:e,staticClass:"n-img",attrs:{src:a.image,mode:"aspectFill",alt:""}}):t._e()}),t._v(" "),s("i",{staticClass:"n-icon"})],2),t._v(" "),s("div",{staticClass:"below"},[s("div",{staticClass:"van-cell"},[s("div",{staticClass:"van-cell__title"},[s("span",{staticClass:"goods-buy__info"},[t._v("共"),s("span",{staticClass:"goods-buy__num"},[t._v(t._s(a.goodsList.length))]),t._v("个款  "),s("span",{staticClass:"goods-buy__num"},[t._v(t._s(a.countGoodsNum))]),t._v("件商品  ")])]),t._v(" "),s("div",{staticClass:"van-cell__value"},[s("span",{staticClass:"goods-buy__total"},[t._v("合计:")]),t._v(" "),s("span",{staticClass:"goods-buy__price"},[t._v("￥"+t._s(a.price))])])]),t._v(" "),t._e(),t._v(" "),s("div",{staticClass:"btn van-cell van-hairline"},[s("div",{staticClass:"van-cell__title"}),t._v(" "),s("div",{staticClass:"van-cell__value"},[s("span",{staticClass:"b-xq",attrs:{eventid:"1-"+e},on:{click:function(s){t.refundDetails(a.id,a.refundType)}}},[t._v("查看详情")])])])])])}),t._v(" "),t.loading?s("div",[s("zan-loading",{attrs:{mpcomid:"0"}})],1):t._e(),t._v(" "),!t.list.length&&t.lastPage?s("div",[s("zan-loadmore",{attrs:{type:"text",text:"暂无数据",mpcomid:"1"}})],1):t._e(),t._v(" "),t.list.length&&t.lastPage?s("div",[s("zan-loadmore",{attrs:{type:"text",mpcomid:"2"}})],1):t._e()],2)},staticRenderFns:[]};a.a=e},GxUa:function(t,a){},jLf8:function(t,a,s){"use strict";var e=s("lKj8"),n=s("DCER");var i=function(t){s("GxUa")},r=s("ybqe")(e.a,n.a,i,"data-v-1c578564",null);a.a=r.exports},lKj8:function(t,a,s){"use strict";var e=s("woOf"),n=s.n(e),i=s("Xxa5"),r=s.n(i),o=s("//Fk"),c=s.n(o),l=s("exGp"),u=s.n(l),d=s("qTHA"),v=s("xzGo"),p=s("dIy6");a.a={components:{},mixins:[p.a],data:function(){return{pageNumber:1,loading:!1,lastPage:!1,shopName:"",state:["退款","退货","换货"],stateName:["等待商家处理","已完成","商家已拒绝","商家已同意","等待商家确认收货","已撤销","确认收货"],list:[]}},methods:{refundDetails:function(t,a){2===a?this.$router.push({path:"/pages/refund/barterDetails",query:{id:t}}):this.$router.push({path:"/pages/refund/refundDetails",query:{id:t}})},getList:function(){var t=this;return u()(r.a.mark(function a(){return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.abrupt("return",new c.a(function(){var a=u()(r.a.mark(function a(s,e){var n,i;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.loading=!0,n=t.pageNumber,a.next=4,v.a.afterService({pageSize:10,pageNumber:n});case 4:i=a.sent,t.loading=!1,1===i.code&&(t.list=t.list.concat(i.data.list),t.lastPage=i.data.lastPage,t.pageNumber++),s();case 8:case"end":return a.stop()}},a,t)}));return function(t,s){return a.apply(this,arguments)}}()));case 1:case"end":return a.stop()}},a,t)}))()}},onReachBottom:function(){this.lastPage||this.getList()},onPullDownRefresh:function(){var t=this;return u()(r.a.mark(function a(){return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.pageNumber=1,t.list=[],t.lastPage=!1,a.next=5,t.getList();case 5:d.a.stopPullDownRefresh();case 6:case"end":return a.stop()}},a,t)}))()},onShow:function(){d.a.getStorageSync("is-list-update")&&(d.a.removeStorageSync("is-list-update"),d.a.startPullDownRefresh())},mounted:function(){var t=this;d.a.getStorage({key:"shopName",success:function(a){t.shopName=a.data}}),this.getList()},onUnload:function(){n()(this,this.$options.data())}}}},["T7Zv"]);