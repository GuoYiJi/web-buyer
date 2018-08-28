<template>
  <!-- 订单详情-待收货状态-邮寄版本1 -->
  <div class="home">
    <div class="head">
      <i class="h-img"></i>
      <span>等待卖家收货</span>
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
        <!--<p class="s-text">父订单编号：{{details.parent.orderNo}}</p>-->
        <p class="s-text">订单编号：{{details.orderNo}}</p>
        <p class="s-text">下单时间：{{details.createTime}}</p>
        <p v-if="details.payTime" class="s-text">支付时间：{{details.payTime}}</p>
        <p v-if="details.deliverTime" class="s-text">发货时间：{{details.deliverTime}}</p>
      </div>
    </div>
    <!--<div style="height: 100px"></div>-->
    <div class="foot">
      <span class="pay" @click="toOpen('visible2')">确认收货</span>
      <!--<span class="b-wl">查看物流</span>-->
      <span class="b-sh" @click="toOpen('visible1')">退货</span>
    </div>
    <i-modal :visible="visible1" @ok="retreat(details.id, 1, details.paid, details.freight)" @cancel="toClose('visible1')">
      <div class="m_tips">确定申请退货！</div>
    </i-modal>
    <i-modal :visible="visible2" @ok="sureOrder()" @cancel="toClose('visible2')">
      <div class="m_tips">确认收货！</div>
    </i-modal>
  </div>
</template>
<script>
import wx from 'wx'
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
      console.log('待收货订单详情', this.details)
    },
    // 确认收货
    async sureOrder () {
      const data = await API.sureOrder({orderId: this.id})
      console.log('确认收货', data)
      if (data.code === 1) {
        this.visible2 = false
        this.$router.push({
          path: '/pages/my/order/myorder',
          query: { tag: 5 }
        })
      }
    },
    // 申请退货
    retreat (id, type, price, freight) {
      console.log(id, type, price, freight)
      this.visible1 = false
      this.$router.push({
        path: '/pages/refund/refund',
        query: {orderId: id, type: type, price: price, freight: freight}
      })
    }
  },
  mounted () {
    this.getOrderDetails(this.id)
  }
}
</script>
<style type="text/sass" lang="sass" scoped>
@import '~@/assets/css/mixin'
.head
  color: #F67C2F
  font-size: 28px
  height: 82px
  line-height: 82px
  background: #fff
  .h-img
    +bg-img("my/xq-dsh.png")
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
    +bg-img("my/dz.png")
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
  .pay
    float: right
    display: inline-block
    width: 192px
    line-height: 99px
    text-align: center
    background: #EE7527
    color: #fff
  .b-wl
    float: right
    display: inline-block
    width: 192px
    line-height: 99px
    text-align: center
  .b-sh
    float: right
    display: inline-block
    width: 192px
    line-height: 99px
    text-align: center
    border-right: 1px solid #E5E5E5
</style>
