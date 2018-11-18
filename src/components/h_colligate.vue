<template>
  <div class="nav" v-if="data" @click="handleBuyClick">
    <div class="left">
      <img class="img" :src="data.image" mode="aspectFill">
    </div>
    <div class="right">
      <p class="title">{{ data.name }}</p>
      <p class="money">￥{{ data.sellPrice }}</p>
      <p class="volume">销量：{{ data.sellCount }}</p>
      <span class="btn">立即采购</span>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import API from '@/api/httpJchan';
export default {
  components: {},
  data() {
    return {
      data: null,
      img: "http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg"
    };
  },
  methods: {
    handleBuyClick() {
      this.$router.push({path: '/pages/home/details/details', query: {goodsId: this.data.id}});
    },
    fetch() {
      API.selectTopGoods()
        .then(res => {
          if (res.data) {
            this.data = res.data;
          }
        })
    }
  },
  onPullDownRefresh() {
    this.fetch();
  },
  mounted() {
    this.fetch();
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.nav
  display: flex
  padding: 29px 22px
  .left
    flex: 1
    .img
      width: 240px
      height: 240px
      border-radius: 8px
  .right
    flex: 2
    margin-top: -8px
    margin-left: 20px
    .title
      font-size: 30px
      color: #000
    .money
      font-size: 30px
      color: #FF0000
      padding-top: 165px
      display: inline-block
    .volume
      font-size: 26px
      color: #999
      display: inline-block
      padding-left: 45px
    .btn
      display: inline-block
      width: 130px
      height: 60px
      font-size: 26px
      color: #fff
      background: #EE7527
      text-align: center
      line-height: 60px
      border-radius: 8px
      margin-left: 107px
      position: absolute;
      top: 207px;

</style>
