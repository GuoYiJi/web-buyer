<template>
  <div class="wrapper">
    <p v-if="type === '0'" @click="toRoute('/pages/refund/refund',0)">
      <span class="tui"></span>
      仅退款(无需退货)
    </p>
    <p v-if="type != 0" @click="toRoute('/pages/refund/refund',1)">
      <span class="tui"></span>
      退货退款(已收到货，需要退换已收到的货物)
    </p>
    <p v-if="type != 0" @click="toRoute('/pages/refund/barter',2)">
      <span class="huan"></span>
      换货(商品存在质量等问题，需要协商换货)
    </p>
  </div>
</template>
<script>
import wx from 'wx'
import API from '@/api/httpShui'
import config from '@/config'
export default {
  data () {
    return {
      wellMsgShow: false,
      msg: '',
      orderId: null,
      type: null,
      price: null,
      freight: null
    }
  },
  components: {

  },
  methods: {
    toRoute (path, type) {
      if (type != 3) {
        this.$router.push({
        path: path,
        query: {orderId: this.orderId, type: type, price: this.price, freight: this.freight}
        })
      } else {
        this.$router.push({
        path: path,
        query: {orderId: this.orderId, type: type}
        })
      }
      
    },
    // 定时器弹窗
    mySetTimeout (msg) {
      let that = this
      that.wellMsgShow = true
      that.msg = msg
      setTimeout(function () {
        that.wellMsgShow = false
        that.msg = ''
      }, 1000)
    }
  },
  mounted () {
    this.orderId = this.$route.query.orderId
    this.type = this.$route.query.type
    this.price = this.$route.query.price
    this.freight = this.$route.query.freight
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
  .wrapper
    p
      padding: 0 24px 0 24px
      height: 107px
      line-height: 107px
      font-size: 28px
      color: #333
      background: #fff url('../../assets/img/my/shanJiao.png') no-repeat 95% center
      background-size: 16px 28px
      span
        float: left
        width: 46px
        height: 107px
        margin-right: 10px
      .tui
        background: #fff url('../../assets/img/my/tuihuo.png') no-repeat center
        background-size: 46px 46px
      .huan
        background: #fff url('../../assets/img/my/huanhuo.png') no-repeat center
        background-size: 46px 46px
</style>
