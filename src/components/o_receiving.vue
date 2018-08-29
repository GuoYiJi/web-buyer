<template>
  <!-- 全部订单-待收货 -->
  <div class="home">
    <div class="kuang" v-for="(item,index) in myorderList" :key="index">
      <div class="head">
        <span class="h-title">菲斯的小店</span>
        <span class="h-text">待收货</span>
      </div>
      <div class="nav" v-for="(goods,j) in item.goodsList" :key="j">
        <img v-if="goods.image" class="n-img" :src="goods.image">
        <img v-else class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <div class="n-right">
          <p class="n-title">{{goods.name}}</p>
          <block v-for="(sku, s) in goods.skuList" :key="s">
            <p class="yardage">{{sku.skuCode}}/{{sku.num}}件</p>
          </block>
          <!-- <p class="yardage">{{skuCode}}/{{item.goodsList[0].skuList[0].num}}件</p> -->
        </div>
      </div>
      <div class="below">
        <div class="total">
          <p class="t-left">共
            <span class="piece">{{item.num}}</span> 件商品</p>
          <p class="t-freight">（含运费￥{{item.freight}}）</p>
          <p class="t-right">合计:
            <span class="money">￥{{item.count}}</span>
          </p>
        </div>
        <block v-if="item.isHasChildren != 0">
          <div class="orders">
            <li class="o-item">
              <span>子订单编号（已完成）：{{item.children[index+1]}}</span>
              <i class="o-img"></i>
            </li>
          </div>
          <!-- <div class="orders">
            <li class="o-item">
              <span>子订单编号（已完成）：12345678</span>
              <i class="o-img"></i>
            </li>
          </div> -->
        </block>
      </div>
      <div class="btn">
        <span class="b-xq" @click="bxq(item.id,3)">查看详情</span>
        <span v-if="item.isHasChildren == 0 && item.isPing == 0 " class="b-sc" @click="toOpen('visible')">退货</span>
      </div>
      <i-modal :visible="visible" @ok="retreat(item.id,1,item.paid,item.freight)" @cancel="toClose('visible')">
        <div class="m_tips">确定申请退货！</div>
      </i-modal>
    </div>
  </div>
</template>
<script>
// import wx from 'wx'
import API from '@/api/httpShui'
export default {
  components: {},
  data () {
    return {
      visible: false,
      myorderList: []
    }
  },
  methods: {
    bxq (id, xq) {
      // console.log(id)
      // console.log(xq)
      this.$router.push({
        path: '/pages/my/orderDetails/obligation',
        query: { id: id, xq: xq }
      })
    },
    toOpen (name) {
      this[name] = true
    },
    toClose (name) {
      this[name] = false
    },
    // 申请退款
    retreat (id, type, price, freight) {
      this.$router.push({
        path: '/pages/refund/refund',
        query: {orderId: id, type: type, price: price, freight: freight}
      })
    },
    // 获取订单
    async getOrder () {
      const Myorder = await API.myOrder({state: 6, isPing: 0})
      console.log('待收货', Myorder)
      this.myorderList = Myorder.data.list
      // 更改规格显示
      for (let i = 0; i < this.myorderList.length; i++) {
        for (let j = 0; j < this.myorderList[i].goodsList.length; j++) {
          for (let g = 0; g < this.myorderList[i].goodsList[j].skuList.length; g++) {
            let skuCode = this.myorderList[i].goodsList[j].skuList[g].skuCode
            this.myorderList[i].goodsList[j].skuList[g].skuCode = skuCode.replace(/,/g, ':')
          }
        }
      }
    }
  },
  async mounted () {
    this.getOrder()
  }
}
</script>
<style type="text/sass" lang='sass' scoped>
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
    flex: 5
    color: #000
  .h-text
    flex: 1
    color: #F67C2F
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
      height: 96px
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
    .t-right
      float: right
      padding-top: 15px
      padding-right: 10px
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
  .orders
    height: 90px
    line-height: 90px
    margin-left: 33px
    background: #fff
    border-bottom: 1px solid #E5E5E5
    span
      vertical-align: middle
      display: inline-block
    .o-img
      width: 14px
      height: 25px
      +bg-img("home/shanJiao.png")
      vertical-align: middle
      display: inline-block
      float: right
      margin-top: 30px
      margin-right: 33px
.btn
  line-height: 108px
  height: 108px
  padding: 24px 33px
  background: #fff
  box-sizing: border-box
  .b-xq
    float: right
    display: inline-block
    width: 160px
    height: 60px
    background: #F67C2F
    vertical-align: middle
    line-height: 60px
    text-align: center
    margin-left: 20px
    color: #fff
  .b-sc
    float: right
    display: inline-block
    width: 158px
    height: 58px
    border: 1px solid #BFBFBF
    vertical-align: middle
    line-height: 60px
    text-align: center
    margin-left: 20px
  .b-xq2
    float: right
    display: inline-block
    width: 158px
    height: 58px
    border: 1px solid #BFBFBF
    vertical-align: middle
    line-height: 60px
    text-align: center
    margin-right: 20px
    margin-top: 25px
</style>
