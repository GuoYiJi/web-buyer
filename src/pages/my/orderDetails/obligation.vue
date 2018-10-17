<template>
  <div class="home order-detail--fixed-bottom" v-if="!hidden">
    <div class="head order-status" :class="{ 'is-success': details.state === 7 }">
      <i class="h-img"></i>
      <span>
        {{details.pingOrderId ? pingStateName[details.state] : stateName[details.state]}}
        <block v-if="details.pingOrderId && details.state === 6">
          （还剩{{details.timeEnd}}自动确认收货）
        </block>
      </span>
    </div>
    <div class="cap-logistics" v-if="details.orderAddress">
      <div class="cap-logistics__address">
        <i class="van-icon van-icon-location"></i>
        <div class="cap-logistics__address-content">
          <div>
            <p class="cap-logistics__address-name">收货人：{{details.orderAddress.name}}</p>
            <p class="cap-logistics__address-tel">{{details.orderAddress.mobile}}</p>
          </div>
          <p class="cap-logistics__address-detail">收货地址：{{details.orderAddress.value + details.orderAddress.address}}</p>
        </div>
      </div>
    </div>
    <div class="diz" v-if="false">
      <i class="dz-img"></i>
      <span class="dz-name">收货人：{{details.orderAddress.name}}</span>
      <span class="dz-phone">{{details.orderAddress.mobile}}</span>
      <p class="dz-dz">收货地址：{{details.orderAddress.value + details.orderAddress.address}}</p>
    </div>
    <div class="cap-order-goods-header">
      <span>{{shopName}}</span>
    </div>
    <div class="cap-order-goods-lsit">
      <div class="cap-order-goods-card" v-for="(goods, index) in details.goodsList" :key="index" @click="handleGoodsDetail(goods.goodsId)">
        <div class="van-card">
          <div class="van-card__thumb"><img :src="goods.image" alt=""></div>
          <div class="van-card__content">
            <div class="van-card__row">
              <div class="van-card__title">{{goods.name}}</div>
            </div>
            <div class="van-card__row" v-for="(sku, skuIndex) in goods.orderGoods" :key="skuIndex">
              <div class="van-card__desc">{{sku.skuCode}}/{{sku.num}}件</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="van-cell">
      <div class="van-cell__title">
        <span class="goods-buy__info">共<span class="goods-buy__num">{{details.goodsList.length}}</span>个款  <span class="goods-buy__num">{{details.num}}</span>件商品  </span>
      </div>
      <div class="van-cell__value">
        <span class="goods-buy__total">合计:</span>
        <span class="goods-buy__price">￥{{details.paid}}</span>
        <span class="cap-express__fee" v-if="details.expressWay === 0">（含运费￥{{details.freight}}）</span>
      </div>
    </div>

    <div class="van-cell van-hairline" v-for="(item, idx) in details.children" :key="idx" @click="handleChildClick(item)">
      <div class="van-cell__title">
        <span>子订单编号({{stateName[item.state]}}): {{item.orderNo}}</span>
      </div>
      <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
    </div>
    <div class="van-cell van-hairline">
      <div class="van-cell__title">买家留言：{{details.remark ? details.remark : '没有留言信息！'}}</div>
    </div>
    <!-- <p class="title">{{shopName}}</p> -->
    <div class="nav" v-for="(item,index) in details.orderGoods" :key="index">
      <div class="info">
        <img v-if="item.image" class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <img v-else class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <div class="n-right">
          <p class="n-title">{{item.name}}</p>
          <p class="yardage" v-for="(ite,i) in item.sizeTextArray" :key="i" v-if="i<=2">{{ite.text}}</p>
        </div>
      </div>
      <div class="below">
        <div class="total">
          <p class="t-left">共
            <span class="piece">{{details.num}}</span> 件商品
          </p>
          <!-- 邮寄 -->
          <p v-if="details.expressWay === 0" class="t-freight">（含运费￥{{details.freight}}）</p>
          <p class="t-right">合计:
            <span class="money">￥{{details.count}}</span>
          </p>
        </div>
        <!-- 邮寄，主子订单 -->
        <div v-if="details.state === 5 && details.isHasChildren" class="b-box">
          <li class="b-item b-title">
            <span class="b-text">颜色</span>
            <span class="b-text">码数</span>
            <span class="b-text">总件数</span>
            <span class="b-text">已发</span>
            <span class="b-text">未发</span>
          </li>
          <li class="b-item b-color" v-for="(skuChild, c1) in skuCodeList[index]" :key="c1">
            <span class="b-text" v-for="(skuValue, c2) in skuChild" :key="c2">{{skuValue}}</span>
          </li>
        </div>
        <!-- 邮寄，主子订单 -->
        <div class="child-num" v-if="details.state === 5 && details.isHasChildren">
          <div class="orders" v-for="(cOder,idx) in details.children" :key="idx">
            <p class="o-item">
              <span>子订单编号（{{stateName[cOder.state]}}）：{{cOder.orderNo}}</span>
              <i class="o-img"></i>
            </p>
          </div>
        </div>
        <p class="message">买家留言：{{details.remark ? details.remark : '没有留言信息！'}}</p>
      </div>
    </div>
    <div class="goods-pay">
      
      <div class="van-cell">
        <div class="van-cell__value van-cell__value--alone">
          <div class="goods-pay__cell">
            <div class="goods-pay__cell-title">商品总价</div>
            <div class="goods-pay__cell-value">￥{{details.count - details.freight}}</div>
          </div>
          <div class="goods-pay__cell">
            <div class="goods-pay__cell-title">优惠劵折扣</div>
            <div class="goods-pay__cell-value">-￥{{details.couponMoney ? details.couponMoney : 0}}</div>
          </div>
          <div class="goods-pay__cell" v-if="details.expressWay === 0">
            <div class="goods-pay__cell-title">运费</div>
            <div class="goods-pay__cell-value">+￥{{details.freight}}</div>
          </div>
        </div>
      </div>
      <div class="van-cell van-hairline">
        <div class="val-cell__title cap-order__inner">
          <p class="s-text" v-if="details.parent">父订单编号：{{details.parent.orderNo}}</p>
          <p class="s-text">订单编号：{{details.orderNo}}</p>
          <p class="s-text">下单时间：{{details.createTime}}</p>
          <p v-if="details.payTime" class="s-text">支付时间：{{details.payTime}}</p>
          <p v-if="details.pingTime" class="s-text">拼团时间：{{details.pingTime}}</p>
          <p v-if="details.deliverTime" class="s-text">发货时间：{{details.deliverTime}}</p>
        </div>
      </div>
    </div>
    <!-- <div class="prices">
      <p>
        <span class="left">商品总价</span>
        <span class="right">￥{{details.count - details.freight}}</span>
      </p>
      <p>
        <span class="left">优惠劵折扣</span>
        <span class="right">-￥{{details.couponMoney ? details.couponMoney : 0}}</span>
      </p>
      <p v-if="details.expressWay === 0">
        <span class="left">运费</span>
        <span class="right">+￥{{details.freight}}</span>
      </p>
      <div class="serial">
        <p class="s-text">订单编号：{{details.orderNo}}</p>
        <p class="s-text">下单时间：{{details.createTime}}</p>
        <p v-if="details.payTime" class="s-text">支付时间：{{details.payTime}}</p>
      </div>
    </div> -->
    <!--<div style="height: 100px"></div>-->
    <div v-if="isRetreat" class="foot">
      <span class="pay" @click="toOpen('visible')">退款</span>
    </div>
    <i-modal :visible="visible" @ok="retreat(details.id, 0, details.paid, details.freight)" @cancel="toClose('visible')">
      <div class="m_tips">确定申请退款！</div>
    </i-modal>
    <block v-if="!details.children.length">
      
      <block v-if="details.pingOrderId">

        <!-- 待付款 -->
        <div class="submit-bar van-hairline--top van-submit-bar" v-if="details.state === 1">
          <div class="van-submit-bar__bar">
            <div class="van-submit-bar__text">&nbsp;</div>
            <div class="van-button van-button--default van-button--normal" @click="handleCancelClick">
              <span class="van-button__text">取消订单</span>
            </div>
            <div class="van-button van-button--danger van-button--normal" @click="handlePayClick">
              <span class="van-button__text">马上支付</span>
            </div>
          </div>
        </div>
        <div class="submit-bar van-hairline--top van-submit-bar" v-if="details.state === 2">
          <div class="van-submit-bar__bar">
            <div class="van-submit-bar__text">
              &nbsp;
            </div>
            <div class="van-button van-button--danger van-button--normal" @click="handleDeleteClick">
              <span class="van-button__text">删除订单</span>
            </div>
          </div>
        </div>
        <div class="submit-bar van-hairline--top van-submit-bar" v-if="details.state === 5">
          <div class="van-submit-bar__bar">
            <div class="van-submit-bar__avatars">
              <span class="van-submit-bar__avatar" v-for="(user, index) in details.pingUser" :key="index" :style="{ 'background-image': 'url(' + user.head + ')' }"></span>
            </div>
            <div class="van-button van-button--danger van-button--normal" @click="handleSaleClick(details.id)">
              <span class="van-button__text">申请退款</span>
            </div>
          </div>
        </div>
        <div class="submit-bar van-hairline--top van-submit-bar" v-if="details.state === 6">
          <div class="van-submit-bar__bar">
            <div class="van-submit-bar__avatars">
              <span class="van-submit-bar__avatar" v-for="(user, index) in details.pingUser" :key="index" :style="{ 'background-image': 'url(' + user.head + ')' }"></span>
            </div>

            <div class="van-button van-button--default van-button--normal" @click="handleOrderAfterSale(details.id, details.paid, details.freight, 1)">
              <span class="van-button__text">申请售后</span>
            </div>
            <div class="van-button van-button--default van-button--normal" @click="handleCancelClick">
              <span class="van-button__text">查看物流</span>
            </div>
            <div class="van-button van-button--danger van-button--normal" @click="handleBtnAction">
              <span class="van-button__text">确认收货</span>
            </div>
          </div>
        </div>

        <!-- 交易完成 -->
        <div class="submit-bar van-hairline--top van-submit-bar" v-if="details.state === 7">
          <div class="van-submit-bar__bar">
            <div class="van-submit-bar__avatars">
              <span class="van-submit-bar__avatar" v-for="(user, index) in details.pingUser" :key="index" :style="{ 'background-image': 'url(' + user.head + ')' }"></span>
            </div>
            <div class="van-button van-button--danger van-button--normal" @click="handleDeleteClick">
              <span class="van-button__text">删除订单</span>
            </div>

          </div>
        </div>
        <!-- 拼单中 -->
        <div class="submit-bar van-hairline--top van-submit-bar" v-if="details.state === 9">
          <div class="van-submit-bar__bar">
            <div class="van-submit-bar__avatars">
              <span class="van-submit-bar__avatar" v-for="(user, index) in details.pingUser" :key="index" :style="{ 'background-image': 'url(' + user.head + ')' }"></span>
              <span class="van-submit-bar__avatar van-submit-bar__avatar--default"></span>
            </div>
          </div>
        </div>
      </block>
      <block v-else>
        
        <!-- 待付款 -->
        <div class="submit-bar van-hairline--top van-submit-bar" v-if="details.state === 1">
          <div class="van-submit-bar__bar">
            <div class="van-submit-bar__text">
              <span>合计：</span>
              <span class="van-submit-bar__price">￥{{details.paid}}</span>
            </div>
            <div class="van-button van-button--default van-button--normal" @click="handleCancelClick">
              <span class="van-button__text">取消订单</span>
            </div>
            <div class="van-button van-button--danger van-button--normal" @click="handlePayClick">
              <span class="van-button__text">马上支付</span>
            </div>
          </div>
        </div>
        <!-- 交易取消 -->
        <div class="submit-bar van-hairline--top van-submit-bar" v-if="details.state === 2">
          <div class="van-submit-bar__bar">
            <div class="van-submit-bar__text">
              &nbsp;
            </div>
            <div class="van-button van-button--danger van-button--normal" @click="handleDeleteClick">
              <span class="van-button__text">删除订单</span>
            </div>
          </div>
        </div>
        <div class="submit-bar van-hairline--top van-submit-bar" v-if="details.state === 5">
          <div class="van-submit-bar__bar">
            <div class="van-submit-bar__text">&nbsp;</div>
            <div class="van-button van-button--danger van-button--normal" @click="handleSaleClick(details.id)">
              <span class="van-button__text">申请退款</span>
            </div>
          </div>
        </div>
        <div class="submit-bar van-hairline--top van-submit-bar" v-if="details.state === 6">
          <div class="van-submit-bar__bar">
            <div class="van-submit-bar__text">&nbsp;</div>
            <div class="van-button van-button--default van-button--normal" @click="handleOrderAfterSale(details.id, details.paid, details.freight, 1)">
              <span class="van-button__text">申请售后</span>
            </div>
            <div class="van-button van-button--default van-button--normal" @click="handleLogistics(details.id)">
              <span class="van-button__text">查看物流</span>
            </div>
            <div class="van-button van-button--danger van-button--normal" @click="handleBtnAction">
              <span class="van-button__text">确认收货</span>
            </div>
          </div>
        </div>

      </block>
    </block>
  </div>
