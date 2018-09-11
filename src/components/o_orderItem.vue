<template>
  <div class="home">
    <div class="head">
        <span class="h-title">{{shopName}}</span>
        <span class="h-text">{{stateName[item.state]}}</span>
      </div>
      <div v-if="item.state != 5">
          <!-- 其他 -->
          <div class="nav" >
            <div  v-for="(goods,j) in item.goodsList" :key="j">
              <img v-if="goods.image&&j < 3" class="n-img" :src="goods.image">
              <img v-else-if="j < 3" class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
            </div>
          </div>
          <div class="below">
            <div class="total">
              <p class="t-left">共
                <span class="piece">{{item.goodsListSize}}</span>个款，合计<span class="piece">{{item.num}}</span>件</p>
              <p class="t-freight">（含运费￥{{item.freight}}）</p>
              <p class="t-right">合计:
                <span class="money">￥{{item.paid}}</span>
              </p>
            </div>
          </div>
      </div>
      <div v-else>
        <!-- 待发货 -->
        <div v-for="(goods,j) in item.goodsList" :key="j">
          <div class="nav">
            <img v-if="goods.image" class="n-img" :src="goods.image">
            <img v-else class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
            <div class="n-right">
              <p class="n-title">{{goods.name}}</p>
              <p class="yardage" v-for="(ite,i) in goods.sizeTextArray" :key="i" v-if="i<=2">{{ite.text}}</p>
            </div>
          </div>
          <div class="below">
            <div class="total">
              <p class="t-right">
                共<span class="piece">{{goods.countNum}}</span>件商品, 合计:<span class="money">￥{{item.paid}}</span>
              </p>
            </div>
          </div>
          <table class="skuCode" v-if="item.state === 5 && item.isHasChildren">
            <tr>
              <th>颜色</th>
              <th>码数</th>
              <th>总件数</th>
              <th>已发</th>
              <th>未发</th>
            </tr>
            <tr v-for="(skuChild, c1) in skuCodeList[j]" :key="c1">
              <td v-for="(skuValue, c2) in skuChild" :key="c2">{{skuValue}}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="below">
        <div class="total" v-for="(cOder,idx) in item.children" :key="idx" >
          <span class="t-left" @click="bxq(cOder.id, cOder.state)">子订单编号({{stateName[cOder.state]}}): {{cOder.orderNo}}</span>
          <span class="t-right">></span>
        </div>
        <div class="btn" >
          <span class="b-xq" v-if="item.state==1" @click="toOpen('visible1')">确认付款</span>
          <span class="b-xq" v-if="item.state==2" @click="toOpen('visible3')">删除订单</span>
          <span class="b-sc" v-if="item.state==1" @click="toOpen('visible2')">取消订单</span>
          <span v-if="item.isHasChildren == 0 && item.isPing == 0 && item.state==5"  class="b-xq" @click="afterSale(item.id, item.paid, item.freight, 0)">申请退款</span>
          <span v-if="item.isHasChildren == 0 && item.isPing == 0 && item.state==6" class="b-xq" @click="toOpen('visible5')">确认收货</span>
          <span v-if="item.isHasChildren == 0 && item.isPing == 0 && item.state==6" class="b-sc" @click="logistics(item.id)">查看物流</span>
          <span v-if="item.isHasChildren == 0 && item.isPing == 0 && item.state==6" class="b-sc" @click="afterSale(item.id, item.paid, item.freight, 1)">申请售后</span>
          <span class="b-sc" @click="bxq(item.id,item.state)">查看详情</span>
        </div>
        <i-modal :visible="visible1" @ok="bxq(item.id,item.state)" @cancel="toClose('visible1')">
          <div class="m_tips">确认付款</div>
        </i-modal>
        <i-modal :visible="visible2" @ok="cancelOrder(item.id)" @cancel="toClose('visible2')">
          <div class="m_tips">确定取消订单</div>
        </i-modal>
        <i-modal :visible="visible3" @ok="delOrder(item.id)" @cancel="toClose('visible3')">
          <div class="m_tips">确定删除订单</div>
        </i-modal>
        <i-modal :visible="visible4" @ok="retreat(item.id,0,item.paid,item.freight)" @cancel="toClose('visible4')">
          <div class="m_tips">确定申请退款！</div>
        </i-modal>
        <i-modal :visible="visible5" @ok="sureOrder(item.id)" @cancel="toClose('visible5')">
          <div class="m_tips">请确认已经收到宝贝！</div>
        </i-modal>
      </div>
  </div>
