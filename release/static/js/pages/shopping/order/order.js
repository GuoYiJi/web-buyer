global.webpackJsonp([8],{"2FmL":function(t,e,s){"use strict";var a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"index-view nav"},[s("div",{staticClass:"head"},[s("span",{staticClass:"delivery",class:{active:0==t.expressWay},attrs:{eventid:"0"},on:{click:function(e){t.Delivery(0)}}},[t._v("快速邮寄")]),t._v(" "),s("span",{staticClass:"delivery",class:{active:1==t.expressWay},attrs:{eventid:"1"},on:{click:function(e){t.Delivery(1)}}},[t._v("物流到付")])]),t._v(" "),s("div",{staticClass:"address",attrs:{eventid:"2"},on:{click:function(e){t.toOpen("addressBox")}}},[s("i",{staticClass:"dt"}),t._v(" "),s("p",{staticClass:"add_text"},[t._v("收货人："+t._s(t.name)+"  "+t._s(t.phone))]),t._v(" "),s("p",{staticClass:"add_text"},[t._v("收货地址："+t._s(t.addressDetails))]),t._v(" "),0==t.addressList.length?s("p",{staticClass:"add_text"},[t._v("添加收货地址")]):t._e()],1),t._v(" "),s("div",{staticClass:"cap-order-goods"},[s("div",{staticClass:"cap-order-goods-header"},[s("span",[t._v(t._s(t.shopName))])]),t._v(" "),s("div",{staticClass:"cap-order-goods-lsit"},t._l(t.buy_list,function(e,a){return s("div",{key:a,staticClass:"cap-order-goods-card"},[s("div",{staticClass:"van-card"},[s("div",{staticClass:"van-card__thumb"},[s("img",{attrs:{src:e.image,mode:"aspectFill"}})]),t._v(" "),s("div",{staticClass:"van-card__content"},[s("div",{staticClass:"van-card__row"},[s("div",{staticClass:"van-card__title"},[t._v(t._s(e.name))])]),t._v(" "),t._l(e.skuCode,function(e,a){return s("div",{key:a,staticClass:"van-card__row"},[s("div",{staticClass:"van-card__desc"},[t._v("\n                  "+t._s(e)+"\n                ")])])})],2)])])})),t._v(" "),s("div",{staticClass:"van-cell"},[s("div",{staticClass:"van-cell__title"},[s("span",{staticClass:"goods-buy__info"},[t._v("共"),s("span",{staticClass:"goods-buy__num"},[t._v(t._s(t.totalPack))]),t._v("个款  "),s("span",{staticClass:"goods-buy__num"},[t._v(t._s(t.totalNum))]),t._v("件商品  ")])]),t._v(" "),s("div",{staticClass:"van-cell__value"},[s("span",{staticClass:"goods-buy__total"},[t._v("合计:")]),t._v(" "),s("span",{staticClass:"goods-buy__price"},[t._v("￥"+t._s(t.totalPrice))])])]),t._v(" "),s("div",{staticClass:"cap-order-goods-message van-cell van-hairline"},[t._m(0),t._v(" "),s("div",{staticClass:"van-cell__value"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.remark,expression:"remark"}],attrs:{type:"textarea",placeholder:"选填（填写内容已和卖家协商确认）",eventid:"3"},domProps:{value:t.remark},on:{input:function(e){e.target.composing||(t.remark=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"van-cell van-cell--clickable van-hairline",attrs:{eventid:"4"},on:{click:function(e){t.couponBox=!0}}},[t._m(1),t._v(" "),s("div",{staticClass:"van-cell__value"},[t.couponPrice?s("span",[t._v("-￥"+t._s(t.couponPrice))]):t._e()]),t._v(" "),s("i",{staticClass:"van-icon van-icon-arrow van-cell__right-icon"})],1),t._v(" "),0==t.expressWay?s("div",{staticClass:"van-cell van-hairline"},[t._m(2),t._v(" "),s("div",{staticClass:"van-cell__value"},[s("span",[t._v("+￥"+t._s(t.calculate))])])]):t._e()]),t._v(" "),s("div",{staticClass:"foot"},[s("p",{staticClass:"f_text"},[t._v("合计:\n        "),s("span",{staticClass:"ft1"},[t._v("￥"+t._s(t.totalPrice-t.couponPrice))])]),t._v(" "),s("span",{staticClass:"f_btn",attrs:{eventid:"5"},on:{click:function(e){t.buy()}}},[t._v("马上支付")])],1),t._v(" "),s("zan-popup",{attrs:{show:t.selectAddress,type:"center",mpcomid:"0"}},[s("div",{staticClass:"address-model"},[s("div",{staticClass:"address-model__hd"},[s("span",{staticClass:"title"},[t._v("收货地址")]),t._v(" "),s("i",{staticClass:"close-icon",attrs:{eventid:"6"},on:{click:function(e){t.toClose("selectAddress")}}})],1),t._v(" "),s("div",{staticClass:"address-model__bd"},[s("scroll-view",{staticClass:"address-list"},[s("div",{staticClass:"select-cont",staticStyle:{height:"100%",overflow:"auto"}},[s("div",{staticClass:"address-list__scroll"},t._l(t.addressList,function(e,a){return s("div",{key:a,staticClass:"item"},[s("p",{staticClass:"name"},[t._v(t._s(e.name+"  "+e.mobile))]),t._v(" "),s("p",{staticClass:"details"},[t._v("\n                    收货地址："+t._s(e.value+e.address)+"\n                  ")]),t._v(" "),s("div",{staticClass:"select"},[s("span",{staticClass:"check",class:{active:1==e.isChoice},attrs:{eventid:"7-"+a},on:{click:function(s){t.defaultAddress(e.id,a)}}},[t._v("默认地址")]),t._v(" "),s("span",{staticClass:"edit",attrs:{eventid:"8-"+a},on:{click:function(s){t.editAddress(e)}}},[t._v("编辑")])])],1)}))])])],1),t._v(" "),s("div",{staticClass:"address-model__ft"},[s("span",{staticClass:"btn",attrs:{eventid:"9"},on:{click:function(e){t.handleAddressAdd()}}},[t._v("添加地址")])])])]),t._v(" "),s("zan-popup",{attrs:{show:t.addAddress,type:"center",mpcomid:"1"}},[s("div",{staticClass:"address-model"},[s("div",{staticClass:"address-model__hd"},[s("span",{staticClass:"title"},[t._v("收货地址")]),t._v(" "),s("i",{staticClass:"close-icon",attrs:{eventid:"10"},on:{click:function(e){t.toClose("addAddress")}}})],1),t._v(" "),s("div",{staticClass:"address-model__bd"},[s("div",{staticClass:"address-add"},[s("p",{staticClass:"tc_text"},[s("span",{staticClass:"tc_name group-label-block"},[t._v("收货人:")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.addObj.tc_name,expression:"addObj.tc_name"}],staticClass:"group-input-block tc_namet",attrs:{type:"text",eventid:"11"},domProps:{value:t.addObj.tc_name},on:{input:function(e){e.target.composing||(t.addObj.tc_name=e.target.value)}}})]),t._v(" "),s("p",{staticClass:"tc_text"},[s("span",{staticClass:"tc_phone group-label-block"},[t._v("联系电话:")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.addObj.tc_phone,expression:"addObj.tc_phone"}],staticClass:"group-input-block tc_phonet",attrs:{type:"text",eventid:"12"},domProps:{value:t.addObj.tc_phone},on:{input:function(e){e.target.composing||(t.addObj.tc_phone=e.target.value)}}})]),t._v(" "),s("p",{staticClass:"tc_text"},[s("span",{staticClass:"tc_region group-label-block"},[t._v("所在地址:")]),t._v(" "),s("picker",{staticClass:"group-input-block region",attrs:{mode:"region",value:t.region,eventid:"13"},on:{change:t.bindRegionChange}},[s("view",{staticClass:"picker"},[t._v("\n                  "+t._s(t.region.length>0?t.region[0]+"-"+t.region[1]+"-"+t.region[2]:"所在地址:")+"\n                ")])])],1),t._v(" "),s("p",{staticClass:"tc_text"},[s("span",{staticClass:"tc_detailed group-label-block"},[t._v("详细地址:")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.addObj.tc_detailedt,expression:"addObj.tc_detailedt"}],staticClass:"group-input-block tc_detailedt",attrs:{type:"text",eventid:"14"},domProps:{value:t.addObj.tc_detailedt},on:{input:function(e){e.target.composing||(t.addObj.tc_detailedt=e.target.value)}}})])],1)]),t._v(" "),s("div",{staticClass:"address-model__ft",style:{backgroundColor:"#fff"}},[s("span",{staticClass:"btn",attrs:{eventid:"15"},on:{click:function(e){t.popt()}}},[t._v("完成")])])])]),t._v(" "),s("zan-popup",{attrs:{show:t.couponBox,type:"bottom",mpcomid:"2"}},[s("div",{staticClass:"T-coupon"},[s("div",{staticClass:"c-head"},[s("p",{staticClass:"c-text",attrs:{eventid:"16"},on:{click:function(e){t.toClose("couponBox")}}},[t._v("取消")])],1),t._v(" "),s("scroll-view",{staticStyle:{height:"100%"},attrs:{"scroll-y":"",bindscrolltolower:"handleCouponScroll"}},[s("div",{staticClass:"van-coupon-list__list"},t._l(t.couponList,function(e,a){return s("div",{key:a,staticClass:"coupon",attrs:{eventid:"17-"+a},on:{click:function(s){t.selectCoupon(e.id,e.price)}}},[s("img",{staticClass:"bg hasCoupon",attrs:{src:"../../../assets/img/marketingMgt/yhq.png",mode:"aspectFill"}}),t._v(" "),s("div",{staticClass:"coupon__content"},[s("div",{staticClass:"left coupon__content-inner"},[s("p",{staticClass:"money"},[t._v("￥\n                    "),s("span",{staticClass:"money1"},[t._v(t._s(e.price))])]),t._v(" "),s("div",{staticClass:"coupon__desc"},[s("p",{staticClass:"discount"},[t._v(t._s(e.name))]),t._v(" "),s("p",{staticClass:"purchases"},[t._v("购满"+t._s(e.limitCount)+"可使用")])],1)],1),t._v(" "),s("div",{staticClass:"right"},[t._v(t._s(t.couponId===e.id?"已使用":"未使用"))])]),t._v(" "),s("p",{staticClass:"coupon__time"},[t._v("有效期 "+t._s(e.startTime)+"-"+t._s(e.endTime))])],1)}))])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"van-cell__title"},[e("span",[this._v("买家留言：")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"van-cell__title"},[e("span",[this._v("优惠券")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"van-cell__title"},[e("span",[this._v("运费")])])}]};e.a=a},"4a1k":function(t,e,s){"use strict";var a=s("A2bt"),n=s("2FmL");var i=function(t){s("OERp")},r=s("ybqe")(a.a,n.a,i,"data-v-aa88d28a",null);e.a=r.exports},A2bt:function(t,e,s){"use strict";var a=s("woOf"),n=s.n(a),i=s("Gu7T"),r=s.n(i),d=s("mvHQ"),o=s.n(d),c=s("Dd8w"),l=s.n(c),u=s("//Fk"),p=s.n(u),v=s("Xxa5"),_=s.n(v),m=s("exGp"),h=s.n(m),g=s("qTHA"),f=s("QmSG"),C=s("xzGo"),b=s("e0QN"),k=s("zQ/8"),y=s("Zm3I");e.a={mixins:[k.a],components:{},data:function(){return{buyType:null,selectAddressId:"",region:[],customItem:"全部",couponBox:!1,selectAddress:!1,addAddress:!1,addressBox:!1,remark:"",goodsInfo:{},buy_list:[],name:"",phone:"",addressDetails:"",totalPack:0,totalPrice:0,totalNum:0,expressWay:0,addressId:"",addressList:[],skuObj:"",skuCode:"",couponId:"",couponList:[],pageNumber:1,couponPrice:"",sessionId:"",pingId:null,pingOrderId:null,addObj:{tc_name:"",tc_phone:"",tc_detailedt:""},calculate:"0.00",shopName:""}},methods:{toOpen:function(t){this[t]=!0,this.addressList.length>0?(this.addAddress=!1,this.selectAddress=!0):(this.addAddress=!0,this.selectAddress=!1)},toClose:function(t){this[t]=!1,this.getAddress()},popt:function(){var t=this;return h()(_.a.mark(function e(){return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!t.addObj.addressId){e.next=7;break}return g.a.showLoading({title:"更新中"}),e.next=5,t.editres();case 5:e.next=10;break;case 7:return g.a.showLoading({title:"添加中"}),e.next=10,t.addres();case 10:return e.next=12,t.getAddress();case 12:g.a.hideLoading(),t.addObj={tc_name:"",tc_phone:"",tc_detailedt:""},e.next=18;break;case 16:e.prev=16,e.t0=e.catch(0);case 18:case"end":return e.stop()}},e,t,[[0,16]])}))()},addres:function(){var t=this;return h()(_.a.mark(function e(){return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new p.a(function(){var e=h()(_.a.mark(function e(s,a){var n;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.region.join(","),n={name:t.addObj.tc_name,mobile:t.addObj.tc_phone,address:t.addObj.tc_detailedt,value:t.region.join(","),isChoice:1,areaId:t.recode},t.validate(n).then(function(){var e=h()(_.a.mark(function e(i){return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.addres(n);case 2:1===e.sent.code?(g.a.showToast({title:"添加成功",duration:1500,icon:"none"}),setTimeout(function(){t.addAddress=!1,s()},1500)):a();case 4:case"end":return e.stop()}},e,t)}));return function(t){return e.apply(this,arguments)}}()).catch(function(t){a()});case 3:case"end":return e.stop()}},e,t)}));return function(t,s){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}},e,t)}))()},editres:function(){var t=this;return new p.a(function(){var e=h()(_.a.mark(function e(s,a){var n;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n={name:t.addObj.tc_name,mobile:t.addObj.tc_phone,address:t.addObj.tc_detailedt,value:t.region.join(","),isChoice:1,areaId:t.recode,addressId:t.addObj.addressId},t.validate(n).then(function(){var e=h()(_.a.mark(function e(a){return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.editddres(n);case 2:1===e.sent.code&&(g.a.showToast({title:"更新地址成功",icon:"none",mask:!0,duration:1500}),setTimeout(function(){t.addAddress=!1,s()},1500));case 4:case"end":return e.stop()}},e,t)}));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}},e,t)}));return function(t,s){return e.apply(this,arguments)}}())},editAddress:function(t){this.selectAddress=!1,this.addAddress=!0,this.addObj.tc_name=t.name,this.addObj.tc_phone=t.mobile,this.addObj.tc_detailedt=t.address,this.region=t.value.split(","),this.addObj.addressId=t.id},handleAddressAdd:function(){this.addObj={tc_name:"",tc_phone:"",tc_detailedt:""},this.selectAddress=!1,this.addAddress=!0},defaultAddress:function(t,e){var s=this;return h()(_.a.mark(function a(){var n,i,r,d;return _.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(n=s,s.selectAddressId!==e){a.next=3;break}return a.abrupt("return");case 3:for(i=s.addressList[e],r=0;r<n.addressList.length;r++)n.addressList[r].isChoice=r===e?1:0;return a.next=7,b.a.editddres({name:i.name,mobile:i.mobile,address:i.address,value:i.value,isChoice:1,addressId:i.id});case 7:if(1!==(d=a.sent).code){a.next=17;break}return s.addressBox=!1,n.selectAddressId=t,g.a.showLoading(),a.next=14,s.getAddress();case 14:g.a.hideLoading(),a.next=18;break;case 17:console.log(d);case 18:case"end":return a.stop()}},a,s)}))()},confirm:function(){var t=this;return h()(_.a.mark(function e(){return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.a.editAddress({addressId:t.selectAddressId,isChoice:1});case 2:1===e.sent.code&&t.getAddress(),t.addressBox=!1;case 5:case"end":return e.stop()}},e,t)}))()},Delivery:function(t){this.expressWay=t},bindRegionChange:function(t){console.log(t),this.region=t.mp.detail.value},getAddress:function(){var t=this;return new p.a(function(){var e=h()(_.a.mark(function e(s){var a,n,i,r,d;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.a.address({pageNumber:1,pageSize:5});case 2:for(a=e.sent,n=a.data.list,t.addressList=n,i=0;i<n.length;i++)1===n[i].isChoice?(t.addressId=n[i].id,t.name=n[i].name,t.phone=n[i].mobile,r=n[i].value,t.addressDetails=r.split(",").join("")+n[i].address,C.a.calculateFreight({addressId:n[i].id,skuList:t.skuObj}).then(function(e){console.log(e),1===e.code&&(t.calculate=e.data)})):(t.addressId=n[0].id,t.name=n[0].name,t.phone=n[0].mobile,d=n[0].value,t.addressDetails=d.split(",").join("")+n[0].address);0==n.length&&(t.addressId="",t.name="",t.phone="",t.addressDetails=""),s();case 8:case"end":return e.stop()}},e,t)}));return function(t){return e.apply(this,arguments)}}())},handleCouponScroll:function(){var t=this;return h()(_.a.mark(function e(){return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return g.a.showLoading({title:"加载中"}),e.next=3,t.getCoupon();case 3:g.a.hideLoading();case 4:case"end":return e.stop()}},e,t)}))()},getCoupon:function(){var t=this;return h()(_.a.mark(function e(){var s,a,n;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.pageNumber,e.next=3,C.a.coupon({isExchange:0,state:1,pageSize:5,pageNumber:s});case 3:a=e.sent,n=a.data.list,1===a.code?(n=n.map(function(t){return l()({},t,{startTime:t.startTime.split(" ")[0].toString(),endTime:t.endTime.split(" ")[0].toString()})}),t.pageNumber++,t.couponList=t.couponList.concat(n)):g.a.showToast({title:"加载失败",icon:"none"});case 7:case"end":return e.stop()}},e,t)}))()},selectCoupon:function(t,e){t===this.couponId?(this.couponId="",this.couponPrice=""):(this.couponId=t,this.couponPrice=e),this.couponBox=!1},buy:function(){var t=this;return h()(_.a.mark(function e(){var s,a,n,i,d;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(s=t,f.a.url,a=f.a.url,n=a,i=f.a.appId,d={sessionId:t.sessionId,appId:i,addressId:t.addressId,remark:t.remark,skuList:t.skuObj,couponId:t.couponId,expressWay:t.expressWay},t.addressId){e.next=9;break}return g.a.showToast({title:"请先添加一个地址",duration:3e3,icon:"none"}),e.abrupt("return");case 9:new p.a(function(e,s){try{switch(t.buyType){case 3:null!=t.pingId&&(d.pingId=t.pingId),null!=t.pingOrderId&&(d.pingOrderId=t.pingOrderId),g.a.request({method:"POST",url:n+"/api/order/createPingOrder",data:o()(d),header:{"content-type":"application/json"},success:function(t){var a=t.data,n=a.data,i=a.code,r=a.desc;1===i?e([n.id,2]):s({errMsg:r})},fail:function(t){s({errMsg:"下单失败"})}});break;case 1:case 2:g.a.request({method:"POST",url:n+"/api/order/createOrder",data:o()(d),header:{"content-type":"application/json"},success:function(t){var a=t.data,n=a.data,i=a.code,r=a.desc;1===i?e([n.id,1]):s({errMsg:r})},fail:function(t){s({errMsg:"下单失败"})}})}}catch(t){s({errMsg:"发生错误"})}}).then(function(t){s.wxSign.apply(s,r()(t))}).catch(function(t){g.a.showToast({title:t.errMsg||"下单失败",icon:"none",duration:2e3})});case 10:case"end":return e.stop()}},e,t)}))()},wxSign:function(t,e){var s=this;return h()(_.a.mark(function a(){var n,i,r;return _.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return n=s,g.a.showLoading({title:"请求支付中"}),a.next=4,C.a.wxSign({orderId:t});case 4:i=a.sent,g.a.hideLoading(),1===i.code&&(r=i.data,g.a.requestPayment({timeStamp:r.timeStamp,nonceStr:r.nonceStr,package:r.package,signType:r.signType,paySign:r.paySign,success:function(t){y.a.$emit("pay-success"),"requestPayment:ok"===t.errMsg&&(1===e&&n.$router.replace({path:"/pages/my/order/myorder",query:{tag:1}}),2===e&&n.$router.replace({path:"/pages/my/myget/get"}))},fail:function(t){console.log("支付失败返回结果",t),"requestPayment:fail cancel"!==t.errMsg&&"requestPayment:fail (detail message)"!==t.errMsg||(1===e&&n.$router.replace({path:"/pages/my/order/myorder",query:{tag:1}}),2===e&&n.$router.replace({path:"/pages/my/myget/get"}))}}));case 7:case"end":return a.stop()}},a,s)}))()},geCalculateFreight:function(){}},mounted:function(){var t=this;return h()(_.a.mark(function e(){var s,a,n;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.shopName=g.a.getStorageSync("shopName"),e.next=3,g.a.getStorageSync("production_sessionId");case 3:t.sessionId=e.sent,t.$route.query.details&&(t.buyType=1,s=JSON.parse(t.$route.query.details),console.log(s),t.buy_list.push(l()({},s.goods,{skuCode:s.skuCode})),t.skuObj=s.skuObj,t.skuCode=s.skuCode,t.totalPrice=s.totalPrice,t.totalNum=s.totalNum,t.totalPack=1),(a=g.a.getStorageSync("cart"))&&(g.a.removeStorageSync("cart"),t.buyType=2,t.buy_list=a.goods,t.skuObj=a.skuList,t.totalPrice=a.totalPrice,t.totalNum=a.totalNum,t.totalPack=a.goods.length,t.skuCode=a.goods.map(function(t){return t.skuCode})),t.$route.query.group&&(void 0!==(n=JSON.parse(t.$route.query.group)).pingId?(t.buyType=3,t.pingId=n.pingId,void 0!==n.pingOrderId&&(t.pingOrderId=n.pingOrderId)):t.buyType=1,t.buy_list.push(n.goods),t.skuObj=n.skuObj,t.skuCode=n.skuCode,t.totalPrice=n.totalPrice,t.totalNum=n.totalNum,t.totalPack=1,console.log("拼团过来",t.goodsInfo)),t.getAddress().then(function(e){t.addressId,t.skuObj}).catch(function(t){}),t.getCoupon();case 10:case"end":return e.stop()}},e,t)}))()},onUnload:function(){n()(this,this.$options.data())}}},OERp:function(t,e){}},["Or5E"]);