<style lang="scss">
  @import '~@/assets/scss/mixins';
  .right-box {

    .shop-img {
      height: rpx(167);;
    }
    .goods-title {
      font-size: rpx(15);
      line-height: rpx(20);
    }
    .desc {
      font-size: rpx(12);
      line-height: rpx(20);
    }
    .item-img .price {
      font-size: rpx(14);
      line-height: rpx(20);
    }
  }
</style>
<template>
  <div class="home_opt_mod" v-if="!(!List.length && lastPage)">
    <div class="home_opt_mod__bd">
      
      <div class="content">
        <div v-for="(item, index) in selectMGP" :key="item.id" class="xK">
          <scroll-view scroll-x="true" style="width: 100%">
            <div class="scroll-x">
              <div class="left-box">
                <div class="title">
                  <i class="icon"></i>
                  <span>{{item.title || '未设置标题'}}</span>
                </div>
                <div class="main-img" @click="Tiao(item.firstGoods)">
                  <div class="border">
                    <img class="shop-img" :src="item.firstGoods.image" mode="aspectFill" />
                  </div>
                  <div class="goods-title zan-ellipsis">{{item.firstGoods.name}}</div>
                  <div class="desc">{{item.firstGoods.delivery}}丨销量:{{item.firstGoods.sellCount}}</div>
                  <div class="price">
                    <strong>￥{{item.firstGoods.sellPrice}}</strong>
                  </div>
                </div>
              </div>
              <div class="right-box">
                <div>
                  <div class="item-img" v-for="(ite, inx) in item.matchGoods" :key="inx" v-if="inx < (item.matchGoods.length / 2)" @click="TiaoZhuan(ite)">
                    <div>
                      <img class="shop-img" :src="ite.image" alt="" mode="aspectFill">
                    </div>
                    <div class="goods-title zan-ellipsis">{{ite.name}}</div>
                    <div class="desc">{{ite.delivery}}丨销量:{{ite.sellCount}}</div>
                    <div class="price">
                      <strong>￥{{ite.sellPrice}}</strong>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="item-img" v-for="(ite, inx) in item.matchGoods" :key="inx" v-if="inx >= (item.matchGoods.length / 2)" :style="{ 'opacity': ite.template ? 0 : 1 }" @click="TiaoZhuan(ite)">
                    <div>
                      <img class="shop-img" :src="ite.image" alt="" mode="aspectFill">
                    </div>
                    <div class="goods-title zan-ellipsis">{{ite.name}}</div>
                    <div class="desc">{{ite.delivery}}丨销量:{{ite.sellCount}}</div>
                    <div class="price">
                      <strong>￥{{ite.sellPrice}}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </scroll-view>
        </div>
      </div>

      <div v-show="loading">
        <zan-loading />
      </div>
      
      <div class="loadmore-container" v-if="!loading && (selectMGP.length && !lastPage)">
        <div class="loadmore-btn" @click="handleMore">查看更多</div>
      </div>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import scard from "@/components/group_card";
