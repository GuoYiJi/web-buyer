<template>
  <div class="home">
    <div class="head">
      <img v-if="coverImg" :src="coverImg" alt="">
      <img v-else class="bg" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
      <img class="tx" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
      <p class="text">遇见不一样的自己</p>
    </div>
    <div class="search-box">
      <div class="input">
        <p class="search-icon">
          <i class="search"></i>
        </p>
        <p class="input-box" @click="toSearch()">请搜索商品</p>
      </div>
    </div>
    <div class="coupon-box">
      <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <block v-for="(item,index) in coupon" :key="index">
          <swiper-item class="coupon-img">
            <div class="yhqk">
              <p class="money">￥<span class="money1">{{item.price}}</span></p>
              <p class="whole">全程满 <br/>
                <span class="whole1">{{item.limitCount}}</span>使用
              </p>
              <span class="btn" @click="btn(item.id)">立即领取</span>
            </div>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="nav">
      <div class="list">
        <span v-for="(item,idx) in navData" :key="idx" class="item" :class="[tag === item.id && 'active']" @click="handleNav(item.id)">
          <img class="img" :src="item.img">
          <p class="text">{{item.text}}</p>
        </span>
      </div>
    </div>
    <div class="content">
      <!--<div class="home" v-if="tag === 2 || tag === 3 || tag === 5 || tag === 6">-->
        <!--<div class="sort-select">-->
          <!--<div class="top-nav">-->
            <!--<ul>-->
              <!--&lt;!&ndash; <li :class="[tag === 1 && 'nav-active']" @click="handleTag(1)">综合</li> &ndash;&gt;-->
              <!--<li :class="[tag === 2 && 'nav-active']" @click="handleTag(2)">销量-->
                <!--<div class="sort-box">-->
                  <!--<i class="sort-top" :class="asceSale && 'sort-active'"></i>-->
                  <!--<i :class="!asceSale && 'sort-active'" class="sort-bottom"></i>-->
                <!--</div>-->
              <!--</li>-->
              <!--<li :class="[tag === 4 && 'nav-active']" @click="handleTag(4)">价格-->
                <!--<div class="sort-box">-->
                  <!--<i class="sort-top" :class="ascePrice && 'sort-active'"></i>-->
                  <!--<i :class="!ascePrice  && 'sort-active'" class="sort-bottom"></i>-->
                <!--</div>-->
              <!--</li>-->
              <!--<li :class="[tag === 5 && 'nav-active']" @click="handleTag(5)">筛选-->
                <!--<div class="sort-box">-->
                  <!--<i class="option-icon"></i>-->
                <!--</div>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</div>-->
          <!--<i-drawer mode="right" :visible="showRight1" @close="toggleRight1">-->
            <!--<div class="demo-container">-->
              <!--<div class="title">-->
                <!--<i class="zuo"></i>-->
                <!--<span class="screen">筛选</span>-->
              <!--</div>-->
              <!--<div class="item-box">-->
                <!--<div class="item">-->
                  <!--<p class="i_title">品类</p>-->
                  <!--<ul class="s_item_box">-->
                    <!--<li class="s_item">一级分类</li>-->
                    <!--<li class="s_item">一级分类</li>-->
                    <!--<li class="s_item">一级分类</li>-->
                    <!--<li class="s_item">一级分类</li>-->
                    <!--<li class="s_item">一级分类</li>-->
                    <!--<li class="s_item">一级分类</li>-->
                  <!--</ul>-->
                  <!--&lt;!&ndash; <ul v-if="more1" class="s_item_box">-->
                    <!--<li class="s_item">档口1</li>-->
                    <!--<li class="s_item">档口2</li>-->
                    <!--<li class="s_item">档口3</li>-->
                  <!--</ul> &ndash;&gt;-->
                  <!--<p class="more">-->
                <!--<span @click="toOpen('more1')" v-if="!more1">查看更多-->
                  <!--<i class="goback"></i>-->
                <!--</span>-->
                    <!--<span @click="toClose('more1')" v-else>点击收起</span>-->
                  <!--</p>-->
                <!--</div>-->
                <!--<div class="item">-->
                  <!--<p class="i_title">货期情况</p>-->
                  <!--<ul class="s_item_box">-->
                    <!--<li class="s_item">现货</li>-->
                    <!--<li class="s_item">3-5天</li>-->
                    <!--<li class="s_item">6-10天</li>-->
                    <!--<li class="s_item">订货</li>-->
                    <!--<li class="s_item">11-15天</li>-->
                    <!--<li class="s_item">一个月内</li>-->
                  <!--</ul>-->
                <!--</div>-->
                <!--<div class="item">-->
                  <!--<p class="i_title">价格区间</p>-->
                  <!--<ul class="s_item_box">-->
                    <!--<li class="s_item">0-70</li>-->
                    <!--<li class="s_item">3-5天</li>-->
                    <!--<li class="s_item">6-10天</li>-->
                    <!--<li class="s_item">-->
                      <!--<input type="text" placeholder="最低价">-->
                    <!--</li>-->
                    <!--&#45;&#45;-->
                    <!--<li class="s_item">-->
                      <!--<input type="text" placeholder="最高价">-->
                    <!--</li>-->
                  <!--</ul>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="f_btn">-->
                <!--<p class="reset">重置</p>-->
                <!--<p class="confirm">确定</p>-->
              <!--</div>-->
            <!--</div>-->
          <!--</i-drawer>-->
        <!--</div>-->
      <!--</div>-->
      <div v-if="tag == 1">
        <colligate/>
        <Upnew/>
        <selling/>
        <collocation/>
        <Collage/>
        <discount/>
      </div>
      <div v-else-if="tag == 2">
        <screen/>
        <Upnew/>
      </div>
      <div v-else-if="tag == 3">
        <screen/>
        <selling/>
      </div>
      <div v-else-if="tag == 4">
        <collocation/>
      </div>
      <div v-else-if="tag == 5">
        <screen/>
        <Collage/>
      </div>
      <div v-else-if="tag == 6">
        <screen/>
        <discount/>
      </div>
    </div>
    <div class="toTop" v-show="top">
      <div class="top" @click="toTop()">
        <i class="top_img"></i>
        <p class="top_text">顶部</p>
      </div>
    </div>

    <div class="footer">
      <footers :tag="1" />
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import API from '@/api/httpJchan'
import mixin from '@/mixin'
import colligate from '@/components/h_colligate'
import Upnew from '@/components/h_Upnew'
import selling from '@/components/h_selling'
import collocation from '@/components/h_collocation'
import Collage from '@/components/h_Collage'
import discount from '@/components/h_discount'
import screen from '@/components/h_screen'
import footers from '@/commond/footer'
export default {
  mixins: [mixin],
  components: {
    colligate,
    Upnew,
    selling,
    collocation,
    Collage,
    discount,
    screen,
    footers
  },
  data () {
    return {
      top: false,
      coverImg: '',
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      tag: 1,
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
    async btn (id) {
      const getCoupon = await API.getCoupon({ couponId: id })
      console.log(getCoupon)
    }
  },
  async mounted () {
    // 首页封面图
    const cover = await API.getImg({type: 5})
    if (cover.code === 1) {
      this.coverImg = cover.data[0].image
    }
    const shopInfo = await API.getShopInfo()
    if (shopInfo.code === 1) {
      wx.setStorage({
        key: 'shopName',
        data: shopInfo.data.name
      })
    }
    const pageByCreate = await API.pageByCreate({state: 1})
    console.log('优惠券', pageByCreate)
    this.coupon = pageByCreate.data.list
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
    height: 900px
    .bg
      display: block
      width: 100%
      height: 900px
    .tx
      position: absolute
      top: 720px
      left: 24px
      width: 120px
      height: 120px
      border-radius: 50%
    .text
      display: inline-block
      box-sizing: border-box
      height: 60px
      line-height: 60px
      padding: 0 22px
      background: #fff
      text-align: center
      position: absolute
      top: 750px
      left: 154px
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
    .swiper
      height: 126px
      .coupon-img
        width: 210px !important
        height: 126px
        .yhqk
          box-sizing: border-box
          +bg-img('home/yhq.png')
          width: 210px !important
          height: 126px
          color: #fff
          margin: 0 10px
          padding-top: 5px
          position: relative
          .money
            display: inline-block
            width: 90px
            padding-left: 10px
            font-size: 24px
            text-align: center
            .money1
              font-size: 48px
          .whole
            display: inline-block
            position: absolute
            width: 110px
            font-size: 20px
            left: 90px
            text-align: center
          .btn
            position: absolute
            font-size: 20px
            width: 150px
            height: 35px
            display: inline-block
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
    padding: 30px 0
    font-size: 26px
    color: #999
    overflow: hidden
    text-align: center
    background: #f5f5f5
    .list
      font-size: 26px
      color: #000
      background: #f5f5f5
      overflow-y: hidden
      overflow-x: auto
      position: relative
      display: flex
      width: 100%
      .item
        flex: 1
        box-sizing: border-box
        .img
          width: 90px
          height: 90px
        .text
          font-size: 26px
  .content
    position: relative
    height: 100%
    background: #fff
</style>

