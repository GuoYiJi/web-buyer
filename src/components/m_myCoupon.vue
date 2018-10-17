<template>
  <div class="nav">
    <div class="head" v-if="(title == 0)">
      <p class="title">~空空如也~</p>
      <i class="t_img"></i>
    </div>
    <div class="coupon" v-for="(item, index) in myCouponList" :key="index" v-if="(title != 0)">
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
      <div class="right">未使用</div>
    </div>
  </div>
</template>

<script>
import wx from "wx";
import API from "@/api/httpJchan";
export default {
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
  methods: {},
  async mounted() {
    const myCoupon = await API.myCoupon({
      isExchange: 0,
      pageSize: 10,
      pageNumber: 1,
      state: 1
    });
    this.myCouponList = myCoupon.data.list;
    this.title = myCoupon.data.list.length;
    console.log(this.title);
    for (var i = 0; i < myCoupon.data.list.length; i++) {
      console.log(myCoupon.data.list[i].startTime.substring(0, 10));
      console.log(myCoupon.data.list[i].endTime.substring(0, 10));
      this.startTime = myCoupon.data.list[i].startTime.split(" ")[0].toString();
      this.endTime = myCoupon.data.list[i].endTime.split(" ")[0].toString();
    }
  }
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
</style>
