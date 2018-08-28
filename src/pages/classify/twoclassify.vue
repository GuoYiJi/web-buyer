<template>
  <div class="wrapper">
    <div class="searchBox clearfix">
      <input class="search" type="text"/>
      <span class="close">取消</span>
    </div>
    <ul class="sortTabs">
      <li class="sortItem active">综合</li>
      <li class="sortItem fx">销量</li>
      <li class="sortItem fs">价格</li>
      <li class="sortItem sx">筛选</li>
      <li class="sortItem menu"></li>
    </ul>
    <div class="goodsList clearfix">
      <div class="item">
        <div class="img">
          <img src="../../assets/img/classify/goods.png" alt="">
        </div>
        <div class="text">
          <p class="title">标题</p>
          <p class="intro clearfix">
            <span class="qh">期货：现货</span>
            <span class="xl">销量：200</span>
          </p>
          <p class="price-btn">
            <span class="price">批货价：￥55</span>
            <span class="btn">立即采购</span>
          </p>
        </div>
      </div>
      <div class="item">
        <div class="img">
          <img src="../../assets/img/classify/goods.png" alt="">
        </div>
        <div class="text">
          <p class="title">标题</p>
          <p class="intro clearfix">
            <span class="qh">期货：现货</span>
            <span class="xl">销量：200</span>
          </p>
          <p class="price-btn">
            <span class="price">批货价：￥55</span>
            <span class="btn">立即采购</span>
          </p>
        </div>
      </div>
      <div class="item">
        <div class="img">
          <img src="../../assets/img/classify/goods.png" alt="">
        </div>
        <div class="text">
          <p class="title">标题</p>
          <p class="intro clearfix">
            <span class="qh">期货：现货</span>
            <span class="xl">销量：200</span>
          </p>
          <p class="price-btn">
            <span class="price">批货价：￥55</span>
            <span class="btn">立即采购</span>
          </p>
        </div>
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
        // id: this.$route.query.id
      }
    },
    components: {},
    methods: {},
    async mounted () {
      // console.log(this.$route.query.id)
      const data = await API.getGoods({labelId: this.$route.query.id})
      console.log(data)
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

  .searchBox
    width: 100%
    height: 60px
    line-height: 60px
    padding: 16px 0
    background: #ffffff
    .search
      float: left
      width: 616px
      height: 60px
      border-radius: 5px
      margin-left: 34px
      // padding-left: 64px
      background: #f5f5f5 url('../../assets/img/home/search.png') no-repeat 26px center
      background-size: 36px 38px
    .close
      float: left
      height: 60px
      text-align: center
      margin-left: 21px
      font-size: 28px
      color: #333333
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
    padding: 28px 14px 0 32px
    .item
      float: left
      width: 330px
      height: 610px
      background: #ffffff
      margin-right: 19px
      margin-bottom: 19px
      .img
        width: 100%
        height: 410px
        img
          width: 100%
          height: 100%
      .text
        height: 200px
        padding: 0 20px
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
</style>
