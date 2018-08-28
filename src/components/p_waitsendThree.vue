
<template>
  <!-- 拼团待发货状态状态 - 邮寄（主子账单） 版本1 -->
  <div class="home">
      <div class="head">
        <div class="pin-completemsg">
            <i class="icon"></i>
            <span class="pinmsg">拼团成功，待发货</span>
        </div>
      </div>
      <div class="rec-Informa">        
          <i class="icon-Adr"></i>
          <span class="rec-Name">收货人：朱先森</span>
          <span class="rec-Num">15632168160</span>
          <p class="rec-Adr">收货地址： 广州市越秀区 西城都荟三层3012</p>
      </div>
      <p class="title">菲斯的小店</p>
      <div class="nav">
        <img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <div class="n-right">
        <p class="n-title">兔子的口袋2018夏季新款网红同款露背中长款宽松大T新款网红同款...</p>
        <p class="yardage">白色：均码/2件</p>
        <p class="yardage">黑色：均码/1件</p>
      </div>
    </div>
    <div class="below">
      <div class="total">
        <p class="t-left">共
          <span class="piece">3</span> 个款</p>
        <p class="t-left">
          <span class="piece">86</span> 件商品</p>  
        <p class="t-freight">（含运费￥10.00）</p>
        <p class="t-right">合计:
          <span class="money">￥154.00</span>
        </p>
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
      <p class="message">买家留言：包装好一点</p>
    </div>
     <div class="prices">
      <p>
        <span class="left">商品总价</span>
        <span class="right">￥154.00</span>
      </p>
      <p>
        <span class="left">优惠劵折扣</span>
        <span class="right">- ￥10.00</span>
      </p>
       <p>
        <span class="left">运费</span>
        <span class="right">+ ￥10.00</span>
      </p>
      <div class="serial">
        <p class="s-text">订单编号：2018062712345678904</p>
        <p class="s-text">下单时间：2018-06-16 12:27:12</p>
        <p class="s-text">支付时间：2018-06-16 12:27:12</p>
        <p class="s-text">拼团时间：2018-06-16 12:27:12</p>

      </div>
    </div>
    <div class="btn-Two">
           <div class="n-perTwo">
            <img class="m-perImg" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
            <img class="m-perImg" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
            <img class="m-perImg" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
          </div>
    </div>
  </div>
</template>
<script>
import wx from "wx";
export default {
  components: {},
  data() {
    return {
      visible1: false,
      visible2: false
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
  mounted() {}
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.head
  display: flex
  font-size: 28px
  padding: 0 34px
  background: #fff
  height: 82px
  line-height: 82px
  background: #fff
  borde-top: 1px solid #e5e5e5
  .pin-completemsg
    width: 100%
    height: 82px
    line-height: 82px
    position: relative
    .icon
      width: 28px
      height: 32px
      +bg-img("my/xq-dfh.png")
      // vertical-align: middle
      position: absolute
      display: inline-block
      top: 25px
      left: 0
    .pinmsg
      display:inline-block
      height: 82px
      font-size: 28px
      font-weight: 500
      margin-left: 50px
      color: #06BF04
      line-height: 82px

.rec-Informa
  height: 122px     
  background: #f9f9f9
  position: relative
  .icon-Adr
    width: 32px
    height: 32px
    +bg-img("my/dz.png")
    position: absolute
    top: 25px
    left: 33px
  .rec-Name
    font-size: 28px
    color: #000
    position: absolute
    top: 28px
    left: 84px
  .rec-Num
    font-size: 28px
    color: #000
    position: absolute
    top: 30px
    left: 535px  
  .rec-Adr
    font-size: 24px
    color: #666
    position: absolute
    top: 70px
    left: 83px
.title
  display: inline-block
  width: 100%
  height: 82px
  background: #fff
  line-height: 82px
  font-size: 28px
  color: #000
  padding-left: 33px
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
      padding-right: 10px
    .t-right
      float: right
      padding-top: 15px
      padding-right: 30px
    .t-freight
      float: right
      padding-top: 20px
      font-size: 24px
      color: #666
    .piece
      font-size: 28px
      color: #F67C2F
      padding-bottom: 8px
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
  .message
    font-size: 28px
    color: #000
    margin-left: 34px
    display: inline-block
    width: 100%
    height: 82px
    line-height: 82px
.prices
  margin-top: 20px
  background: #fff
  padding: 10px 0 10px 33px
  p
   font-size: 28px
   display: inline-block
   color: #000
   width: 100%
   .left
    float: left
    color: #000
    font-weight: 500
    padding-right: 33px
   .right
    float: right
    color: #666666
    padding-right: 33px
  .serial
      border-top: 1px solid #E5E5E5
      .s-text
        font-size: 24px
        color: #999
        padding-top: 20px
.btn-Two
  line-height: 108px
  height: 100px
  border-top: 1px solid #e5e5e5
  background: #fff
  margin-top: 174px
  .b-xq
    float: right
    display: inline-block
    width: 160px
    height: 100px
    background: #F67C2F
    vertical-align: middle
    line-height: 100px
    text-align: center
    color: #fff
  .n-perTwo
    background: #fff
    padding: 0 16px
    line-height: 100px
    height: 100px
    float: left
    .m-perImg
      width: 72px
      height: 72px
      padding: 0 5px
      vertical-align: middle  
</style>
