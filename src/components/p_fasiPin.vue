<template>
  <!-- 我的拼单-拼团中 -->
  <div class="home">
    <!-- 1 -->
    <div class="kuang" v-for="(item, i) in myorderList" :key="i">
      <div class="head">
        <span class="h-title">菲斯的小店</span>
        <span class="h-text">拼单中</span>
      </div>
      <div class="nav">
        <img class="n-img" v-for="(item, j) in item.goodsList" :key="j" :src="item.image">
        <!-- <img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg"> -->
        <!-- <img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg"> -->
        <i class="n-icon"></i>
      </div>
      <div class="below">
        <div class="total">
          <p class="t-left">共
            <span class="piece">{{item.num}}</span> 件商品</p>
          <p class="t-freight">（含运费￥{{item.freight}}）</p>
          <p class="t-right">合计:
            <span class="money">￥{{item.count}}</span>
          </p>
        </div>
      </div>
      <div class="btn">
        <div class="n-per">
          <img class="m-perImg" v-for="(item, o) in item.pingUser" :key="o" :src="item.head">
          <!-- <img class="m-perImg" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
          <img class="m-perImg" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg"> -->
        </div>
        <span class="b-sc" @click="toOpen('visible2')">取消订单</span>
      </div>
    </div>
    <!-- 2 -->
    <!-- <div class="kuang">
      <div class="head">
        <span class="h-title">菲斯的小店</span>
        <span class="h-text">拼单中</span>
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
          <span class="b-sc" @click="toOpen('visible2')">取消订单</span>
        </div>
      </div>
    </div> -->
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
    flex: 1
    color: #F67C2F
.nav
  height: 202px
  padding: 0 32px
  line-height: 202px
  position: relative
  .n-img
    width: 160px
    height: 160px
    margin-right: 20px
    vertical-align: middle
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
