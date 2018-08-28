<template>
  <!-- 我的拼单-待发货 -->
  <div class="home">
    <!-- 1 -->
    <!-- <div class="kuang">
      <div class="head">
        <span class="h-title">菲斯的小店</span>
        <span class="h-text">拼单成功，待发货</span>
      </div>
      <div class="nav">
        <img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <i class="n-icon"></i>
      </div>
      <div class="below">
        <div class="total">
          <p class="t-left">共
            <span class="piece">3</span> 件商品</p>
          <p class="t-freight">（含运费￥10.00）</p>
          <p class="t-right">合计:
            <span class="money">￥154.00</span>
          </p>
        </div>
      </div>
      <div class="btn">
        <div class="n-per">
          <img class="m-perImg" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
          <img class="m-perImg" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
          <img class="m-perImg" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        </div>
        <div class="btn">
          <span class="b-xq" @click="toOpen('visible2')">查看详情</span>
        </div>
      </div>
    </div> -->
    <!-- 2 -->
    <div class="kuang" v-for="(item, i) in myorderList" :key="i">
      <div class="head">
        <span class="h-title">菲斯的小店</span>
        <span class="h-text">拼单成功，待发货</span>
      </div>
      <div class="nav">
        <img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <div class="n-right">
          <p class="n-title">{{item.remark}}</p>
          <p class="yardage">白色：均码/2件</p>
          <p class="yardage">黑色：均码/1件</p>
        </div>
      </div>
      <div class="below">
        <div class="totalsecond">
          <p class="t-left">共
            <span class="piece">{{item.num}}</span> 件商品</p>
          <p class="t-freight">（含运费￥{{item.freight}}）</p>
          <p class="t-right">合计:
            <span class="money">￥{{item.count}}</span>
          </p>
        </div>
        <div class="size">
          <ul class="u-sizeOne">
            <li>颜色</li>
            <li>码数</li>
            <li>总件数</li>
            <li>已发</li>
            <li>未发</li>
          </ul>
          <ul class="u-sizeTwo">
            <li>红</li>
            <li>S</li>
            <li>12</li>
            <li>6</li>
            <li>6</li>
          </ul>
          <ul class="u-sizeThree">
            <li>黄</li>
            <li>M</li>
            <li>12</li>
            <li>10</li>
            <li>2</li>
          </ul>
          <ul class="u-sizeTwo">
            <li>红</li>
            <li>M</li>
            <li>10</li>
            <li>8</li>
            <li>2</li>
          </ul>
        </div>
        <div class="orders">
          <li class="o-item">
            <span>子订单编号（已完成）：12345678</span>
            <i class="o-img"></i>
          </li>
        </div>
        <div class="orders">
          <li class="o-item">
            <span>子订单编号（已完成）：12345678</span>
            <i class="o-img"></i>
          </li>
        </div>
      </div>
      <div class="btn">
        <div class="n-per">
          <img class="m-perImg" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
          <img class="m-perImg" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
          <img class="m-perImg" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        </div>
        <div class="btn">
          <span class="b-xq" @click="toOpen('visible2')">查看详情</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import API from "@/api/httpJchan";
export default {
  components: {},
  data() {
    return {
      visible1: false,
      visible2: false,
      myorderList: [],
      qwe: []
    };
  },
  methods: {
    toOpen(name) {
      this[name] = true;
    },
    toClose(name) {
      this[name] = false;
    }
  },
  async mounted() {
    const myorder = await API.myorder({ isPing: 1 });
    this.myorderList = myorder.data.list;
    console.log(this.myorderList);
    for (var i = 0; i < this.myorderList.length; i++) {
      for (var j = 0; j < this.myorderList[i].goodsList[j].length; j++) {
        
      }
    }
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.head
  display: flex
  font-size: 28px
  margin-top: 20px
  padding: 0 34px
  background: #fff
  height: 82px
  line-height: 82px
  .h-title
    flex: 5
    color: #000
  .h-text
    flex: 3
    color: #F67C2F
.nav
  height: 202px
  padding: 0 32px
  position: relative
  display: flex
  .n-img
    width: 160px
    height: 160px
    margin-right: 20px
    margin-top: 20px
    display: inline-block
  .n-icon
    width: 14px
    height: 25px
    +bg-img("home/shanJiao.png")
    vertical-align: middle
    display: inline-block
    position: absolute
    right: 34px
    top: 45%
  .n-right
    display: inline-block
    padding-top: 13px
    flex: 1
    .n-title
      font-size: 28px
      color: #000
      +moreLine(2)
    .yardage
      font-size: 24px
      color: #999
.below
  background: #fff
  .total
    height: 82px
    margin-left: 32px
    overflow: hidden
    border-bottom: 1px solid #E5E5E5
    p
      font-size: 24px
      color: #000
    .t-left
      float: left
      padding-top: 20px
    .t-right
      float: right
      padding-top: 15px
      padding-right: 10px
    .t-freight
      float: right
      padding-top: 20px
      font-size: 24px
      color: #666
    .piece
      font-size: 28px
      color: #F67C2F
    .money
      font-size: 32px
      color: #FF0000
  .totalsecond
    height: 82px
    margin-left: 32px
    overflow: hidden
    p
      font-size: 24px
      color: #000
    .t-left
      float: left
      padding-top: 20px
    .t-right
      float: right
      padding-top: 15px
      padding-right: 10px
    .t-freight
      float: right
      padding-top: 20px
      font-size: 24px
      color: #666
    .piece
      font-size: 28px
      color: #F67C2F
    .money
      font-size: 32px
      color: #FF0000
  .size
    width: 100%
    height: 180px
    font-size: 28px
    .u-sizeOne
      height: 46px
      width: 100%
      background: #fafafa
      display:flex
      li
        width: 20%
        height: 46px
        float: left
        text-align: center
        line-height: 46px
        color: #999
    .u-sizeTwo
      height: 46px
      width: 100%
      display:flex
      background: #eee
      li
        width: 20%
        height: 46px
        float: left
        text-align: center
        line-height: 46px
        color: #666
    .u-sizeThree
      height: 46px
      width: 100%
      background: #fafafa
      display:flex
      li
        width: 20%
        height: 46px
        float: left
        text-align: center
        line-height: 46px
        color: #666
.orders
  height: 90px
  line-height: 90px
  margin-left: 33px
  background: #fff
  border-bottom: 1px solid #E5E5E5
  span
    vertical-align: middle
    display: inline-block
  .o-img
    width: 14px
    height: 25px
    +bg-img("home/shanJiao.png")
    vertical-align: middle
    display: inline-block
    float: right
    margin-top: 30px
    margin-right: 33px
.btn
  line-height: 108px
  height: 108px
  padding-left: 30px
  background: #fff
  .b-xq
    float: right
    display: inline-block
    width: 160px
    height: 60px
    background: #F67C2F
    vertical-align: middle
    line-height: 60px
    text-align: center
    margin-right: 20px
    color: #fff
    margin-top: 25px
  .b-sc
    float: right
    display: inline-block
    width: 158px
    height: 58px
    border: 1px solid #BFBFBF
    vertical-align: middle
    line-height: 60px
    text-align: center
    margin-right: 20px
    margin-top: 25px
  .n-per
    line-height: 108px
    height: 108px
    float: left
    .m-perImg
      width: 72px
      height: 72px
      padding: 0 5px
      vertical-align: middle

</style>
