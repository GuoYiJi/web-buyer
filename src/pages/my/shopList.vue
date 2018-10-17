<template>
  <!-- 商品清单 -->
  <div class="content">
    <!-- 1 -->
    <div class="con" v-for="(item, index) in goodsList" :key="index">

      <div class="cap-order-goods-lsit">
        <div class="cap-order-goods-card">
          <div class="van-card">
            <div class="van-card__thumb"><img :src="item.image" mode="aspectFill" /></div>
            <div class="van-card__content">
              <div class="van-card__row">
                <div class="van-card__title">{{item.name}}</div>
              </div>
          
              <div class="van-card__row" v-for="(skuItem, i) in item.skuList" :key="i">
                <div class="van-card__desc">
                  {{skuItem.skuCode}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="van-cell van-hairline">
        <div class="van-cell__title">
          <span class="goods-buy__info"><span class="goods-buy__num">{{item.countNum}}</span>件商品  </span>
        </div>
        <div class="van-cell__value">
          <span class="goods-buy__total">合计:</span>
          <span class="goods-buy__price">￥{{item.countPrice}}</span>
        </div>
      </div>
      <!-- <div class="nav">
        <img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <div class="n-right">
          <p class="n-title">兔子的口袋2018夏季新款网红同款露背中长款宽松大T新款网红同款...</p>
          <p class="yardage">白色：均码/2件</p>
          <span class="addNum">X2</span>
        </div>
      </div>
      <div class="below">
        <div class="total">
          <p class="t-right">合计:
            <span class="money">￥154.00</span>
          </p>
        </div>
      </div> -->
  </div>

    <div class="con">
      <div class="below">
        <div class="total">
          <p class="t-right">共
            <span class="money">{{ goodsList.length }}</span>件
          </p>
        </div>
      </div>
    </div>
  </div>
  
  
</template>

<script>
import wx from "wx";

export default {
  components: {},
  data() {
    return {
      goodsList: []
    }
  },
  methods: {

  },
 mounted() {
   const { goodsList } = this.$route.query;
   this.goodsList = JSON.parse(goodsList);
  }
};
</script>

<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.con
 margin: 20px 0
 .van-card
  background-color: #fff;
 .nav
  height: 202px
  padding: 0 32px
  // margin: 20px 0
  position: relative
  display: flex
  background: #fff
  border-bottom: 1px solid #E5E5E5

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
    .yardage
      font-size: 24px
      color: #999
    .addNum
      // display: flex
      display: inline-block
      position: absolute
      top: 80px
      right: 30px 
      font-size: 28px
      color: #FF0000

.below
  background: #fff
  .total
    height: 82px
    margin-left: 32px
    overflow: hidden
    // border-bottom: 1px solid #E5E5E5
    p
      font-size: 24px
      color: #000
    .t-left
      float: left
      padding-top: 20px
    .t-freight
      float: right
      padding-top: 20px
      font-size: 24px
      color: #666
    .t-right
      float: right
      padding-top: 15px
      padding-right: 10px
    .piece
      font-size: 28px
      color: #F67C2F
    .money
      font-size: 32px
      color: #FF0000
  .message
    font-size: 28px
    color: #000
    margin-left: 34px
    display: inline-block
    width: 100%
    height: 82px
    line-height: 82px
</style>
