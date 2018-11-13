<template>
  <div class="home_opt_mod">
    <screen @sort="handleSortChange" @filter="handleFilterChange" v-if="!hidenSort" @showtype="handleShowType" />
    <div class="home_opt_mod__hd">
      <span class="title_1">NEW SHOW</span>
      <span class="title_2">特价折扣，领先一步</span>
    </div>
    <div class="home_opt_mod__bd">
      <div class="goods-list__container--small" v-if="showType === 0">
        <div class="goods-list__wrapper" v-for="(item, index) in List" :key="index" @click="clickItem(item.id)">
          <div class="goods-list__item goods-list__item--small goods-list__item--btn3 card2">
            <div class="goods-list__thumb">
              <img class="goods-thumb-h190" :src="item.image" mode="aspectFill">
            </div>
            <div class="goods-list__info has-title has-subtitle has-price has-btn">
              <p class="title zan-ellipsis">{{item.name}}</p>
              <p class="sub-title">货期:{{item.delivery}}丨销量:{{item.sellCount}}</p>
              <p class="sale-info">
                <span class="sale-price">￥{{item.disPrice}}<em v-if="item.sellPrice > 0">￥{{item.sellPrice}}</em></span>
              </p>
            </div>
            <div class="goods-list__buy-btn-wrapper">
              <span class="goods-list__buy-btn-1"></span>
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
                <p>货期:{{item.delivery}}</p>
                <p>销量:{{item.sellCount}}</p>
                <p class="price">￥{{item.sellPrice}}<em v-if="item.disPrice > 0">￥{{item.disPrice}}</em></p>
              </div>
            </div>
            <span class="goods-list__btn">立即采购</span>
          </div>
        </div>
      </div>

      <div v-show="loading">
        <zan-loading />
      </div>
      <div v-if="!loading && (!List.length && lastPage)">
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
    <div class="nav" v-if="false">
      <div class="content">
        <div class="kuang" v-for="(item,index) in List" :key="index">
          <img v-if="item.image" class="img" :src="item.image">
          <img v-else class="img" src="../assets/img/classify/goods.png">
          <p class="text zan-ellipsis">{{item.name}}</p>
          <p class="Goods">期货:{{item.delivery}}丨销量:{{item.sellCount}}</p>
          <p class="money">
            <span class="money_1">￥{{item.sellPrice}}</span>
            <!--<s class="money_2">￥{{item.money_1}}</s>-->
          </p>
          <i class="gwc" @click="clickItem(item)"></i>
        </div>
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
      loading: false,
      page: 1,
      totalPage: 0,
      lastPage: false,
      goodsFilterOptions: {

      },
      showType: 0
    }
  },
  methods: {
    handleShowType(e) {
      this.showType = e;
    },
    async goodsList (page) {
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
        isDis: 1,
        state: 1,
        pageSize: 10,
        pageNumber: page,
        ob: this.ob,
        ...this.goodsFilterOptions,
      })
      this.loading = false;
      this.lastPage = data.data.lastPage;
      if (data.code === 1) {
        const { data: { list } } = data;
        if (this.isDataLast) {
          this.List = list;
          this.isDataLast = false;
        } else {
          this.List = this.List.concat(list);
        }
        this.page = data.data.pageNumber
        this.totalPage = data.data.totalPage
        // console.log(this.List)
      }
    },
    handleFilterChange(payload) {
      this.goodsFilterOptions = Object.assign(this.goodsFilterOptions, payload);
      this.goodsList(1);
    },
    handleSortChange(e) {
      this.ob = e;
      this.goodsList(1);
    },
    getMore () {
      this.page++
      // console.log(this.page)
      if (this.page <= this.totalPage) {
        this.goodsList(this.page)
      }
    },
    clickItem (goodsId) {
      this.$router.push({path: '/pages/home/details/details', query: {goodsId}})
    }
  },

  onShow() {
    // this.page = 1;
    // this.isDataLast = true;
    // this.goodsList(1);
  },
  onPullDownRefresh() {
    this.page = 1;
    this.isDataLast = true;
    this.goodsList(1);
  },
  mounted () {
    this.goodsList(this.page)
  }
}
</script>
<style type='text/sass' lang='sass' scoped>
@import '~@/assets/css/mixin'
.home_opt_mod
  background-color: #EAEAEA
  &__bd
    padding: 21px 7px 0
</style>
