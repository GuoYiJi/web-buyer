<template>
  <!-- 我的拼团 -全部 -->
  <div class="home">
    <!-- 1 -->
    <div class="kuang" v-for="(item, index) in ordersValueList" :key="item.id">
      <div class="head">
        <span class="h-title">菲斯的小店</span>
        <span class="h-text">{{item.state === 1 ? '未支付' : item.state === 2 ? '取消交易' : item.state === 5 ? '拼单成功，待发货' : item.state === 6 ? '拼单成功，待收货 ' : item.state === 7 ? '拼单成功，已完成' : item.state === 8 ? '交易关闭' : item.state === 9 ? '拼单中' : item.state === 10 ? '审核中' : '未知状态'}}</span>
      </div>
      <!-- 商品图片展示 -->
      <div class="nav" v-if="item.layer === 1">
        <img class="n-img" v-for="(list, num) in item.goodsList" :key="list.goodsId" :src="list.image" v-if="num < 3">
        <i class="n-icon"></i>
      </div>
      <!-- 商品详情展示 -->
      <div class="nav" v-else-if="item.layer === 2">
        <img class="n-img" v-for="(list, num) in item.goodsList" :key="list.goodsId" :src="list.image" v-if="num < 1">
        <div class="goodsDetail">
          <span class="title">{{item.goodsList[0].name}}</span>
          <span class="skuCode" v-for="(good, goodnum) in item.goodsList" :key="goodnum">
            <p v-for="(skuItem, skuNum) in good.skuList" :key="skuNum">{{skuItem.skuCode}}</p>
          </span>
        </div>
      </div>
      <!-- 商品信息展示 -->
      <div class="below">
        <div class="total">
          <span class="t-left">共
            <p class="size">{{item.goodsList.skuList}}</p>个款式&emsp;
            <p class="piece">{{item.goodsList}}</p>件商品</span>
          <span class="t-right">
            <span class="money">合计:
              <strong>￥{{item.paid}}</strong>&emsp;
              <p>(含运费￥{{item.freight}})</p>
            </span>
          </span>
        </div>
      </div>

      <table class="skuCode" v-if="item.state === 5 && item.children">
        <tr>
          <th></th>
          <th>颜色</th>
          <th>码数</th>
          <th>总件数</th>
          <th>已发</th>
          <th>未发</th>
          <th></th>
        </tr>
        <tr v-for="(skuChild, c1) in skuCodeList[index]" :key="c1">
          <td></td>
          <td v-for="(skuValue, c2) in skuChild" :key="c2">{{skuValue}}</td>
          <td></td>
        </tr>
      </table>
      <ul class="itemOrder" v-if="item.children">
        <li v-for="(childrenOrder, childrenNum) in item.children" :key="childrenNum">子订单编号({{childrenOrder.state === 6 ? '已发货' : childrenOrder.state === 7 ? '交易成功' : childrenOrder.state === 8 ? '交易关闭' : childrenOrder.state === 10 ? '售后中' : '未知状态'}}): {{childrenOrder.orderNo}}</li>
      </ul>

      <!-- 代付款 -->
      <div class="btn" v-if="item.state === 1">
        <span class="button">确认付款</span>
        <span class="button" @click="toOpen('visible2')">取消订单</span>
        <span class="button" @click="toPinDetails">查看详情</span>
      </div>
      <!-- 关闭交易 -->
      <div class="btn" v-else-if="item.state === 2">
        <span class="button">删除订单</span>
        <span class="button" @click="toPinDetails">查看详情</span>
      </div>
      <!-- 待发货 -->
      <div class="btn" v-else-if="item.state === 5">
        <span class="button" @click="toPinDetails">查看详情</span>
        <span>
          <i class="userHeader" v-for="(user, userId) in item.pingUser" :key="user.id" :style="{background: 'url(' + user.head +')'}" v-if="userId < 3"></i>
        </span>
      </div>
      <!-- 待收货 -->
      <div class="btn" v-else-if="item.state === 6">
        <span class="button" @click="toPinDetails">查看详情</span>
        <span>
          <i class="userHeader" v-for="(user, userId) in item.pingUser" :key="user.id" :style="{background: 'url(' + user.head +')'}" v-if="userId < 3"></i>
        </span>
      </div>
      <!-- 待收货已拆单 -->
      <div v-else-if="item.state === 6 && item.layer ===2">
        <div class="btn">
          <span>
            <i class="userHeader" v-for="(user, userId) in item.pingUser" :key="user.id" :style="{background: 'url(' + user.head + ')'}"></i>
          </span>
        </div>
        <div class="btn">
          <span class="button" @click="toPinDetails">确认收货</span>
          <span class="button" @click="toPinDetails">查看物流</span>
          <span class="button" @click="toPinDetails">申请售后</span>
          <span class="button" @click="toPinDetails">查看详情</span>
        </div>
      </div>
      <!-- 交易成功 -->
      <div class="btn" v-else-if="item.state === 7">
        <span>
          <i class="userHeader" v-for="(user, userId) in item.pingUser" :key="user.id" :style="{background: 'url(' + user.head +')'}" v-if="userId < 3"></i>
        </span>
        <span class="button">删除订单</span>
        <span class="button" @click="toPinDetails">查看详情</span>
      </div>
      <!-- 交易成功已拆单 -->
      <div class="btn" v-else-if="item.state === 7 && item.layer === 2">
        <span>
          <i class="userHeader" v-for="(user, userId) in item.pingUser" :key="user.id" :style="{background: 'url(' + user.head +')'}" v-if="userId < 3"></i>
        </span>
        <span class="button">删除订单</span>
        <span class="button" @click="toPinDetails">查看详情</span>
      </div>
      <!-- 拼单中 -->
      <div class="btn" v-else-if="item.state === 9">
        <span class="button">取消订单</span>
        <span>
          <i class="userHeader" v-for="(user, userId) in item.pingUser" :key="user.id" :style="{background: 'url(' + user.head +')'}" v-if="userId < 3"></i>
        </span>
      </div>

      <!-- <i-modal :visible="visible2" @ok="toClose('visible2')" @cancel="toClose('visible2')">
      <div class="m_tips"></div>
    </i-modal> -->
    </div>
  </div>