</template>
<script>
import wx from 'wx';
import API from '@/api/httpShui';
import obliGat from '@/components/o_obliGat';
import senSon from '@/components/o_senSon';
import sendMailTEdT from '@/components/o_sendMailTEdT';
import succOrder from '@/components/o_succOrder';
import cancelledMail from '@/components/o_cancelledMail';
import orderMixins from '@/orderMixins';
export default {
  mixins: [orderMixins],
  components: {
    obliGat,
    senSon,
    sendMailTEdT,
    succOrder,
    cancelledMail
  },
  data () {
    return {
      shopName: '',
      stateName: {
        0: '',
        1: '待付款',
        2: '交易取消',
        3: '已支付',
        4: '支付失败',
        5: '等待卖家发货',
        6: '待收货',
        7: '已完成',
        8: '交易关闭',
        9: '拼团中',
        10: '售后中'
      },
      pingStateName: {
        1: '未支付',
        2: '交易取消',
        3: '已支付',
        4: '支付失败',
        5: '拼团成功，待发货',
        6: '拼团成功，待收货',
        7: '拼团成功，交易完成',
        8: '交易关闭',
        9: '拼单中',
        10: '售后中'
      },
      details: {},
      skuCodeList: [],
      xq: null,
      id: null,
      hidden: true
    }
  },
  methods: {
    handleChildClick(item) {
      this.$router.push({
        path: '/pages/my/orderDetails/sub',
        query: { id: item.id, xq: item.state }
      })
    },
    getOrderDetails (id) {
      return new Promise(async (resolve, reject) => {

        this.hidden = true;
        const data = await API.getOrderDetails({orderId: id})
        if (data.code !== 1) {
          wx.showToast({
            title: data.desc,
            icon: 'none'
          })
          reject();
          return;
        }
        // this.isRetreat = data.data.isHasChildren
        // 规格显示
        try {

          this.details = data.data
          let orderGoods = this.details.orderGoods || [];
          for (let i = 0; i < orderGoods.length; i++) {
            let sizeTextArray = []
            for (let j = 0; j < orderGoods[i].orderGoods.length; j++) {
              let sku = orderGoods[i].orderGoods[j]
              let skuObj = {}
              let attrVal = sku.skuCode.split(',')
              skuObj.colorVal = attrVal[0]
              skuObj.text = attrVal[0] + ':' + attrVal[1] + '/' + sku.num + '件'
              let ishasColor = false
              for (let a = 0; a < sizeTextArray.length; a++) {
                if (sizeTextArray[a].colorVal === attrVal[0]) {
                  sizeTextArray[a].text += ';' + attrVal[1] + '/' + sku.num + '件'
                  ishasColor = true
                  break
                }
              }
              if (!ishasColor) {
                sizeTextArray.push(skuObj)
              }
            }
            orderGoods[i].sizeTextArray = sizeTextArray
          }
          this.details.orderGoods = orderGoods
          if (orderGoods && orderGoods.length > 0) {
            let gArr = orderGoods
            gArr.forEach((good, idx) => {
              this.skuCodeList[idx] = []
              good.orderGoods.forEach((Citem, Cindex) => {
                let color = Citem.skuCode.split(',')[0]
                let size = Citem.skuCode.split(',')[1]
                // console.log(color, Citem)
                this.skuCodeList[idx][Cindex] = [color, size, Citem.num, Citem.num - Citem.remainNum, Citem.remainNum]
                // console.log(this.skuCodeList)
              })
            })
          }
          if (data.data.isHasChildren === 0 && data.data.isPing === 0) {
            this.isRetreat = true
          }
          this.hidden = false;
          resolve();
        } catch (err) {
          reject();
        }
      })
    },
    

    handleSaleClick(orderId) {
      const { paid, freight } = this.details;
      this.$router.push({
        path: '/pages/refund/applyCustomer',
        query: {orderId, price: paid, freight, type: 0}
      })
    },
    // 删除订单
    handleDeleteClick() {
      this.handleOrderDelete(this.details.id)
        .then(res => {
          wx.setStorageSync('isOrderDelete', true);
          this.$router.back();
        })
    },
    handleCancelClick() {
      this.handleOrderCancel(this.details.id)
        .then(res => {
          wx.startPullDownRefresh();
        })
    },
    handlePayClick() {
      this.payAsync(this.details.id)
        .then(res => {
          wx.startPullDownRefresh();
        });
    },
    handleBtnAction() {
      this.handleOrderDone(this.details.id)
        .then(res => {
          wx.startPullDownRefresh();
        })
    }
  },
  onPullDownRefresh() {
    this.getOrderDetails(this.id)
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        wx.stopPullDownRefresh();
      });
    
  },
  mounted () {
    this.id = this.$route.query.id
    this.xq = this.$route.query.xq
    wx.startPullDownRefresh();
    let that = this
    wx.getStorage({
      key: 'shopName',
      success: function (res) {
        that.shopName = res.data
      }
    })
  },
  onUnload() {
    Object.assign(this, this.$options.data());
  }
}
</script>
<style type='text/sass' lang='sass' scoped>
@import '~@/assets/css/mixin'
@import './index.scss'
.head
  color: #F67C2F
  font-size: 28px
  background: #fff
  .h-img
    +bg-img("my/xq-dfh.png")
    width: 32px
    height: 32px
    vertical-align: middle
    display: inline-block
    margin-left: 30px
    margin-right: 22px
  span
    vertical-align: middle
    display: inline-block
