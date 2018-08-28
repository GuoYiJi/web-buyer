<template>
  <div class="nav">
    <div class="head">
      <span class="delivery" :class="{active: expressWay==0}" @click="Delivery(0)">快速邮寄</span>
      <span class="delivery" :class="{active: expressWay==1}" @click="Delivery(1)">物流到付</span>
    </div>
    <div class="address" @click="popt()">
      <i class="dt"></i>
      <span class="add_text">请填写收货地址</span>
      <i class="sj"></i>
    </div>
    <div class="content">
      <p class="c_title">菲斯的小店</p>
      <div v-if="isDetails === false" class="c_nav" v-for="(item,index) in goodsInfo" :key="index">
        <img v-if="item.image" :src="item.image" class="cn_img">
        <img v-else src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg" class="cn_img">
        <div class="cn_text">
          <p class="cn_t1">{{item.name}}</p>
          <p class="cn_t2">{{item.skuCode}} : {{item.num}} 件</p>
          <i class="cn_sj"></i>
        </div>
      </div>
      <div v-if="isDetails === true" class="c_nav">
        <img v-if="goodsInfo.image" :src="goodsInfo.image" class="cn_img">
        <img v-else src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg" class="cn_img">
        <div class="cn_text">
          <p class="cn_t1">{{goodsInfo.name}}</p>
          <p class="cn_t2">{{skuCode}} : {{totalNum}} 件</p>
          <i class="cn_sj"></i>
        </div>
      </div>
      <div v-if="isGroup === true" class="c_nav">
        <img v-if="goodsInfo.image" :src="goodsInfo.image" class="cn_img">
        <img v-else src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg" class="cn_img">
        <div class="cn_text">
          <p class="cn_t1">{{goodsInfo.name}}</p>
          <p class="cn_t2">{{skuCode}} : {{totalNum}} 件</p>
          <i class="cn_sj"></i>
        </div>
      </div>
      <div class="settlement">
        <p class="s_text1">共
          <span class="st1">{{totalPack}}</span>个款</p>
        <p class="s_text2">
          <span class="st2">{{totalNum}}</span>件商品</p>
        <p class="s_text3">合计:
          <span class="st3">
            <span class="st4">￥</span>{{totalPrice}}</span>
        </p>
      </div>
      <div class="message">
        <span class="m_text">买家留言:</span>
        <input class="m_input" type="text" v-model="remark" placeholder="选填（填写内容已和卖家协商确认）">
      </div>
      <div class="coupon">
        <span class="c_text">优惠券</span>
        <i class="c_img"></i>
      </div>
    </div>
    <div class="foot">
      <p class="f_text">合计:
        <span class="ft1">￥{{totalPrice}}</span>
      </p>
      <span class="f_btn" @click="buy()">马上支付</span>
    </div>
    <!-- 收货地址弹窗 -->
    <div class="tan" v-if="(pop == 1)">
      <div class="t_nav">
        <div class="t_head">
          <span class="th_text">收货地址</span>
          <i class="th_img" @click="popt()"></i>
        </div>
        <p class="tc_text">
          <span class="tc_name">收货人:</span>
          <input class="tc_namet" type="text">
        </p>
        <p class="tc_text">
          <span class="tc_phone">联系电话:</span>
          <input class="tc_phonet" type="text">
        </p>
        <p class="tc_text">
          <span class="tc_region">所在地址:</span>
          <picker class="region" mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
            <view class="picker">
              {{region.length > 0 ? region[0] + '-' + region[1] + '-' + region[2] : '所在地址:' }}
            </view>
          </picker>
        </p>
        <p class="tc_text">
          <span class="tc_detailed">详细地址:</span>
          <input class="tc_detailedt" type="text">
        </p>
        <span class="t_btn" @click="popt()">完成</span>
      </div>
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import config from '@/config.js'
import API from '@/api/httpShui'
export default {
  components: {},
  data () {
    return {
      isDetails: null,
      isGroup: false,
      region: [],
      customItem: '全部',
      pop: 0,
      remark: '',
      goodsInfo: {},
      totalPack: 0,
      totalPrice: 0,
      totalNum: 0,
      addressId: '483430653849763840',
      skuObj: '',
      skuCode: '',
      couponId: '',
      sessionId: '',
      expressWay: 0,
      pingId: ''
    }
  },
  methods: {
    Delivery (type) {
      this.expressWay = type
    },
    bindRegionChange (e) {
      console.log(e)
      this.region = e.mp.detail.value
    },
    popt () {
      if (this.pop === 0) {
        this.pop = 1
      } else if (this.pop === 1) {
        this.pop = 0
      }
    },
    // 获取收货地址
    async getAddress () {
      const data = await API.address({pageNumber: 1, pageSize: 5})
      console.log('收货地址', data)
    },
    async getCoupon () {
      const data = await API.coupon({
        isExchange: 0,
        state: 1,
        pageSize: 5,
        pageNumber: 1
      })
      console.log('优惠券', data)
    },
    // 立即购买
    buy () {
      let that = this
      const TEST_URL = config.url
      const BASE_URL = config.url
      const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL
      let appId = config.appId
      if (this.isGroup === true) {
        console.log('拼团商品')
        let obj = {
          sessionId: this.sessionId,
          appId: appId,
          addressId: this.addressId,
          remark: this.remark,
          skuList: this.skuObj,
          couponId: this.couponId,
          pingId: this.pingId,
          pingOrderId: '',
          expressWay: this.expressWay
        }
        wx.request({
          method: 'POST',
          url: URL + '/api/order/createPingOrder',
          data: JSON.stringify(obj),
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
          }
        })
      } else {
        console.log('普通商品')
        let obj = {
          sessionId: this.sessionId,
          appId: appId,
          addressId: this.addressId,
          remark: this.remark,
          skuList: this.skuObj,
          couponId: this.couponId,
          expressWay: this.expressWay
        }
        wx.request({
          method: 'POST',
          url: URL + '/api/order/createOrder',
          data: JSON.stringify(obj),
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.code === 1) {
              that.wxSign(res.data.data.id)
            }
          }
        })
      }
    },
    // 微信支付
    async wxSign (orderId) {
      const data = await API.wxSign({orderId: orderId})
      console.log(data)
      if (data.code === 1) {
        wx.requestPayment({
          'timeStamp': '',
          'nonceStr': '',
          'package': '',
          'signType': 'MD5',
          'paySign': '',
          'success': function (res) {
            console.log('调取支付返回结果', res)
          },
          'fail': function (res) {
          }
        })
      }
    }
  },
  async mounted () {
    // 获取sessionId
    this.sessionId = await wx.getStorageSync('sessionId')
    // 详情过来
    if (this.$route.query.details) {
      this.isDetails = true
      let goods = JSON.parse(this.$route.query.details)
      this.goodsInfo = goods.goods
      this.skuObj = goods.skuObj
      this.sKuCode = goods.sKuCode
      this.totalPrice = goods.totalPrice
      this.totalNum = goods.totalNum
      this.totalPack = 1
      console.log(this.goodsInfo)
    }
    // 购物车过来
    if (this.$route.query.cart) {
      this.isDetails = false
      let goods = JSON.parse(this.$route.query.cart)
      this.goodsInfo = goods.goods
      this.skuObj = goods.skuObj
      this.totalPrice = goods.totalPrice
      this.totalNum = goods.totalNum
      this.totalPack = goods.goods.length
    }
    // 拼团过来
    if (this.$route.query.group) {
      this.isGroup = true
      let goods = JSON.parse(this.$route.query.group)
      this.goodsInfo = goods.goods
      this.pingId = goods.pingId
      this.skuObj = goods.skuObj
      this.skuCode = goods.skuCode
      this.totalPrice = goods.totalPrice
      this.totalNum = goods.totalNum
      this.totalPack = 1
      console.log(goods)
      console.log(this.skuObj)
      console.log(this.totalPrice)
      console.log(this.totalNum)
      console.log(this.totalPack)
    }
    this.getAddress()
    this.getCoupon()
  }
}
</script>
<style type="text/sass" lang="sass" scoped>
@import '~@/assets/css/mixin'
.nav
  .head
    height: 80px
    line-height: 80px
    background: #fff
    border-top: 1px solid #E5E5E5
    border-bottom: 1px solid #E5E5E5
    .delivery
      display: inline-block
      /*width: 136px*/
      height: 48px
      padding: 0 10px
      background: #fff
      font-size: 28px
      color: #333
      text-align: center
      line-height: 48px
      border: 1px solid #ccc
      border-radius: 4px
      margin: 0 20px
    .delivery.active
      background: #EE7527
      border: 1px solid #EE7527
      color: #fff
  .address
    height: 82px
    background: #F9F9F9
    line-height: 82px
    .dt
      width: 26px
      height: 32px
      +bg-img('shopping/s3.png')
      vertical-align: middle
      display: inline-block
      margin-left: 33px
    .add_text
      font-size: 28px
      color: #000
      vertical-align: middle
      display: inline-block
      margin-left: 25px
    .sj
      width: 14px
      height: 25px
      +bg-img('shopping/shanJiao.png')
      vertical-align: middle
      display: inline-block
      margin-left: 426px
  .content
    .c_title
      height: 82px
      font-size: 28px
      color: #000
      background: #fff
      line-height: 82px
      padding-left: 33px
    .c_nav
      display: flex
      .cn_img
        width: 160px
        height: 160px
        display: inline-block
        border-radius: 10px
        margin: 20px 32px
      .cn_text
        margin-top: 20px
        display: inline-block
        width: 518px
        position: relative
        .cn_t1
          +moreLine(2)
          font-size: 28px
          color: #000
        .cn_t2
          font-size: 24px
          color: #999
        .cn_sj
          position: absolute
          +bg-img('shopping/shanJiao.png')
          width: 14px
          height: 25px
          top: 90px
          right: 20px
    .settlement
      height: 82px
      background: #fff
      line-height: 82px
      padding-left: 30px
      font-size: 24px
      color: #000
      border-bottom: 1px solid #E5E5E5
      .s_text1
        display: inline-block
        vertical-align: middle
        .st1
          color: #F67C2F
          font-size: 28px
      .s_text2
        display: inline-block
        vertical-align: middle
        padding-left: 20px
        .st2
          color: #F67C2F
          font-size: 28px
      .s_text3
        display: inline-block
        vertical-align: middle
        padding-left: 295px
        .st3
          font-size: 32px
          color: #FF0000
          .st4
            font-size: 24px
            color: #FF0000
    .message
      height: 82px
      background: #fff
      line-height: 82px
      padding-left: 30px
      font-size: 24px
      color: #000
      border-bottom: 1px solid #E5E5E5
      .m_text
        display: inline-block
        vertical-align: middle
      .m_input
        display: inline-block
        vertical-align: middle
        font-size: 28px
        width: 500px
        margin-left: 20px
    .coupon
      height: 82px
      background: #fff
      line-height: 82px
      padding-left: 30px
      font-size: 24px
      color: #000
      .c_text
        font-size: 28px
        color: #000
        display: inline-block
        vertical-align: middle
      .c_img
        +bg-img('shopping/shanJiao.png')
        width: 14px
        height: 25px
        display: inline-block
        vertical-align: middle
        margin-left: 589px
  .foot
    height: 99px
    background: #fff
    line-height: 99px
    display: flex
    width: 100%
    position: fixed
    bottom: 0rpx
    .f_text
      flex: 3
      padding-left: 32px
      .ft1
        color: #FF0000
    .f_btn
      flex: 1
      background: #EE7527
      text-align: center
      color: #fff
  .tan
    width: 100%
    height: 100%
    position: fixed
    top: 0px
    left: 0px
    background: rgba(0,0,0,.3)
    z-index: 99
    .t_nav
      width: 650px
      height: 580px
      background: #fff
      position: absolute
      top: 15%
      left: 7%
      .t_head
        height: 58px
        line-height: 58px
        border-bottom: 1px solid #E5E5E5
        .th_text
          display: inline-block
          vertical-align: middle
          font-size: 28px
          color: #000
          padding-left: 34px
        .th_img
          display: inline-block
          vertical-align: middle
          +bg-img('shopping/gb.png')
          width: 23px
          height: 23px
          margin-left: 452px
      .tc_text
        height: 48px
        line-height: 48px
        margin-top: 32px
        margin-left: 58px
        .tc_name
          display: inline-block
          vertical-align: middle
          font-size: 28px
          color: #000
        .tc_namet
          display: inline-block
          vertical-align: middle
          width: 384px
          height: 48px
          border: 1px solid #999
          margin-left: 61px
        .tc_phone
          display: inline-block
          vertical-align: middle
          font-size: 28px
          color: #000
        .tc_phonet
          display: inline-block
          vertical-align: middle
          width: 384px
          height: 48px
          border: 1px solid #999
          margin-left: 36px
        .tc_region
          display: inline-block
          vertical-align: middle
          font-size: 28px
          color: #000
        .region
          display: inline-block
          display: inline-block
          vertical-align: middle
          width: 384px
          height: 48px
          border: 1px solid #999
          margin-left: 36px
          overflow: hidden
          .picker
            display: inline-block
            display: inline-block
            vertical-align: middle
            width: 384px
            height: 48px
            padding-left: 10px
        .tc_detailed
          display: inline-block
          vertical-align: middle
          font-size: 28px
          color: #000
        .tc_detailedt
          display: inline-block
          vertical-align: middle
          width: 384px
          height: 48px
          border: 1px solid #999
          margin-left: 36px
      .t_btn
        display: inline-block
        width: 538px
        height: 64px
        background: #EE7527
        color: #fff
        font-size: 28px
        text-align: center
        line-height: 64px
        border-radius: 8px
        position: absolute
        bottom: 20px
        left: 56px


</style>
