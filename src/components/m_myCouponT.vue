<template>
  <div class="nav">
    <div class="coupon" v-for="(item, index) in myCouponList" :key="index">
      <!-- <i class="bg hasCoupon"></i> -->
      <img class="bg hasCoupon" src="../assets/img/marketingMgt/yhq.png">
      <div class="left">
        <p class="money">￥
          <span class="money1">{{item.count}}</span>
        </p>
        <p class="discount">{{item.name}}</p>
        <p class="purchases">购满{{item.limitCount}}可使用</p>
        <p class="time">有效期 {{startTime}}-{{endTime}}</p>
      </div>
      <div class="right">已使用</div>
    </div>
    <div class="head" v-if="!loading && !myCouponList.length && lastPage">
      <p class="title">~空空如也~</p>
      <i class="t_img"></i>
    </div>
  </div>
</template>

<script>
import wx from "wx";
import API from "@/api/httpJchan";
export default {
  props: {
    myCouponList: {
      type: Array,
      default: () => []
    },
    lastPage: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      title: 0,
      Invalid: 1,
      myCouponList: [],
      startTime: [],
      endTime: []
    };
  },
};
</script>

<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.nav
  .head
    .title
      font-size: 36px
      +center
      left: 35%
    .t_img
      width: 213px
      height: 187px
      +bg-img('marketingMgt/kk.png')
      display: inline-block
      position: absolute
      top: 38%
      left: 35%
      transform: translateY(-50%)
  .coupon
    display: inline-block
    margin: 20px 34px 0 27px
    position: relative
    .bg
      display: inline-block
      width: 689px
      height: 220px
  .left
    position: absolute
    top: 62px
    left: 46px
    color: #fff
    .money
      width: 300px
      color: #fff
      position: absolute
      top: -30px
      discount: inline-block
      .money1
        font-size: 60px
    .discount
      width: 200px
      position: absolute
      discount: inline-block
      top: -30px
      left: 220px
      font-size: 35px
    .purchases
      width: 200px
      position: absolute
      discount: inline-block
      color: #FECF8F
      top: 20px
      left: 220px
      font-size: 26px
    .time
      width: 500px
      position: absolute
      top: 90px
      color: #FECF8F
  .right
    position: absolute
    top: 70px
    right: 30px
    color: #fff
    font-size: 40px
  .Invalid
    position: absolute
    top: 0px
    left: 0px
    display: inline-block
    .Invalid_img
      display: inline-block
      position: absolute
      width: 689px
      height: 220px
      top: 0px
      left: 0px
    .Invalid_text
      display: inline-block
      position: absolute
      left: 150px
      top: 80px
      font-size: 36px
      color: #fff

</style>
