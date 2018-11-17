<style lang="scss">
  @import '~@/assets/scss/mixins';
  .module1 {
    padding-left: rpx(8);
    display: flex;
    &-left {
      margin-right: rpx(8);
      .thumb {
        $w: rpx(156);
        $h: rpx(220);
        margin-bottom: rpx(13);
        width: $w;
        height: $h;
        background-color: yellow;
      }
    }
    &-right {
      flex: 1;
      .top {
        padding-right: rpx(31);
        text-align: right;
        .icon {
          display: inline-block;
          $w: rpx(102);
          $h: rpx(31);
          margin-bottom: rpx(29);
          width: $w;
          height: $h;
        }
      }
      .thumbs {
        position: relative;
        overflow: hidden;
      }
      .thumbs-item {
        $w: rpx(156);
        $h: rpx(220);
        width: $w;
        height: $h;
        background-color: red;
        // margin-right: rpx(8);
        &:last-child {
          position: absolute;
          left: $w;
          top: 0;
          transform: translateX(rpx(8));
        }
      }
    }
  }
  .module2 {
    position: relative;
    margin-top: rpx(48);
    display: flex;
    align-items: center;
    padding-left: rpx(8);
    padding-right: rpx(17);
    .tag {
      position: absolute;
      $w: rpx(295);
      $h: rpx(42);
      left: 50%;
      top: rpx(7);
      transform: translateX(-50%);
      width: $w;
      height: $h;
    }
    &-left {
      .thumb {
        $w: rpx(236);
        $h: rpx(307);
        width: $w;
        height: $h;
        background-color: yellow;
      }
    }
    &-right {
      flex: 1;
      margin-left: rpx(16);
      .goods-inner {
        .thumb {

          width: 100%;
          height: rpx(130);
          background-color: blue;
        }
        .title {
          margin-top: rpx(9);
          margin-bottom: rpx(3);
          font-size: rpx(13);
          color: #1C1F26;
          height: rpx(18);
          line-height: rpx(18);
          @include setCropText(1);
        }
        .price {
          font-size: rpx(14);
          line-height: rpx(20);
          color: #1C1F26;
        }
      }
    }
  }
  .selling {
    .list__items {
      marign-top: rpx(8);
    }
  }
</style>
<template>

  <div class="home_opt_mod selling">
    <div class="home_opt_mod__bd">
      <div class="module1">
        <div class="module1-left">
          <div class="thumb"></div>
          <div class="price-bar">
            <span class="desc">上新价</span>
            <span class="price">￥129.00</span>
            <span class="show-now"></span>
          </div>
        </div>
        <div class="module1-right">
          <div class="top">
            <img class="icon" src="../assets/img/how-show-for-you@3x.png" mode="aspectFit" />
          </div>
          <div class="thumbs">
            <div class="thumbs-item"></div>
            <div class="thumbs-item"></div>
          </div>
        </div>
      </div>
      <div class="module2">
        <div class="module2-left">
          <div class="thumb"></div>
        </div>
        <div class="module2-right">
          <div class="goods-inner">
            <div class="thumb"></div>
            <div class="title"></div>
            <div>
              <span class="price">￥89.00</span>
              <span class="show-now"></span>
            </div>
          </div>
        </div>
        <img class="tag" src="../assets/img/the-fashions@3x.png" mode="aspectFit">
      </div>
      <div class="list__items">
        <div class="list__items-item">
          <div class="thumb"></div>
        </div>
        <div class="list__items-item">
          <div class="thumb"></div>
        </div>
        <div class="list__items-item">
          <div class="thumb"></div>
        </div>
        <div class="list__items-item">
          <div class="thumb"></div>
        </div>
        <div class="list__items-item">
          <div class="thumb"></div>
        </div>
      </div>
      <div class="loadmore-container">
        <div class="loadmore-btn">查看更多</div>
      </div>
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import API from '@/api/httpShui'
import isOdd from 'is-odd';
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
      loading: false,
      List: [],
      waterfallLeft: [],
      waterfallRight: [],
      page: 1,
      totalPage: 0,
      lastPage: false,
      goodsFilterOptions: {},
      ob: '',
      nodata: false,
      showType: 0
    }
  },
  methods: {
    handleShowType(e) {
      this.showType = e;
    },
    async goodsList (page) {

      if (page === 1) {
        this.page = 1;
        if (!this.isDataLast) {
          this.List = [];
          this.waterfallLeft = [];
          this.waterfallRight = [];
        }
        this.nodata = false;
        this.lastPage = false;
      }
      if (!this.isDataLast) {
        this.loading = true;
      }
      const data = await API.getGoods({
        labelId: 2,
        state: 1,
        pageSize: 10,
        pageNumber: page,
        ob: this.ob,
        ...this.goodsFilterOptions,
      })
      this.loading = false;
      this.lastPage = data.data.lastPage
      if (data.code === 1) {
        const { data: { list, pageNumber, lastPage } } = data;
        if (page == 1 && !list.length && lastPage) {
          this.nodata = true;
          return;
        }
        if (this.isDataLast) {
          this.List = list;
          this.waterfallLeft = this.List.filter((item, index) => isOdd(index + 1));
          this.waterfallRight = this.List.filter((item, index) => !isOdd(index + 1));
          this.isDataLast = false;
        } else {
          this.List = this.List.concat(list);
          this.waterfallLeft = this.List.filter((item, index) => isOdd(index + 1));
          this.waterfallRight = this.List.filter((item, index) => !isOdd(index + 1));
        }
        // console.error(this.List, this.waterfallLeft, this.waterfallRight)
        // if (this.List.length !== 0) {
        //   this.List.push.apply(this.List, data.data.list)
        // } else {
        //   this.waterfallLeft = data.data.list.filter((item, index) => isOdd(index + 1));
        //   this.waterfallRight = data.data.list.filter((item, index) => !isOdd(index + 1));
        //   this.List = data.data.list
        // }
        this.page++;
        // console.log(this.List)
      }
    },
    getMore () {
      this.goodsList(this.page);
    },
    clickItem (obj) {
      this.$router.push({path: '/pages/home/details/details', query: {goodsId: obj.id}})
    },
    handleSortChange(e) {
      this.ob = e;
      this.goodsList(1);
    },
    handleFilterChange(payload) {
      this.goodsFilterOptions = Object.assign(this.goodsFilterOptions, payload);
      this.goodsList(1);
    },

    handleFilterRest() {
      this.goodsFilterOptions = {};
      this.goodsList(1);
    },
    handleReset() {
      this.page = 1;
      this.goodsList(this.page);
    }
  },
  onShow() {
    // this.isDataLast = true;
    // this.page = 1;
    // this.goodsList(this.page);
  },
  onPullDownRefresh() {
    this.isDataLast = true;
    this.page = 1;
    this.goodsList(this.page);
  },
  onReady () {
    this.goodsList(this.page)
  }
}
</script>
<style type='text/sass' lang="sass" scoped>
@import '~@/assets/css/mixin'
.wrapper
  padding-bottom: 60px
  background-color: #EAEAEA
.goods-list__wrapper
.goods-thumb-h190
  height: 380px
.goods-thumb-h229
  height: 229px * 2
.home_opt_mod
  &__bd
    background-color: #EAEAEA
  &__ft
    background-color: #EAEAEA
  &__goods
    margin-bottom: -30px;
    display: flex;
    padding-top: 24px
    padding-left: 17px
    padding-right: 17px
    &-item
      flex: 1;
      padding: 0 7px
</style>
