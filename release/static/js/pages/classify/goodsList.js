global.webpackJsonp([30],{JL3A:function(t,s,e){"use strict";var i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"wrapper"},[e("zan-popup",{attrs:{type:"right",show:t.filterVisible,eventid:"5",mpcomid:"3"},on:{close:function(s){t.handleToggleModal(!1)}}},[e("div",{staticClass:"sf_layer_con"},[e("div",{staticClass:"title",attrs:{eventid:"0"},on:{click:function(s){t.handleToggleModal(!1)}}},[e("i",{staticClass:"zuo"}),t._v(" "),e("span",{staticClass:"screen"},[t._v("筛选")])],1),t._v(" "),e("div",{staticClass:"item-box"},[t.hasLabel?e("mod-list",{attrs:{list:t.tabsList1,title:"品类",eventid:"1",mpcomid:"0"},on:{change:function(s){t.handleModChange(arguments,0)}}}):t._e(),t._v(" "),e("mod-list",{ref:"modList2Ref",attrs:{list:t.tabsList2,title:"货期情况",eventid:"2",mpcomid:"1"},on:{change:function(s){t.handleModChange(arguments,1)}}}),t._v(" "),e("mod-list",{ref:"modListPriceRef",attrs:{list:t.tabsList3,title:"价格区间",type:"goods",mpcomid:"2"}})],1),t._v(" "),e("div",{staticClass:"f_btn"},[e("p",{staticClass:"reset",attrs:{eventid:"3"},on:{click:t.handleRest}},[t._v("重置")]),t._v(" "),e("p",{staticClass:"confirm",attrs:{eventid:"4"},on:{click:t.handleConfirm}},[t._v("确定")])],1)])]),t._v(" "),e("div",{staticClass:"search-bar"},[e("div",{staticClass:"search-bar__form"},[e("div",{staticClass:"search-bar__box"},[e("i",{staticClass:"icon-search"}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword,expression:"keyword"}],staticClass:"search-bar__input",attrs:{type:"text",placeholder:"请搜索商品","confirm-type":"search",eventid:"6"},domProps:{value:t.keyword},on:{confirm:function(s){t.search()},input:function(s){s.target.composing||(t.keyword=s.target.value)}}})],1)]),t._v(" "),e("div",{staticClass:"search-bar__cancel-btn",attrs:{eventid:"7"},on:{click:function(s){t.search()}}},[t._v("搜索")])]),t._v(" "),e("ul",{staticClass:"sortTabs"},[e("li",{staticClass:"sortItem",class:{active:1==t.sortTabs,fx:0==t.sortStyle,fs:1==t.sortStyle},attrs:{eventid:"8"},on:{click:function(s){t.sortFn(1,t.sortTime)}}},[t._v("综合")]),t._v(" "),e("li",{staticClass:"sortItem",class:{active:2==t.sortTabs,fx:2==t.sortStyle,fs:3==t.sortStyle},attrs:{eventid:"9"},on:{click:function(s){t.sortFn(2,t.sortSales)}}},[t._v("销量")]),t._v(" "),e("li",{staticClass:"sortItem",class:{active:3==t.sortTabs,fx:4==t.sortStyle,fs:5==t.sortStyle},attrs:{eventid:"10"},on:{click:function(s){t.sortFn(3,t.sortPrice)}}},[t._v("价格")]),t._v(" "),e("li",{staticClass:"sortItem sx",class:{active:t.hasFilter},attrs:{eventid:"11"},on:{click:t.handleFilterClick}},[t._v("筛选")]),t._v(" "),e("li",{staticClass:"sortItem menu",attrs:{eventid:"12"},on:{click:function(s){t.showType=!t.showType}}})],1),t._v(" "),e("div",{staticClass:"goodsList clearfix"},[t._l(t.goodsList,function(s,i){return t.showType?e("div",{key:i,staticClass:"item",attrs:{eventid:"13-"+i},on:{click:function(e){t.clickItem(s)}}},[e("div",{staticClass:"img"},[s.image?e("img",{attrs:{src:s.image,alt:"",mode:"aspectFill"}}):e("img",{attrs:{src:"../../assets/img/classify/goods.png",alt:""}})]),t._v(" "),e("div",{staticClass:"text"},[e("p",{staticClass:"title zan-ellipsis--l2",domProps:{textContent:t._s(s.name)}}),t._v(" "),e("p",{staticClass:"intro clearfix"},[e("span",{staticClass:"qh"},[t._v("期货:"+t._s(s.delivery))]),t._v(" "),e("span",{staticClass:"xl"},[t._v("销量:"+t._s(9999==s.sellCount?"9999+":s.sellCount))])]),t._v(" "),e("p",{staticClass:"price-btn"},[e("span",{staticClass:"price"},[t._v("批货价:￥"+t._s(s.sellPrice))]),t._v(" "),e("span",{staticClass:"btn"},[t._v("立即采购")])])],1)]):t._e()}),t._v(" "),t._l(t.goodsList,function(s,i){return t.showType?t._e():e("div",{key:i,staticClass:"line-item",attrs:{eventid:"14-"+i},on:{click:function(e){t.clickItem(s)}}},[e("div",{staticClass:"img"},[s.image?e("img",{attrs:{src:s.image,alt:"",mode:"aspectFill"}}):e("img",{attrs:{src:"../../assets/img/classify/goods.png",alt:""}})]),t._v(" "),e("div",{staticClass:"text"},[e("p",{staticClass:"title"},[t._v(t._s(s.name))]),t._v(" "),e("p",{staticClass:"qh"},[t._v("期货:"+t._s(s.delivery))]),t._v(" "),e("p",{staticClass:"xl"},[t._v("销量:"+t._s(9999==s.sellCount?"9999+":s.sellCount))]),t._v(" "),e("p",{staticClass:"price-btn clearfix"},[e("span",{staticClass:"price"},[t._v("批货价:￥"+t._s(s.sellPrice))]),t._v(" "),e("span",{staticClass:"btn"},[t._v("立即采购")])])],1)])})],2),t._v(" "),t.loading||t.goodsList.length||!t.lastPage?t._e():e("div",[t._m(0)]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}]},[e("zan-loading",{attrs:{mpcomid:"4"}})],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.wellMsgShow,expression:"wellMsgShow"}],staticClass:"wellMsg"},[t._v("\n    "+t._s(t.msg)+"\n  ")])],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"no_goods"},[s("div",{staticClass:"no_goods_img"}),this._v(" "),s("div",{staticClass:"no_goods_tip"},[this._v("没有相关的商品结果哦~~")])])}]};s.a=i},XdZ8:function(t,s,e){"use strict";var i=e("af78"),a=e("JL3A");var o=function(t){e("w6+b")},l=e("ybqe")(i.a,a.a,o,"data-v-24c3009e",null);s.a=l.exports},af78:function(t,s,e){"use strict";var i=e("woOf"),a=e.n(i),o=e("Xxa5"),l=e.n(o),n=e("exGp"),r=e.n(n),c=(e("qTHA"),e("xzGo")),d=e("xwug");s.a={components:{modList:d.a},data:function(){return{lastPage:!1,loading:!1,showType:!0,keyword:"",wellMsgShow:!1,msg:"",goodsList:[],sortTabs:0,sortTime:0,sortSales:2,sortPrice:4,sortStyle:null,state:1,pageSize:10,pageNumber:1,totalPage:null,filterVisible:!1,hasFilter:!1,labelId:null,deliveryId:null,choice:{},tabsList1:[],tabsList2:[],tabsList3:[{name:"0-70"},{name:"3-5天"},{name:"6-10天"}]}},methods:{sortFn:function(t,s){1!==t&&this.goodsList.length&&(this.sortTabs=t,0===s&&(this.sortTime=this.sortStyle=1),1===s&&(this.sortTime=this.sortStyle=0),2===s&&(this.sortSales=this.sortStyle=3),3===s&&(this.sortSales=this.sortStyle=2),4===s&&(this.sortPrice=this.sortStyle=5),5===s&&(this.sortPrice=this.sortStyle=4),this.ob=s,this.pageNumber=1,this.getGoodsAsync())},clickItem:function(t){console.log(t),this.$router.push({path:"/pages/home/details/details",query:{goodsId:t.id}})},search:function(){this.keyword?this.$router.push({path:"/pages/search/search",query:{key:this.keyword}}):this.mySetTimeout("请输入关键词")},mySetTimeout:function(t){var s=this;s.wellMsgShow=!0,s.msg=t,setTimeout(function(){s.wellMsgShow=!1,s.msg=""},1e3)},handleFilterClick:function(){(this.hasFilter||this.goodsList.length)&&this.handleToggleModal(!0)},handleToggleModal:function(t){this.filterVisible=t},handleConfirm:function(){var t=this.labelId,s=this.deliveryId;this.hasFilter=!0,this.handleToggleModal(!1),this.choice=this.$refs.modListPriceRef.choice,this.pageNumber=1,this.getGoodsAsync({labelId:t,deliveryId:s})},handleRest:function(){this.hasFilter=!1,this.deliveryId=null,this.pageNumber=1,this.choice={min:null,max:null},this.getGoodsAsync(),this.$refs.modList2Ref.current=-1,this.$refs.modList3Ref.currentChoice=-1},handleModChange:function(t,s){var e=t.length?t[0]:0;switch(s){case 0:this.labelId=this.tabsList1[e].id;break;case 1:this.deliveryId=this.tabsList2[e].id}},getGoodsAsync:function(t){var s=this;return r()(l.a.mark(function t(){var e,i,a,o,n,r,d,h,v,m,u,g,_,p;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=s.$route.query.id,i=s.state,a=s.ob,o=s.pageSize,n=s.pageNumber,r=s.deliveryId,d=s.choice,h=d.min,v=d.max,m={labelId:e,state:i,ob:a,pageSize:o,pageNumber:n,min:h,max:v,deliveryId:r},1===n&&(s.lastPage=!1,s.goodsList=[]),s.loading=!0,t.next=8,c.a.getGoods(m);case 8:u=t.sent,s.loading=!1,1===u.code&&(g=u.data,_=g.list,p=g.lastPage,s.goodsList=s.goodsList.concat(_),s.lastPage=p,s.pageNumber++);case 11:case"end":return t.stop()}},t,s)}))()}},onReachBottom:function(){this.lastPage||this.getGoodsAsync()},mounted:function(){var t=this;return r()(l.a.mark(function s(){return l.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:t.sortTabs=1,t.$route.query.id&&(t.isSearch=!1,t.ob=t.sortTime,t.getGoodsAsync()),c.a.getTabs({types:"4"}).then(function(s){t.tabsList2=s.data});case 3:case"end":return s.stop()}},s,t)}))()},onUnload:function(){a()(this,this.$options.data())}}},"w6+b":function(t,s){}},["arZe"]);