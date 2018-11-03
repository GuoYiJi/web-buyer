<template>
  <div class="home">
    <div class="head">
      <div class="h-bg">
        <open-data class="h-img" type="userAvatarUrl"></open-data>
      </div>
      <div class="h-nickname">
        <div class="nickname">
          <open-data class="h-name" type="userNickName"></open-data>
        </div>
        <div class="h-id">ID：{{no}}</div>
        <div class="user-integral">{{ integral }}积分</div>
      </div>
      <!-- <span class="h-name">来年陌生的某某</span> -->
      <!-- <span class="h-integral">657积分</span> -->
    </div>
    <div class="nav">
      <p class="title" @click="handleOrderClick('all')">我的订单</p>
      <div class="n-box">
        <li class="box-item" @click="handleOrderClick('pay')">
          <i class="will-pay"></i>
          <span class="num" v-show="prePayment > 0">{{prePayment > 99 ? '99+' : prePayment}}</span>
          <p>待付款</p>
        </li>
        <li class="box-item" @click="handleOrderClick('tosend')">
          <i class="will-send"></i>
          <span class="num" v-show="delivery > 0">{{delivery > 99 ? '99+' : delivery}}</span>
          <p>待发货</p>
        </li>
        <li class="box-item" @click="handleOrderClick('sign')">
          <i class="will-receive"></i>
          <span class="num" v-show="receive > 0">{{receive > 99 ? '99+' : receive}}</span>
          <p>待收货</p>
        </li>
        <li class="box-item" @click="handleOrderClick('done')">
          <i class="will-reply"></i>
          <!-- <span class="num" v-show="commented > 0">{{commented > 99 ? '99+' : commented}}</span> -->
          <p>已完成</p>
        </li>
        <li class="box-item" @click="after()">
          <i class="will-sale"></i>
          <span class="num" v-show="refund > 0">{{refund > 99 ? '99+' : refund}}</span>
          <p>退换/售后</p>
        </li>
      </div>
    </div>
    <div class="menu">
      <li class="m-item" @click="toRouteMyget()">
        <i class="m-img"></i>
        <span>我的拼团</span>
        <i class="m-icon"></i>
      </li>
      <li class="m-item" @click="toRoute('my/address/editAddress')">
        <i class="m-dz"></i>
        <span>收货地址</span>
        <i class="m-icon"></i>
      </li>
      <li class="m-item" @click="like()">
        <i class="m-xh"></i>
        <span>我的喜欢</span>
        <i class="m-icon"></i>
      </li>
    </div>
    <div class="menu menu-2">
      <li class="m-item" @click="myCoupon()">
        <i class="m-kf"></i>
        <span class="yhq">我的优惠券</span>
        <i class="m-icon"></i>
      </li>
      <li class="m-item" @click="handleInfoClick()">
        <i class="m-kf"></i>
        <span class="yhq paddinng-500" >商家信息</span>
        <i class="m-icon"></i>
      </li>
      <li class="m-item" @click="tuig()">
        <!-- <li class="m-item" @click="tuig()"> -->
        <i class="m-sz"></i>
        <span class="msz">邀请推广</span>
        <!-- <button class="msz" open-type="share">邀请推广</button> -->
        <i class="m-icon"></i>
      </li>
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import mixin from '@/mixin'
import API from '@/api/httpJchan'
export default {
  mixins: [mixin],
  components: {},
  data () {
    return {
      prePayment: 0,
      delivery: 0,
      receive: 0,
      commented: 0,
      refund: 0,
      no: '',
      integral: 0
    }
  },
  methods: {
    handleInfoClick() {
      this.$router.push({
        path: '/pages/my/info/index'
      })
    },
    handleOrderClick(selectedId) {
      this.$router.push({
        path: '/pages/my/order/myorder',
        query: { selectedId }
      })
    },
    toRouteMyget () {
      this.$router.push('/pages/my/myget/get')
    },
    after () {
      this.$router.push('/pages/my/after')
    },
    myCoupon () {
      this.$router.push('/pages/my/marketingMgt/myCoupon')
    },
    like() {
      this.$router.push('/pages/my/like')
    },
    tuig() {
      this.$router.push("/pages/my/procedures");
    }
  },
  async onShow() {

    const prePayment = await API.myorder({ isPing: 0, state: 1 })
    const delivery = await API.myorder({ isPing: 0, state: 5 })
    const receive = await API.myorder({ isPing: 0, state: 6 })
    // 获取待收货，待发货，待付款订单的个数
    this.prePayment = prePayment.data.totalRow
    this.delivery = delivery.data.totalRow
    this.receive = receive.data.totalRow
  },
  async mounted () {
    var that = this
    wx.setStorage({
      key: 'qwe',
      data: 123
    })
    API.userDetail()
      .then(res => {
        console.log(res, 'res');
        const { code, data } = res;
        if (code === 1) {
          this.integral = data.integral;
        }
      });
    // 获取用户id
    wx.getStorage({
      key: 'no',
      success: function (res) {
        that.no = res.data
      }
    })
  },
  onUnload() {
    Object.assign(this, this.$options.data())
  }
}
</script>
<style type="text/sass" lang="sass" scoped>
@import '~@/assets/css/mixin'
.menu-2
  margin-top: 20px
