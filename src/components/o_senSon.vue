<template>
  <!-- 订单详情-待发货状态-邮寄（主子账单） -->
  <div class="home">
    <div class="head">
      <i class="h-img"></i>
      <span>等待卖家发货</span>
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
        <!-- 邮寄 -->
        <p v-if="(youji == 1)" class="t-freight">（含运费￥{{details.freight}}）</p>
        <p class="t-right">合计:
          <span class="money">￥{{details.count}}</span>
        </p>
      </div>
      <!-- 邮寄，主子订单 -->
      <div v-if="(zhuzi == 1)" class="b-box">
        <li class="b-item b-title">
          <span class="b-text">颜色</span>
          <span class="b-text">码数</span>
          <span class="b-text">总件数</span>
          <span class="b-text">已发</span>
          <span class="b-text">未发</span>
        </li>
        <li class="b-item b-color">
          <span class="b-text">红</span>
          <span class="b-text">S</span>
          <span class="b-text">12</span>
          <span class="b-text">6</span>
          <span class="b-text">6</span>
        </li>
        <li class="b-item">
          <span class="b-text">黄</span>
          <span class="b-text">M</span>
          <span class="b-text">12</span>
          <span class="b-text">10</span>
          <span class="b-text">2</span>
        </li>
        <li class="b-item b-color">
          <span class="b-text">红</span>
          <span class="b-text">M</span>
          <span class="b-text">10</span>
          <span class="b-text">8</span>
          <span class="b-text">2</span>
        </li>
      </div>
      <!-- 邮寄，主子订单 -->
      <div v-if="(zhuzi == 1)">
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
      <!-- 物流到付 -->
      <p v-if="(wuliu == 1)">
        <span class="left">运费</span>
        <span class="right">+￥{{details.freight}}</span>
      </p>
      <div class="serial">
        <p class="s-text">订单编号：{{details.orderNo}}</p>
        <p class="s-text">下单时间：{{details.createTime}}</p>
        <p v-if="details.payTime" class="s-text">支付时间：{{details.payTime}}</p>
      </div>
    </div>
    <!--<div style="height: 100px"></div>-->
    <div v-if="isRetreat" class="foot">
      <span class="pay" @click="toOpen('visible')">退款</span>
    </div>
    <i-modal :visible="visible" @ok="retreat(details.id, 0, details.paid, details.freight)" @cancel="toClose('visible')">
      <div class="m_tips">确定申请退款！</div>
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
      visible: false,
      isRetreat: false,
      wuliu: 0,
      youji: 0,
      zhuzi: 0,
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
    // 申请退款
    retreat (id, type, price, freight) {
      this.$router.push({
        path: '/pages/refund/refund',
        query: {orderId: id, type: type, price: price, freight: freight}
      })
    },
    async getOrderDetails (id) {
      const data = await API.getOrderDetails({orderId: id})
      this.details = data.data
      console.log('待发货订单详情', this.details)
      // this.isRetreat = data.data.isHasChildren
      if (data.data.isHasChildren === 0 && data.data.isPing === 0) {
        this.isRetreat = true
      }
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
    +bg-img("my/xq-dfh.png")
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
  .b-box
    height: 180px
    background: #FAFAFA
    .b-title
      color: #999
    .b-color
      background: #eee
    .b-item
      height: 45px
      display: flex
      text-align: center
      .b-text
        flex: 1
  .orders
    height: 90px
    line-height: 90px
    margin-left: 33px
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
      height: 170px
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
