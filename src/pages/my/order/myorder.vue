<template>
  <div class="home">
    <div class="nav">
      <div class="list">
        <span v-for="(item,idx) in navData" :key="idx" class="item" :class="[tag === item.id && 'active']" @click="refreshOrder(item.id)">{{item.text}}</span>
        <div class="line" :style="{left: (tag-1)*20 + '%'}"></div>
      </div>
    </div>
    <div class="content">
        <orderItem v-for="(item,idx) in orderList" :key="idx" :item="item" @refreshOrder="refreshOrder" :shopName="shopName"></orderItem>
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import orderItem from '@/components/o_orderItem'
import API from '@/api/httpShui'
export default {
  components: {
    orderItem
  },
  data () {
    return {
      tag: null,
      orderList : [],
      shopName:'',
      navData: [
        {
          id: 1,
          state : 0,
          text: '全部'
        },
        {
          id: 2,
          state : 1,
          text: '待付款'
        },
        {
          id: 3,
          state : 5,
          text: '待发货'
        },
        {
          id: 4,
          state : 6,
          text: '待收货'
        },
        {
          id: 5,
          state : 7,
          text: '已完成'
        }
      ]
    }
  },
  methods: {
    refreshOrder (tag) {
      if(tag){
        this.tag = tag;
      }
      this.getOrder(this.navData[this.tag-1].state);
    },
    // toRoute(path) {
    //   this.$router.push('/pages/home/' + path)
    // }
    onShow () {
      this.mounted()
    },
    myTag () {
      let type = this.$route.query.tag
      this.tag = type
    },
    // 获取订单
    async getOrder (state) {
      // debugger
      let param = {
        isPing: 0,
        pageSize : 10
      }
      if(state){
        param.state = state;
      }
      const Myorder = await API.myOrder(param)
      console.log( Myorder)
      this.orderList = Myorder.data.list
      // 更改规格显示
      for (let i = 0; i < this.orderList.length; i++) {
        for (let j = 0; j < this.orderList[i].goodsList.length; j++) {
          for (let g = 0; g < this.orderList[i].goodsList[j].skuList.length; g++) {
            let skuCode = this.orderList[i].goodsList[j].skuList[g].skuCode
            this.orderList[i].goodsList[j].skuList[g].skuCode = skuCode.replace(/,/g, ':')
          }
        }
      }
    }
  },
  mounted () {
    let type = this.$route.query.tag
    // this.tag = type;
    this.refreshOrder(type);
    let that = this
    wx.getStorage({
      key: 'shopName',
      success: function (res) {
        that.shopName = res.data
      }
    })
  }
}
</script>
<style type="text/sass" lang='sass' scoped>
@import '~@/assets/css/mixin'
.content
  // height: 60%
.home
  height: 100%
.search-box
  padding: 30px 0
  background: #fff
  .input
    display: flex
    padding: 0px 35px
    p
      width: 10%
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

.active
  color: #F67C2F
  // font-weight: 600
.nav
  overflow: hidden
  text-align: center
  background: #f5f5f5
  height: 70px
  width: 100%
  padding-top: 1px
  box-shadow: 0px 4px 6px 0px rgba(0, 69, 162, 0.06)
  .list
    font-size: 26px
    color: #000
    background: #f5f5f5
    overflow-y: hidden
    overflow-x: auto
    height: 90px
    position: relative
    display: flex
    width: 100%
    .item
      flex: 0 0 20%
      line-height: 70px
      box-sizing: border-box
.line
  display: block
  height: 1px
  width: 8%
  border-radius: 8px
  background-color: #F67C2F
  position: absolute
  bottom: 23px
  margin: 0 6%
  transition: left .3s ease-in

</style>
