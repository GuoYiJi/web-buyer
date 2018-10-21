<template>
  <div class="home">
    <div class="van-cell order-header">
      <div class="van-cell__title">
        <span>{{shopName}}</span>
      </div>
      <div class="van-cell__value">
        <span class="state">{{stateName[item.state]}}</span>
      </div>
    </div>
<!--     <div class="head">
        <span class="h-title">{{shopName}}</span>
        <span class="h-text">{{stateName[item.state]}}</span>
      </div> -->
      <div v-if="item.state != 5">
        <!-- 其他 -->

        <div class="van-cell van-cell--clickable goods-thumb__list" @click="handleShopListClick(item.goodsList)">
          <div class="van-cell__title">
            <span class="goods-thumb-item" v-for="(goods, j) in item.goodsList" :key="j" v-if="goods.image&& j < 3">
              <img class="n-img" :src="goods.image" mode="aspectFill">
            </span>
          </div>
          <div class="van-icon van-icon-arrow van-cell__right-icon"></div>
        </div>
        <div class="below">
          <div class="van-cell">
            <div class="van-cell__title">
              <span class="goods-buy__info">共<span class="goods-buy__num">{{ item.goodsListSize }}</span>个款  <span class="goods-buy__num">{{item.num}}</span>件商品  </span>
            </div>
            <div class="van-cell__value">
              <span class="goods-buy__total">合计:</span>
              <span class="goods-buy__price">￥{{item.count}}</span>
              <span class="cap-express__fee">（含运费￥{{item.freight}}）</span>
            </div>
          </div>
          <div class="total" v-if="false">
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
        <div>
          <div class="van-cell van-cell--clickable goods-thumb__list" @click="handleShopListClick(item.goodsList)">
            <div class="van-cell__title">
              <span class="goods-thumb-item" v-for="(goods, listIndex) in item.goodsList" :key="listIndex" v-if="goods.image && listIndex < 3">
                <img class="n-img" :src="goods.image" mode="aspectFill">
              </span>
            </div>
            <div class="van-icon van-icon-arrow van-cell__right-icon"></div>
          </div>
          <div class="van-cell">
            <div class="van-cell__title">
              <span class="goods-buy__info">共<span class="goods-buy__num">{{ item.goodsListSize }}</span>个款  <span class="goods-buy__num">{{item.num}}</span>件商品  </span>
            </div>
            <div class="van-cell__value">
              <span class="goods-buy__total">合计:</span>
              <span class="goods-buy__price">￥{{item.count}}</span>
              <span class="cap-express__fee" v-if="item.expressWay > 0">（含运费￥{{item.expressWay}}）</span>
            </div>
          </div>
          <div  v-for="(goods, j) in item.goodsList" :key="j">
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
      </div>
      <div class="below">
       <!--  <div class="total" v-for="(cOder,idx) in item.children" :key="idx" >
          <span class="t-left" @click="bxq(cOder.id, cOder.state)">子订单编号({{stateName[cOder.state]}}): {{cOder.orderNo}}</span>
          <span class="t-right">></span>
        </div> -->
        <div class="van-cell van-hairline" v-for="(cOder,idx) in item.children" :key="idx" @click="bxq(cOder.id, cOder.state)">
          <div class="van-cell__title">
            <span>子订单编号({{stateName[cOder.state]}}): {{cOder.orderNo}}</span>
          </div>
          <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
        </div>
        
        <div class="below__bottom van-cell van-hairline">
          
          <div class="van-cell__value" v-if="item.state === 1">
            <div class="btn__cell">
              <span class="below__btn" @click="handleOrderConfirmClick({ id: item.id, type: 'cancel' })">取消订单</span>
            </div>
            <div class="btn__cell">
              <span class="below__btn" @click="bxq(item.id,item.state)">查看详情</span>
            </div>
            <div class="btn__cell">
              <span class="below__btn below__btn--primary" @click="bxq(item.id,item.state)">确认付款</span>
            </div>
          </div>
          <div class="van-cell__value" v-if="item.state === 2 || item.state === 7">
            <div class="btn__cell">
              <span class="below__btn below__btn--primary" @click="bxq(item.id,item.state)">查看详情</span>
            </div>
            <div class="btn__cell">
              <span class="below__btn" @click="handleOrderConfirmClick({ id: item.id, type: 'delete' })">删除订单</span>
            </div>
          </div>
          <div class="van-cell__value" v-if="item.state === 5">
            <div class="btn__cell">
              <span class="below__btn" v-if="!item.isHasChildren" @click="afterSale(item.id, item.paid, item.freight, 0)">退款</span>
            </div>
            <div class="btn__cell">
              <span class="below__btn below__btn--primary" @click="bxq(item.id,item.state)">查看详情</span>
            </div>
          </div>
          <div class="van-cell__value" v-if="item.state === 6">
            <div class="btn__cell">
              <span class="below__btn" @click="bxq(item.id,item.state)">查看详情</span>
            </div>
            <div class="btn__cell" v-if="!item.isHasChildren">
              <span class="below__btn" @click="afterSale(item.id, item.paid, item.freight, 1)">申请售后</span>
            </div>
            <div class="btn__cell" v-if="!item.isHasChildren">
              <span class="below__btn" @click="logistics(item.id)">查看物流</span>
            </div>
            <div class="btn__cell" v-if="!item.isHasChildren">
              <span class="below__btn below__btn--primary" @click="sureOrder(item.id)">确认收货</span>
            </div>
          </div>
          <!-- <span class="b-sc btn" v-if="item.state==1" @click="handleOrderConfirmClick({ id: item.id, type: 'cancel' })">取消订单</span> -->
        </div>
        <!-- <i-modal :visible="visible5" @ok="sureOrder(item.id)" @cancel="toClose('visible5')">
          <div class="m_tips">请确认已经收到宝贝！</div>
        </i-modal> -->
      </div>
  </div>
