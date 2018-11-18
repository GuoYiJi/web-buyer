<style lang="scss">

  @import '~@/assets/scss/mixins';
  .collage2 {
    .home_opt_mod__hd {
    }
    .goods__items {
      margin-top: rpx(8);
      padding: 0 rpx(4.5);
      display: flex;
      &-list {
        padding: 0 rpx(3.5);
        flex: 0 0 50%;
        box-sizing: border-box;
        margin-bottom: rpx(24);
        .thumb {
          display: block;
          height: rpx(235);
        }
        .info {
          margin-top: rpx(10);
          font-size: rpx(15);
          line-height: rpx(20);
          color: #333;
          .title {
            @include setCropText(2);
          }
          .price {
            margin-top: rpx(6);
            color: #FF6700;
            font-size: rpx(14);
            font-weight: 600;
            span {
              margin-left: rpx(6);
              color: #999;
              font-size: rpx(12);
              line-height: rpx(17);
              font-weight: 400;
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
</style>
<template>
  <div class="collage2 home_opt_mod">
    <div class="home_opt_mod__hd">
      <img src="../assets/img/group-bg.png" alt="" mode="aspectFit" />
    </div>
    <div class="home_opt_mod__bd">
      <div class="goods__items">
        <div class="goods__items-list" v-for="(item,index) in List" :key="index" @click="pinDetails(item)" v-if="item.ping">
          <div class="thumb">
            <img :src="item.image" mode="aspectFill" alt="">
          </div>
          <div class="info">
            <div class="title">{{item.name}}</div>
            <div class="price">￥{{item.ping.price}}<span>{{ item.sellPrice }}</span></div>
          </div>
        </div>
      </div>
      <div v-show="loading">
        <zan-loading />
      </div>
      <div v-if="!List.length && lastPage">
        <div class="no_goods">
          <div class="no_goods_img"></div>
          <div class="no_goods_tip">没有相关的商品结果哦~~</div>
        </div>
      </div>

      <div class="loadmore-container" v-if="!loading && (List.length && !lastPage)">
        <div class="loadmore-btn" @click="getMore()">查看更多</div>
      </div>
    </div>
  </div>
</template>
<script>
import wx from 'wx';
import API from '@/api/httpShui';
import screen from '@/components/h_screen';
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
      loading: false,
      nodata: false,
      page: 1,
      totalPage: 0,
      lastPage: false,
      goodsFilterOptions: {},
      showType: 0
    }
  },
  methods: {
    handleShowType(e) {
      this.showType = e;
    },
    // 获取拼团商品
    async goodsList (page) {

      if (page === 1) {
        this.page = 1;
        if (!this.isDataLast) {
          this.List = [];
        }
        this.nodata = false;
        this.lastPage = false;
      }
      if (!this.isDataLast) {
        this.loading = true;
      }
      const data = await API.getPinGoods({
        pageSize: 10,
        pageNumber: page,
        ob: this.ob,
        ...this.goodsFilterOptions
      })
      this.loading = false;
      this.lastPage = data.data.lastPage
      if (data.code === 1) {
        const { data: { list } } = data;
        if (page === 1 && !list.length) {
          this.nodata = true;
          return;
        }
        if (this.isDataLast) {
          this.isDataLast = false;
        } else {
          this.List = this.List.concat(list);
        }
        this.page++;
        // console.log(this.List)
      }
    },
    getMore () {
      this.goodsList(this.page)
    },
    pinDetails (item) {
      // this.$router.push({path: '/pages/home/details/detailsCg', query: { goodsId: item.id, obj: JSON.stringify(item)}})
      this.$router.push({path: '/pages/home/details/details', query: { goodsId: item.id, isPin: true }})
    },
    handleSortChange(e) {
      this.ob = e;
      this.goodsList(1)
    },
    handleFilterChange(payload) {
      this.goodsFilterOptions = Object.assign(this.goodsFilterOptions, payload);
      this.goodsList(1);
    },
  },
  onShow() {
    // this.isDataLast = true;
    // this.goodsList(1);
  },
  onPullDownRefresh() {
    this.isDataLast = true;
    this.goodsList(1);
  },
  onReady() {
    this.goodsList(this.page)
  }
}
</script>
<style type='text/sass' lang="sass" scoped>
@import '~@/assets/css/mixin'
.nav
  padding-bottom: 20px
  border-bottom: 1px solid #ccc
  .content
    margin-top: 20px
    .kuang
      display: flex
      margin-bottom: 20px
      margin-top: 20px
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
          margin-bottom: 10px
        .Collage
          font-size: 26px
          color: #EE7527
          width: 130px
          height: 40px
          border: 1px solid #EE7527
          border-radius: 20px
          text-align: center
          line-height: 40px
          margin-bottom: 10px
        .money
          color: #FF0000
          font-size: 30px
          margin-bottom: 10px
          margin-top: 10px
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

.home_opt_mod__bd
  .goods-list__item--small
    .sub-title
      height: auto
      line-height: inherit

  .limit
    display: inline-block
    padding: 0 15px
    border: 1px solid #EE7527
    color: #EE7527
    line-height: 40px;
    border-radius: 2px
</style>
