<template>
  <div class="wrapper">
    <!--<div class="searchBox clearfix">-->
      <!--<input class="search" type="text"/>-->
      <!--<span class="close">取消</span>-->
    <!--</div>-->
    <div class="search-box">
      <div class="input">
        <p class="search-icon">
          <i class="search"></i>
        </p>
        <input class="input-box" v-model="keyword" placeholder="请搜索商品"/>
      </div>
      <span class="searchBtn" @click="search()">搜索</span>
    </div>
    <div>
      <div class="leftBox">
        <ul class="tabs">
          <li class="tabItem" :class="{active : index==tabIndex}" v-for="(item,index) in tabs" :key="index" @click="clickTabs(index,item.id)">{{item.name}}</li>
        </ul>
      </div>
      <div class="rightBox">
        <ul class="goodsList clearfix">
          <li class="goodsItem" @click="ClickClassify(item.id)" v-for="(item,index) in classifyList" :key="index">
            <img v-if="item.image" class="img" :src="item.image" alt="">
            <img v-else class="img" src="../../assets/img/classify/goods.png" alt="">
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
      </div>
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
    async getClassify (id) {
      const data = await API.getClassify({pid: id})
      // console.log('二级分类数据', data)
      this.classifyList = data.data
    },
    // 搜索
    search () {
      if (this.keyword) {
        console.log(this.keyword)
        this.$router.push({path: '/pages/classify/goodsList', query: {key: this.keyword}})
      }
    }
  },
  async mounted () {
    // 获取一级分类接口
    const tabsList = await API.getTabs({types: '2'})
    // console.log('一级分类数据', tabsList)
    this.tabs = tabsList.data
    // 获取二级分类
    this.getClassify(this.pid)
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
  background: #ffffff
.search-box
  /*position: absolute*/
  padding: 30px 0
  background: #fff
  width: 100%
  height: 60px
  .input
    float: left
    display: inline-block
    width: 616px
    height: 60px
    padding: 0 28px
    .search
      +bg-img('home/search.png')
      +icon(38px)
      margin-top: 20px
    .search-icon
      position: absolute
      left: 60px
    .input-box
      background-color: #f5f5f5
      border-radius: 4px
      /*width: 100%*/
      text-align: left
      padding: 8px 85px
      border: none
      color: #999999
  .searchBtn
    float: left
    display: inline-block
    height: 60px
    line-height: 60px
.leftBox
  width: 166px
  float: left
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
  float: left
  width: 496px
  margin-left: 48px
  .goodsList
    width: 100%
    height: auto
    // display: -webkit-flex
    // display: flex
    // justify-content: space-around
    // flex-wrap: wrap
    .goodsItem
      float: left
      width: 127px
      margin-left: 35px
      // height: 179px
      .img
        width: 100%
        height: 140px
        // margin-bottom: 10px
      .text
        display: block
        width: 100%
        text-align: center
        font-size: 24px
        color: #333333
  </style>
