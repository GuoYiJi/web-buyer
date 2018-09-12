<template>
  <div class="nav">
    <div class="title">
      <span class="title_1">NEW SHOW</span>
      <span class="title_2"> 火爆热卖，源于一派 </span>
      <span class="xian"></span>
      <span class="xian_1"></span>
    </div>
    <div class="content">
      <div class="kuang">
        <div :class="{left : index == 0, right : index > 0}" v-for="(item, index) in List" :key="index">
          <img v-if="item.image" class="img" :src="item.image">
          <img v-else class="img" src="../assets/img/classify/goods.png">
          <p class="title">{{item.name}}</p>
          <p class="volume">货期:{{item.delivery}}丨销量:{{item.sellCount}}</p>
          <p class="money">批发价:{{item.sellPrice}}</p>
          <span class="btn" @click="clickItem(item)">立即采购</span>
        </div>
      </div>
    </div>
    <div class="More" v-if="!lastPage">
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
      List: [],
      page: 1,
      totalPage: 0,
      lastPage: ''
    }
  },
  methods: {
    async goodsList (page) {
      const data = await API.getGoods({
        labelId: 2,
        state: 1,
        pageSize: 5,
        pageNumber: page
      })
      this.lastPage = data.data.lastPage
      console.log('火爆热卖', data)
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
<style type='text/sass' lang="sass" scoped>
@import '~@/assets/css/mixin'
.nav
  margin-top: 50px
  padding-bottom: 25px
  border-bottom: 1px solid #ccc
  background: #EAEAEA
  .title
    position: relative
    top: 0
    left: 0
    height: 120px
    margin-bottom: 50px
    background: #fff
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
      left: 68%
  .content
    margin-top: 20px
    padding: 10px 22px
    .kuang
      column-count: 2
      overflow: hidden
      .left
        width: 344px
        height: 568px
        display: inline-block
        margin-top: 20px
        position: relative
        border-radius: 8px
        background: #fff
        .img
          width: 344px
          height: 380px
          border-radius: 8px 8px 0 0
        .title
          +moreLine(1)
          font-size: 30px
          color: #000
          margin-bottom: -40px
          padding-left: 15px
        .volume
          font-size: 26px
          color: #999
          padding-left: 15px
        .money
          font-size: 28px
          color: #EE3E27
          margin-top: 25px
          padding-left: 15px
        .btn
          position: absolute
          bottom: 15px
          right: 20px
          display: inline-block
          background: #EE7527
          border-radius: 30px
          font-size: 22px
          color: #fff
          padding: 10px
      .right
        width: 344px
        height: 646px
        display: inline-block
        margin-top: 20px
        position: relative
        border-radius: 8px
        background: #fff
        float: right
        .img
          width: 344px
          height: 458px
          border-radius: 8px 8px 0 0
        .title
          +moreLine(1)
          font-size: 30px
          color: #000
          margin-bottom: -40px
          padding-left: 15px
        .volume
          font-size: 26px
          color: #999
          padding-left: 15px
        .money
          font-size: 28px
          color: #EE3E27
          margin-top: 25px
          padding-left: 15px
        .btn
          position: absolute
          bottom: 15px
          right: 20px
          display: inline-block
          background: #EE7527
          border-radius: 30px
          font-size: 22px
          color: #fff
          padding: 10px
  .More
    width: 600px
    height: 70px
    border-radius: 4px
    display: flex
    border: 1px solid #999
    margin: 0 auto
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
