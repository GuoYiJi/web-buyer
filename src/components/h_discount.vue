<template>
  <div class="nav">
    <div class="title">
      <span class="title_1">NEW SHOW</span>
      <span class="title_2">特价折扣，领先一步</span>
      <span class="xian"></span>
      <span class="xian_1"></span>
    </div>
    <div class="content">
      <div class="kuang" v-for="(item,index) in List" :key="index">
        <img v-if="item.image" class="img" :src="item.image">
        <img v-else class="img" src="../assets/img/classify/goods.png">
        <p class="text">{{item.name}}</p>
        <p class="Goods">期货:{{item.delivery}}丨销量:{{item.sellCount}}</p>
        <p class="money">
          <span class="money_1">￥{{item.sellPrice}}</span>
          <!--<s class="money_2">￥{{item.money_1}}</s>-->
        </p>
        <i class="gwc" @click="clickItem(item)"></i>
      </div>
    </div>
    <div class="More">
      <span class="More_text" @click="getMore()">查看更多</span>
      <i class="img"></i>
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import API from '@/api/httpShui'
export default {
  components: {},
  data () {
    return {
      // discountLest: [
      //   {
      //     img:
      //       'http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg',
      //     title: '标题标题标题标题标题…',
      //     xh: '现货',
      //     xl: '123',
      //     money: 55,
      //     money_1: 500
      //   }
      // ],
      List: [],
      page: 1,
      totalPage: 0
    }
  },
  methods: {
    async goodsList (page) {
      const data = await API.getGoods({
        labelId: 3,
        state: 1,
        pageSize: 5,
        pageNumber: page
      })
      // console.log(data)
      if (data.code === 1) {
        if (this.List.length !== 0) {
          this.List.push.apply(this.List, data.data.list)
        } else {
          this.List = data.data.list
        }
        this.page = data.data.pageNumber
        this.totalPage = data.data.totalPage
        // console.log(this.List)
      }
    },
    getMore () {
      this.page++
      // console.log(this.page)
      if (this.page <= this.totalPage) {
        this.goodsList(this.page)
      }
    },
    clickItem (obj) {
      let objStr = JSON.stringify(obj)
      this.$router.push({path: '/pages/home/details/details', query: {obj: objStr}})
    }
  },
  mounted () {
    this.goodsList(this.page)
  }
}
</script>
<style type='text/sass' lang='sass' scoped>
@import '~@/assets/css/mixin'
.nav
  background: #EAEAEA
  padding-top: 50px
  padding-bottom: 25px
  border-bottom: 1px solid #999
  .title
    position: relative
    top: 0
    left: 0
    height: 100px
    margin-bottom: 90px
    .title_1
      position: absolute
      font-size: 32px
      color: #000000
      left: 37%
    .title_2
      position: absolute
      font-size: 28px
      color: #000000
      top: 75px
      left: 33%
    .xian
      position: absolute
      width: 98px
      height: 4px
      background: #999
      top: 95px
      left: 18%
    .xian_1
      position: absolute
      width: 98px
      height: 4px
      background: #999
      top: 95px
      left: 66%
  .content
    display: flex
    flex-wrap: wrap
    padding: 0 20px
    .kuang
      /*flex: 1*/
      width: 344px
      height: 644px
      background: #fff
      border-radius: 10px
      margin: 10px 5px
      position: relative
      .img
        width: 344px
        height: 458px
        border-radius: 6px 6px 0 0
      .text
        +moreLine(1)
        padding-left: 20px
      .Goods
        font-size: 26px
        padding-left: 20px
        color: #999
        margin-bottom: 10px
      .money
        padding-left: 20px
        .money_1
          font-size: 36px
          color: #FF0000
        .money_2
          display: inline-block
          text-decoration: line-through
          font-size: 24px
          color: #999
      .gwc
        position: absolute
        +bg-img('home/gwc.png')
        width: 47px
        height: 42px
        bottom: 20px
        right: 10px
  .More
    width: 600px
    height: 70px
    border-radius: 4px
    display: flex
    border: 1px solid #999
    margin: 26px 0 0 65px
    .More_text
      padding-left: 240px
      padding-top: 8px
    .img
      +bg-img('home/xiala.png')
      width: 34px
      height: 18px
      margin-top: 25px
      margin-left: 20px
</style>
