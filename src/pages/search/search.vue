<template>
  <div class="wrapper">
    <div class="search-box">
      <div class="input">
        <p class="search-icon">
          <i class="search"></i>
        </p>
        <input class="input-box" v-model="keyword" placeholder="请搜索商品"/>
      </div>
      <span class="searchBtn" @click="search()">搜索</span>
    </div>
    <ul class="sortTabs">
      <li class="sortItem" :class="{active : sortTabs==1, fx : sortStyle==0, fs : sortStyle ==1}" @click="sortFn(1,sortTime)">综合</li>
      <li class="sortItem" :class="{active : sortTabs==2, fx : sortStyle==2, fs : sortStyle ==3}" @click="sortFn(2,sortSales)">销量</li>
      <li class="sortItem" :class="{active : sortTabs==3, fx : sortStyle==4, fs : sortStyle ==5}" @click="sortFn(3,sortPrice)">价格</li>
      <li class="sortItem sx">筛选</li>
      <li class="sortItem menu" @click='showType=!showType'></li>
    </ul>
    <div class="goodsList clearfix">
      <div class="item" v-for="(item,index) in goodsList" :key="index" v-if="showType">
        <div class="img">
          <img v-if="item.image" :src="item.image" alt="">
          <img v-else src="../../assets/img/classify/goods.png" alt="">
        </div>
        <div class="text">
          <p class="title" v-text="item.name"></p>
          <p class="intro clearfix">
            <span class="qh">期货:{{item.delivery}}</span>
            <span class="xl">销量:{{item.sellCount==9999 ? '9999+' : item.sellCount }}</span>
          </p>
          <p class="price-btn">
            <span class="price">批货价:￥{{item.sellPrice}}</span>
            <span class="btn" @click="clickItem(item)">立即采购</span>
          </p>
        </div>
      </div>
      <div class="line-item"  v-for="(item,index) in goodsList" :key="index" v-if="!showType">
        <div class="img">
          <img v-if="item.image" :src="item.image" alt="">
          <img v-else src="../../assets/img/classify/goods.png" alt="">
        </div>
        <div class="text">
          <p class="title">{{item.name}}</p>
          <p class="qh">期货:{{item.delivery}}</p>
          <p class="xl">销量:{{item.sellCount==9999 ? '9999+' : item.sellCount }}</p>
          <p class="price-btn clearfix">
            <span class="price">批货价:￥{{item.sellPrice}}</span>
            <span class="btn" @click="clickItem(item)">立即采购</span>
          </p>
        </div>
      </div>
    </div>
    <div class="msg" v-if="totalRow === 0">
      <p>换个搜索词试试！</p>
    </div>
    <div class="wellMsg" v-show="wellMsgShow">
      {{msg}}
    </div>
  </div>
</template>
<script>
  import wx from 'wx'
  import API from '@/api/httpShui'
  export default {
    data () {
      return {
        showType: true,
        keyword: '',
        wellMsgShow: '',
        msg: '',
        goodsList: [],
        sortTabs: 0,
        sortTime: 0,
        sortSales: 2,
        sortPrice: 4,
        sortStyle: null,
        state: 1,
        pageSize: 10,
        pageNumber: 1,
        totalPage: null,
        totalRow: 0
      }
    },
    components: {},
    methods: {
      // 排序
      sortFn (type, ob) {
        this.sortTabs = type
        if (ob === 0) {
          this.sortTime = this.sortStyle = 1
        }
        if (ob === 1) {
          this.sortTime = this.sortStyle = 0
        }
        if (ob === 2) {
          this.sortSales = this.sortStyle = 3
        }
        if (ob === 3) {
          this.sortSales = this.sortStyle = 2
        }
        if (ob === 4) {
          this.sortPrice = this.sortStyle = 5
        }
        if (ob === 5) {
          this.sortPrice = this.sortStyle = 4
        }
        this.setGoodsList(this.state, ob, this.pageSize, this.pageNumber, this.keyword)
      },
      switch () {
        if (this.showType ===1){

        }
      },
      // 去商品详情
      clickItem (obj) {
        let objStr = JSON.stringify(obj)
        this.$router.push({path: '/pages/home/details/details', query: {obj: objStr}})
      },
      // 搜索
      search () {
        if (this.keyword) {
          this.sortTabs = 1
          this.setGoodsList(this.state, this.sortTime, this.pageSize, this.pageNumber, this.keyword)
        } else {
          this.mySetTimeout('请输入关键词')
        }
      },
      // 设置商品列表
      async setGoodsList (state, ob, pageSize, pageNumber, keyword) {
        const data = await API.getGoods({
          state: state,
          ob: ob,
          pageSize: pageSize,
          pageNumber: pageNumber,
          keyword: keyword
        })
        if (data.code === 1) {
          console.log('商品列表', data.data)
          this.goodsList = data.data.list
          this.pageSize = data.data.pageSize
          this.pageNumber = data.data.pageNumber
          this.totalPage = data.data.totalPage
          this.totalRow = data.data.totalRow
        }
      },
      // 定时器弹窗
      mySetTimeout (msg) {
        let that = this
        that.wellMsgShow = true
        that.msg = msg
        setTimeout(function () {
          that.wellMsgShow = false
          that.msg = ''
        }, 1000)
      }
    },
    async mounted () {
      if (this.$route.query.key) {
        this.sortTabs = 1
        this.keyword = this.$route.query.key
        this.setGoodsList(this.state, this.sortTime, this.pageSize, this.pageNumber, this.$route.query.key)
      }
    }
  }
