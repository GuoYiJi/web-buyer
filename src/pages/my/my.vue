<template>
  <div class="home">
    <div class="head">
      <div class="h-bg">
        <open-data class="h-img" type="userAvatarUrl"></open-data>
      </div>
      <span class="h-name">来年陌生的某某</span>
      <span class="h-id">ID：612148</span>
      <span class="h-integral">657积分</span>
    </div>
    <div class="nav">
      <p class="title" @click="order(1)">我的订单</p>
      <div class="n-box">
        <li class="box-item" @click="order(2)">
          <i class="will-pay"></i>
          <span class="num" v-show="prePayment > 0">{{prePayment > 99 ? '99+' : prePayment}}</span>
          <p>待付款</p>
        </li>
        <li class="box-item" @click="order(3)">
          <i class="will-send"></i>
          <span class="num" v-show="delivery > 0">{{delivery > 99 ? '99+' : delivery}}</span>
          <p>待发货</p>
        </li>
        <li class="box-item" @click="order(4)">
          <i class="will-receive"></i>
          <span class="num" v-show="receive > 0">{{receive > 99 ? '99+' : receive}}</span>
          <p>已发货</p>
        </li>
        <li class="box-item" @click="order(5)">
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
      <li class="m-item" @click="tuig()">
        <i class="m-sz"></i>
        <span class="msz">邀请推广</span>
        <i class="m-icon"></i>
      </li>
    </div>
    <div class="footer">
      <footers :tag="4" />
    </div>
  </div>
</template>
<script>
import wx from "wx";
import footers from "@/commond/footer.vue";
import mixin from "@/mixin";
import API from "@/api/httpJchan";
export default {
  mixins: [mixin],
  components: { footers },
  data () {
    return {
      prePayment: 0,
      delivery: 0,
      receive: 0,
      commented: 0,
      refund: 0
    };
  },
  methods: {
    order (tag) {
      this.$router.push({
        path: "/pages/my/order/myorder",
        query: { tag: tag }
      })
    },
    toRouteMyget() {
      this.$router.push("/pages/my/myget/get");
    },
    after() {
      this.$router.push("/pages/my/after");
    },
    myCoupon() {
      this.$router.push("/pages/my/marketingMgt/myCoupon");
    },
    like() {
      this.$router.push("/pages/my/like");
    },
    tuig() {
      this.$router.push("/pages/my/procedures");
    }
  },
  async mounted() {
    const myorder = await API.myorder({});
    this.myorderList = myorder.data.list;
    console.log(myorder.data);
    var order = myorder.data.list;
    for (var i = 0; i < order.length; i++) {
      if (order[i].state == 1) {
        this.prePayment += 1;
      } else if (order[i].state == 5) {
        this.delivery += 1;
      } else if (order[i].state == 6) {
        this.receive += 1;
      }
    }
    wx.setStorage({
      key: "qwe",
      data: 123
    });
    console.log(myorder.data.pageSize, 1231);
    const afterList = await API.after({});
    console.log(afterList.data);
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.menu-2
  margin-top: 20px
.home
  background: #F9F9F9
  width: 100%
  height: 100%
  .head
    height: 184px
    position: relative
    background: #fff
    border-top: 1px solid #E5E5E5
    border-bottom: 1px solid #E5E5E5
    margin-bottom: 20px
    .h-bg
      display: inline-block
      position: absolute
      border-radius: 50%
      overflow: hidden
      top: 32px
      left: 32px
      .h-img
        width: 120px
        height: 120px
        display: inline-block
    .h-name
      position: absolute
      font-size: 34px
      color: #333
      top: 49px
      left: 169px
    .h-id
      position: absolute
      font-size: 28px
      color: #999
      top: 87px
      left: 170px
    .h-integral
      position: absolute
      font-size: 22px
      color: #EE7527
      top: 133px
      left: 169px
  .nav
    line-height: 60px
    background: #fff
    padding-bottom: 40px
    margin-bottom: 20px
    .title
      font-size: 28px
      color: #000
      margin-left: 33px
      vertical-align: middle
      border-bottom: 1px solid #eee
      padding-bottom: 20px
    .n-box
      display: flex
      text-align: center
      margin-top: 41px
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
      .m-icon
        vertical-align: middle
        display: inline-block
        +bg-img("home/shanJiao.png")
        width: 11px
        height: 18px

</style>
