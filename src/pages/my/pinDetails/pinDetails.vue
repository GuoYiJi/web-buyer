<template>
  <div class="home">
    <!-- 拼团交易完成-邮寄 -->
    <div class="home">
      <div class="head">
        <i class="icon"></i>
        <span class="pinmsg">拼团成功，交易完成</span>
      </div>
      <div class="rec-Informa">
        <i class="icon-Adr"></i>
        <div class="box">
          <div class="top">
            <span class="rec-Name">收货人：朱先森</span>
            <span class="rec-Num">15632168160</span>
          </div>
          <span class="rec-Adr">收货地址： 广州市越秀区 西城都荟三层3012</span>
        </div>
      </div>
      <div class="title">菲斯的小店</div>
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
          <p class="s-text">支付时间：2018-06-16 14:27:12</p>
          <p class="s-text">发货时间：2018-06-16 14:27:12</p>
        </div>
      </div>
      <div class="btn-Two">
        <div class="n-perTwo">
          <img class="m-perImg" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
          <img class="m-perImg" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
          <img class="m-perImg" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        </div>
        <div class="btn">
          <span class="b-xq" @click="toOpen('visible2')">删除订单</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import api from '@/api/httpJchan'
export default {
  components: {},
  data () {
    return {
      stateName: ['', '待付款', '交易取消', '已支付', '支付失败', '待发货', '待收货', '已完成', '交易关闭', '拼单中']
    }
  },
  methods: {
    // 获取订单详情
    getOrderDeatil () {
      api.obligation({
        orderId: this.$route.query.orderId
      }).then(response => {
        console.log(response)
      })
    }
  },
  mounted () {
    this.getOrderDeatil()
  }
}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.head
  display: flex
  align-items: center
  font-size: 28px
  // margin-top: 5px
  padding: 28px 32px
  background: #fff
  color: #06BF04
  .icon
    display: inline-block
    width: 28px
    height: 31px
    margin-right: 24px
    +bg-img("my/xq-ok.png")
  .pinmsg
    font-size: 28px
.rec-Informa
  width: 100%
  background: #f9f9f9
  padding: 25px 32px
  display: flex
  align-items: flex-start
  .icon-Adr
    width: 26px
    height: 32px
    +bg-img("my/dz.png")
  .box
    flex: 1
    overflow: hidden
    display: flex
    flex-wrap: wrap
    .top
      width: 100%
      color: #000
      font-size: 28px
      display: flex
      justify-content: space-between
      span.rec-Name
        width: 200
        text-align: left
      span.rec-Num
        flex: 1
        text-align: right
    span.rec-Adr
      width: 100%
      font-size: 24px
      color: #666666
.title
  width: 100%
  padding: 28px 32px
  background: #fff
  font-size: 28px
  color: #000
.nav
  width: 100%
  padding: 20px 32px
  display: flex
  align-items: center
  .n-img
    display: inline-block
    width: 160px
    height: 160px
    margin-right: 20px
  .n-right
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
      padding-bottom: 8px
    .money
      font-size: 32px
      color: #FF0000
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
      color: #666666
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
  margin-top: 80px
  background: #fff
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
