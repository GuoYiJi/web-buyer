global.webpackJsonp([14],{HlBt:function(t,s,e){"use strict";var i=e("woOf"),a=e.n(i),n=e("Xxa5"),o=e.n(n),c=e("exGp"),l=e.n(c),r=e("qTHA"),m=e("xzGo"),u=e("QmSG");s.a={data:function(){return{orderId:"",type:"",isType:!0,isCheck:0,reasonList:[{id:1,text:"原因一"},{id:2,text:"原因二"},{id:3,text:"原因三"},{id:4,text:"原因四"}],img1:"",img2:"",img3:"",reason:"",wellShow:!1,wellMsgShow:!1,msg:"",explain:""}},components:{},methods:{check:function(t,s){this.isCheck=t,this.reason=s,this.wellShow=!1},chooseImg:function(t){var s=this;r.a.chooseImage({count:1,success:function(e){console.log(e),s.uploadImg(e.tempFilePaths[0],function(e){s.img=e,1===t&&(s.img1=e),2===t&&(s.img2=e),3===t&&(s.img3=e)})}})},uploadImg:function(t,s){var e=this;r.a.uploadFile({url:u.a.uploadImageUrl,filePath:t,name:"file",formData:{name:t.substring(10),key:"img/${filename}",policy:u.a.imgPolicy,OSSAccessKeyId:"6MKOqxGiGU4AUk44",success_action_status:"200",signature:u.a.imgSignature},success:function(i){if(console.log(i),400===i.statusCode)e.handleError("上传的图片大小不能超过2m!");else if(200===i.statusCode){if(e.maxNum&&e.imgList.length>=e.maxNum)return void e.handleError("不能超过3张图片噢！");s(u.a.uploadImageUrl+"/img"+t.substring(10))}},fail:function(t){console.log(t)}})},closeImg:function(t,s){s.stopPropagation(),this[t]=""},submit:function(){var t=this;return l()(o.a.mark(function s(){var e;return o.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(""!==t.explain){s.next=3;break}return t.mySetTimeout("请填写换货说明!"),s.abrupt("return",!1);case 3:return s.next=5,m.a.retreatGoods({orderId:t.orderId,refundType:t.type,result:t.explain,img1:t.img1,img2:t.img2,img3:t.img3});case 5:e=s.sent,console.log("换货",e),1===e.code&&t.$router.push("/pages/my/after");case 8:case"end":return s.stop()}},s,t)}))()},mySetTimeout:function(t){var s=this;s.wellMsgShow=!0,s.msg=t,setTimeout(function(){s.wellMsgShow=!1,s.msg=""},1e3)}},mounted:function(){this.orderId=this.$route.query.orderId,this.type=this.$route.query.type},onUnload:function(){a()(this,this.$options.data())}}},Jn0b:function(t,s){},"Y+gb":function(t,s,e){"use strict";var i=e("HlBt"),a=e("b/Vh");var n=function(t){e("Jn0b")},o=e("ybqe")(i.a,a.a,n,"data-v-c2f62f40",null);s.a=o.exports},"b/Vh":function(t,s,e){"use strict";var i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"wrapper"},[e("p",{staticClass:"refundReason",attrs:{eventid:"0"},on:{click:function(s){t.wellShow=!0}}},[t._v("换货原因"),e("span",{staticClass:"reason"},[t._v(t._s(t.reason))])]),t._v(" "),e("div",{staticClass:"refundExplain"},[e("p",{staticClass:"title"},[t._v("换货说明："),e("span",[t._v("(最多可输入50个字)")])]),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.explain,expression:"explain"}],staticClass:"explain",attrs:{name:"",id:"",maxlength:"50",eventid:"1"},domProps:{value:t.explain},on:{input:function(s){s.target.composing||(t.explain=s.target.value)}}})],1),t._v(" "),e("div",{staticClass:"refundVoucher"},[e("p",{staticClass:"title"},[t._v("上传凭证："),e("span",[t._v("(最多可上传3张)")])]),t._v(" "),e("div",{staticClass:"images"},[e("div",{staticClass:"img",attrs:{eventid:"3"},on:{click:function(s){t.chooseImg(1)}}},[t.img1?e("img",{attrs:{src:t.img1,alt:""}}):e("img",{attrs:{src:"../../assets/img/my/upimg.png",alt:""}}),t._v(" "),t.img1?e("span",{staticClass:"close",attrs:{eventid:"2"},on:{click:function(s){t.closeImg("img1",t.event)}}}):t._e()]),t._v(" "),t.img1?e("div",{staticClass:"img",attrs:{eventid:"5"},on:{click:function(s){t.chooseImg(2)}}},[t.img2?e("img",{attrs:{src:t.img2,alt:""}}):e("img",{attrs:{src:"../../assets/img/my/upimg.png",alt:""}}),t._v(" "),t.img2?e("span",{staticClass:"close",attrs:{eventid:"4"},on:{click:function(s){t.closeImg("img2",t.event)}}}):t._e()]):t._e(),t._v(" "),t.img2?e("div",{staticClass:"img",attrs:{eventid:"7"},on:{click:function(s){t.chooseImg(3)}}},[t.img3?e("img",{attrs:{src:t.img3,alt:""}}):e("img",{attrs:{src:"../../assets/img/my/upimg.png",alt:""}}),t._v(" "),t.img3?e("span",{staticClass:"close",attrs:{eventid:"6"},on:{click:function(s){t.closeImg("img3",t.event)}}}):t._e()]):t._e()])],1),t._v(" "),e("div",{staticClass:"submit",attrs:{eventid:"8"},on:{click:t.submit}},[t._v("提交")]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.wellShow,expression:"wellShow"}],staticClass:"well"},[e("div",{staticClass:"box"},[e("p",{staticClass:"head"},[t._v("请选择换货原因")]),t._v(" "),t._l(t.reasonList,function(s,i){return e("p",{key:i,staticClass:"select",attrs:{eventid:"9-"+i},on:{click:function(e){t.check(s.id,s.text)}}},[e("span",{staticClass:"check",class:{checked:t.isCheck==s.id}}),t._v(" "),e("span",[t._v(t._s(s.text))])])})],2)]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.wellMsgShow,expression:"wellMsgShow"}],staticClass:"wellMsg"},[t._v("\n    "+t._s(t.msg)+"\n  ")])],1)},staticRenderFns:[]};s.a=i}},["gLOA"]);