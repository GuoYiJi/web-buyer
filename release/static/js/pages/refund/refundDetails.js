global.webpackJsonp([10],{"5h59":function(t,s,e){"use strict";var a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return t.isFetch?e("div",{staticClass:"wrapper"},[e("div",{staticClass:"refundInfo"},[e("p",{staticClass:"refundState"},[t._v("\n      "+t._s(t.state[t.details.refundType]+","+t.stateName[t.details.state])+"\n    ")]),t._v(" "),t.isFh?e("p",{staticClass:"title"},[t._v("请将商品寄回以下地址并填写物流单号：")]):t._e(),t._v(" "),t.isFh?e("div",{staticClass:"addressBox"},[e("p",{staticClass:"name"},[t._v("收货人："+t._s(t.details.addressName+"     "+t.details.addressMobile))]),t._v(" "),e("p",{staticClass:"address"},[t._v("收货地址："+t._s(t.details.addressValue))])],1):t._e(),t._v(" "),t.isFh?e("div",{staticClass:"logisticsNumber"},[e("p",{staticClass:"text"},[t._v("物流单号")]),t._v(" "),4==t.details.state||6==t.details.state?e("p",{staticClass:"num"}):t._e(),t._v(" "),3==t.details.state?e("div",{staticClass:"label"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.logisticsNum,expression:"logisticsNum"}],staticClass:"number",attrs:{type:"number",eventid:"0"},domProps:{value:t.logisticsNum},on:{input:function(s){s.target.composing||(t.logisticsNum=s.target.value)}}}),t._v(" "),e("span",{staticClass:"btn",attrs:{eventid:"1"},on:{click:function(s){t.sendNum(t.details.id)}}},[t._v("点击发送")])]):t._e()],1):t._e(),t._v(" "),e("p",{staticClass:"title"},[t._v(t._s(t.state[t.details.refundType])+"信息")]),t._v(" "),t._l(t.goods,function(s,a){return e("div",{key:a,staticClass:"refundGoods"},[e("div",{staticClass:"img"},[s.image?e("img",{attrs:{src:s.image,alt:""}}):e("img",{attrs:{src:"../../assets/img/classify/goods.png",alt:""}})]),t._v(" "),e("div",{staticClass:"text"},[e("p",{staticClass:"name"},[t._v(t._s(s.name))]),t._v(" "),e("p",{staticClass:"spec"},[t._v(t._s(s.skuCode)+" / "+t._s(s.num)+"件")])],1)])}),t._v(" "),e("div",{staticClass:"businessInfo"},[e("p",[t._v("卖家："+t._s(t.shopName))]),t._v(" "),e("p",[t._v(t._s(t.state[t.details.refundType])+"原因："+t._s(t.details.result))]),t._v(" "),e("p",[t._v("退款金额："+t._s(t.details.price))]),t._v(" "),e("p",[t._v("申请时间："+t._s(t.details.createTime))]),t._v(" "),e("p",[t._v("编号："+t._s(t.details.orderRefundNo))])],1)],2),t._v(" "),e("div",{staticClass:"btnGroup clearfix"},[0==t.details.state||2==t.details.state?e("div",{staticClass:"revise",attrs:{eventid:"2"},on:{click:t.revise}},[t._v("修改申请")]):t._e(),t._v(" "),0==t.details.state?e("div",{staticClass:"cancel",attrs:{eventid:"3"},on:{click:t.revokes}},[t._v("撤销申请")]):t._e(),t._v(" "),e("div",{staticClass:"cancel contact"},[t._v("联系客服 "),e("button",{attrs:{"open-type":"contact"}},[t._v("联系客服")])],1)]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.wellMsgShow,expression:"wellMsgShow"}],staticClass:"wellMsg"},[t._v("\n    "+t._s(t.msg)+"\n  ")])]):t._e()},staticRenderFns:[]};s.a=a},"5hBY":function(t,s,e){"use strict";var a=e("PWnL"),i=e("5h59");var n=function(t){e("LJfC")},r=e("ybqe")(a.a,i.a,n,"data-v-64d02b30",null);s.a=r.exports},LJfC:function(t,s){},PWnL:function(t,s,e){"use strict";var a=e("woOf"),i=e.n(a),n=e("mvHQ"),r=e.n(n),d=e("Xxa5"),o=e.n(d),c=e("exGp"),u=e.n(c),l=e("qTHA"),v=e("xzGo");s.a={data:function(){return{isFh:!1,msg:"",wellMsgShow:!1,state:["退款","退货","换货"],stateName:["等待商家处理","已完成","商家已拒绝","商家已同意","等待商家确认收货","已撤销"],shopName:"",details:{},goods:[],stateIndex:"",refundTypeIndex:"",logisticsNum:"",isFetch:!1}},methods:{sendNum:function(t){var s=this;return u()(o.a.mark(function e(){var a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(""==s.logisticsNum){e.next=7;break}return e.next=3,v.a.sendLogisticsNum({logistics:s.logisticsNum,orderRefundId:t});case 3:a=e.sent,console.log(a),e.next=8;break;case 7:s.mySetTimeout("请输入物流单号！");case 8:case"end":return e.stop()}},e,s)}))()},revise:function(){var t=this.details.refundType,s=void 0;switch(t){case 0:case 1:s="/pages/refund/refund";break;case 2:s="/pages/refund/barter"}3!=t?this.$router.push({path:s,query:{orderId:this.details.orderId,type:t,price:this.details.price,freight:this.details.freight,data:r()({result:this.details.result,img1:this.details.img1,img2:this.details.img2,img3:this.details.img3})}}):this.$router.push({path:s,query:{orderId:this.orderId,type:t}})},revokes:function(){var t=this;l.a.showModal({title:"撤销申请",content:"您确定要撤销该订单的售后申请吗？",success:function(s){if(s.confirm){var e=t.orderRefundId;v.a.backRefund({orderRefundId:e}).then(function(s){l.a.setStorageSync("is-list-update",!0),l.a.showToast({title:"操作成功",icon:"none",duration:1500}),t.$router.back()}).catch(function(t){l.a.showToast({title:"操作失败"})})}}})},mySetTimeout:function(t){var s=this;s.wellMsgShow=!0,s.msg=t,setTimeout(function(){s.wellMsgShow=!1,s.msg=""},1e3)}},created:function(){var t=this;return u()(o.a.mark(function s(){var e;return o.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:e=t,l.a.getStorage({key:"shopName",success:function(t){e.shopName=t.data}});case 2:case"end":return s.stop()}},s,t)}))()},mounted:function(){var t=this;return u()(o.a.mark(function s(){var e,a,i,n;return o.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return l.a.showLoading({title:"加载中"}),t.orderRefundId=t.$route.query.id,e=t.orderRefundId,s.next=5,v.a.getRefundDetails({orderRefundId:e});case 5:a=s.sent,t.isFetch=!0,l.a.hideLoading(),1===a.code&&(t.details=a.data,t.goods=a.data.goodsList,t.stateIndex=a.data.state,t.refundTypeIndex=a.data.refundType,i=a.data.refundType,n=a.data.state,1!==i&&2!==i||(0!==n&&2!==n&&5!==n||(t.isFh=!1),1!==n&&3!==n&&4!==n||(t.isFh=!0)));case 9:case"end":return s.stop()}},s,t)}))()},onUnload:function(){i()(this,this.$options.data())}}}},["9uQR"]);