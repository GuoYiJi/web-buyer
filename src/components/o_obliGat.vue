<template>
  <!-- 订单详情-买家待付款 -->
  <div class="home">
    <div class="head">
      <i class="h-img"></i>
      <span>等待买家付款</span>
    </div>
    <div class="diz">
      <i class="dz-img"></i>
      <span class="dz-name">收货人：朱先森</span>
      <span class="dz-phone">15632168160</span>
      <p class="dz-dz">收货地址：广州市越秀区 西城都荟三层3012</p>
    </div>
    <p class="title">菲斯的小店</p>
    <div class="nav" v-for="(item,index) in details.orderGoods" :key="index">
      <img v-if="item.image" class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
      <img v-else class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
      <div class="n-right">
        <p class="n-title">{{item.name}}</p>
        <p class="yardage">{{item.skuCode}}</p>
        <!--<p class="yardage">黑色：均码/1件</p>-->
      </div>
    </div>
    <div class="below">
      <div class="total">
        <p class="t-left">共
          <span class="piece">{{details.num}}</span> 件商品
        </p>
        <p class="t-freight">（含运费￥{{details.freight}}）</p>
        <p class="t-right">合计:
          <span class="money">￥{{details.count}}</span>
        </p>
      </div>
      <p class="message">买家留言：{{details.remark ? details.remark : '没有留言信息！'}}</p>
    </div>
    <div class="prices">
      <p>
        <span class="left">商品总价</span>
        <span class="right">￥{{details.count - details.freight}}</span>
      </p>
      <p>
        <span class="left">优惠劵折扣</span>
        <span class="right">-￥{{details.couponMoney ? details.couponMoney : 0}}</span>
      </p>
      <p>
        <span class="left">运费</span>
        <span class="right">+￥{{details.freight}}</span>
      </p>
      <div class="serial">
        <p class="s-text">订单编号：{{details.orderNo}}</p>
        <p class="s-text">下单时间：{{details.createTime}}</p>
      </div>
    </div>
    <div class="foot">
      <span class="f-title">合计：
        <span class="f-text">￥{{details.paid}}</span>
      </span>
      <span class="pay" @click="pay(details.id)">马上支付</span>
      <span class="btn" @click="toOpen('visible2')">取消订单</span>
    </div>
    <i-modal :visible="visible1" @ok="toClose('visible1')" @cancel="toClose('visible1')">
      <div class="m_tips">您的订单已提交，请与客服联系，完成线下付款！</div>
    </i-modal>
    <i-modal :visible="visible2" @ok="cancelOrder()" @cancel="toClose('visible2')">
      <div class="m_tips">确定取消此订单！</div>
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
      visible1: false,
      visible2: false,
      details: {}
    }
  },
  methods: {
    toOpen (name) {
      this[name] = true
    },
    toClose (name) {
      this[name] = false
    },
    async getOrderDetails (id) {
      const data = await API.getOrderDetails({orderId: id})
      this.details = data.data
      console.log('待付款订单详情', this.details)
    },
    pay(orderId){
      // 如果是个人直接调起微信支付
      let isPersonal = true;
      if(isPersonal){
        this.wxSign(orderId,1);
      }else{
        this.visible1 = true;
      }

    },
    // 微信支付
    async wxSign (orderId, type) {
      let that = this
      const data = await API.wxSign({ orderId: orderId })
      console.log(data)
      if (data.code === 1) {
        let obj = data.data
        wx.requestPayment({
          timeStamp: obj.timeStamp,
          nonceStr: obj.nonceStr,
          package: obj.package,
          signType: obj.signType,
          paySign: obj.paySign,
          success: function (res) {
            console.log('支付成功返回结果', res)
            if (res.errMsg === 'requestPayment:ok') {
              if (type === 1) {
                that.$router.push({
                  path: '/pages/my/order/myorder',
                  query: { tag: 1 }
                })
              }
              if (type === 2) {
                that.$router.push({
                  path: '/pages/my/myget/get'
                })
              }
            }
          },
          fail: function (res) {
            console.log('支付失败返回结果', res)
            if (res.errMsg === 'requestPayment:fail cancel' || res.errMsg === 'requestPayment:fail (detail message)') {
              if (type === 1) {
                that.$router.push({
                  path: '/pages/my/order/myorder',
                  query: { tag: 1 }
                })
              }
              if (type === 2) {
                that.$router.push({
                  path: '/pages/my/myget/get'
                })
              }
            }
          }
        })
      }
    },
    // 取消订单
    async cancelOrder () {
      const data = await API.cancelOrder({orderId: this.id})
      console.log(data)
      if (data.code === 1) {
        this.visible2 = false
        this.$router.push({
          path: '/pages/my/order/myorder',
          query: {tag: 2}
        })
      }
    }
  },
  mounted () {
    this.getOrderDetails(this.id)
  }
}
</script>
<style type="text/sass" lang='sass' scoped>
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
  padding: 33px 33px
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
