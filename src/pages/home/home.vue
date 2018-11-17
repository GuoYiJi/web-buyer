<template>
  <div class="home" v-if="isInitFetch">
   <!--  <div class="head">
      <div class="head__absolute">
        <img v-if="coverImg" :src="coverImg" mode="aspectFill" lazy-load>
        <div class="head__avatar">
          <img class="tx" :src="Warehouse.img" mode="aspectFill" lazy-load>
          <p class="text">{{ Warehouse.name }}</p>
        </div>
      </div>
    </div>
    <div class="search-box">
      <div class="input">
        <p class="search-icon">
          <i class="search"></i>
        </p>
        <p class="input-box" @click="toSearch()">请搜索商品</p>
      </div>
    </div>
    <div class="coupon-box" v-if="coupon.length">
      <scroll-view scroll-x>
        <block v-for="(item,index) in coupon" :key="index">
          <div class="coupon-img">
            <div class="yhqk" @click="btn(item)">
              <p class="money">￥<span class="money1">{{item.price}}</span></p>
              <p class="whole">全程满 <br/>
                <span class="whole1">{{item.limitCount}}</span>使用
              </p>
              <div>
                <span class="btn">立即领取</span>
              </div>
              <div class="mask-checked" v-if="item.isReceived === 'true'">已领取</div>
              
            </div>
          </div>
        </block>
      </scroll-view>
    </div> -->
    <div>
      <block>
        <div class="nav">
          <scroll-view class="list" scroll-x>
            <div v-for="(item, idx) in navData" :key="idx" class="item" :class="[tag == item.id && 'active']" @click="handleNav(item.id)">
              <img class="img" :src="item.img">
              <p class="text">{{item.text}}</p>
            </div>
          </scroll-view>
        </div>
        <div class="content">
          <div v-if="tag == 1">
            <!-- <colligate/> -->
            <!-- <Upnew2 :hidenSort="true" /> -->
            <!-- <selling :hidenSort="true" /> -->
            <!-- <selling2 :hidenSort="true" /> -->
            <!-- <collocation :init-count="3" :hidenSort="true" /> -->
            <!-- <collocation2 :init-count="3" :hidenSort="true" /> -->
            <!-- <Collage :hidenSort="true" /> -->
            <Collage2 :hidenSort="true" />
            <discount :hidenSort="true" />
          </div>
          <div v-else-if="tag == 2">
            <Upnew/>
          </div>
          <div v-else-if="tag == 3">
            
            <selling/>
          </div>
          <div v-else-if="tag == 4">
            <collocation/>
          </div>
          <div v-else-if="tag == 5">
            <Collage/>
          </div>
          <div v-else-if="tag == 6">
            <discount/>
          </div>
        </div>
      </block>
      <div v-if="loading">
        <zan-loading />
      </div>
    </div>
    <div class="toTop" v-show="top">
      <div class="top" @click="toTop()">
        <i class="top_img"></i>
        <p class="top_text">顶部</p>
      </div>
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import API from '@/api/httpJchan'
import APIShui from '@/api/httpShui';
import mixin from '@/mixin'
import colligate from '@/components/h_colligate'
import Upnew from '@/components/h_Upnew'
import Upnew2 from '@/components/h_Upnew2'
import selling from '@/components/h_selling'
import selling2 from '@/components/h_selling2'
import collocation from '@/components/h_collocation'
import collocation2 from '@/components/h_collocation2'
import Collage from '@/components/h_Collage'
import Collage2 from '@/components/h_Collage2'
import discount from '@/components/h_discount'
import screen from '@/components/h_screen'
export default {
  mixins: [mixin],
  components: {
    colligate,
    Upnew,
    Upnew2,
    selling,
    selling2,
    collocation,
    collocation2,
    Collage,
    Collage2,
    discount,
    screen
  },
  data () {
    return {
      isInitFetch: false,
      Warehouse: {},
      top: false,
      coverImg: '',
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      tag: 1,
      isFetch: false,
      tabs: [
      ],
      navData: [
        {
          id: 1,
          text: '综合',
          img: require('../../assets/img/home/zonghe.png')
        },
        {
          id: 2,
          text: '新品上新',
          img: require('../../assets/img/home/shangxin.png')
        },
        {
          id: 3,
          text: '爆款精选',
          img: require('../../assets/img/home/baokuan.png')
        },
        {
          id: 4,
          text: '搭配专区',
          img: require('../../assets/img/home/dapei.png')
        },
        {
          id: 5,
          text: '拼团优惠',
          img: require('../../assets/img/home/pintuan.png')
        },
        {
          id: 6,
          text: '特价折扣',
          img: require('../../assets/img/home/tejia.png')
        }
      ],
      coupon: [],
      selectMGP: []
    }
  },
  onPageScroll (e) {
    if (e.scrollTop > 500) {
      this.top = true
    } else if (e.scrollTop < 500) {
      this.top = false
    }
  },
  methods: {
    // 回到顶部
    toTop () {
      wx.pageScrollTo({
        scrollTop: 0
      })
    },
    toSearch () {
      this.$router.push('/pages/search/search')
    },
    handleNav (tag) {
      this.tag = tag
    },
    async btn(item) {
      if (item.isReceived === 'true') {
        return;
      }
      wx.showLoading({
        title: '领取中'
      })
      API.getCoupon({ couponId: item.id })
        .then(res => {
          this.coupon = this.coupon.map(_ => {
            if (_.id === item.id) {
              _.isReceived = 'true';
            }
            return _;
          })
        })
        .finally(() => {
          wx.hideLoading()
        });
    },
    handleSortChange(event) {
      console.log(event);
    },
    async handleInitFetch() {

      // 首页封面图
      // const cover = await API.getImg({type: 5})
      // if (cover.code === 1) {
      //   this.coverImg = cover.data[0].image
      // }
      wx.showLoading({
        title: '加载中'
      })
      const shopInfo = await API.getShopInfo();
      this.isInitFetch = true;
      wx.hideLoading();
      if (shopInfo.code === 1) {
        wx.setStorage({
          key: 'shopName',
          data: shopInfo.data.name
        })
        wx.setNavigationBarTitle({
          title: shopInfo.data.name
        })
        this.coverImg = shopInfo.data.wall;
        this.Warehouse = shopInfo.data;
      }
      const pageByCreate = await API.pageByCreate({state: 1})
      this.coupon = pageByCreate.data.list
      try {

        // const { code, data } = await APIShui.getTabs({types: '0,1'});
        // if (code === 1) {
        //   const images_default = [
        //     require('../../assets/img/home/zonghe.png'),
        //     require('../../assets/img/home/shangxin.png'),
        //     require('../../assets/img/home/baokuan.png'),
        //     require('../../assets/img/home/dapei.png'),
        //     require('../../assets/img/home/pintuan.png'),
        //     require('../../assets/img/home/tejia.png')
        //   ]
        //   this.tabs = data.map(item => {
        //     return {
        //       id: item.id,
        //       text: item.name,
        //       img: item.image || images_default[item.id - 1]
        //     }
        //   })
        // }
        // this.isFetch = true;
      } catch (err) {
        console.log(err)
      }
      this.loading = false;
      return Promise.resolve();
    }
  },
  onShareAppMessage() {
    return {
      title: '发现一家好店，与你分享！'
    }
  },
  async onPullDownRefresh() {
    await this.handleInitFetch();
    wx.stopPullDownRefresh();
  },
  async mounted () {
    this.handleInitFetch();
  },
  onUnload() {
    Object.assign(this, this.$options.data());
  }
}
</script>
<style type="text/sass" lang="sass" scoped>
@import '~@/assets/css/mixin'
.home
  position: relative
  .toTop
    position: fixed
    bottom: 120px
    right: 30px
    width: 96px
    height: 96px
    text-align: center
    font-size: 22px
    color: #666
    z-index: 9999
    .top
      display: inline-block
      background: rgba(234,234,234,1)
      border-radius: 60px
      width: 96px
      height: 76px
      overflow: hidden
      padding: 10px 0
      .top_img
        +bg-img('home/xqtb.png')
        width: 38px
        height: 40px
        margin: 0 auto
  .head
    position: relative
    width: 100%
    padding-top: 100%;
    &__absolute
      position: absolute
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    &__avatar
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 20px;
      left: 24px;
    .bg
      display: block
      width: 100%
      height: 440px
    .tx
      width: 120px
      height: 120px
      border-radius: 50%
    .text
      margin-left: 20px;
      display: inline-block
      box-sizing: border-box
      height: 60px
      line-height: 60px
      padding: 0 22px
      background: #fff
      text-align: center;
      border-radius: 8px
      font-size: 28px
      color: #000
  .search-box
    padding: 30px 0
    background: #fff
    width: 100%
    .input
      display: flex
      padding: 0px 35px
      .search
        +bg-img('home/search.png')
        +icon(38px)
        margin-top: 7px
      .search-icon
        position: absolute
        left: 60px
      .input-box
        background-color: #f5f5f5
        border-radius: 4px
        width: 100%
        text-align: left
        padding: 8px 85px
        border: none
        color: #999999
  .coupon-box

    width: 100%
    height: 126px
    padding-bottom: 30px
    overflow: hidden
    background: #fff
    scroll-view
      width: 100%
      white-space: nowrap;
    .coupon-img
      position: relative
      display: inline-block
      margin: 0 5px
      &:first-child
        margin-left: 24px
      &:last-child
        margin-right: 24px
      .mask-checked
        position: absolute
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex
        align-items: center
        justify-content: center
        z-index: 5
        background-color: rgba(0, 0, 0, .3)
      .yhqk
        box-sizing: border-box
        +bg-img('home/yhq.png')
        height: 126px
        color: #fff
        margin: 0 10px
        padding: 5px 10px 0
        position: relative
        .money
          display: inline-block
          padding-left: 10px
          font-size: 24px
          text-align: center
          .money1
            font-size: 48px
        .whole
          margin-left: 10px
          display: inline-block
          font-size: 20px
          text-align: center
        .btn
          margin: 0 auto;
          font-size: 20px
          width: 150px
          height: 35px
          display: block
          color: #ff7272
          background: #fff
          border-radius: 10px
          text-align: center
          line-height: 35px
          top: 80px
          left: 35px
      .yhqk.active
        background: rgba(0,0,0,.8)
  .active
    color: #F67C2F
  .nav
    width: 100%
    padding: 34px 0
    font-size: 26px
    color: #999
    overflow: hidden
    background: #f5f5f5
    .list
      font-size: 26px
      color: #000
      background: #f5f5f5
      position: relative
      width: 100%
      white-space: nowrap
      .item
        display: inline-block
        margin: 0 10px
        text-align: center
        &:first-child
          margin-left: 20px
        &:last-child
          margin-right: 20px
        .img
          width: 90px
          height: 90px
        .text
          font-size: 26px
          color: #999
      .item.active
        .text
          color: #EE7527
  .content
    position: relative
    height: 100%
    background: #fff
</style>

