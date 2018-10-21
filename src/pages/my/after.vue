<template>
  <!-- 售后 -->
  <div class="home order-items">
    <div class="kuang order-item" v-for="(item, index) in list" :key="index">
      <div class="head">
        <span class="h-title">{{shopName}}</span>
        <span class="h-text">
          {{state[item.refundType]}},
          {{stateName[item.state]}}
        </span>
      </div>
      <div class="nav" @click="handleShopListClick(item.goodsList)">
        <img v-if="i<3" class="n-img" v-for="(ite,i) in item.goodsList" :key="i" :src="ite.image" mode="aspectFill" alt="">
        <i class="n-icon"></i>
      </div>
      <div class="below">
        <div class="van-cell">
          <div class="van-cell__title">
            <span class="goods-buy__info">共<span class="goods-buy__num">{{item.goodsList.length}}</span>个款  <span class="goods-buy__num">{{item.countGoodsNum}}</span>件商品  </span>
          </div>
          <div class="van-cell__value">
            <span class="goods-buy__total">合计:</span>
            <span class="goods-buy__price">￥{{item.price}}</span>
          </div>
        </div>
        <div class="total" v-if="false">
          <p class="t-left">共
            <span class="piece">{{item.goodsList.length}}</span>个款</p>
          <p class="t-left">
            <span class="piece">{{item.num}}</span>{{item.countGoodsNum}}件商品</p>
          <!--<p class="t-freight">（含运费￥10.00）</p>-->
          <p v-if="item.refundType != 2" class="t-right">合计:
            <span class="money">￥{{item.price}}</span>
          </p>
        </div>
        <div class="btn van-cell van-hairline">
          <div class="van-cell__title"></div>
          <div class="van-cell__value">
            <span class="b-xq" @click="refundDetails(item.id,item.refundType)">查看详情</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading">
      <zan-loading></zan-loading>
    </div>
    <div v-if="!list.length && lastPage">
      <zan-loadmore type="text" text="暂无数据" />
    </div>
    <div v-if="list.length && lastPage">
      <zan-loadmore type="text" />
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import API from '@/api/httpShui';

import orderMixins from '@/orderMixins';
export default {
  components: {},
  mixins: [orderMixins],
  data () {
    return {
      pageNumber: 1,
      loading: false,
      lastPage: false,
      shopName: '',
      state: ['退款', '退货', '换货'],
      stateName: ['等待商家处理', '已完成', '商家已拒绝', '商家已同意', '等待商家确认收货', '已撤销', '确认收货'],
      list: []
    }
  },
  methods: {
    refundDetails (id, type) {
      if (type === 2) { // 换货详情
        this.$router.push({
          path: '/pages/refund/barterDetails',
          query: {id: id}
        })
      } else { // 退款，退货详情
        this.$router.push({
          path: '/pages/refund/refundDetails',
          query: {id: id}
        })
      }
    },
    async getList () {
      return new Promise(async (resolve, reject) => {
        this.loading = true;
        const { pageNumber } = this;
        const data = await API.afterService({ pageSize: 10, pageNumber })
        this.loading = false;
        if (data.code === 1) {
          this.list = this.list.concat(data.data.list)
          this.lastPage = data.data.lastPage;
          this.pageNumber++;
        }
        resolve();
      })
    }
  },
  onReachBottom() {
    if (!this.lastPage) {
      this.getList();
    }
  },
  async onPullDownRefresh() {
    this.pageNumber = 1;
    this.list = [];
    this.lastPage = false;
    await this.getList();
    wx.stopPullDownRefresh();
  },
  onShow() {
    const isUpdate = wx.getStorageSync('is-list-update');
    if (isUpdate) {
      wx.removeStorageSync('is-list-update');
      wx.startPullDownRefresh();
    }
  },
  mounted() {
    let that = this
    wx.getStorage({
      key: 'shopName',
      success: function (res) {
        that.shopName = res.data
      }
    })
    this.getList();
  },
  onUnload() {
    Object.assign(this, this.$options.data())
  }
  // async mounted () {
  //   this.getList()
  // }
}
</script>
<style type="text/sass" lang="sass" scoped>
@import '~@/assets/css/mixin'
.order-item
  border-top: 1px solid #E5E5E5
  border-bottom: 1px solid #E5E5E5
  margin-top: 20px
  &:first-child
    margin-top: 0
.head
  display: flex
  font-size: 28px
  padding: 0 34px
  background: #fff
  height: 82px
  line-height: 82px
  .h-title
    color: #000
  .h-text
    flex: 1
    color: #F67C2F
    font-size: 28px
    text-align: right
.nav
  height: 202px
  padding: 0 32px
  line-height: 202px
  position: relative
  .n-img
    width: 160px
    height: 160px
    border-radius: 4px
    overflow: hidden;
    margin-right: 20px
    vertical-align: middle
    display: inline-block
  .n-icon
    width: 14px
    height: 25px
    +bg-img("home/shanJiao.png")
    vertical-align: middle
    display: inline-block
    position: absolute
    right: 34px
    top: 45%
.below
  background: #fff
  .total
    height: 82px
    padding: 0 34px
    overflow: hidden
    border-bottom: 1px solid #E5E5E5
    p
      font-size: 24px
      color: #000
    .t-left
      float: left
      padding-top: 20px
    .t-right
      float: right
      padding-top: 15px
    .t-freight
      float: right
      padding-top: 20px
      font-size: 24px
      color: #666
    .piece
      font-size: 28px
      color: #F67C2F
    .money
      font-size: 32px
      color: #FF0000
  .btn
    background: #fff
    .b-xq
      display: inline-block
      width: 160px
      height: 60px
      background: #F67C2F
      vertical-align: middle
      line-height: 60px
      text-align: center
      border-radius: 4px
      color: #fff
</style>
