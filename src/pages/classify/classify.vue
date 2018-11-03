<template>
  <div class="wrapper">
    <!--<div class="searchBox clearfix">-->
      <!--<input class="search" type="text"/>-->
      <!--<span class="close">取消</span>-->
    <!--</div>-->
   <!--  <div class="search-box">
      <div class="input">
        <p class="search-icon">
          <i class="search"></i>
        </p>
        <input class="input-box" v-model="keyword" placeholder="请搜索商品"/>
      </div>
      <span class="searchBtn" @click="search()">搜索</span>
    </div> -->
    <div>
      <div class="search-bar" @click="search()">
        <div class="search-bar__form">
          <div class="search-bar__box">
            <i class="icon-search"></i>
            <input class="search-bar__input" v-model="keyword" type="text" placeholder="请搜索商品" confirm-type="search" />
          </div>
        </div>
      </div>
    </div>
    <div class="tabs-container clearfix">
      <scroll-view class="leftBox" scroll-y>
        <ul class="tabs">
          <li class="tabItem" :class="{active : index==tabIndex}" v-for="(item,index) in tabs" :key="index" @click="clickTabs(index,item.id)">{{item.name}}</li>
        </ul>
      </scroll-view>
      <scroll-view class="rightBox" scroll-y>
        <div v-for="(item, key) in tabs" :key="key" v-if="key==tabIndex">
          <ul class="goodsList clearfix">
            <li class="goodsItem" @click="ClickClassify(item.id)" v-for="(item,index) in item.classifyList" :key="index">
              <img v-if="item.image" class="img" :src="item.image" alt="" mode="aspectFill">
              <img v-else class="img" src="../../assets/img/classify/goods.png" alt="" mode="aspectFill">
              <span class="text" v-text="item.name"></span>
            </li>
            <!-- <li class="goodsItem">
              <a href="/pages/classify/twoclassify">
                <img class="img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg" alt="">
                <span class="text">连衣裙</span>
              </a>
            </li>
            <li class="goodsItem">
              <img class="img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg" alt="">
              <span class="text">连衣裙</span>
            </li> -->
          </ul>
          <div class="loading-container" v-if="item.loading">
            <zan-loading />
          </div>
          <div class="loadmore-container" v-if="item.nodata">
            <zan-loadmore type="text" text="暂无分类" />
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import API from '@/api/httpShui'
export default {
  data () {
    return {
      tabIndex: 0,
      tabs: [],
      pid: 0,
      classifyList: [],
      keyword: ''
    }
  },
  components: {},
  methods: {
    // 点击一级分类标签
    clickTabs (i, id) {
      this.pid = id
      this.tabIndex = i
      this.getClassify(id)
    },
    // 跳转商品列表
    ClickClassify (id) {
      this.$router.push({path: '/pages/classify/goodsList', query: {id: id}})
    },
    // 获取二级分类函数
    async getClassify (pId) {
      this.tabs.splice(this.tabIndex, 1, {
        ...this.tabs[this.tabIndex],
        loading: true,
        nodata: false,
        classifyList: []
      })
      const { data } = await API.selectAppLabelList({pId, types: 2});

      this.tabs.splice(this.tabIndex, 1, {
        ...this.tabs[this.tabIndex],
        classifyList: data,
        loading: false,
        nodata: !data.length
      })
    },
    // 搜索
    search () {
      this.$router.push({path: '/pages/search/search', query: {key: this.keyword}})
    }
  },
  async mounted () {

    // 获取一级分类接口
    const { data, code } = await API.selectAppLabelList({types: '2'})
    if (code === 1) {
      this.tabs = data.map(item => ({
        ...item,
        classifyList: [],
        loading: false
      }))
    }
    // console.log('一级分类数据', tabsList)
    if (this.tabs.length) {
      // 获取二级分类
      // this.selectAppLabelList(this.tabs[0].id)
      this.getClassify(this.tabs[0].id)
    }
  }
}
</script>
<style type="text/sass" lang="sass" scoped>
@import '~@/assets/css/mixin'
.clearfix:after
  content: "020"
  display: block
  height: 0
  clear: both
  visibility: hidden
.clearfix
  /* 触发 hasLayout */
  zoom: 1
.wrapper
  display: flex
  flex-direction: column
  background: #ffffff
  overflow: hidden
.tabs-container
  position: relative
  flex: 1
  margin-top: 20px
.leftBox
  position: absolute
  z-index: 10
  top: 0
  left: 0
  width: 166px
  height: 100%
  .tabs
    width: 100%
    height: auto
    .tabItem
      width: 100%
      height: 80px
      line-height: 80px
      text-align: center
      coolr: #333333
      font-size: 28px
      background: #F5F5F5
      border-bottom: 1px solid #FFFFFF
      border-left: 8px solid transparent
    .tabItem.active
      background: #ffffff
      border-left: 8px solid #EE7527
.rightBox
  position: absolute
  top: 0
  left: 0
  height: 100%
  .loading-container, .loadmore-container
    padding-left: 88px + 166px
    padding-right: 34px
  .goodsList
    padding-left: 88px + 166px
    padding-right: 34px
    width: 100%
    box-sizing: border-box
    // display: -webkit-flex
    // display: flex
    // justify-content: space-around
    // flex-wrap: wrap
    .goodsItem
      margin-bottom: 87px
      float: left
      width: 32.8%
      text-align: center
      // height: 179px
      .img
        width: 127px
        height: 140px
        // margin-bottom: 10px
      .text
        display: block
        width: 100%
        text-align: center
        font-size: 24px
        color: #333333
  </style>
