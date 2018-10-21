<template>
  <div class="home_opt_mod">
    <screen @sort="handleSortChange" @filter="handleFilterChange" v-if="!hidenSort" @showtype="handleShowType" />
    <div class="home_opt_mod__hd">
      <span class="title_1">NEW SHOW</span>
      <span class="title_2">今日上新，领先一步</span>
    </div>
    <div class="home_opt_mod__bd">
      
      <div class="goods-list__container goods-list__container--simple" v-if="showType === 0">
        <div class="goods-list__wrapper" v-for="(item,index) in List" :key="index" @click="clickItem(item)">
          <div class="goods-list__item goods-list__item--list simple">
            <div class="goods-list__thumb">
              <img v-if="item.image" class="img" :src="item.image" mode="aspectFill">
              <!-- <img v-else class="img" src="../assets/img/classify/goods.png"> -->
            </div>
            <div class="goods-list__info">
              <p class="title zan-ellipsis--l2">{{item.name}}</p>
              <div class="sale-info">
                <p>期货:{{item.delivery}}</p>
                <p>销量:{{item.sellCount}}</p>
                <p class="price">￥{{item.sellPrice}}</p>
              </div>
            </div>
            <span class="goods-list__btn">立即采购</span>
          </div>
        </div>
      </div>
      <div class="goods-list__container--small" v-if="showType === 1">
        <div class="goods-list__wrapper" v-for="(item,index) in List" :key="index" @click="clickItem(item)">
          <div class="goods-list__item goods-list__item--small goods-list__item--btn4 card2">
            <div class="goods-list__thumb">
              <img v-if="item.image" class="img" :src="item.image" mode="aspectFill">
              <!-- <img v-else class="img" src="../assets/img/classify/goods.png"> -->
            </div>
            <div class="goods-list__info has-title has-subtitle has-price has-btn">
              <p class="title zan-ellipsis">{{item.name}}</p>
              <div class="sub-title">
                <p>期货:{{item.delivery}}</p>
                <p>销量:{{item.sellCount}}</p>
              </div>
              <div class="sale-info">
                <p class="price">￥{{item.sellPrice}}</p>
              </div>
            </div>
            <div class="goods-list__buy-btn-wrapper">
              <span class="goods-list__buy-btn-4">立即采购</span>
            </div>
            
          </div>
        </div>
      </div>

      <div v-if="!List.length && lastPage">
        <div class="no_goods">
          <div class="no_goods_img"></div>
          <div class="no_goods_tip">没有相关的商品结果哦~~</div>
        </div>
      </div>
      <div v-show="loading">
        <zan-loading />
      </div>
    </div>
    <div class="home_opt_mod__ft" v-if="!loading && (List.length && !lastPage)" @click="getMore()">
      <div class="loadmore">
        <span>查看更多</span>
        <i></i>
      </div>
    </div>
<!--     <div class="nav upnew">
      <div class="More" v-if="!loading && (List.length && !lastPage)" @click="getMore()">
        <span class="More_text">查看更多</span>
        <i class="img"></i>
      </div>
    </div> -->
  </div>
</template>
<script>
import wx from 'wx'
import API from '@/api/httpShui'
import screen from '@/components/h_screen'
export default {
  props: {
    hidenSort: {
      type: Boolean,
      default: false
    }
  },
  components: {
    screen
  },
  data () {
    return {
      isDataLast: false,
      List: [],
      showType: 0,
      page: 1,
      totalPage: 0,
      ob: '',
      lastPage: false,
      goodsFilterOptions: {},
      loading: false
    }
  },
  methods: {
    handleShowType(e) {
      this.showType = e;
      // this.showType = e.detail;
    },
    async goodsList (page, payload) {
      if (page === 1) {
        if (!this.isDataLast) {
          this.List = [];
        }
        this.lastPage = false;
      }
      if (!this.isDataLast) {
        this.loading = true;
      }
      const data = await API.getGoods({
        labelId: 1,
        state: 1,
        pageSize: 10,
        pageNumber: page,
        ob: this.ob,
        ...this.goodsFilterOptions,
        ...payload
      })
      this.loading = false;
      this.lastPage = data.data.lastPage
      // console.log('每日上新', data)
      if (data.code === 1) {
        if (this.isDataLast) {
          this.List = data.data.list || [];
          this.isDataLast = false;
        } else {
          if (this.List.length !== 0) {
            this.List.push.apply(this.List, data.data.list)
          } else {
            this.List = data.data.list
          }
        }
        this.page = data.data.pageNumber
        this.totalPage = data.data.totalPage
        // console.log(this.List)
      }
    },
    getMore () {
      this.page++
      // console.log(this.page)
      if (this.page <= this.totalPage) {
        this.goodsList(this.page)
      }
    },
    clickItem(obj) {
      this.$router.push({path: '/pages/home/details/details', query: {goodsId: obj.id, toNew: true}});
    },
    handleSortChange(e) {
      this.ob = e;
      this.goodsList(1)
    },
    handleFilterChange(payload) {
      this.goodsFilterOptions = Object.assign(this.goodsFilterOptions, payload);
      this.goodsList(1);
    },
    handleFilterRest() {
      this.goodsFilterOptions = {};
      this.goodsList(1);
    }
  },
  onShow() {
    this.page = 1;
    this.isDataLast = true;
    this.goodsList(this.page);
  },
  onReady() {
    this.goodsList(this.page);
  },
  onUnload() {
    console.log('unLoad')
  }
}
</script>
<style type='text/sass' lang='sass' scoped>
@import '~@/assets/css/mixin'
.nav
  background: #fff
  margin-top: 50px
  padding-bottom: 25px
  .nav__title
    position: relative
    top: 0
    left: 0
    height: 120px
    margin-bottom: 50px
    .title_1
      position: absolute
      font-size: 32px
      color: #000000
      left: 37%
    .title_2
      position: absolute
      font-size: 28px
      color: #000000
      top: 75px
      left: 33%
    .xian
      position: absolute
      width: 98px
      height: 4px
      background: #999
      top: 95px
      left: 18%
    .xian_1
      position: absolute
      width: 98px
      height: 4px
      background: #999
      top: 95px
      left: 68%
  .content
    margin-top: 20px
    .kuang
      display: flex
      margin-bottom: 20px
      .left
        flex: 1
        padding-left: 20px
        .img
          width: 240px
          height: 240px
          border-radius: 8px
      .right
        flex: 2
        margin-top: -8px
        margin-left: 20px
        font-size: 26px
        color: #999
        position: relative
        .title
          width: 448px
          font-size: 30px
          color: #000000
          +moreLine(2)
          margin-bottom: 33px
        .money
          color: #FF0000
          font-size: 30px
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
          left: 310px
          position: absolute
          top: 197px
  .More
    width: 600px
    height: 70px
    border-radius: 4px
    display: flex
    border: 1px solid #999
    margin: 0 auto
    .More_text
      padding-left: 240px
      padding-top: 8px
    .img
      +bg-img('home/xiala.png')
      width: 34px
      height: 18px
      margin-top: 25px
      margin-left: 20px
</style>
