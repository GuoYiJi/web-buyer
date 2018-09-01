<template>
  <!-- 订单详情-交易取消状态-邮寄1 -->
  <div class="home">
    <div class="head">
      <i class="h-img"></i>
      <span>订单已取消</span>
    </div>
    <div class="diz" v-if="details.orderAddress">
      <i class="dz-img"></i>
      <span class="dz-name">收货人：{{details.orderAddress.name}}</span>
      <span class="dz-phone">{{details.orderAddress.mobile}}</span>
      <p class="dz-dz">收货地址：{{details.orderAddress.value+details.orderAddress.address}}</p>
    </div>
    <p class="title">{{shopName}}</p>
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
      <span class="pay" @click="delOrder(details.id)">删除订单</span>
    </div>
  </div>
</template>
<script>
import API from '@/api/httpShui'
export default {
  components: {},
  props : ['id'],
  data() {
    return { wuliu: 0, youji: 0 ,shopName:'',details:{orderAddress:{}}};
  },
  methods: {
    async delOrder(id){
      const data = await API.delOrderShow({orderId: id})
      if (data.code === 1) {
        // this.visible3 = false;
        this.$router.go(-1);
        // this.$emit('refreshOrder');
      }
    },
    async getOrderDetails (id) {
      const data = await API.getOrderDetails({orderId: id})
      console.log('待付款订单详情', data)
      this.details = data.data
      console.log('待付款订单详情', this.details)
    },
  },
  mounted() {
    console.log(this.id);
    this.getOrderDetails(this.id);
    let that = this
    wx.getStorage({
      key: 'shopName',
      success: function (res) {
        that.shopName = res.data
      }
    })
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.head
  color: #EE7527
  font-size: 28px
  height: 82px
  line-height: 82px
  background: #fff
  .h-img
    +bg-img("my/xq-qx.png")
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
    .t-freight
      float: right
      padding-top: 20px
      font-size: 24px
      color: #666
    .t-right
      float: right
      padding-top: 15px
      padding-right: 10px
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
</style>
