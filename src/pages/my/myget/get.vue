<template>
<!-- 我的拼团  首页 -->
<div class="home">
  <div class="nav">
    <div class="list">
      <span v-for="(item,idx) in navData" :key="idx" class="item" :class="[tag === item.id && 'active']" @click="handleNav(item.id)">{{item.text}}</span>
      <div class="line" :style="{left: (tag-1)*16.6 + '%'}"></div>
    </div>
  </div>
  <div class="content">
    <div v-if="tag == 1">
      <fasiAll :ordersValueList="ordersValueList" :skuCodeList="skuCodeList"/>
    </div>
    <div v-else-if="tag == 2">
      <fasiAll :ordersValueList="ordersValueList" />
    </div>
    <div v-else-if="tag == 3">
      <fasiAll :ordersValueList="ordersValueList" />
    </div>
    <div v-else-if="tag == 4">
      <fasiAll :ordersValueList="ordersValueList" :skuCodeList="skuCodeList"/>
    </div>
    <div v-else-if="tag == 5">
      <fasiAll :ordersValueList="ordersValueList" />
    </div>
    <div v-else-if="tag == 6">
      <fasiAll :ordersValueList="ordersValueList" />
    </div>
  </div>
</div>
</template>
<script>
import wx from 'wx'
import fasiAll from '@/components/p_fasiAll'
import api from '@/api/httpJchan'
export default {
  components: {
    fasiAll
  },
  data () {
    return {
      tag: 1,
      skuCodeList: [],
      navData: [{
        id: 1,
        state: null,
        text: '全部'
      },
      {
        id: 2,
        state: 1,
        text: '待付款'
      },
      {
        id: 3,
        state: 9,
        text: '拼团中'
      },
      {
        id: 4,
        state: 5,
        text: '待发货'
      },
      {
        id: 5,
        state: 6,
        text: '待收货'
      },
      {
        id: 6,
        state: 7,
        text: '已完成'
      }
      ],
      ordersValueList: []
    }
  },
  methods: {
    handleNav (tag) {
      console.log(tag)
      if (tag) {
        this.tag = tag
      }
      this.getOrderList(this.navData[this.tag - 1].state)
    },
    // 获取相应拼单订单
    async getOrderList (state) {
      const response = await api.myorder({
        pageNumber: 1,
        pageSize: 20,
        state: state,
        isPing: 1
      })
      this.ordersValueList = response.data.list
      this.ordersValueList.forEach((Pitem, Pindex) => {
        this.skuCodeList[Pindex] = []
        Pitem.goodsList[0].skuList.forEach((Citem, Cindex) => {
          console.log(Citem, Pindex, Cindex)
          let color = Citem.skuCode.split(',')[0]
          let size = Citem.skuCode.split(',')[1]
          this.skuCodeList[Pindex][Cindex] = [color, size, Citem.num, Citem.num - Citem.remainNum, Citem.remainNum]
        })
      })
      console.log(this.skuCodeList)
    }
  },
  mounted () {
    this.getOrderList(null)
  }
}
</script>
<style lang="sass" scoped>
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
      flex: 0 0 16.6%
      line-height: 70px
      box-sizing: border-box
.line
  display: block
  height: 1px
  width: 10%
  border-radius: 8px
  background-color: #F67C2F
  position: absolute
  bottom: 23px
  margin: 0 3.3%
  transition: left .3s ease-in

</style>