</template>
<script>
// import wx from 'wx'
import API from '@/api/httpShui';
import orderMixins from '@/orderMixins';
export default {
  components: {},
  mixins: [orderMixins],
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
      stateName: ['', '待付款', '交易取消', '已支付', '支付失败', '待发货', '待收货', '已完成', '交易关闭', '拼单中', '售后中'],
      id: '',
      skuCodeList: []
    }
  },
  methods: {
    // 订单详情
    bxq (id, xq) {
      this.visible1 = false
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
      console.log(this.item);

      // 待发货
      if (this.item.state === 5) {
        this.$router.push({
          path: '/pages/refund/refund',
          query: {
            orderId,
            type: 0,
            price,
            freight
          }
        })
      } else {
        this.$router.push({
          path: '/pages/refund/applyCustomer',
          query: {orderId: orderId, price: price, freight: freight, type: type}
        })
      }
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
    async handleOrderConfirmClick(payload) {
      try {
        const { id } = payload;
        switch (payload.type) {
          case 'delete':
            this.handleOrderDelete(id)
              .then(res => {
                this.$emit('confirm', { delete: true, id })
              })
            break;
          case 'cancel':
            this.handleOrderCancel(id)
              .then(res => {
                this.$emit('confirm', { cancel: true, id })
              })
            break;
          case 'pay':
            wx.showModal({
              title: '付款提示',
              content: '确认付款',
              success: res => {
                if (res.confirm) {
                  this.$router.push({
                    path: '/pages/my/orderDetails/obligation',
                    query: {
                      id: payload.id
                    }
                  })
                }
              }
            })
            break;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 确认收货
    async sureOrder (orderId) {
      this.handleOrderDone(orderId)
        .then(res => {
          wx.startPullDownRefresh();
        })
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
.order-header
  margin-top: 20px
  padding: 33px 28px
  font-size: 28px
  .state
    color: #F67C2F
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
</style>