.diz
  background: #F9F9F9
  height: 121px
  position: relative
  .dz-img
    width: 26px
    height: 32px
    +bg-img("my/dz.png")
    position: absolute
    top: 25px
    left: 33px
  .dz-name
    font-size: 28px
    color: #000
    position: absolute
    top: 28px
    left: 84px
  .dz-phone
    font-size: 28px
    color: #000
    position: absolute
    top: 30px
    left: 535px
  .dz-dz
    font-size: 24px
    color: #666
    position: absolute
    top: 70px
    left: 83px
.title
  display: inline-block
  width: 100%
  height: 82px
  background: #fff
  line-height: 82px
  font-size: 28px
  color: #000
  padding-left: 33px
.nav
  // height: 202px
  // padding: 0 32px
  position: relative
  // display: flex
  .info
    height: 160px
    padding: 20px 32px 20px 212px
    position: relative
    .n-img
      position: absolute
      top: 20px
      left: 32px
      width: 160px
      height: 160px
    .n-right
      display: inline-block
      padding-top: 13px
      flex: 1
      .n-title
        font-size: 28px
        color: #000
        +moreLine(2)
      .yardage
        font-size: 24px
        color: #999
  .below
    // padding: 0 32px
    background: #fff
    .total
      height: 82px
      padding: 0 32px
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
    .b-box
      // height: 180px
      background: #FAFAFA
      .b-title
        color: #999
        padding: 10px 0
      .b-color
        background: #eee
        padding: 10px 0
      .b-item
        display: flex
        text-align: center
        .b-text
          font-size: 28px
          flex: 1
    .child-num
      padding: 0 32px
      .orders
        height: 90px
        line-height: 90px
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
    .message
      padding: 0 32px
      font-size: 28px
      color: #000
      display: inline-block
      width: 100%
      height: 82px
      line-height: 82px
.prices
  margin-top: 20px
  background: #fff
  padding: 33px 33px
  p
   font-size: 28px
   display: inline-block
   color: #000
   width: 100%
   .left
    float: left
    color: #666666
   .right
    float: right
    color: #666666
  .serial
      height: 170px
      border-top: 1px solid #E5E5E5
      .s-text
        font-size: 24px
        color: #999
        padding-top: 20px
.foot
  height: 99px
  width: 100%
  background: #fff
  position: fixed
  bottom: 0px
  line-height: 99px
  .f-title
    padding-left: 32px
    font-size: 28px
    .f-text
      color: #FF0000
  .pay
    float: right
    display: inline-block
    width: 192px
    line-height: 99px
    text-align: center
    background: #EE7527
    color: #fff
  .btn
    float: right
    display: inline-block
    width: 192px
    line-height: 99px
    text-align: center
</style>
