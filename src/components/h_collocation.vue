<template>
  <div class="home_opt_mod">
    <div class="home_opt_mod__hd">
      
      <span class="title_1">NEW SHOW</span>
      <span class="title_2"> 推荐搭配，高人一等 </span>
    </div>
    <div class="home_opt_mod__bd">
      
      <div class="content">
        <div v-for="(item, index) in selectMGP" :key="index" class="xK">
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
                  <div class="desc"> 货期:{{item.firstGoods.delivery}}丨销量:{{item.firstGoods.sellCount}}</div>
                  <div class="price">
                    <strong>售价:￥{{item.firstGoods.sellPrice}}</strong>
                  </div>
                  <i class="M-img"></i>
                </div>
              </div>
              <div class="right-box">
                <div>
                  <div class="item-img" v-for="(ite, inx) in item.matchGoods" :key="inx" v-if="inx < (item.matchGoods.length / 2)" @click="TiaoZhuan(ite)">
                    <div class="border">
                      <img class="shop-img" :src="ite.image" alt="" mode="aspectFill">
                    </div>
                    <div class="goods-title zan-ellipsis">{{ite.name}}</div>
                    <div class="desc"> 货期:{{ite.delivery}}丨销量:{{ite.sellCount}}</div>
                    <div class="price">
                      <strong>售价:￥{{ite.sellPrice}}</strong>
                    </div>
                    <i class="I-img"></i>
                  </div>
                </div>
                <div>
                  <div class="item-img" v-for="(ite, inx) in item.matchGoods" :key="inx" v-if="inx >= (item.matchGoods.length / 2)" :style="{ 'opacity': ite.template ? 0 : 1 }" @click="TiaoZhuan(ite)">
                    <div class="border">
                      <img class="shop-img" :src="ite.image" alt="" mode="aspectFill">
                    </div>
                    <div class="goods-title zan-ellipsis">{{ite.name}}</div>
                    <div class="desc"> 货期:{{ite.delivery}}丨销量:{{ite.sellCount}}</div>
                    <div class="price">
                      <strong>售价:￥{{ite.sellPrice}}</strong>
                    </div>
                    <i class="I-img"></i>
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
      <div v-if="!selectMGP.length && lastPage">
        <div class="no_goods">
          <div class="no_goods_img"></div>
          <div class="no_goods_tip">没有相关的商品结果哦~~</div>
        </div>
      </div>
    </div>
    <div class="home_opt_mod__ft" v-if="!loading && (selectMGP.length && !lastPage)" @click="handleMore">
      <div class="loadmore" @click="handleMore">
        <span>查看更多</span>
        <i></i>
      </div>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import scard from "@/components/group_card";
import API from "@/api/httpJchan";
import isOdd from 'is-odd';
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
      pageSize: 10,
      selectMGP: []
    };
  },
  computed: {
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

          this.selectMGP = list.map(item => {
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
          console.log(this.selectMGP)
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
  border-bottom: 10px solid #ccc
  scroll-view
    padding: 60px 0
  &:first-child
    scroll-view
      padding-top: 0
  &:last-child
    border-bottom: 0
    scroll-view
      padding-bottom: 0
.home_opt_mod
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
            color: #FF0000
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
            color: #FF0000
</style>
