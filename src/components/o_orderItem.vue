<template>
  <!-- 全部订单-待付款 -->
  <div class="home">
    <div class="head">
        <span class="h-title">菲斯的小店</span>
        <span class="h-text">{{stateName[item.state]}}</span>
      </div>
      <div v-if="item.state != 5">
          <div class="nav" >
            <div  v-for="(goods,j) in item.goodsList" :key="j">
              <img v-if="goods.image&&j < 3" class="n-img" :src="goods.image">
              <img v-else-if="j < 3" class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
            </div>
            <!-- <div class="n-right">
              <p class="n-title">{{goods.name}}</p>
              <block v-for="(sku, s) in goods.skuList" :key="s">
                <p class="yardage">{{sku.skuCode}}/{{sku.num}}件</p>
              </block>
            </div> -->
          </div>
      </div>
      <div v-else>
        <div class="nav" v-for="(goods,j) in item.goodsList" :key="j">
          <img v-if="goods.image" class="n-img" :src="goods.image">
          <img v-else class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
          <div class="n-right">
            <p class="n-title">{{goods.name}}</p>
            <block v-for="(sku, s) in goods.skuList" :key="s">
              <p class="yardage">{{sku.skuCode}}/{{sku.num}}件</p>
            </block>
          </div>
        </div>

      </div>
      
      <div class="below">
        <div class="total">
          <p class="t-left">共
            <span class="piece">{{item.goodsListSize}}</span>个款，合计<span class="piece">{{item.num}}</span>件</p>
          <p class="t-freight">（含运费￥{{item.freight}}）</p>
          <p class="t-right">合计:
            <span class="money">￥{{item.count}}</span>
          </p>
        </div>
        <div class="btn" >
          <span class="b-xq" v-if="item.state==1" @click="toOpen('visible1')">确认付款</span>
          <span class="b-xq" v-if="item.state==2" @click="toOpen('visible3')">删除订单</span>
          <span class="b-sc" v-if="item.state==1" @click="toOpen('visible2')">取消订单</span>
          <span v-if="item.isHasChildren == 0 && item.isPing == 0 && item.state==5"  class="b-xq" @click="toOpen('visible4')">退款</span>
          <span v-if="item.isHasChildren == 0 && item.isPing == 0 && item.state==6" class="b-xq" @click="toOpen('visible5')">确认收货</span>
          <span v-if="item.isHasChildren == 0 && item.isPing == 0 && item.state==6" class="b-sc" @click="logistics(item.id)">查看物流</span>
          <span v-if="item.isHasChildren == 0 && item.isPing == 0 && item.state==6" class="b-sc" @click="afterSale(item.id)">查看售后</span>
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
        <!-- <i-modal :visible="visible5" @ok="retreat(item.id,1,item.paid,item.freight)" @cancel="toClose('visible5')">
          <div class="m_tips">确定申请退货！</div>
        </i-modal>
        <i-modal :visible="visible6" @ok="exchange(item.id,2)" @cancel="toClose('visible6')">
          <div class="m_tips">确定申请换货！</div>
        </i-modal> -->
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
  props:{
    item :{}
  },
  data () {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7: false,
      // myorderList: [],
      stateName : ['','待付款','交易取消','已支付','支付失败','待发货','待收货','交易完成','交易关闭','拼单中'],
      id: ''
    }
  },
  methods: {
    // 订单详情
    bxq (id, xq) {
      // console.log(id)
      // console.log(xq)
      this.visible1 = false;
      this.$router.push({
        path: '/pages/my/orderDetails/obligation',
        query: { id: id, xq: xq }
      })
    },
    buyPay(orderId){
      // 跳去支付页面
    },
    delOrder(id){
      this.visible3 = false
    },
    // 申请退款
    retreat (id, type, price, freight) {
      this.visible4 = false;
      this.visible5 = false;
      this.$router.push({
        path: '/pages/refund/refund',
        query: {orderId: id, type: type, price: price, freight: freight}
      })
    },
    // 申请换货
    exchange (id, type) {
      this.visible6 = false;
      this.$router.push({
        path: '/pages/refund/barter',
        query: {orderId: id, type: type}
      })
    },
    // 查看物流
    logistics (orderId){

    },
    //申请售后
    afterSale(orderId){

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
        this.$emit('refreshOrder');
      }
    },
    // 确认收货
    async sureOrder (orderId) {
      const data = await API.sureOrder({orderId: orderId})
      console.log('确认收货', data)
      if (data.code === 1) {
        this.visible5 = false
        this.$emit('refreshOrder');
      }
    },
  },
  async mounted () {
    // console.log(this.item);
    // this.getOrder()
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
      border: 1px solid #BFBFBF
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
