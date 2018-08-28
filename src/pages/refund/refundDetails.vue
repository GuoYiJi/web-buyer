<template>
  <div class="wrapper">
    <p class="refundState">请等待处理</p>
    <div class="refundInfo">
      <p class="title">您已成功发起退款申请，请耐心等待处理</p>
      <p v-if="isFh" class="title">请将商品寄回以下地址并填写物流单号：</p>
      <div v-if="isFh" class="addressBox">
        <p class="name">收货人：朱先森 15632168160</p>
        <p class="address">收货地址：广州市越秀区 西城都荟三层3012</p>
      </div>
      <div v-if="isFh" class="logisticsNumber">
        <p class="text">物流单号</p>
        <p class="number">12454676891245467689</p>
      </div>
      <p class="title">退款信息</p>
      <div class="refundGoods">
        <div class="img">
          <img src="../../assets/img/classify/goods.png" alt="">
        </div>
        <div class="text">
          <p class="name">兔子的口袋2018夏季新款网红同款露背中长款宽松大T新款网红同款...</p>
          <p class="spec">白色：均码/1件</p>
          <p class="spec">黑色：均码/1件</p>
        </div>
      </div>
      <div class="businessInfo">
        <p>买家：香海的小店</p>
        <p>姓名：罗小海</p>
        <p>退款原因：原因1原因1</p>
        <p>退款金额：39.9</p>
        <p>申请时间：2018-12-12  23:12</p>
        <p>退款编号：236854545465789</p>
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
  import wx from "wx"
  export default {
    data () {
      return {
        isFh: true
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