.home
  padding-bottom: 20px;
  background: #F9F9F9

  width: 100%
  .head
    display: flex
    
    padding: 32px
    position: relative
    background: #fff
    border-top: 1px solid #E5E5E5
    border-bottom: 1px solid #E5E5E5
    margin-bottom: 20px
    .h-bg
      width: 120px
      height: 120px
      border-radius: 50%
      margin-right: 17px
      overflow: hidden
      .h-img
        display: inline-block
        width: 100%
        height: 100%
    .h-name
      font-size: 34px
      color: #333
    .nickname
      padding-top: 9px
    .user-integral
      font-size: 22px
      color: #EE7527
    .h-nickname
      flex: 1
    .h-id
      font-size: 22px
      color: #999
    .h-integral
      font-size: 22px
      color: #EE7527
  .nav
    line-height: 60px
    background: #fff
    margin-bottom: 20px
    .title
      padding: 32px 0
      font-size: 28px
      line-height: 26px
      color: #000
      margin-left: 33px
      border-bottom: 1px solid #eee
    .n-box
      display: flex
      text-align: center
      padding-top: 41px
      padding-bottom: 48px
      .box-item
        flex: 1
        position: relative
        font-size: 22px
        color: #666
        .will-pay
          width: 51px
          height: 51px
          +bg-img("my/dfk.png")
          margin-left: 50px
        .will-send
          width: 51px
          height: 51px
          +bg-img("my/dsh.png")
          margin-left: 50px
        .will-receive
          width: 51px
          height: 51px
          +bg-img("my/yfh.png")
          margin-left: 50px
        .will-reply
          width: 51px
          height: 51px
          +bg-img("my/ywc.png")
          margin-left: 50px
        .will-sale
          width: 51px
          height: 51px
          +bg-img("my/th.png")
          margin-left: 50px
        .num
          width: 32px
          height: 32px
          background: red
          color: #fff
          border-radius: 50%
          position: absolute
          text-align: center
          line-height: 32px
          top: -10px
          right: 35px
          font-size: 16px
  .menu
    background: #fff
    .m-item
      height: 90px
      line-height: 90px
      margin-left: 30px
      border-bottom: 1px solid #eee
      .m-img
        vertical-align: middle
        display: inline-block
        width: 30px
        height: 30px
        +bg-img("my/pt.png")
      .m-dz
        vertical-align: middle
        display: inline-block
        width: 30px
        height: 30px
        +bg-img("my/dz.png")
      .m-xh
        vertical-align: middle
        display: inline-block
        width: 30px
        height: 30px
        +bg-img("my/xh.png")
      .m-kf
        vertical-align: middle
        display: inline-block
        width: 30px
        height: 30px
        +bg-img("my/kf.png")
      .m-sz
        vertical-align: middle
        display: inline-block
        width: 30px
        height: 30px
        +bg-img("my/sz.png")
      span
        vertical-align: middle
        display: inline-block
        padding-left: 40px
        padding-right: 500px
        font-size: 28px
        color: #000
      .yhq
        vertical-align: middle
        display: inline-block
        padding-left: 40px
        padding-right: 473px
        font-size: 28px
        color: #000
      .msz
        vertical-align: middle
        display: inline-block
        padding-left: 40px
        padding-right: 500px
        font-size: 28px
        color: #000
        background: #fff
      button::after
        border: none
      .m-icon
        vertical-align: middle
        display: inline-block
        +bg-img("home/shanJiao.png")
        width: 11px
        height: 18px
.paddinng-500
  padding-right: 500px!important;
</style>
