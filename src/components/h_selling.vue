<template>

  <div class="home_opt_mod">
    <screen @sort="handleSortChange" @filter="handleFilterChange" v-if="!hidenSort" @showtype="handleShowType" />
    <div class="home_opt_mod__hd">
      <div class="title_1">NEW SHOW</div>
      <div class="title_2"> 火爆热卖，源于一派 </div>
    </div>
    <div class="home_opt_mod__bd">
      <div class="home_opt_mod__goods" v-if="showType === 0">
        <div class="home_opt_mod__goods-item">
          <div class="goods-list__wrapper" v-for="(item, index) in waterfallLeft" :key="index" @click="clickItem(item)">
            <div class="goods-list__item goods-list__item--big goods-list__item--btn3 card2">
              <div class="goods-list__thumb">
                <img class="goods-thumb-h190" :src="item.image" mode="aspectFill">
              </div>
              <div class="goods-list__info has-title has-subtitle has-price has-btn">
                <p class="title">{{item.name}}</p>
                <p class="sub-title">货期:{{item.delivery}}丨销量:{{item.sellCount}}</p>
                <p class="sale-info">
                  <span class="sale-price">批发价:{{item.sellPrice}}</span>
                </p>
              </div>
              <div class="goods-list__buy-btn-wrapper">
                <span class="goods-list__buy-btn-3 button">立即采购</span>
              </div>
            </div>
          </div>
        </div>
        <div class="home_opt_mod__goods-item">
          <div class="goods-list__wrapper" v-for="(item, index) in waterfallRight" :key="index" @click="clickItem(item)">
            <div class="goods-list__item goods-list__item--big goods-list__item--btn3 card2">
              <div class="goods-list__thumb">
                <img class="goods-thumb-h229" :src="item.image" mode="aspectFill">
              </div>
              <div class="goods-list__info has-title has-subtitle has-price has-btn">
                <p class="title">{{item.name}}</p>
                <p class="sub-title">货期:{{item.delivery}}丨销量:{{item.sellCount}}</p>
                <p class="sale-info">
                  <span class="sale-price">批发价:{{item.sellPrice}}</span>
                </p>
              </div>
              <div class="goods-list__buy-btn-wrapper">
                <span class="goods-list__buy-btn-3 button">立即采购</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="goods-list__container goods-list__container--simple" v-if="showType === 1">
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
                <p class="price">批发价:{{item.sellPrice}}</p>
              </div>
            </div>
            <span class="goods-list__btn">立即采购</span>
          </div>
        </div>
      </div>
      <div v-show="loading">
        <zan-loading />
      </div>
      <div v-if="nodata">
        <div class="no_goods">
          <div class="no_goods_img"></div>
          <div class="no_goods_tip">没有相关的商品结果哦~~</div>
        </div>
      </div>
    </div>
    <div class="home_opt_mod__ft">
      <div class="loadmore" @click="getMore()" v-if="!loading && (List.length && !lastPage)">
        <span>查看更多</span>
        <i></i>
      </div>
      <div class="loadmore up" v-if="!loading && hidenSort && page > 2" @click="handleReset()">
        <span>收起更多</span>
        <i></i>
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
