<template>
  <div class="home">
    <!-- 订单详情-买家待付款 -->
    <obliGat v-if="id===1" :id="id"/>
    <!-- 订单详情-待发货状态 -->
    <senSon  v-if="id===2" :id="id"/>
    <!-- 订单详情-待收货状态-->
    <sendMailTEdT v-if="id===3" :id="id"/>
    <!-- 订单详情-交易成功状态 -->
    <succOrder />
    <!-- 订单详情-交易取消状态-->
    <cancelledMail v-if="id===4" :id="id"/>
  </div>
</template>
<script>
// import wx from 'wx'
import obliGat from '@/components/o_obliGat'
import senSon from '@/components/o_senSon'
import sendMailTEdT from '@/components/o_sendMailTEdT'
import succOrder from '@/components/o_succOrder'
import cancelledMail from '@/components/o_cancelledMail'

export default {
  components: {
    obliGat,
    senSon,
    sendMailTEdT,
    succOrder,
    cancelledMail,
  },
  data () {
    return {
      xq: 0,
      id: ''
    }
  },
  methods: {
    myXq () {
      const _xq = this.$mp.query.xq
      const _id = this.$mp.query.id
      this.id = _id
      this.xq = _xq
      console.log(this)
    }
  },
  mounted () {
    this.myXq()
  }
}
</script>
<style type="text/sass" lang="sass" scoped>
@import '~@/assets/css/mixin'
</style>
