<template>
  <div class="home">
    <div class="head" @click="toRoute">
      <img class="bg" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
      <img class="tx" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
      <p class="text">遇见不一样的自己</p>
    </div>
    <div class="search-box">
      <div class="input">
        <p class="search-icon">
          <i class="search"></i>
        </p>
        <p class="input-box" @click="toRoute('shopMgr/search')">请搜索商品</p>
      </div>
    </div>
    <div class="coupon-box">
      <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <block v-for="(item,index) in imgUrls" :key="index">
          <swiper-item class="coupon-img">
            <image :src="item" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="nav">
      <div class="list">
        <span v-for="(item,idx) in navData" :key="idx" class="item" :class="[tag === item.id && 'active']" @click="handleNav(item.id)">
          <img class="img" :src="item.img">
          <p>{{item.text}}</p>
        </span>
      </div>
    </div>
    <div class="content">
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
        <screen/>
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
    <div class="footer">
      <footers :tag="1" />
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import API from '@/api/httpShui'
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
      nav: 1,
      imgUrls: [
        'http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg',
        'http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg',
        'http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg',
        'http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg',
        'http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg'
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      tag: 1,
      navData: [
        {
          id: 1,
          text: '综合',
          img:
            'http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg'
        },
        {
          id: 2,
          text: '新品上新',
          img:
            'http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg'
        },
        {
          id: 3,
          text: '爆款精选',
          img:
            'http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg'
        },
        {
          id: 4,
          text: '搭配专区',
          img:
            'http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg'
        },
        {
          id: 5,
          text: '拼团优惠',
          img:
            'http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg'
        },
        {
          id: 6,
          text: '特价折扣',
          img:
            'http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg'
        }
      ],
      state: 1,
      pageSize: 5,
      pageNumber: 1,
      Sx: [],
      Bk: [],
      Zk: [],
      Pt: []

    }
  },
  methods: {
    toRoute () {
      this.$router.push('/pages/home/details/detailsCg')
    },
    handleNav (tag) {
      this.tag = tag
    }
  },
  mounted () {
    // this.goodsList(1)
    // let bk = this.goodsList(2)
    // let zk = this.goodsList(3)
    // let pt = this.goodsList(4)
  }
}
</script>
<style type="text/sass" lang="sass" scoped>
@import '~@/assets/css/mixin'
.head
  position: relative
  top: 0px
  left: 0px
  .bg
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    height: 900px
  .tx
    position: absolute
    top: 720px
    left: 24px
    width: 120px
    height: 120px
    border-radius: 50px
  .text
    display: inline-block
    background: #fff
    text-align: center
    line-height: 57px
    position: absolute
    top: 752px
    left: 155px
    width: 265px
    height: 57px
    border-radius: 8px
    font-size: 28px
    color: #000

.search-box
  position: absolute
  padding: 30px 0
  background: #fff
  width: 100%
  top: 900px
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
  height: 170px
  width: 100%
  position: absolute
  top: 1016px
  overflow: hidden
  background: #fff
  .coupon-img
    width: 210px!important
    height: 126px
    .slide-image
      width: 210px!important
      height: 126px
      margin: 0 0 0 15px
.active
  color: #F67C2F
.nav
  position: relative
  height: 200px
  top: 1210px
  font-size: 26px
  color: #999
  overflow: hidden
  text-align: center
  background: #f5f5f5
  width: 100%
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
.content
  position: relative
  height: 100%
  top: 1170px
  background: #fff
</style>

