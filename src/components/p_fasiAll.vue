<template>
<!-- 我的拼团 -全部 -->
<div class="home">
  <!-- 1 -->
  <div class="kuang" v-for="(item, index) in ordersValueList" :key="item.id">
    <div class="head">
      <span class="h-title">{{item.name || '菲斯的小店'}}</span>
      <span class="h-text">{{item.state === 1 ? '未支付' : item.state === 2 ? '取消交易' : item.state === 5 ? '拼单成功，待发货' : item.state === 6 ? '拼单成功，待收货 ' : item.state === 7 ? '拼单成功，已完成' : item.state === 8 ? '交易关闭' : item.state === 9 ? '拼单中' : item.state === 10 ? '审核中' : '未知状态'}}</span>
    </div>
    <div class="nav" v-if="item.layer === 1">
      <img class="n-img" v-for="(list, num) in item.goodsList" :key="list.goodsId" :src="list.image" v-if="num < 3">
      <i class="n-icon"></i>
    </div>
    <div class="nav" v-else-if="item.layer === 2">
      <img class="n-img" v-for="(list, num) in item.goodsList" :key="list.goodsId" :src="list.image" v-if="num < 1">
      <div class="goodsDetail">
        <span class="title">{{item.goodsList[0].name}}</span>
        <span class="skuCode" v-for="(good, goodnum) in item.goodsList">
          <p v-for="(skuItem, skuNum) in good.skuList">{{skuItem.skuCode}}</p>
        </span>
      </div>
    </div>

    <div class="below">
      <div class="total">
        <p class="t-left">共<span class="size">{{item.goodsListSize}}</span>个款式  <span class="piece">{{item.goodsList.length}}</span>件商品</p>
        <p class="t-freight">（含运费￥{{item.freight}}）</p>
        <p class="t-right">合计:
          <span class="money">￥{{item.paid}}</span>
        </p>
      </div>
    </div>
    <!-- v-if="item.layer === 2" -->
    <table class="skuCode">
      <!-- <thead> -->
        <tr>
          <th>颜色</th>
          <th>码数</th>
          <th>总件数</th>
          <th>已发</th>
          <th>未发</th>
        </tr>
      <!-- </thead>
      <tbody> -->
        <tr v-for="(numb, ccnum) in 5">
          <td>{{ccnum}}</td>
          <td>{{ccnum}}</td>
          <td>{{ccnum}}</td>
          <td>{{ccnum}}</td>
          <td>{{ccnum}}</td>
        </tr>
      <!-- </tbody> -->
    </table>

    <div class="btn" v-if="item.state === 1">
      <span class="button">确认付款</span>
      <span class="button" @click="toOpen('visible2')">取消订单</span>
      <span class="button" @click="toPinDetails">查看详情</span>
    </div>
    <div class="btn" v-else-if="item.state === 2">
      <span class="button">删除订单</span>
      <span class="button" @click="toPinDetails">查看详情</span>
    </div>
    <div class="btn" v-else-if="item.state === 5">
      <span class="button" @click="toPinDetails">查看详情</span>
      <span><i class="userHeader" v-for="(user, userId) in item.pingUser" :key="user.id" :style="{background: 'url(' + user.head +')'}" v-if="userId < 3"></i></span>
    </div>
    <div class="btn" v-else-if="item.state === 6">
      <span class="button" @click="toPinDetails">查看详情</span>
      <span><i class="userHeader" v-for="(user, userId) in item.pingUser" :key="user.id" :style="{background: 'url(' + user.head +')'}" v-if="userId < 3"></i></span>
    </div>
    <div class="btn" v-else-if="item.state === 7">
      <span class="button">删除订单</span>
      <span class="button" @click="toPinDetails">查看详情</span>
    </div>
    <div class="btn" v-else-if="item.state === 9">
      <span class="button">取消订单</span>
      <span><i class="userHeader" v-for="(user, userId) in item.pingUser" :key="user.id" :style="{background: 'url(' + user.head +')'}" v-if="userId < 3"></i></span>
    </div>
    <i-modal :visible="visible2" @ok="toClose('visible2')" @cancel="toClose('visible2')">
      <div class="m_tips"></div>
    </i-modal>
  </div>
</div>
</template>
<script>
import wx from "wx";
export default {
  components: {},
  data() {
    return {
      visible1: false,
      visible2: false
    };
  },
  props: {
    ordersValueList: {
      type: Array,
      default: []
    }
  },
  methods: {
    toOpen(name) {
      this[name] = true;
    },
    toClose(name) {
      this[name] = false;
    },
    toPinDetails() {
      this.$router.push("/pages/my/pinDetails/pinDetails")
    },
    toPinokMail() {
      this.$router.push("/pages/my/pinDetails/pinDetails")
    }

  },
  mounted() {}
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
  padding: 0 32px
  // position: relative
  .n-img
    display: inline-block
    width: 160px
    height: 160px
    margin: 20px 20px 20px 0
    border-radius: 6px
  .goodsDetail
    flex: 1
    overflow: hidden
    display: flex
    flex-wrap: wrap
    span.title
      width: 100%
      text-align: left
      color: #000000
      font-size: 28px
    span.skuCode
      width: 100%
      text-align: left
      font-size: 24px
      color: #999999
  // .n-icon
  //   width: 14px
  //   height: 25px
  //   +bg-img("home/shanJiao.png")
  //   vertical-align: middle
  //   display: inline-block
  //   position: absolute
  //   right: 34px
  //   top: 45%
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
    .piece, .size
      font-size: 28px
      color: #F67C2F
    .money
      font-size: 32px
      color: #FF0000

table.skuCode
  width: 100%
  border: none
  text-align: center
  thead, tbody
    width: 100%
    th, td
      padding: 10px 0
      font-size: 28px
    th
      background-color: #FAFAFA
      color: #999999
    td
      color: #666666
      &:nth-of-type(2n)
        background-color: #EEEEEE



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
  width: 100%
  // height: 108px
  padding: 25px 0
  background: #fff
  overflow: hidden
  span
    float: left
    padding-left: 5px
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
