<template>
  <!-- 申请售后  -->
  <div class="home">
    <div class="nav" v-if="(qq == 1)">
      <div class="head">
        <i class="t-img"></i>
        <span class="t-text">退货退款(已收到货，需要退换已收到的货物)</span>
        <i class="t-sj"></i>
      </div>
      <div class="head">
        <i class="h-img"></i>
        <span class="h-text">换货(商品存在质量等问题，需要协商换货)</span>
        <i class="t-sj"></i>
      </div>
    </div>
    <div class="nav" v-if="(qq == 0)">
      <div class="head">
        <i class="t-img"></i>
        <span class="tt-text">仅退款(无需退货)</span>
        <i class="t-sj"></i>
      </div>
    </div>
  </div>
</template>
<script>
import wx from "wx";
export default {
  components: {},
  data() {
    return { qq: 0 };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.head
  height: 107px
  line-height: 107px
  background: #fff
  .t-img
    +bg-img('my/sht.png')
    width: 46px
    height: 46px
    vertical-align: middle
    display: inline-block
    margin-left: 24px
  .t-sj
    +bg-img('home/shanJiao.png')
    width: 16px
    height: 28px
    vertical-align: middle
    display: inline-block
  .h-img
    +bg-img('my/shh.png')
    width: 46px
    height: 46px
    vertical-align: middle
    display: inline-block
    margin-left: 24px
  .t-text
    vertical-align: middle
    display: inline-block
    font-size: 28px
    color: #333
    padding-left: 5px
    padding-right: 120px
  .h-text
    vertical-align: middle
    display: inline-block
    font-size: 28px
    color: #333
    padding-left: 5px
    padding-right: 145px
  .tt-text
    vertical-align: middle
    display: inline-block
    font-size: 28px
    color: #333
    padding-left: 5px
    padding-right: 430px
</style>
