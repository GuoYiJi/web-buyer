global.webpackJsonp([18],{"0U+2":function(t,a,s){"use strict";var e=s("woOf"),i=s.n(e),n=s("Xxa5"),l=s.n(n),d=s("exGp"),r=s.n(d),c=s("//Fk"),v=s.n(c),o=s("qTHA"),_=s("xzGo"),u=s("MPTV"),b=s("OoOe"),C=s("z/jT"),p=s("MTpY"),h=s("0Txh"),m=s("dIy6");a.a={mixins:[m.a],components:{obliGat:u.a,senSon:b.a,sendMailTEdT:C.a,succOrder:p.a,cancelledMail:h.a},data:function(){return{shopName:"",stateName:{0:"",1:"待付款",2:"交易取消",3:"已支付",4:"支付失败",5:"等待卖家发货",6:"待收货",7:"已完成",8:"交易关闭",9:"拼团中",10:"售后中"},pingStateName:{1:"未支付",2:"交易取消",3:"已支付",4:"支付失败",5:"拼团成功，待发货",6:"拼团成功，待收货",7:"拼团成功，交易完成",8:"交易关闭",9:"拼单中",10:"售后中"},details:{},skuCodeList:[],xq:null,id:null,hidden:!0}},methods:{handleChildClick:function(t){this.$router.push({path:"/pages/my/orderDetails/obligation",query:{id:t.id,xq:t.state}})},getOrderDetails:function(t){var a=this;return new v.a(function(){var s=r()(l.a.mark(function s(e,i){var n,d,r,c,v,u,b,C,p,h;return l.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return a.hidden=!0,s.next=3,_.a.getOrderDetails({orderId:t});case 3:if(1===(n=s.sent).code){s.next=8;break}return o.a.showToast({title:n.desc,icon:"none"}),i(),s.abrupt("return");case 8:s.prev=8,a.details=n.data,d=a.details.orderGoods||[],r=0;case 12:if(!(r<d.length)){s.next=39;break}c=[],v=0;case 15:if(!(v<d[r].orderGoods.length)){s.next=35;break}u=d[r].orderGoods[v],b={},C=u.skuCode.split(","),b.colorVal=C[0],b.text=C[0]+":"+C[1]+"/"+u.num+"件",p=!1,h=0;case 23:if(!(h<c.length)){s.next=31;break}if(c[h].colorVal!==C[0]){s.next=28;break}return c[h].text+=";"+C[1]+"/"+u.num+"件",p=!0,s.abrupt("break",31);case 28:h++,s.next=23;break;case 31:p||c.push(b);case 32:v++,s.next=15;break;case 35:d[r].sizeTextArray=c;case 36:r++,s.next=12;break;case 39:a.details.orderGoods=d,d&&d.length>0&&d.forEach(function(t,s){a.skuCodeList[s]=[],t.orderGoods.forEach(function(t,e){var i=t.skuCode.split(",")[0],n=t.skuCode.split(",")[1];a.skuCodeList[s][e]=[i,n,t.num,t.num-t.remainNum,t.remainNum]})}),0===n.data.isHasChildren&&0===n.data.isPing&&(a.isRetreat=!0),a.hidden=!1,e(),s.next=49;break;case 46:s.prev=46,s.t0=s.catch(8),i();case 49:case"end":return s.stop()}},s,a,[[8,46]])}));return function(t,a){return s.apply(this,arguments)}}())},handleDeleteClick:function(){var t=this;this.handleOrderDelete(this.details.id).then(function(a){o.a.setStorageSync("isOrderDelete",!0),t.$router.back()})},handleSaleClick:function(t){var a=this.details,s=a.paid,e=a.freight;5===a.state?this.$router.push({path:"/pages/refund/refund",query:{orderId:t,type:0,price:s,freight:e}}):this.$router.push({path:"/pages/refund/applyCustomer",query:{orderId:t,price:s,freight:e,type:0}})},handleCancelClick:function(){this.handleOrderCancel(this.details.id).then(function(t){o.a.setStorageSync("is-ordet-update",!0),o.a.startPullDownRefresh()})},handlePayClick:function(){this.payAsync(this.details.id).then(function(t){o.a.setStorageSync("is-ordet-update",!0),o.a.startPullDownRefresh()})},handleBtnAction:function(){this.handleOrderDone(this.details.id).then(function(t){o.a.setStorageSync("is-ordet-update",!0),o.a.startPullDownRefresh()})}},onPullDownRefresh:function(){this.getOrderDetails(this.id).catch(function(t){console.log(t)}).finally(function(){o.a.stopPullDownRefresh()})},mounted:function(){console.log("sub"),this.id=this.$route.query.id,this.xq=this.$route.query.xq,o.a.startPullDownRefresh();var t=this;o.a.getStorage({key:"shopName",success:function(a){t.shopName=a.data}})},onUnload:function(){i()(this,this.$options.data())}}},"6qIA":function(t,a,s){"use strict";var e=s("0U+2"),i=s("tJd1");var n=function(t){s("vPcd")},l=s("ybqe")(e.a,i.a,n,"data-v-1e30c9c3",null);a.a=l.exports},tJd1:function(t,a,s){"use strict";var e={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return t.hidden?t._e():s("div",{staticClass:"home order-detail--fixed-bottom"},[s("div",{staticClass:"head order-status",class:{"is-success":7===t.details.state}},[s("i",{staticClass:"h-img"}),t._v(" "),s("span",[t._v("\n      "+t._s(t.details.pingOrderId?t.pingStateName[t.details.state]:t.stateName[t.details.state])+"\n      "),t.details.pingOrderId&&6===t.details.state?s("block",[t._v("\n        （还剩"+t._s(t.details.timeEnd)+"自动确认收货）\n      ")]):t._e()],1)],1),t._v(" "),t.details.orderAddress?s("div",{staticClass:"cap-logistics"},[s("div",{staticClass:"cap-logistics__address"},[s("i",{staticClass:"van-icon van-icon-location"}),t._v(" "),s("div",{staticClass:"cap-logistics__address-content"},[s("div",[s("p",{staticClass:"cap-logistics__address-name"},[t._v("收货人："+t._s(t.details.orderAddress.name))]),t._v(" "),s("p",{staticClass:"cap-logistics__address-tel"},[t._v(t._s(t.details.orderAddress.mobile))])],1),t._v(" "),s("p",{staticClass:"cap-logistics__address-detail"},[t._v("收货地址："+t._s(t.details.orderAddress.value+t.details.orderAddress.address))])],1)],1)]):t._e(),t._v(" "),t._e(),t._v(" "),s("div",{staticClass:"cap-order-goods-header"},[s("span",[t._v(t._s(t.shopName))])]),t._v(" "),s("div",{staticClass:"cap-order-goods-lsit"},t._l(t.details.goodsList,function(a,e){return s("div",{key:e,staticClass:"cap-order-goods-card",attrs:{eventid:"0-"+e},on:{click:function(s){t.handleGoodsDetail(a.goodsIdsrc)}}},[s("div",{staticClass:"van-card"},[s("div",{staticClass:"van-card__thumb"},[s("img",{attrs:{src:a.image,alt:""}})]),t._v(" "),s("div",{staticClass:"van-card__content"},[s("div",{staticClass:"van-card__row"},[s("div",{staticClass:"van-card__title"},[t._v(t._s(a.name))])]),t._v(" "),t._l(a.orderGoods,function(a,e){return s("div",{key:e,staticClass:"van-card__row"},[s("div",{staticClass:"van-card__desc"},[t._v(t._s(a.skuCode)+"/"+t._s(a.num)+"件")])])})],2)])])})),t._v(" "),s("div",{staticClass:"van-cell"},[s("div",{staticClass:"van-cell__title"},[s("span",{staticClass:"goods-buy__info"},[t._v("共"),s("span",{staticClass:"goods-buy__num"},[t._v(t._s(t.details.goodsList.length))]),t._v("个款  "),s("span",{staticClass:"goods-buy__num"},[t._v(t._s(t.details.num))]),t._v("件商品  ")])]),t._v(" "),s("div",{staticClass:"van-cell__value"},[s("span",{staticClass:"goods-buy__total"},[t._v("合计:")]),t._v(" "),s("span",{staticClass:"goods-buy__price"},[t._v("￥"+t._s(t.details.paid))]),t._v(" "),0===t.details.expressWay?s("span",{staticClass:"cap-express__fee"},[t._v("（含运费￥"+t._s(t.details.freight)+"）")]):t._e()])]),t._v(" "),t._l(t.details.children,function(a,e){return s("div",{key:e,staticClass:"van-cell van-hairline",attrs:{eventid:"1-"+e},on:{click:function(s){t.handleChildClick(a)}}},[s("div",{staticClass:"van-cell__title"},[s("span",[t._v("子订单编号("+t._s(t.stateName[a.state])+"): "+t._s(a.orderNo))])]),t._v(" "),s("i",{staticClass:"van-icon van-icon-arrow van-cell__right-icon"})],1)}),t._v(" "),s("div",{staticClass:"van-cell van-hairline"},[s("div",{staticClass:"van-cell__title"},[t._v("买家留言："+t._s(t.details.remark?t.details.remark:"没有留言信息！"))])]),t._v(" "),t._l(t.details.orderGoods,function(a,e){return s("div",{key:e,staticClass:"nav"},[s("div",{staticClass:"info"},[(a.image,s("img",{staticClass:"n-img",attrs:{src:"http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg"}})),t._v(" "),s("div",{staticClass:"n-right"},[s("p",{staticClass:"n-title"},[t._v(t._s(a.name))]),t._v(" "),t._l(a.sizeTextArray,function(a,e){return e<=2?s("p",{key:e,staticClass:"yardage"},[t._v(t._s(a.text))]):t._e()})],2)]),t._v(" "),s("div",{staticClass:"below"},[s("div",{staticClass:"total"},[s("p",{staticClass:"t-left"},[t._v("共\n          "),s("span",{staticClass:"piece"},[t._v(t._s(t.details.num))]),t._v(" 件商品\n        ")]),t._v(" "),0===t.details.expressWay?s("p",{staticClass:"t-freight"},[t._v("（含运费￥"+t._s(t.details.freight)+"）")]):t._e(),t._v(" "),s("p",{staticClass:"t-right"},[t._v("合计:\n          "),s("span",{staticClass:"money"},[t._v("￥"+t._s(t.details.count))])])],1),t._v(" "),5===t.details.state&&t.details.isHasChildren?s("div",{staticClass:"b-box"},[s("li",{staticClass:"b-item b-title"},[s("span",{staticClass:"b-text"},[t._v("颜色")]),t._v(" "),s("span",{staticClass:"b-text"},[t._v("码数")]),t._v(" "),s("span",{staticClass:"b-text"},[t._v("总件数")]),t._v(" "),s("span",{staticClass:"b-text"},[t._v("已发")]),t._v(" "),s("span",{staticClass:"b-text"},[t._v("未发")])]),t._v(" "),t._l(t.skuCodeList[e],function(a,e){return s("li",{key:e,staticClass:"b-item b-color"},t._l(a,function(a,e){return s("span",{key:e,staticClass:"b-text"},[t._v(t._s(a))])}))})],2):t._e(),t._v(" "),5===t.details.state&&t.details.isHasChildren?s("div",{staticClass:"child-num"},t._l(t.details.children,function(a,e){return s("div",{key:e,staticClass:"orders"},[s("p",{staticClass:"o-item"},[s("span",[t._v("子订单编号（"+t._s(t.stateName[a.state])+"）："+t._s(a.orderNo))]),t._v(" "),s("i",{staticClass:"o-img"})],1)],1)})):t._e(),t._v(" "),s("p",{staticClass:"message"},[t._v("买家留言："+t._s(t.details.remark?t.details.remark:"没有留言信息！"))])],1)])}),t._v(" "),s("div",{staticClass:"goods-pay"},[s("div",{staticClass:"van-cell"},[s("div",{staticClass:"van-cell__value van-cell__value--alone"},[s("div",{staticClass:"goods-pay__cell"},[s("div",{staticClass:"goods-pay__cell-title"},[t._v("商品总价")]),t._v(" "),s("div",{staticClass:"goods-pay__cell-value"},[t._v("￥"+t._s(t.details.count-t.details.freight))])]),t._v(" "),s("div",{staticClass:"goods-pay__cell"},[s("div",{staticClass:"goods-pay__cell-title"},[t._v("优惠劵折扣")]),t._v(" "),s("div",{staticClass:"goods-pay__cell-value"},[t._v("-￥"+t._s(t.details.couponMoney?t.details.couponMoney:0))])]),t._v(" "),0===t.details.expressWay?s("div",{staticClass:"goods-pay__cell"},[s("div",{staticClass:"goods-pay__cell-title"},[t._v("运费")]),t._v(" "),s("div",{staticClass:"goods-pay__cell-value"},[t._v("+￥"+t._s(t.details.freight))])]):t._e()])]),t._v(" "),s("div",{staticClass:"van-cell van-hairline"},[s("div",{staticClass:"val-cell__title cap-order__inner"},[t.details.parent?s("p",{staticClass:"s-text"},[t._v("父订单编号："+t._s(t.details.parent.orderNo))]):t._e(),t._v(" "),s("p",{staticClass:"s-text"},[t._v("订单编号："+t._s(t.details.orderNo))]),t._v(" "),s("p",{staticClass:"s-text"},[t._v("下单时间："+t._s(t.details.createTime))]),t._v(" "),t.details.payTime?s("p",{staticClass:"s-text"},[t._v("支付时间："+t._s(t.details.payTime))]):t._e(),t._v(" "),t.details.pingTime?s("p",{staticClass:"s-text"},[t._v("拼团时间："+t._s(t.details.pingTime))]):t._e(),t._v(" "),t.details.deliverTime?s("p",{staticClass:"s-text"},[t._v("发货时间："+t._s(t.details.deliverTime))]):t._e()],1)])]),t._v(" "),t.details.children.length?t._e():s("block",[t.details.pingOrderId?s("block",[5===t.details.state?s("div",{staticClass:"submit-bar van-hairline--top van-submit-bar"},[s("div",{staticClass:"van-submit-bar__bar"},[s("div",{staticClass:"van-submit-bar__avatars"},t._l(t.details.pingUser,function(t,a){return s("span",{key:a,staticClass:"van-submit-bar__avatar",style:{"background-image":"url("+t.head+")"}})}))])]):t._e(),t._v(" "),6===t.details.state?s("div",{staticClass:"submit-bar van-hairline--top van-submit-bar"},[s("div",{staticClass:"van-submit-bar__bar"},[s("div",{staticClass:"van-submit-bar__avatars"},t._l(t.details.pingUser,function(t,a){return s("span",{key:a,staticClass:"van-submit-bar__avatar",style:{"background-image":"url("+t.head+")"}})})),t._v(" "),s("div",{staticClass:"van-button van-button--default van-button--normal",attrs:{eventid:"2"},on:{click:function(a){t.handleOrderAfterSale(t.details.id,t.details.paid,t.details.freight,1)}}},[s("span",{staticClass:"van-button__text"},[t._v("申请售后")])]),t._v(" "),s("div",{staticClass:"van-button van-button--default van-button--normal",attrs:{eventid:"3"},on:{click:t.handleCancelClick}},[s("span",{staticClass:"van-button__text"},[t._v("查看物流")])]),t._v(" "),s("div",{staticClass:"van-button van-button--danger van-button--normal",attrs:{eventid:"4"},on:{click:t.handleBtnAction}},[s("span",{staticClass:"van-button__text"},[t._v("确认收货")])])])]):t._e(),t._v(" "),7===t.details.state?s("div",{staticClass:"submit-bar van-hairline--top van-submit-bar"},[s("div",{staticClass:"van-submit-bar__bar"},[s("div",{staticClass:"van-submit-bar__avatars"},t._l(t.details.pingUser,function(t,a){return s("span",{key:a,staticClass:"van-submit-bar__avatar",style:{"background-image":"url("+t.head+")"}})})),t._v(" "),s("div",{staticClass:"van-button van-button--danger van-button--normal",attrs:{eventid:"5"},on:{click:t.handleDeleteClick}},[s("span",{staticClass:"van-button__text"},[t._v("删除订单")])])])]):t._e()]):s("block",[1===t.details.state?s("div",{staticClass:"submit-bar van-hairline--top van-submit-bar"},[s("div",{staticClass:"van-submit-bar__bar"},[s("div",{staticClass:"van-submit-bar__text"},[s("span",[t._v("合计：")]),t._v(" "),s("span",{staticClass:"van-submit-bar__price"},[t._v("￥"+t._s(t.details.paid))])]),t._v(" "),s("div",{staticClass:"van-button van-button--default van-button--normal",attrs:{eventid:"6"},on:{click:t.handleCancelClick}},[s("span",{staticClass:"van-button__text"},[t._v("取消订单")])]),t._v(" "),s("div",{staticClass:"van-button van-button--danger van-button--normal",attrs:{eventid:"7"},on:{click:t.handlePayClick}},[s("span",{staticClass:"van-button__text"},[t._v("马上支付")])])])]):t._e(),t._v(" "),2===t.details.state?s("div",{staticClass:"submit-bar van-hairline--top van-submit-bar"},[s("div",{staticClass:"van-submit-bar__bar"},[s("div",{staticClass:"van-submit-bar__text"},[t._v("\n             \n          ")]),t._v(" "),s("div",{staticClass:"van-button van-button--danger van-button--normal",attrs:{eventid:"8"},on:{click:t.handleDeleteClick}},[s("span",{staticClass:"van-button__text"},[t._v("删除订单")])])])]):t._e(),t._v(" "),5===t.details.state?s("div",{staticClass:"submit-bar van-hairline--top van-submit-bar"},[s("div",{staticClass:"van-submit-bar__bar"},[s("div",{staticClass:"van-submit-bar__text"},[t._v(" ")]),t._v(" "),s("div",{staticClass:"van-button van-button--danger van-button--normal",attrs:{eventid:"9"},on:{click:function(a){t.handleSaleClick(t.details.id)}}},[s("span",{staticClass:"van-button__text"},[t._v("申请退款")])])])]):t._e(),t._v(" "),6===t.details.state?s("div",{staticClass:"submit-bar van-hairline--top van-submit-bar"},[s("div",{staticClass:"van-submit-bar__bar"},[s("div",{staticClass:"van-submit-bar__text"},[t._v(" ")]),t._v(" "),s("div",{staticClass:"van-button van-button--default van-button--normal",attrs:{eventid:"10"},on:{click:function(a){t.handleOrderAfterSale(t.details.id,t.details.paid,t.details.freight,1)}}},[s("span",{staticClass:"van-button__text"},[t._v("申请售后")])]),t._v(" "),s("div",{staticClass:"van-button van-button--default van-button--normal",attrs:{eventid:"11"},on:{click:function(a){t.handleLogistics(t.details.id)}}},[s("span",{staticClass:"van-button__text"},[t._v("查看物流")])]),t._v(" "),s("div",{staticClass:"van-button van-button--danger van-button--normal",attrs:{eventid:"12"},on:{click:t.handleBtnAction}},[s("span",{staticClass:"van-button__text"},[t._v("确认收货")])])])]):t._e()])],1)],2)},staticRenderFns:[]};a.a=e},vPcd:function(t,a){}},["6afk"]);