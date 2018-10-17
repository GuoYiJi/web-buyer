<template>
  <div class="home">
    <zan-tab
      :list="navData"
      :selected-id="selectedId"
      @tabchange="handleZanTabChange"
    />
    <div class="content">
      <div v-show="selectedId == 'unused'">
        <!-- <myCoupon /> -->

        <div class="coupon" v-for="(item, index) in navData[0].list" :key="index">
          <!-- <i class="bg hasCoupon"></i> -->
          <img class="bg hasCoupon" src="../../../assets/img/marketingMgt/yhq.png" mode="aspectFill" />
          <div class="coupon__content">
            <div class="left coupon__content-inner">
              <p class="money">￥
                <span class="money1">{{item.count}}</span>
              </p>
              <div class="coupon__desc">
                <p class="discount">{{item.name}}</p>
                <p class="purchases">购满{{item.limitCount}}可使用</p>
              </div>
            </div>
            <div class="right">未使用</div>
          </div>
          <p class="coupon__time">有效期 {{item.startTime}}-{{item.endTime}}</p>
        </div>
        <div class="coupon-empty" v-if="!navData[0].list.length && navData[0].lastPage">
          <i class="t_img"></i>
          <p class="title">~空空如也~</p>
        </div>
        <div v-if="loading">
          <zan-loading> </zan-loading>
        </div>
        
      </div>
      <div v-show="selectedId == 'use'">


        <div class="coupon" v-for="(item, index) in navData[1].list" :key="index">
          <!-- <i class="bg hasCoupon"></i> -->
          <img class="bg hasCoupon" src="../../../assets/img/marketingMgt/yhq.png" mode="aspectFill" />
          <div class="coupon__content">
            <div class="left coupon__content-inner">
              <p class="money">￥
                <span class="money1">{{item.count}}</span>
              </p>
              <div class="coupon__desc">
                <p class="discount">{{item.name}}</p>
                <p class="purchases">购满{{item.limitCount}}可使用</p>
              </div>
            </div>
            <div class="right">已使用</div>
          </div>
          <p class="coupon__time">有效期 {{item.startTime}}-{{item.endTime}}</p>
        </div>
        <div class="coupon-empty" v-if="!navData[1].list.length && navData[1].lastPage">
          <i class="t_img"></i>
          <p class="title">~空空如也~</p>
        </div>
        <div v-if="loading">
          <zan-loading> </zan-loading>
        </div>
      </div>
      <div v-show="selectedId == 'disable'">


        <div class="coupon" v-for="(item, index) in navData[2].list" :key="index">
          <!-- <i class="bg hasCoupon"></i> -->
          <img class="bg hasCoupon" src="../../../assets/img/marketingMgt/yhq.png" mode="aspectFill" />
          <div class="coupon__content">
            <div class="left coupon__content-inner">
              <p class="money">￥
                <span class="money1">{{item.count}}</span>
              </p>
              <div class="coupon__desc">
                <p class="discount">{{item.name}}</p>
                <p class="purchases">购满{{item.limitCount}}可使用</p>
              </div>
            </div>
            <div class="right">已失效</div>
          </div>
          <p class="coupon__time">有效期 {{item.startTime}}-{{item.endTime}}</p>
        </div>

        <div class="coupon-empty" v-if="!navData[2].list.length && navData[2].lastPage">
          <i class="t_img"></i>
          <p class="title">~空空如也~</p>
        </div>
        <div v-if="loading">
          <zan-loading> </zan-loading>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import myCoupon from "@/components/m_myCoupon";
import myCouponT from "@/components/m_myCouponT";
import API from "@/api/httpJchan";
export default {
  components: {
    myCoupon,
    myCouponT
  },
  data() {
    return {
      tag: 1,
      qwe: "",
      selectedId: 'unused',
      loading: false,
      navData: [
        {
          isExchange: 0,
          id: 'unused',
          list: [],
          lastPage: false,
          title: "未使用"
        },
        {
          isExchange: 1,
          id: 'use',
          list: [],
          lastPage: false,
          title: "已使用"
        },
        {
          state: 2,
          id: 'disable',
          list: [],
          lastPage: false,
          title: "已失效"
        }
      ]
    };
  },
  methods: {
    handleNav(tag) {
      this.tag = tag;
    },
    handleZanTabChange(e) {

      let { detail: selectedId } = e.mp;
      this.selectedId = selectedId;

      const currentIndex = this.navData.findIndex(item => item.id === selectedId);
      this.navData.splice(currentIndex, 1, {
        ...this.navData[currentIndex],
        lastPage: false,
        pageNumber: 1,
        list: []
      });
      this.fetch();
    },

    async fetch() {
      const currentIndex = this.navData.findIndex(item => item.id === this.selectedId);
      const current = this.navData[currentIndex];
      const { isExchange, state, pageNumber } = current;
      if (current.lastPage || this.loading) {
        return;
      }
      this.loading = true;
      let { data: { list, lastPage } } = await API.myCoupon({
        isExchange,
        pageSize: 10,
        pageNumber,
        state
      });
      this.loading = false;
      list = list.map(item => ({
        ...item,
        startTime: item.startTime.split(" ")[0].toString(),
        endTime: item.endTime.split(" ")[0].toString(),
      }))

      this.navData.splice(currentIndex, 1, {
        ...current,
        lastPage,
        list: current.list.concat(list),
        pageNumber: current.pageNumber + 1
      })
      // this.navData[currentIndex] = {
      //   ...current,
      //   lastPage,
      //   list: current.list.concat(list),
      //   pageNumber: current.pageNumber + 1
      // };
    }
  },
  onReachBottom() {
    this.fetch();
  },
  mounted() {
    // wx.getStorage({
    //   key: "qwe",
    //   success: function(res) {
    //     console.log(res.data);
    //   }
    // });
    this.fetch();
  },
  onUnload() {
    Object.assign(this, this.$options.data())
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.home
  height: 100%
  .active
    color: #F67C2F
  .nav
    overflow: hidden
    text-align: center
    background: #f5f5f5
    height: 80px
    width: 100%
    padding-top: 1px
    box-shadow: 0px 4px 6px 0px rgba(0, 69, 162, 0.06)
    .list
      font-size: 32px
      color: #000
      background: #f5f5f5
      overflow-y: hidden
      overflow-x: auto
      height: 90px
      position: relative
      display: flex
      width: 100%
      .item
        // flex: 0 0 20%
        flex: 1
        line-height: 70px
        box-sizing: border-box
      .line
        display: block
        height: 4px
        width: 33%
        border-radius: 8px
        background-color: #F67C2F
        position: absolute
        bottom: 10px
        // margin: 0 6%
        transition: left .3s ease-in
  .content
    padding-top: 10px
    .text
      margin: 0 auto
  .foot
    position: fixed
    bottom: 0px
    width: 100%
    height: 98px
    line-height: 98px
    background: #F67C2F
    color: #fff
    font-size: 32px
    text-align: center
</style>
