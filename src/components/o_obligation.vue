<template>
  <!-- 全部订单-待付款 -->
  <div class="home">
    <div class="kuang" v-for="(item,index) in myorderList" :key="index">
      <div class="head">
        <span class="h-title">菲斯的小店</span>
        <span class="h-text">{{item.state==1 ? '待付款' : ''}}</span>
      </div>
      <div class="nav">
        <img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <i class="n-icon"></i>
      </div>
      <div class="below">
        <div class="total">
          <p class="t-left">共
            <span class="piece">{{item.num}}</span> 件商品</p>
          <p class="t-freight">（含运费￥{{item.freight}}）</p>
          <p class="t-right">合计:
            <span class="money">￥{{item.count}}</span>
          </p>
        </div>
        <div class="btn">
          <span class="b-xq" @click="bxq(item.id,1)">查看详情</span>
          <span class="b-sc" @click="toOpen('visible2')">取消订单</span>
          <span class="b-qr" @click="toOpen('visible1')">确认付款</span>
        </div>
        <i-modal :visible="visible2" @ok="toClose('visible2')" @cancel="toClose('visible2')">
          <div class="m_tips">确定取消订单</div>
        </i-modal>
        <i-modal :visible="visible1" @ok="toClose('visible1')" @cancel="toClose('visible1')">
          <div class="m_tips">确认付款</div>
        </i-modal>
      </div>
    </div>
    <!-- <div class="kuang">
      <div class="head">
        <span class="h-title">菲斯的小店</span>
        <span class="h-text">待付款</span>
      </div>
      <div class="nav">
        <img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <img class="n-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <i class="n-icon"></i>
      </div>
      <div class="below">
        <div class="total">
          <p class="t-left">共
            <span class="piece">3</span> 件商品</p>
          <p class="t-freight">（含运费￥10.00）</p>
          <p class="t-right">合计:
            <span class="money">￥154.00</span>
          </p>
        </div>
        <div class="btn">
          <span class="b-xq" @click="bxq(1)">查看详情</span>
          <span class="b-sc" @click="toOpen('visible2')">取消订单</span>
          <span class="b-qr" @click="toOpen('visible1')">确认付款</span>
        </div>
        <i-modal :visible="visible2" @ok="toClose('visible2')" @cancel="toClose('visible2')">
          <div class="m_tips">确定取消订单</div>
        </i-modal>
        <i-modal :visible="visible1" @ok="toClose('visible1')" @cancel="toClose('visible1')">
          <div class="m_tips">确认付款</div>
        </i-modal>
      </div>
    </div> -->
  </div>
</template>
<script>
import wx from 'wx'
import API from '@/api/httpJchan'
export default {
  components: {},
  data () {
    return {
      visible1: false,
      visible2: false,
      myorderList: [],
      id: ''
    }
  },
  methods: {
    bxq (id, xq) {
      // console.log(id)
      // console.log(xq)
      this.$router.push({
        path: '/pages/my/orderDetails/obligation',
        query: { id: id, xq: xq }
      })
    },
    toOpen (name) {
      this[name] = true
    },
    toClose (name) {
      this[name] = false
    }
  },
  // 获取后台数据
  async mounted () {
    const Myorder = await API.myorder({state: 1, isPing: 0})
    console.log(Myorder)
    this.myorderList = Myorder.data.list
  }
}
</script>
<style type="text/sass" lang="sass" scoped>
@import '~@/assets/css/mixin'
.head
  display: flex
  font-size: 28px
  margin-top: 20px
  padding: 0 34px
  background: #fff
  height: 82px
  line-height: 82px
  .h-title
    flex: 5
    color: #000
  .h-text
    flex: 1
    color: #F67C2F
.nav
  height: 202px
  padding: 0 32px
  line-height: 202px
  position: relative
  .n-img
    width: 160px
    height: 160px
    margin-right: 20px
    vertical-align: middle
    display: inline-block
  .n-icon
    width: 14px
    height: 25px
    +bg-img("home/shanJiao.png")
    vertical-align: middle
    display: inline-block
    position: absolute
    right: 34px
    top: 45%
.below
  background: #fff
  .total
    height: 82px
    margin-left: 32px
    overflow: hidden
    border-bottom: 1px solid #E5E5E5
    p
      font-size: 24px
      color: #000
    .t-left
      float: left
      padding-top: 20px
    .t-right
      float: right
      padding-top: 15px
      padding-right: 10px
    .t-freight
      float: right
      padding-top: 20px
      font-size: 24px
      color: #666
    .piece
      font-size: 28px
      color: #F67C2F
    .money
      font-size: 32px
      color: #FF0000
  .btn
    height: 108px
    line-height: 108px
    padding-left: 210px
    background: #fff
    .b-xq
      display: inline-block
      width: 158px
      height: 58px
      border: 1px solid #BFBFBF
      vertical-align: middle
      line-height: 60px
      text-align: center
      margin-right: 20px
    .b-sc
      display: inline-block
      width: 158px
      height: 58px
      border: 1px solid #BFBFBF
      vertical-align: middle
      line-height: 60px
      text-align: center
      margin-right: 20px
    .b-qr
      display: inline-block
      width: 160px
      height: 60px
      background: #F67C2F
      vertical-align: middle
      line-height: 60px
      text-align: center
      margin-right: 20px
      color: #fff
</style>
