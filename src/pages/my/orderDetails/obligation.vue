<template>
  <div class="home">
    <!-- 订单详情-买家待付款 -->
    <obliGat v-if="xq==1" :id="id"/>
    <!-- 订单详情-待发货状态 -->
    <senSon  v-if="xq==2" :id="id"/>
    <!-- 订单详情-待收货状态-->
    <sendMailTEdT v-if="xq==3" :id="id"/>
    <!-- 订单详情-交易成功状态 -->
    <succOrder v-if="xq==4" :id="id" />
    <!-- 订单详情-交易取消状态-->
    <!--<cancelledMail  :id="id"/>-->
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
    cancelledMail
  },
  data () {
    return {
      xq: null,
      id: ''
    }
  },
  methods: {
    myXq () {
      this.id = this.$route.query.id
      this.xq = this.$route.query.xq
      // const _xq = this.$route.query.xq
      // const _id = this.$route.query.id
      // console.log(this.xq)
      // console.log(this.id)
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
