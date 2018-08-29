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
      <li class="sortItem menu"></li>
    </ul>
    <div class="goodsList clearfix">
      <div class="item" v-for="(item,index) in goodsList" :key="index">
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
      <!--<div class="item">-->
        <!--<div class="img">-->
          <!--<img src="../../assets/img/classify/goods.png" alt="">-->
        <!--</div>-->
        <!--<div class="text">-->
          <!--<p class="title">标题</p>-->
          <!--<p class="intro clearfix">-->
            <!--<span class="qh">期货：现货</span>-->
            <!--<span class="xl">销量：200</span>-->
          <!--</p>-->
          <!--<p class="price-btn">-->
            <!--<span class="price">批货价：￥55</span>-->
            <!--<span class="btn">立即采购</span>-->
          <!--</p>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  import wx from 'wx'
  import API from '@/api/httpShui'
  export default {
    data () {
      return {
        isSearch: '',
        keyword: '',
        goodsList: [],
        sortTabs: 0,
        sortTime: 0,
        sortSales: 2,
        sortPrice: 4,
        sortStyle: null,
        state: 1,
        pageSize: 10,
        pageNumber: 1,
        totalPage: null
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
        if (this.isSearch) {
          this.setGoodsList('', this.state, ob, this.pageSize, this.pageNumber, this.keyword)
        } else {
          this.setGoodsList(this.$route.query.id, this.state, ob, this.pageSize, this.pageNumber, '')
        }
      },
      clickItem (obj) {
        let objStr = JSON.stringify(obj)
        this.$router.push({path: '/pages/home/details/details', query: {obj: objStr}})
      },
      // 搜索
      search () {
        if (this.keyword) {
          this.isSearch = true
          // console.log(this.keyword)
          this.setGoodsList('', this.state, this.sortTime, this.pageSize, this.pageNumber, this.keyword)
        }
      },
      // 设置商品列表
      async setGoodsList (labelId, state, ob, pageSize, pageNumber, keyword) {
        const data = await API.getGoods({
          labelId: labelId,
          state: state,
          ob: ob,
          pageSize: pageSize,
          pageNumber: pageNumber,
          keyword: keyword
        })
        if (data.code === 1) {
          // console.log('商品列表', data.data)
          this.goodsList = data.data.list
          this.pageSize = data.data.pageSize
          this.pageNumber = data.data.pageNumber
          this.totalPage = data.data.totalPage
        }
      }
    },
    async mounted () {
      this.sortTabs = 1
      if (this.$route.query.id) {
        this.isSearch = false
        this.setGoodsList(this.$route.query.id, this.state, this.sortTime, this.pageSize, this.pageNumber, '')
      }
      if (this.$route.query.key) {
        this.isSearch = true
        this.keyword = this.$route.query.key
        this.setGoodsList('', this.state, this.sortTime, this.pageSize, this.pageNumber, this.$route.query.key)
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
</style>
