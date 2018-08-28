<template>
  <!-- 我的喜欢 -->
  <div class="nav">
    <div class="head" v-if="(selectMyLike.length == 0)">
      <p class="title">~空空如也~</p>
      <i class="t_img"></i>
    </div>
    <div class="content" v-for="(item, index) in selectMyLike" :key="index">
      <img class="c-img" :src="item.image">
      <div class="right">
        <p class="r-title">{{item.name}}</p>
        <p class="money">￥{{item.sellPrice}}</p>
        <i class="r-img" @click="det(item.goodsId)"></i>
      </div>
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
      title: 1,
      selectMyLike: [],
      visible2: false
    };
  },
  methods: {
    async det(goodsId) {
      console.log(goodsId);
      const deleteMyLike = await API.deleteMyLike({ goodsId: goodsId });
      console.log(deleteMyLike);
    }
  },
  onShow() {},
  async mounted() {
    const selectMyLike = await API.selectMyLike({});
    this.selectMyLike = selectMyLike.data.list;
  }
};
</script>

<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.hasCoupon
  +bg-img('marketingMgt/yhq.png')
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
  .content
    height: 200px
    background: #fff
    margin: 20px 0
    padding: 20px
    .c-img
      display: inline-block
      vertical-align: middle
      width: 160px
      height: 160px
      border-radius: 10px
    .right
      display: inline-block
      vertical-align: middle
      position: relative
      width: 75%
      margin-left: 17px
      .r-title
        height: 146px
        +moreLine(2)
      .money
        color: #f67c2f
      .r-img
        position: absolute
        +bg-img('home/xqxh.png')
        width: 46px
        height: 42px
        top: 150px
        right: 20px

</style>