</script>
<style type="text/sass" lang="sass" scoped>
  @import '~@/assets/css/mixin'
  .clearfix:after
    content: ""
    display: block
    height: 0
    clear: both
    visibility: hidden

  .clearfix
    /* 触发 hasLayout */
    zoom: 1

  .search-box
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
  .sortTabs
    width: 100%
    height: 80px
    line-height: 80px
    background: #ffffff
    display: -webkit-flex
    display: flex
    justify-content: space-around
    .sortItem
      width: 25%
      line-height: 80px
      font-size: 28px
      color: #666666
      text-align: center
      background: url('../../assets/img/classify/fx@2x.png') no-repeat 95% center
      background-size: 16px 10px
    .sortItem.active
      color: #F6752F
    .sortItem.fx
      background: url('../../assets/img/classify/fx@2x.png') no-repeat 95% center
      background-size: 16px 10px
    .sortItem.fs
      background: url('../../assets/img/classify/fs@2x.png') no-repeat 95% center
      background-size: 16px 10px
    .sortItem.sx
      background: url('../../assets/img/classify/sx@2x.png') no-repeat 95% center
      background-size: 20px 21px
    .sortItem.menu
      background: url('../../assets/img/classify/menu.png') no-repeat center
      background-size: 27px 27px

  .goodsList
    padding: 28px 20px 0 20px
    .item
      float: left
      width: 345px
      height: 610px
      background: #ffffff
      margin-right: 20px
      margin-bottom: 20px
      .img
        width: 100%
        height: 410px
        img
          width: 100%
          height: 100%
      .text
        height: 200px
        padding: 0 10px
        .title
          color: #333333
          font-size: 28px
          font-weight: 900
          margin-top: 20px
        .intro
          color: #999999
          font-size: 24px
          margin-top: 20px
          .qh
            float: left
          .xl
            float: right
        .price-btn
          height: 50px
          line-height: 50px
          margin-top: 20px
          .price
            float: left
            color: #EE3D27
            font-size: 24px
          .btn
            float: right
            display: inline-block
            width: 130px
            height: 50px
            line-height: 50px
            background: url('../../assets/img/classify/130_50@2x.png') no-repeat
            background-size: 130px 50px
            color: #ffffff
            font-size: 24px
            text-align: center
    .item:nth-child(even)
      margin-right: 0
    .line-item
      height: 240px
      padding-left: 260px
      background: #fff
      position: relative
      margin-bottom: 15px
      .img
        width: 240px
        height: 240px
        position: absolute
        top: 0
        left: 0
        img
          width: 100%
          height: 100%
      .text
        padding: 10px 10px 0 0
        .title
          height: 68px
          line-height: 34px    
          font-size: 30px
          color: #000
          margin-bottom: 30px
          overflow : hidden
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
        .qh,.xl
          font-size: 26px
          color: #999
          line-height: 35px
        .price-btn
          heigth: 45px
          line-height: 45px
          .price
            font-size: 30px
            color: #FF0000
          .btn
            float: right
            padding: 5px 15px
            text-align: center
            font-size: 26px
            color: #fff
            background: #EE7527
            border-radius: 10px
  .msg
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    margin: auto
    width: 305px
    height: 114px
    line-height: 114px
    color: #999
    font-size: 30px
    text-align: center
    z-index: 9999
  .wellMsg
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    margin: auto
    width: 305px
    height: 114px
    line-height: 114px
    border-radius: 10px
    background: rgba(0,0,0,.8)
    color: #ffffff
    font-size: 30px
    text-align: center
    z-index: 9999
</style>
