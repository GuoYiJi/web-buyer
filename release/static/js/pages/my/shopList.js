global.webpackJsonp([15],{"2+ph":function(s,t){},"760X":function(s,t,a){"use strict";var i={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"content"},[s._l(s.goodsList,function(t,i){return a("div",{key:i,staticClass:"con"},[a("div",{staticClass:"cap-order-goods-lsit"},[a("div",{staticClass:"cap-order-goods-card"},[a("div",{staticClass:"van-card"},[a("div",{staticClass:"van-card__thumb"},[a("img",{attrs:{src:t.image,mode:"aspectFill"}})]),s._v(" "),a("div",{staticClass:"van-card__content"},[a("div",{staticClass:"van-card__row"},[a("div",{staticClass:"van-card__title"},[s._v(s._s(t.name))])]),s._v(" "),s._l(t.skuList,function(t,i){return a("div",{key:i,staticClass:"van-card__row"},[a("div",{staticClass:"van-card__desc"},[s._v("\n                "+s._s(t.skuCode)+"\n              ")])])})],2)])])]),s._v(" "),a("div",{staticClass:"van-cell van-hairline"},[a("div",{staticClass:"van-cell__title"},[a("span",{staticClass:"goods-buy__info"},[a("span",{staticClass:"goods-buy__num"},[s._v(s._s(t.countNum))]),s._v("件商品  ")])]),s._v(" "),a("div",{staticClass:"van-cell__value"},[a("span",{staticClass:"goods-buy__total"},[s._v("合计:")]),s._v(" "),a("span",{staticClass:"goods-buy__price"},[s._v("￥"+s._s(t.countPrice))])])])])}),s._v(" "),a("div",{staticClass:"con"},[a("div",{staticClass:"below"},[a("div",{staticClass:"total"},[a("p",{staticClass:"t-right"},[s._v("共\n          "),a("span",{staticClass:"money"},[s._v(s._s(s.goodsList.length))]),s._v("件\n        ")])],1)])])],2)},staticRenderFns:[]};t.a=i},DgAT:function(s,t,a){"use strict";a("qTHA");t.a={components:{},data:function(){return{goodsList:[]}},methods:{},mounted:function(){var s=this.$route.query.goodsList;this.goodsList=JSON.parse(s)}}},p4DR:function(s,t,a){"use strict";var i=a("DgAT"),c=a("760X");var n=function(s){a("2+ph")},o=a("ybqe")(i.a,c.a,n,"data-v-109c579c",null);t.a=o.exports}},["0H1U"]);