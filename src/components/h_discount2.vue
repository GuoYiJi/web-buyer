<template>
  <div class="home_opt_mod"  v-if="!(!List.length && lastPage)">
    <div class="home_opt_mod__hd">
      <img src="https://huiti-img.oss-cn-shanghai.aliyuncs.com/img/wxc4472416927400e1.o6zAJszuDUOj1lV2gxjAk-CZxyJs.gq5zBWmAnQXD19d65ae1ff5fc35c105b454ca7e8689d.png" alt="">
    </div>
    <div class="home_opt_mod__bd">
      <div class="goods-list__container--small">
        <div class="goods-list__wrapper" v-for="(item, index) in List" :key="index" @click="clickItem(item.id)">
          <div class="goods-list__item goods-list__item--small goods-list__item--btn3 card2">
            <div class="goods-list__thumb">
              <img class="goods-thumb-h190" :src="item.image" mode="aspectFill">
            </div>
            <div class="goods-list__info has-title has-subtitle has-price has-btn">
              <p class="title zan-ellipsis">{{item.name}}</p>
              <p class="sale-info">
                <span class="sale-price">￥{{item.disPrice}}<em v-if="item.sellPrice > 0">￥{{item.sellPrice}}</em></span>
              </p>
            </div>
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

      <div class="loadmore-container" v-if="!loading && (List.length && !lastPage)" @click="getMore()">
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
    this.lastPage = false;
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
  background-color: #fff
  &__bd
    padding: 21px 7px 0
</style>