</template>
<script>
// import wx from 'wx'
import API from '@/api/httpShui'
export default {
  components: {},
  props: {
    item: {},
    shopName: ''
  },
  data () {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      stateName: ['', '待付款', '交易取消', '已支付', '支付失败', '待发货', '待收货', '已完成', '交易关闭', '拼单中'],
      id: '',
      skuCodeList: []
    }
  },
  methods: {
    // 订单详情
    bxq (id, xq) {
      this.visible1 = false;
      this.$router.push({
        path: '/pages/my/orderDetails/obligation',
        query: { id: id, xq: xq }
      })
    },
    buyPay (orderId) {
      // 跳去支付页面
    },
    // 申请售后1or退款0
    afterSale (orderId, price, freight, type) {
      this.$router.push({
        path: '/pages/refund/applyCustomer',
        query: {orderId: orderId, price: price, freight: freight, type: type}
      })
    },
    // 查看物流
    logistics (orderId) {
      this.$router.push({
        path: '/pages/my/logistics',
        query: {orderId: orderId}
      })
    },
    toOpen (name) {
      this[name] = true
    },
    toClose (name) {
      this[name] = false
    },
    // 取消订单
    async cancelOrder (id) {
      const data = await API.cancelOrder({orderId: id})
      console.log('取消订单', data)
      if (data.code === 1) {
        this.visible2 = false
        // this.$router.back();
        this.$emit('refreshOrder')
      }
    },
    // 删除订单
    async delOrder (id) {
      const data = await API.delOrderShow({orderId: id})
      if (data.code === 1) {
        this.visible3 = false
        // this.$router.back();
        this.$emit('refreshOrder')
      }
    },
    // 确认收货
    async sureOrder (orderId) {
      const data = await API.sureOrder({orderId: orderId})
      console.log('确认收货', data)
      if (data.code === 1) {
        this.visible5 = false
        this.$emit('refreshOrder')
      }
    }
  },
  async mounted () {
    // console.log(this.item);
    // this.getOrder()
  },
  created () {
    // console.log(this.item)
    if (this.item && this.item.goodsList && this.item.goodsList.length > 0) {
      let gArr = this.item.goodsList
      gArr.forEach((good, idx) => {
        this.skuCodeList[idx] = []
        good.skuList.forEach((Citem, Cindex) => {
          let color = Citem.skuCode.split(',')[0]
          let size = Citem.skuCode.split(',')[1]
          this.skuCodeList[idx][Cindex] = [color, size, Citem.num, Citem.num - Citem.remainNum, Citem.remainNum]
        })
      })
    }
  }
}
</script>
<style type="text/sass" lang="sass" scoped>
@import '~@/assets/css/mixin'

table.skuCode
  width: 100%
  border: none
  text-align: center
  tr
    width: 100%
    display: flex
    &:nth-of-type(2n)
      background-color: #EEEEEE
    th, td
      flex: 1
      padding: 10px 0
      font-size: 28px
    th
      background-color: #FAFAFA
      color: #999999
    td
      color: #666666
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
      height: 60px
    .yardage
      font-size: 24px
      color: #999
.below
  background: #fff
  .total
    height: 82px
    line-height: 82px
    padding: 0 32px
    overflow: hidden
    border-bottom: 1px solid #E5E5E5
    p
      font-size: 24px
      color: #000
    span 
      font-size: 24px
      color: #000
    .t-left
      float: left
      // padding-top: 20px
    .t-right
      float: right
      // padding-top: 15px
      // padding-right: 10px
    .t-freight
      float: right
      // padding-top: 20px
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
    padding: 24px 33px
    background: #fff
    box-sizing: border-box
    .b-xq
      float: right
      display: inline-block
      width: 160px
      height: 60px
      background: #F67C2F
      font-size: 24px
      vertical-align: middle
      line-height: 60px
      text-align: center
      margin-left: 20px
      color: #fff
    .b-sc
      float: right
      display: inline-block
      width: 140px
      height: 58px
      background: #EEEEEE
      font-size: 24px
      vertical-align: middle
      line-height: 60px
      text-align: center
      margin-left: 20px
    .b-qr
      float: right
      display: inline-block
      width: 160px
      height: 58px
      border: 1px solid #BFBFBF
      vertical-align: middle
      line-height: 60px
      text-align: center
      margin-left: 20px
</style>