</template>
<script>
import wx from "wx";
export default {
  name: "orderList",
  components: {},
  data() {
    return {};
  },
  props: {
    ordersValueList: {
      type: Array,
      default: []
    },
    skuCodeList: {
      type: Array,
      default: []
    }
    // tag: {
    //   type: Number,
    //   default: 0
    // }
  },
  methods: {
    //数据处理
    toOpen() {
      // thisname = true;
    },
    toClose() {
      // this[name] = false;
    },
    toPinDetails() {
      this.$router.push("/pages/my/pinDetails/pinDetails");
    }
  },
  created() {
    this.ordersValueList.forEach((Pitem, Pindex) => {
      this.skuCodeList[Pindex] = [];
      Pitem.goodsList[0].skuList.forEach((Citem, Cindex) => {
        console.log(Citem, Pindex, Cindex);
        let color = Citem.skuCode.split(',')[0];
        let size = Citem.skuCode.split(',')[1];
        console.log(color, size);
        this.skuCodeList[Pindex][Cindex] = [color, size, Citem.num, Citem.num - Citem.remainNum, Citem.remainNum];
      })
    });
    console.log(this.skuCodeList);
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.head
  overflow: hidden
  display: flex
  justify-content: space-between
  font-size: 28px
  margin-top: 20px
  padding: 0 34px
  background: #fff
  height: 82px
  line-height: 82px
  .h-title
    width: 30%
    color: #000
    overflow: hidden
  .h-text
    flex: 1
    text-align: right
    overflow: hidden
    color: #F67C2F
.nav
  display: flex
  padding: 21px 32px
  // position: relative
  .n-img
    display: inline-block
    width: 160px
    height: 160px
    margin-right: 20px
    border-radius: 6px
  .goodsDetail
    flex: 1
    overflow: hidden
    display: flex
    flex-wrap: wrap
    span.title
      width: 100%
      +moreLine(2)
      text-align: left
      color: #000000
      font-size: 28px
    span.skuCode
      width: 100%
      display: flex
      align-items: flex-start
      text-align: left
      font-size: 24px
      color: #999999
.below
  background: #fff
  .total
    // width: 100%
    // height: 82px
    padding: 30px
    // margin-left: 32px
    overflow: hidden
    border-bottom: 1px solid #E5E5E5
    display: flex
    align-items: center
    justify-content: space-between
    p, strong
      display: inline
    span.t-left
      width: 250px
      font-size: 24px
      color: #000
      text-align: left
      overflow: hidden
      .piece, .size
        font-size: 28px
        color: #F67C2F
    span.t-right
      flex: 1
      display: flex
      justify-content: flex-end
      align-items: center
      font-size: 24px
      color: #000000
      span.money
        strong
          font-size: 32px
          color: #FF0000
        p
          color: #666666
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
ul.itemOrder
  padding: 0 24px
  background-color: #ffffff
  display: flex
  flex-wrap: wrap
  justify-content: center
  li
    width: 95%
    border-bottom: 1px solid #E5E5E5
    padding: 25px 5px
    font-size: 28px
    background: url("~@/assets/img/my/shanJiao.png") no-repeat right
    background-size: 11px 18px
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
  // width: 100%
  // height: 108px
  padding: 25px 32px
  background: #fff
  overflow: hidden
  &:first-of-type
    border-bottom: 1px solid #E5E5E5
  span
    float: left
    // padding-left: 5px
    overflow: hidden
    i.userHeader
      display: inline-block
      width: 72px
      height: 72px
      border-radius: 2px
      margin: auto 5px
      background-repeat: no-repeat
      background-position: center
      background-size: 100% 100%
      border: 1px dashed #cccccc
  .button
    float: right
    // width: 160px
    font-size: 24px
    display: inline-block
    padding: 18px 30px
    background: #ffffff
    text-align: center
    margin: 0 10px
    color: #666666
    border: 1px solid #BFBFBF
    &:first-of-type
      border: none
      color: #fff
      background: #F67C2F
</style>
