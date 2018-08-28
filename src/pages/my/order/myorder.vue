<template>
  <div class="home">
    <div class="nav">
      <div class="list">
        <span v-for="(item,idx) in navData" :key="idx" class="item" :class="[tag === item.id && 'active']" @click="handleNav(item.id)">{{item.text}}</span>
        <div class="line" :style="{left: (tag-1)*20 + '%'}"></div>
      </div>
    </div>
    <div class="content">
      <div v-if="tag == 1">
        <obligation />
        <send />
        <receiving />
        <stocks />
        <orderMgr />
      </div>
      <div v-else-if="tag == 2">
        <obligation />
      </div>
      <div v-else-if="tag == 3">
        <send />
      </div>
      <div v-else-if="tag == 4">
        <receiving />
      </div>
      <div v-else-if="tag == 5">
        <stocks />
      </div>
    </div>
  </div>
</template>
<script>
// import wx from 'wx'
import orderMgr from '@/components/o_orderMgr'
import obligation from '@/components/o_obligation'
import send from '@/components/o_send'
import receiving from '@/components/o_receiving'
import stocks from '@/components/o_stocks'
export default {
  components: {
    orderMgr,
    obligation,
    send,
    receiving,
    stocks
  },
  data () {
    return {
      tag: 1,
      navData: [
        {
          id: 1,
          text: '全部'
        },
        {
          id: 2,
          text: '待付款'
        },
        {
          id: 3,
          text: '待发货'
        },
        {
          id: 4,
          text: '待收货'
        },
        {
          id: 5,
          text: '已完成'
        }
      ]
    }
  },
  methods: {
    handleNav (tag) {
      this.tag = tag
    },
    // toRoute(path) {
    //   this.$router.push('/pages/home/' + path)
    // }
    onShow () {
      this.mounted()
    },
    myTag () {
      const tag = this.$mp.query.tag
      this.tag = tag
    }
  },
  mounted () {
    this.myTag()
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
