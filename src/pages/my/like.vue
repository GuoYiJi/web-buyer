<template>
  <div class="like-wrapper">
    <div class="goods-list__container goods-list__container--simple">
      <div class="goods-list__wrapper" v-for="(item, index) in selectMyLike" :key="index" @click="handleItemClick(item.goodsId)">
        <div class="goods-list__item goods-list__item--list simple">
          <div class="goods-list__thumb">
            <img :src="item.image" alt="">
          </div>
          <div class="goods-list__info">
            <div class="title zan-ellipsis--l2">{{item.name}}</div>
            <div class="sale-info">
              <div class="price"></div>
            </div>
          </div>
          <div class="goods-list__buy-btn-wrapper goods-list__buy-btn-wrapper--2">
            <i class="icon-like" @click.stop="det(item.goodsId)"></i>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading">
      <zan-loading></zan-loading>
    </div>

    <div class="empty" v-if="!loading && (!selectMyLike.length && lastPage)">
      <p class="title">~空空如也~</p>
      <i class="t_img"></i>
    </div>  
    
<!--     <div class="nav">
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
    </div> -->
  </div>
</template>

<script>
import wx from "wx";
import API from "@/api/httpJchan";
export default {
  components: {},
  data() {
    return {
      loading: false,
      lastPage: false,
      title: 1,
      selectMyLike: [],
      visible2: false
    };
  },
  methods: {
    async det(goodsId) {
      wx.showLoading({
        title: '取消中'
      })
      const { data, code, desc } = await API.deleteMyLike({ goodsId: goodsId });
      wx.hideLoading();
      if (code === 1) {
        this.selectMyLike = this.selectMyLike.filter(item => item.goodsId !== goodsId);
      } else {
        wx.showToast({
          title: desc,
          icon: 'none'
        })
      }
      
    },
    async fetch() {
      if (this.loading || this.lastPage) return;
      this.loading = true;
      const { data: { list, lastPage }, code } = await API.selectMyLike({});
      this.loading = false;
      this.lastPage = lastPage;
      if (code === 1) {
        this.selectMyLike = this.selectMyLike.concat(list);
      }
    },
    handleItemClick(goodsId) {
      this.$router.push({
        path: '/pages/home/details/details',
        query: {
          goodsId
        }
      })
    }
  },
  onShow() {

  },
  onReachBottom() {
    this.fetch();
  },
  mounted() {
    this.fetch();
  },
  onUnload() {
    Object.assign(this, this.$options.data())
  }
};
</script>

<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.like-wrapper
  &:before
    display: block
    height: 1px
    overflow: hidden
    content: ""
  height: 100%
  background-color: #fff;
  .goods-list__wrapper

  .icon-like
    +bg-img('home/xqxh.png')
    width: 46px
    height: 42px

  .empty
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
.hasCoupon
  +bg-img('marketingMgt/yhq.png')
.nav
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

</style>
