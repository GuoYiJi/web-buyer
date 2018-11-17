<style lang="scss">
  @import '~@/assets/scss/mixins';
  .one-item {
    padding: 0 rpx(8);
    &__top {
      display: flex;
    }
    .left {
      position: relative;
      padding-left: rpx(16);
      width: rpx(121);
      box-sizing: border-box;
      .icon {
        $w: rpx(81);
        $h: rpx(30);
        display: block;
        margin-top: rpx(10);
        width: $w;
        height: $h;
        background: url(~@/assets/img/new-show@2x.png) no-repeat;
        background-size: $w $h;
      }
      .btn {
        margin-top: rpx(25);
        background: #81D8D0;
        width: rpx(66);
        line-height: rpx(18);
        text-align: center;
        font-size: rpx(10);
        color: #333;
      }
      .thumb {
        $size: rpx(121);
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        width: $size;
        height: $size;
        background-color: blue;
      }
    }
    .right {
      $size: rpx(230);
      margin-left: rpx(8);
      width: $size;
      height: $size;
      background-color: red;
    }
    &__botton {
      margin-top: rpx(11);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .two-item {
    margin-top: rpx(48);
    padding: 0 rpx(8);
    .thumb {
      width: 100%;
      height: rpx(211);
      background-color: red;
    }
    .price-bar {
      margin-top: rpx(11);
    }
  }

  .price-bar {
    color: #1C1F26;
    .desc {
      font-size: rpx(11);
    }
    .price {
      margin-right: rpx(4);
      font-size: rpx(13);
      font-weight: 600;
    }
  }
  .show-now {
    $w: rpx(50);
    $h: rpx(12);
    display: inline-block;
    width: $w;
    height: $h;
    background: url(~@/assets/img/show-now@3x.png) no-repeat;
    background-size: $w $h;
  }
  .list__items {
    margin-top: rpx(35);
    display: flex;
    padding: 0 rpx(5.5);
    flex-wrap: wrap;
    &-item {
      padding: 0 rpx(3.5) rpx(7);
      flex: 0 0 33.3333%;
      box-sizing: border-box;
      .thumb {
        width: 100%;
        padding-top: 100%;
        background-color: blue;
      }
    }
  }
  .loadmore-container {
    text-align: center;
  }
  .loadmore-btn {
    display: inline-block;
    width: rpx(80);
    line-height: rpx(24);
    font-size: rpx(12);
    color: #333;
    text-align: center;
    background-color: #81D8D0;
  }
</style>
<template>

  <div class="home_opt_mod">
    <div class="home_opt_mod__bd">
      <div class="one-item">
        <div class="one-item__top">
          <div class="left">
            <div class="icon"></div>
            <div class="btn">立即购买</div>
            <div class="thumb"></div>
          </div>
          <div class="right"></div>
        </div>
        <div class="one-item__botton price-bar">
          <span class="desc">上新价</span>
          <span class="price">￥129.00</span>
          <span class="show-now"></span>
        </div>
      </div>
      <div class="two-item">
        <div class="thumb"></div>
        <div class="price-bar">
          <span class="desc">上新价</span>
          <span class="price">￥129.00</span>
          <span class="show-now"></span>
        </div>
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
        this.lastPage = false;
      }
      this.loading = true;
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
      console.log('每日上新', data)
      debugger
      try {
        if (data.code === 1) {
          if (page === 1) {
            this.List = [];
          }
          console.log(data.data.list, '傻比');
          if (this.List.length !== 0) {
            this.List.push.apply(this.List, data.data.list)
          } else {
            this.List = data.data.list
          }
          this.page = data.data.pageNumber
          this.totalPage = data.data.totalPage
          // console.log(this.List)
        }
      } catch (err) {
        console.log(err, '蒲林燕')
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
    },
    handleReset() {
      this.page = 1;
      this.goodsList(this.page);
    }
  },
  onShow() {
    // this.page = 1;
    // this.isDataLast = true;
    // this.goodsList(this.page);
  },
  onPullDownRefresh() {
    this.page = 1;
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
