<style lang="scss">

  @import '~@/assets/scss/mixins';

  .collage2 {
    .home_opt_mod {
      &__bd {
        padding-top: 20px !important;
      }
    }
  }
</style>
<template>
  <div class="collage2 home_opt_mod" v-if="!(!List.length && lastPage)">
    <div class="home_opt_mod__hd">
      <img src="https://huiti-img.oss-cn-shanghai.aliyuncs.com/img/wxc4472416927400e1.o6zAJszuDUOj1lV2gxjAk-CZxyJs.u5GsCoThPcF76c68804ce26518afced8152df6cd2dad.png" alt="" mode="aspectFit" />
    </div>
    <div class="home_opt_mod__bd">

      <div class="goods-list__container--small">
        <div class="goods-list__wrapper" v-for="(item,index) in List" :key="index" @click="pinDetails(item)" v-if="item.ping">
          <div class="goods-list__item goods-list__item--small goods-list__item--btn3 card2">
            <div class="goods-list__thumb">
              <img class="goods-thumb-h190" :src="item.image" mode="aspectFill">
            </div>
            <div class="goods-list__info has-title has-subtitle has-price has-btn">
              <p class="title zan-ellipsis">{{item.name}}</p>
              <p class="sale-info">
                <span class="sale-price">￥{{item.ping.price}}<em>￥{{ item.sellPrice }}</em></span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-show="loading">
        <zan-loading />
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
        this.nodata = false;
        this.lastPage = false;
        this.List = [];
      }
      const data = await API.getPinGoods({
        pageSize: 10,
        pageNumber: page,
        ob: this.ob,
        state: 1,
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
        this.List = this.List.concat(list);
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
