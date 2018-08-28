<template>
  <!-- 订单详情-买家待付款 -->
  <div class="home">
    <div class="head">
      <i class="h-img"></i>
      <span>等待买家付款（剩23小时59分自动关闭）</span>
    </div>
    <div class="diz">
      <i class="dz-img"></i>
      <span class="dz-name">收货人：朱先森</span>
      <span class="dz-phone">15632168160</span>
      <p class="dz-dz">收货地址：广州市越秀区 西城都荟三层3012</p>
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
          <span class="piece">3</span> 件商品</p>
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
    <div class="foot">
      <span class="f-title">合计：
        <span class="f-text">￥154.00</span>
      </span>
      <span class="pay" @click="toOpen('visible2')">马上支付</span>
      <span class="btn">取消订单</span>
    </div>
    <i-modal :visible="visible2" @ok="toClose('visible2')" @cancel="toClose('visible2')">
      <div class="m_tips">您的订单已提交，请与客服联系，完成线下付款！</div>
    </i-modal>
  </div>
</template>
<script>
// import wx from 'wx'
import API from '@/api/httpShui'
export default {
  components: {},
  props: ['id'],
  data () {
    return {
      visible2: false,
      orderId: ''
    }
  },
  methods: {
    toOpen (name) {
      this[name] = true
    },
    toClose (name) {
      this[name] = false
    },
    async getOrderDetails () {
      const data = await API.getOrderDetails({orderId: this.orderId})
      console.log('订单详情', data)
    }
  },
  mounted () {
    // this.orderId = this.$route.query.id
    // let xq = this.$route.query.xq
    console.log(this.id)
    // console.log(xq)
    // this.getOrderDetails()
  }
}
</script>
<style  type="text/sass" lang='sass' scoped>
@import '~@/assets/css/mixin'
.head
  color: #F67C2F
  font-size: 28px
  height: 82px
  line-height: 82px
  background: #fff
  .h-img
    +bg-img('my/xq-dkf.png')
    width: 32px
    height: 32px
    vertical-align: middle
    display: inline-block
    margin-left: 30px
    margin-right: 22px
  span
    vertical-align: middle
    display: inline-block
.diz
  background: #F9F9F9
  height: 121px
  position: relative
  .dz-img
    width: 26px
    height: 32px
    +bg-img('my/dz.png')
    position: absolute
    top: 25px
    left: 33px
  .dz-name
    font-size: 28px
    color: #000
    position: absolute
    top: 28px
    left: 84px
  .dz-phone
    font-size: 28px
    color: #000
    position: absolute
    top: 30px
    left: 535px
  .dz-dz
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
  padding: 10px 33px
  p
   font-size: 28px
   display: inline-block
   color: #000
   width: 100%
   .left
    float: left
    color: #666666
   .right
    float: right
    color: #666666
  .serial
      height: 124px
      border-top: 1px solid #E5E5E5
      .s-text
        font-size: 24px
        color: #999
        padding-top: 20px
.foot
  height: 99px
  width: 100%
  background: #fff
  position: fixed
  bottom: 0px
  line-height: 99px
  .f-title
    padding-left: 32px
    font-size: 28px
    .f-text
      color: #FF0000
  .pay
    float: right
    display: inline-block
    width: 192px
    line-height: 99px
    text-align: center
    background: #EE7527
    color: #fff
  .btn
    float: right
    display: inline-block
    width: 192px
    line-height: 99px
    text-align: center
</style>
