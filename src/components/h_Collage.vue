<template>
  <div class="home_opt_mod">
    <screen @sort="handleSortChange" @filter="handleFilterChange" v-if="!hidenSort" @showtype="handleShowType" />
    <div class="home_opt_mod__hd">
      <span class="title_1">NEW SHOW</span>
      <span class="title_2">拼团优惠，源于一派</span>
    </div>
    <div class="home_opt_mod__bd">
      <block v-if="showType === 0">
        <div class="content goods-list__container goods-list__container--simple" v-if="List.length">
          <div class="goods-list__wrapper" v-for="(item,index) in List" :key="index" @click="pinDetails(item)">
            <div class="goods-list__item goods-list__item--list simple">
              <div class="goods-list__thumb">
                <img v-if="item.image" class="img" :src="item.image" mode="aspectFill">
              </div>
              <div class="goods-list__info">
                <p class="title zan-ellipsis--l2">{{item.name}}</p>
                <div class="sale-info">
                  <p class="limit">{{item.ping.num}}人成团</p>
                  <p>
                    <span>货期:{{item.delivery}}</span>丨
                    <span>已拼:{{item.sellCount}}</span>
                  </p>
                  <p class="price">批发价：￥{{item.sellPrice}}</p>
                </div>
              </div>
              <span class="goods-list__btn">去开团</span>
            </div>
          </div>
        </div>
      </block>
      <block v-if="showType === 1">
        <div class="goods-list__container--small" v-if="List.length">
          <div class="goods-list__wrapper" v-for="(item,index) in List" :key="index" @click="pinDetails(item)">
            <div class="goods-list__item goods-list__item--small goods-list__item--btn4 card2">
              <div class="goods-list__thumb">
                <img v-if="item.image" class="img" :src="item.image" mode="aspectFill">
                <!-- <img v-else class="img" src="../assets/img/classify/goods.png"> -->
              </div>
              <div class="goods-list__info has-title has-subtitle has-price has-btn">
                <p class="title zan-ellipsis">{{item.name}}</p>
                <div class="sub-title">
                  <p class="limit">{{item.ping.num}}人成团</p>
                  <p>货期:{{item.delivery}}</p>
                  <p>已拼:{{item.sellCount}}</p>
                </div>
                <div class="sale-info">
                  <p class="price">￥{{item.sellPrice}}</p>
                </div>
              </div>
              <div class="goods-list__buy-btn-wrapper">
                <span class="goods-list__buy-btn-4">去开团</span>
              </div>
              
            </div>
          </div>
        </div>
      </block>
      <div v-show="loading">
        <zan-loading />
      </div>
      <div v-if="!List.length && lastPage">
        <div class="no_goods">
          <div class="no_goods_img"></div>
          <div class="no_goods_tip">没有相关的商品结果哦~~</div>
        </div>
      </div>
    </div>
    <div class="home_opt_mod__ft" v-if="!loading && (List.length && !lastPage)" @click="getMore()">
      <div class="loadmore">
        <span>查看更多</span>
        <i></i>
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
