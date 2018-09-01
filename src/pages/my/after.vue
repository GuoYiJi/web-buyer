<template>
  <!-- 售后 -->
  <div class="home">
    <div class="kuang" v-for="(item, index) in list" :key="index">
      <div class="head">
        <span class="h-title">菲斯的小店</span>
        <span class="h-text">
          {{item.refundType == 0 ? '退款' : item.refundType == 1 ? '退货' : item.refundType == 2 ? '换货' : ''}},
          {{item.state == 0 ? '等待商家处理' : item.state == 1 ? '商家已同意' : item.state == 2 ? '商家已拒绝' : item.state == 3 ? '商家已同意' : item.state == 4 ? '商家已发货' : item.state == 5 ? '已撤销' : item.state == 6 ? '确认收货' : ''}}
        </span>
      </div>
      <div class="nav">
        <img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <i class="n-icon"></i>
      </div>
      <div class="below">
        <div class="total">
          <p class="t-left">共
            <span class="piece">{{item.goodsList.length}}</span>个款</p>
          <p class="t-left">
            <span class="piece">{{item.num}}</span>件商品</p>
          <!--<p class="t-freight">（含运费￥10.00）</p>-->
          <p v-if="item.refundType != 2" class="t-right">合计:
            <span class="money">￥{{item.price}}</span>
          </p>
        </div>
        <div class="btn">
          <span class="b-xq" @click="refundDetails(item.id,item.refundType)">查看详情</span>
        </div>
      </div>
    </div>
    <!--<div class="kuang">-->
      <!--<div class="head">-->
        <!--<span class="h-title">菲斯的小店</span>-->
        <!--<span class="h-text">换货，已拒绝换货</span>-->
      <!--</div>-->
      <!--<div class="nav">-->
        <!--<img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">-->
        <!--<img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">-->
        <!--<img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">-->
        <!--<i class="n-icon"></i>-->
      <!--</div>-->
      <!--<div class="below">-->
        <!--<div class="total">-->
          <!--<p class="t-left">共-->
            <!--<span class="piece">3</span>个款</p>-->
          <!--<p class="t-left">-->
            <!--<span class="piece">86</span>件商品</p>-->
          <!--<p class="t-freight">（含运费￥10.00）</p>-->
          <!--<p class="t-right">合计:-->
            <!--<span class="money">￥154.00</span>-->
          <!--</p>-->
        <!--</div>-->
        <!--<div class="btn">-->
          <!--<span class="b-xq">查看详情</span>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>
import wx from 'wx'
import API from '@/api/httpShui'
export default {
  components: {},
  data () {
    return {
      list: []
    }
  },
  methods: {
    refundDetails (id, type) {
      if (type === 2) { // 换货详情
        this.$router.push({
          path: '/pages/refund/barterDetails',
          query: {id: id}
        })
      } else { // 退款，退货详情
        this.$router.push({
          path: '/pages/refund/refundDetails',
          query: {id: id}
        })
      }
    }
  },
  async mounted () {
    const data = await API.afterService()
    // console.log('售后列表', data)
    if (data.code === 1) {
      this.list = data.data.list
    }
  }
}
</script>
<style type="text/sass" lang="sass" scoped>
@import '~@/assets/css/mixin'
.head
  display: flex
  font-size: 28px
  margin-top: 20px
  padding: 0 34px
  background: #fff
  height: 82px
  line-height: 82px
  .h-title
    color: #000
  .h-text
    flex: 1
    color: #F67C2F
    text-align: right
.nav
  height: 202px
  padding: 0 32px
  line-height: 202px
  position: relative
  .n-img
    width: 160px
    height: 160px
    margin-right: 20px
    vertical-align: middle
    display: inline-block
  .n-icon
    width: 14px
    height: 25px
    +bg-img("home/shanJiao.png")
    vertical-align: middle
    display: inline-block
    position: absolute
    right: 34px
    top: 45%
.below
  background: #fff
  .total
    height: 82px
    padding: 0 34px
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
  .btn
    height: 108px
    line-height: 108px
    background: #fff
    text-align: right
    .b-xq
      display: inline-block
      width: 160px
      height: 60px
      background: #F67C2F
      vertical-align: middle
      line-height: 60px
      text-align: center
      margin-right: 34px
      color: #fff
</style>