import API from "@/api/httpJchan";
import isOdd from 'is-odd';
import cloneDeep from '@/assets/js/cloneDeep';
export default {
  props: {
    initCount: {
      type: Number,
      default: 10
    }
  },
  components: { scard },
  data() {
    return {
      lastPage: false,
      loading: false,
      pageNumber: 1,
      List: [],
      pageSize: 10
    };
  },
  computed: {
    selectMGP() {
      return cloneDeep(this.List).map(item => {
        item.firstGoods = {};
        if (item.matchGoods.length) {
          let firstGoods = item.matchGoods.splice(0, 1);
          item.firstGoods = firstGoods[0];
        }
        if (!item.matchGoods.length) {
          item.matchGoods.push({ template: true, name: '隐藏' }, { template: true, name: '隐藏' });
        } else {
          if (isOdd(item.matchGoods.length)) {
            item.matchGoods.push({ template: true, name: '隐藏' });
          }
        }
        return item;
      })
    }
  },
  methods: {
    Tiao(obj) {
      this.$router.push({
        path: "/pages/home/details/details",
        query: { goodsId: obj.goodsId }
      });
    },
    TiaoZhuan(obj) {
      console.log(obj)
      this.$router.push({
        path: "/pages/home/details/details",
        query: { goodsId: obj.goodsId }
      });
    },
    async fetch() {
      const { pageNumber, pageSize } = this;
      this.loading = true;
      const { data: { list, lastPage }, code } = await API.selectMGP({
        pageSize,
        pageNumber
      });
      this.loading = false;
      this.lastPage = lastPage;
      try {

        if (code === 1) {
          if (pageNumber === 1) {
            this.List = list;
          } else {
            this.List = this.List.concat(list);
          }
          this.pageNumber++;
        }
      } catch (err) {
        console.log(err);
      }
    },
    handleMore() {
      this.fetch();
    }
  },
  onShow() {
    // this.pageNumber = 1;
    // this.fetch();
  },
  onPullDownRefresh() {
    this.pageNumber = 1;
    this.lastPage = false;
    this.fetch();
  },
  async onReady() {
    this.pageSize = this.initCount;
    this.fetch();
  }
};
</script>
<style type='text/sass' lang="sass" scoped>
@import '~@/assets/css/mixin'
.xK
  margin-bottom: 34px;
  &:first-child
    scroll-view
      padding-top: 0
  &:last-child
    border-bottom: 0
    margin-bottom: 0;
    scroll-view
      padding-bottom: 0
.home_opt_mod
  border-top: 0;
  &__bd
    padding-top: 20px !important;
  .scroll-x
    display: flex
    width: 100%
    padding: 0 25px
    background-color: #ffffff
    box-sizing: border-box
    .left-box
      position: relative
      width: 395px
      div.title
        width: 344px
        height: 165px
        margin: 0 25px
        display: flex
        align-items: center
        justify-content: center
        i.icon
          display: inline-block
          width: 34px
          height: 31px
          background: url("~@/assets/img/shopMgr/group_1.png") no-repeat center
          background-size: 100% 100%
          margin: auto 14px
        span
          color: #6EB1F5
          font-size: 32px
      .main-img
        margin-right: 30px;
        width: 344px
        overflow: hidden
        display: flex
        flex-wrap: wrap
        position: absolute
        left: 0
        top: 50%
        right: 0
        transform: translateY(-50%)
        .M-img
          +bg-img('home/gwc.png')
          width: 47px
          height: 42px
          position: absolute
          bottom: 0px
          right: 10px
        .border
          width: 344px
          height: 458px
          border: 2px solid #CCCCCC
          padding: 16px 30px
          box-sizing: border-box
          i.shop-img
            display: inline-block
            width: 100%
            height: 100%
            background-repeat: no-repeat
            background-position: 50% 50%
            background-size: cover
        .title
          width: 100%
          font-size: 30px
          padding-top: 18px
          +singleFile
        .desc
          width: 100%
          color: #999999
          font-size: 26px
        .price
          width: 100%
          font-size: 28px
          color: #333333
          +singleFile
          strong
            font-size: 30px
            color: #FF6700
    .right-box
      background-color: #ffffff
      white-space: nowrap;
      margin-bottom: -20px
      .item-img
        display: inline-block;
        width: 216px
        overflow: hidden
        margin-right: 29px
        margin-bottom: 20px
        position: relative
        .I-img
          +bg-img('home/gwc.png')
          width: 47px
          height: 42px
          position: absolute
          bottom: 0px
          right: 10px
        .border
          width: 100%
          height: 166px * 2
          border: 2px solid #CCCCCC
          padding: 16px 0
          box-sizing: border-box
          i.shop-img
            display: inline-block
            width: 100%
            height: 100%
            background-repeat: no-repeat
            background-position: 50% 50%
            background-size: cover
        .title
          width: 100%
          font-size: 26px
          padding-top: 10px
          line-height: 32px
          color: #000
        .desc
          width: 100%
          color: #999
          font-size: 22px
        .price
          width: 100%
          font-size: 24px
          color: #333333
          strong
            font-size: 24px
            color: #FF6700
</style>
