<template>
  <div class="wrapper">
    <!--<p class="refundState">请等待处理</p>-->
    <div class="refundInfo">
      <p class="title">{{state == 0 ? '等待商家处理' : state == 1 ? '商家已同意' : state == 2 ? '商家已拒绝' : state == 3 ? '商家已同意' : state == 4 ? '商家已发货' : state == 5 ? '已撤销' : state == 6 ? '确认收货' : ''}}</p>
      <p v-if="isFh" class="title">请将商品寄回以下地址并填写物流单号：</p>
      <div v-if="isFh" class="addressBox">
        <p class="name">收货人：朱先森 15632168160</p>
        <p class="address">收货地址：广州市越秀区 西城都荟三层3012</p>
      </div>
      <div v-if="isFh" class="logisticsNumber">
        <p class="text">物流单号</p>
        <p class="number">12454676891245467689</p>
      </div>
      <p class="title">换货信息</p>
      <div class="refundGoods" v-for="(item,index) in goods" :key="index">
        <div class="img">
          <img v-if="item.image" src="../../assets/img/classify/goods.png" alt="">
          <img v-else src="../../assets/img/classify/goods.png" alt="">
        </div>
        <div class="text">
          <p class="name">{{item.name}}</p>
          <p class="spec">{{item.skuCode}} / {{item.num}}件</p>
          <!--<p class="spec">黑色：均码/1件</p>-->
        </div>
      </div>
      <div class="businessInfo">
        <p>买家：{{shopName}}</p>
        <p>退款原因：{{details.result}}</p>
        <p>退款金额：{{details.price}}</p>
        <p>申请时间：{{details.createTime}}</p>
        <p>退款编号：{{details.orderRefundNo}}</p>
      </div>
    </div>
    <div class="btnGroup clearfix">
      <div class="revise" @click="revise">修改申请</div>
      <div class="cancel" @click="revokes">撤销申请</div>
      <div class="cancel">联系客服</div>
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import API from '@/api/httpShui'
export default {
  data () {
    return {
      isFh: true,
      shopName: '',
      details: {},
      goods: [],
      refundType: '',
      state: ''
    }
  },
  components: {

  },
  methods: {
    revise () {
      this.$router.back()
    },
    revokes () {
      this.$router.back()
    }
  },
  async mounted () {
    let that = this
    wx.getStorage({
      key: 'shopName',
      success: function (res) {
        that.shopName = res.data
      }
    })
    const data = await API.getRefundDetails({orderRefundId: this.$route.query.id})
    if (data.code === 1) {
      this.details = data.data
      this.goods = data.data.goodsList
      // this.refundType = data.data.refundType
      // this.state = data.data.state
      // 订单状态
      let refundType = data.data.refundType
      // 商家回复状态
      let state = data.data.state
      if (refundType === 0) {
        this.isFh = false
      }
      if (refundType === 1 || refundType === 2) {
        if (state === 0 || state === 2 || state === 5) {
          this.isFh = false
        }
        if (state === 1 || state === 3 || state === 4 || state === 6) {
          this.isFh = true
        }
      }
    }
  }
}
</script>
<style type="text/sass" lang="sass" scoped>
  @import '~@/assets/css/mixin'
  .clearfix:after
    content: ""
    display: block
    height: 0
    clear: both
    visibility: hidden
  .clearfix
    /* 触发 hasLayout */
    zoom: 1
  .refundState
    height: 80px
    line-height: 80px
    font-size: 28px
    color: #F67C2F
    padding: 0 24px
    background: #FFFFFF
  .refundInfo
    margin-top: 20px
    .title
      height: 80px
      padding: 0 24px
      line-height: 80px
      font-size: 28px
      color: #000000
      background: #ffffff
      box-sizing: border-box
    .title:first-child
      border-bottom: 1px solid #E5E5E5
    .addressBox
      height: 120px
      padding: 0 24px 0 84px
      background: #f9f9f9 url('../../assets/img/my/dz.png') no-repeat 33px 20px
      background-size: 32px 32px
      .name
        line-height: 60px
        font-size: 28px
        color: #000000
      .address
        line-height: 60px
        font-size: 24px
        color: #666666
    .logisticsNumber
      height: 120px
      padding: 0 24px
      background: #ffffff
      margin-bottom: 20px
      .text
        line-height: 60px
        font-size: 22px
        color: #999999
      .number
        line-height: 60px
        font-size: 32px
        color: #EE7527
    .refundGoods
      height: 200px
      padding: 20px 24px 20px 213px
      box-sizing: border-box
      position: relative
      .img
        float: left
        width: 160px
        height: 160px
        margin-right: 23px
        position: absolute
        top: 20px
        left: 24px
        img
          width: 100%
          height: 100%
      .text
        height: 160px
        .name
          height: 60px
          line-height: 30px
          font-size: 28px
          color: #000000
          overflow: hidden
          margin-bottom: 10px
        .spec
          font-size: 24px
          color: #999999
    .businessInfo
      height: 360px
      padding: 32px 24px
      background: #ffffff
      p
        line-height: 60px
        font-size: 28px
        color: #666666
  .btnGroup
    width: 100%
    height: 100px
    position: fixed
    bottom: 0
    left: 0
    background: #ffffff
    .cancel,.revise
      float: right
      width: 192px
      height: 100px
      font-size: 24px
      line-height: 100px
      text-align: center
    .cancel
      color: #999999
    .revise
      color: #ffffff
      background: #EE7527
</style>
