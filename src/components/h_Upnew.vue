<template>
  <div class="nav">
    <div class="title">
      <span class="title_1">NEW SHOW</span>
      <span class="title_2">今日上新，领先一步</span>
      <span class="xian"></span>
      <span class="xian_1"></span>
    </div>
    <div class="content">
      <div class="kuang" v-for="(item,index) in List" :key="index">
        <div class="left">
          <img v-if="item.image" class="img" :src="item.image">
          <img v-else class="img" src="../assets/img/classify/goods.png">
        </div>
        <div class="right">
          <p class="title">{{item.name}}</p>
          <p class="Goods">期货:{{item.delivery}}</p>
          <p class="volume">销量:{{item.sellCount}}</p>
          <p class="money">￥{{item.sellPrice}}</p>
          <span class="btn" @click="clickItem(item)">立即采购</span>
        </div>
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
      // upnewList: [
      //   {
      //     title: '标题标题标题标题标题标题标题标标题标题',
      //     img:
      //       'http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg',
      //     Goods: '现货',
      //     volume: '123',
      //     money: '55'
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
        labelId: 1,
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
  background: #fff
  margin-top: 50px
  padding-bottom: 25px
  border-bottom: 1px solid #999
  .title
    position: relative
    top: 0px
    left: 0px
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
      background: #999;
      top: 95px;
      left: 18%;
    .xian_1
      position: absolute
      width: 98px
      height: 4px
      background: #999;
      top: 95px;
      left: 66%;
  .content
    margin-top: 20px
    .kuang
      display: flex
      margin-bottom: 20px
      .left
        flex: 1
        padding-left: 20px
        .img
          width: 240px
          height: 240px
          border-radius: 8px
      .right
        flex: 2
        margin-top: -8px
        margin-left: 20px
        font-size: 26px
        color: #999
        position: relative
        .title
          width: 448px
          font-size: 30px
          color: #000000
          +moreLine(2)
          margin-bottom: 33px;
        .money
          color: #FF0000
          font-size: 30px
        .btn
          display: inline-block
          width: 130px
          height: 60px
          font-size: 26px
          color: #fff
          background: #EE7527
          text-align: center
          line-height: 60px
          border-radius: 8px
          left: 310px
          position: absolute;
          top: 197px;
  .More
    width: 600px
    height: 70px
    border-radius: 4px
    display: flex
    border: 1px solid #999
    margin: 26px 0 0 65px
    // padding: 29px 22px
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
