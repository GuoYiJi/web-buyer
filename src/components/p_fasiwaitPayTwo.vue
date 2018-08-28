
<template>
  <!--10.4.2 拼团待付款状态 版本1 -->
  <div class="home">
      <div class="head">
        <div class="pin-completemsg">
            <i class="icon"></i>
            <span class="pinmsg">等待买家付款</span><span class="pinmsgTwo">（剩23小时59分自动关闭）</span>
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

      </div>
    </div>
    <div class="btn-Two">
            <div class="n-perTwo">
                <p>
                    <span>合计：</span>
                    <span class="n-total">￥154.00</span>
                </p>
            </div>
          <div class="btn">
            <span class="b-xq" @click="toOpen('visible2')">马上支付</span>
            <span class="b-sc" @click="toOpen('visible2')">取消订单</span>
          </div>
    </div>
    <div class="alert">
        <span>拼单已满，请重新下单</span>
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
  // margin-top: 5px
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
      width: 32px
      height: 32px
      +bg-img("my/xq-dkf.png")
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
    .pinmsgTwo
      display:inline-block
      height: 82px
      font-size: 28px
      font-weight: 500
      margin-left: 20px
      color: #06BF04
      line-height: 82px

.rec-Informa
  height: 122px     
  background: #f9f9f9
  position: relative
  .icon-Adr
    width: 26px
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
      padding-bottom: 8px
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
  margin-top: 122px
  .btn
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
    .b-sc
        float: right
        display: inline-block
        width: 160px
        height: 100px
        background: #fff
        vertical-align: middle
        line-height: 100px
        color: #a7a7a7
        text-align: center
  .n-perTwo
    background: #fff
    padding: 0 25px
    line-height: 100px
    height: 100px
    float: left
    .n-total
      color: #f44
.alert
  position: absolute
  width: 478px
  height: 144px
  top: 450px
  left: 150px
  background-color: rgba(0,0,0,.3)
  color: #fff
  line-height: 144px
  text-align: center
  border: 1px dashed #999
  span
    font-size: 36px
</style>
