<template>
  <div class="nav">
    <div class="kong" v-if="(kong == 1)">
      <img class="k_img" src="../../assets/img/shopping/kgwc.png">
      <p class="k_text">你的购物车还没有商品~</p>
      <span class="k_btn">去首页逛逛吧</span>
    </div>
    <div class="content" v-if="(kong == 0)">
      <div class="head">
        <i class="xz" :class="{active : checkAll}" @click="clickCheckAll()"></i>
        <span class="h1_text" @click="clickCheckAll()">全选</span>
        <i class="sc" @click="delBtn()"></i>
      </div>
      <div class="kuang">
        <!--<div class="k_head" @click="xz1()">-->
          <!--<i class="kh_img" v-if="(xz == 0)"></i>-->
          <!--<i class="kh_wimg" v-if="(xz == 1)"></i>-->
          <!--<div class="kh_text">店铺名称</div>-->
          <!--<i class="kh_img1"></i>-->
        <!--</div>-->
        <div class="k_content" v-for="(item,index) in cardList" :key="index">
          <div class="item_1" @click="clickCheck(item.id,item.skuId,item.num,index)">
            <i class="kc_xz" :class="{active : item.check}"></i>
          </div>
          <div class="item_2">
            <img v-if="item.image" class="kc_img" :src="item.image">
            <img v-else class="kc_img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
          </div>
          <div class="item_3">
            <p class="i_title" v-text="item.name"></p>
            <p class="uniform ">{{item.skuCode}}</p>
            <p class="money">¥{{item.sellPrice}}</p>
            <span class="quantity">x{{item.num}}</span>
            <span class="btn" @click="popup1()">编辑</span>
          </div>
        </div>
      </div>
      <div class="settlement">
        <span class="s_btn" v-if="showBtn" @click="Buy()">结算({{count}})</span>
        <span class="s_del" v-if="!showBtn" @click="toOpen('visible2')">删除({{count}})</span>
      </div>
      <i-modal :visible="visible2" @ok="toClose('visible2')" @cancel="toClose('visible2')">
        <div class="m_tips">确定删除商品</div>
      </i-modal>
    </div>
    <!-- 弹窗 -->
    <div class="popup" v-if="(popup == 1)">
      <div class="kuang_1">
        <img class="pop_img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <p class="pop_money">￥39.9</p>
        <p class="pop_title">商品标题商品白体商品标题</p>
        <i class="gb" @click="popup1()"></i>
      </div>
      <div class="kuang_2">
        <p class="k2_title">选择颜色和尺码</p>
        <div class="k2_btnk">
          <span class="k2_btn">绿色
            <span class="k2_dian">5</span>
          </span>
          <span class="k2_btn">绿色
            <span class="k2_dian">99</span>
          </span>
          <span class="k2_btn">绿色</span>
        </div>
      </div>
      <div class="kuang_3">
        <ul class="s_item_box box1">
          <li class="s_item">尺码</li>
          <li class="s_item">购买数量</li>
        </ul>
        <ul class="s_item_box">
          <li class="s_item">S</li>
          <li class="s_item">
            <i-input-number :value="value1" min="0" max="100" @change="handleChange1" />
          </li>
        </ul>
        <ul class="s_item_box">
          <li class="s_item">M</li>
          <li class="s_item">
            <i-input-number :value="value2" min="0" max="100" @change="handleChange2" />
          </li>
        </ul>
      </div>
      <div class="kuang_4">
        <p class="k4_title">已选</p>
        <p class="k4_text">绿色：S/1件；M/1件</p>
        <p class="k4_text">红色：S/1件；M/1件</p>
      </div>
      <span class="btn" @click="popup1()">确定</span>
    </div>
    <span class="dian">3</span>
    <div class="footer">
      <footers :tag="3" />
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import API from '@/api/httpShui'
import footers from '@/commond/footer'
export default {
  components: {
    footers
  },
  data () {
    return {
      kong: '',
      showBtn: true,
      count: 0,
      popup: 0,
      value1: 1,
      value2: 1,
      xz: 0,
      del: 1,
      visible2: false,
      cardList: [],
      checkAll: false,
      check: false,
      selectArr: []
    }
  },
  methods: {
    popup1 () {
      if (this.popup === 0) {
        this.popup = 1
      } else if (this.popup === 1) {
        this.popup = 0
      }
    },
    // 删除
    delBtn () {
      this.count = this.selectArr.length
      if (this.showBtn) {
        this.showBtn = false
      } else {
        this.showBtn = true
      }
    },
    // 单选
    clickCheck (id, skuId, num, index) {
      let that = this
      if (that.cardList[index].check) {
        that.count--
        that.cardList[index].check = false
        for (let i = 0; i < that.selectArr.length; i++) {
          if (that.selectArr[i].id === id) {
            that.selectArr.splice(i, 1)
          }
        }
        // console.log('0', that.cardList[index])
      } else {
        that.count++
        that.cardList[index].check = true
        that.selectArr.push({id: id, skuId: skuId, num: num})
        // console.log('1', this.cardList[index])
      }
    },
    // 全选
    clickCheckAll () {
      let that = this
      that.selectArr = []
      if (that.checkAll) {
        that.checkAll = false
        that.cardList.forEach(function (item) {
          item.check = false
        })
        that.count = 0
      } else {
        that.checkAll = true
        that.cardList.forEach(function (item) {
          item.check = true
          that.selectArr.push({id: item.id, skuId: item.skuId, num: item.num})
        })
        that.count = that.selectArr.length
      }
      console.log(that.selectArr)
    },
    toOpen (name) {
      this[name] = true
    },
    // 删除购物车
    async toClose (name) {
      let that = this
      let idStr = []
      that.selectArr.forEach(function (item) {
        idStr.push(item.id)
      })
      console.log(idStr.join(','))
      const data = await API.deleteCard({ids: idStr.join(',')})
      if (data.code === 1) {
        this[name] = false
        that.getCard()
      }
    },
    // 去支付
    Buy () {
      if (this.selectArr.length > 0) {
        let goods = []
        let totalPrice = 0
        let totalNum = 0
        // 获取选中的商品信息,并计算价格数量
        for (let i = 0; i < this.selectArr.length; i++) {
          for (let j = 0; j < this.cardList.length; j++) {
            if (this.selectArr[i].id === this.cardList[j].id) {
              let price = this.cardList[j].sellPrice
              let num = this.cardList[j].num
              totalPrice += Math.floor((price * num) * 100) / 100
              totalNum += num
              goods.push(this.cardList[j])
            }
          }
        }
        console.log(goods)
        let dataObj = {
          goods: goods,
          skuObj: this.selectArr,
          totalPrice: totalPrice,
          totalNum: totalNum
        }
        console.log(dataObj)
        this.$router.push({path: '/pages/shopping/order/order', query: {cart: JSON.stringify(dataObj)}})
      }
    },
    async getCard () {
      let that = this
      const data = await API.getCardList()
      if (data.code === 1) {
        console.log('购物车列表', data)
        that.cardList = data.data
        console.log(that.cardList.length)
        if (that.cardList.length === 0) {
          that.kong = 1
        } else {
          that.kong = 0
          for (let i = 0; i < that.cardList.length; i++) {
            that.cardList[i]['check'] = false
          }
        }
      }
    }
  },
  async mounted () {
    this.getCard()
  },
  watch: {
    // 全选数组监听
    selectArr: {
      handler () {
        let cardListlen = this.cardList.length
        let selectArrlen = this.selectArr.length
        if (selectArrlen === cardListlen) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
      },
      deep: true
    }
  }
}
</script>
<style type="text/sass" lang="sass" scoped>
@import '~@/assets/css/mixin'
.m_tips
  height: 80px
  padding: 20px
.nav
  width: 100%
  height: 100%
  .kong
    position: relative
    width: 100%
    height: 100%
    background: #fff
    .k_img
      position: absolute
      width: 264px
      height: 258px
      top: 30%
      left: 30%
    .k_text
      position: absolute
      top: 54%
      left: 29%
      font-size: 28px
      color: #999
    .k_btn
      position: absolute
      top: 60%
      left: 33.5%
      display: inline-block
      font-size: 28px
      color: #EE7527
      width: 220px
      height: 60px
      border-radius: 8px
      text-align: center
      line-height: 60px
      border: 1px solid #EE7527
  .content
    margin: 0 20px
    .head
      position: relative
      height: 92px
      width: 711px
      .xz
        position: absolute
        display: inline-block
        width: 44px
        height: 44px
        +bg-img('shopping/wxz.png')
        top: 24px
        left: 20px
      .xz.active
        +bg-img('shopping/xz.png')
        width: 44px
        height: 44px
      .h1_text
        position: absolute
        font-size: 28px
        color: #999
        display: inline-block
        top: 24px
        left: 75px
      .sc
        position: absolute
        +bg-img('shopping/sc.png')
        width: 38px
        height: 42px
        top: 24px
        right: 20px
    .kuang
      width: 711px
      border-radius: 10px
      background: #fff
      .k_head
        height: 82px
        line-height: 82px
        .kh_img
          display: inline-block
          width: 44px
          height: 44px
          +bg-img('shopping/xz.png')
          vertical-align: middle
          margin-left: 24px
        .kh_wimg
          display: inline-block
          width: 44px
          height: 44px
          +bg-img('shopping/wxz.png')
          vertical-align: middle
          margin-left: 24px
        .kh_text
          font-size: 28px
          color: #999
          display: inline-block
          vertical-align: middle
          margin-left: 18px
        .kh_img1
          +bg-img('home/shanJiao.png')
          display: inline-block
          width: 17px
          height: 28px
          vertical-align: middle
          margin-left: 13px
      .k_content
        display: flex
        padding: 20px 0
        border-bottom: 1px solid #F5F5F5
        .item_1
          margin: 70px 20px
          .kc_xz
            width: 44px
            height: 44px
            +bg-img('shopping/wxz.png')
          .kc_xz.active
            width: 44px
            height: 44px
            +bg-img('shopping/xz.png')
        .item_2
          flex: 1
        .item_3
          flex: 2
          position: relative
          .i_title
            padding-left: 20px
            font-size: 26px
            color: #333
            +moreLine(2)
          .uniform
            padding-left: 20px
            font-size: 24px
            color: #999
          .money
            padding-left: 20px
            font-size: 32px
            color: #FF3434
          .quantity
            position: absolute
            font-size: 24px
            color: #333
            top: 30%
            right: 30px
          .btn
            position: absolute
            font-size: 20px
            color: #999
            display: inline-block
            width: 80px
            height: 40px
            border-radius: 20px
            border: 1px solid #999
            bottom: 0px
            right: 30px
            text-align: center
            line-height: 40px
    .settlement
      width: 711px
      height: 98px
      background: #fff
      position: relative
      border-radius: 10px
      margin-top: 31px
      .s_btn
        background: #EE7527
        display: inline-block
        width: 160px
        height: 64px
        border-radius: 40px
        text-align: center
        line-height: 64px
        color: #fff
        position: absolute
        top: 15px
        right: 30rpx
      .s_del
        background: #EE7527
        display: inline-block
        width: 160px
        height: 64px
        border-radius: 40px
        text-align: center
        line-height: 64px
        color: #fff
        position: absolute
        top: 15px
        right: 30rpx
  .dian
    position: fixed
    display: inline-block
    background: red
    color: #fff
    border-radius: 50px
    text-align: center
    line-height: 32px
    width: 32px
    height: 32px
    font-size: 24px
    bottom: 6%
    right: 33%
    z-index: 99999999

.popup
    width: 100%
    position: fixed
    height: 957px
    bottom: 0px
    left: 0px
    background: #fff
    padding-bottom: 30px
    .kuang_1
      height: 170px
      position: relative
      .pop_img
        width: 190px
        height: 190px
        padding: 10px
        background: #fff
        border-radius: 10px
        position: absolute
        top: -20px
        left: 30px
      .pop_money
        position: absolute
        font-size: 34px
        color: #FF0101
        top: 45px
        left: 260px
      .pop_title
        position: absolute
        font-size: 30px
        color: #000
        top: 90px
        left: 260px
        +moreLine(1)
      .gb
        +bg-img('home/gb.png')
        width: 44px
        height: 44px
        position: absolute
        top: 20px
        right: 24px
    .kuang_2
      margin-top: 35px
      height: 120px
      padding-left: 24px
      .k2_title
        font-size: 24px
        color: #000
        margin-bottom: 30px
      .k2_btnk
        .k2_btn
          display: inline-block
          width: 140px
          height: 60px
          background: #EAEAEA
          margin-right: 30px
          border-radius: 10px
          text-align: center
          line-height: 60px
          position: relative
          .k2_dian
            display: inline-block
            width: 34px
            height: 34px
            background: red
            color: #fff
            border-radius: 50px
            position: absolute
            top: -5px
            right: -5px
            font-size: 20px
            line-height: 34px
            text-align: center
    .kuang_3
      // height: 230px
      padding-bottom: 20px
      border-bottom: 1px solid #EAEAEA
      .s_item_box
        display: flex
        text-align: center
        line-height: 60px
        margin-top: 30px
      .box1
        height: 60px
        background: #EAEAEA
      .s_item
        flex: 1
    .kuang_4
      .k4_title
        padding: 29px 0 0 25px
        font-size: 28px
        color: #000
        margin-bottom: 20px
      .k4_text
        font-size: 26px
        color: #666
        padding: 19px 0 0 25px
    .btn
      position: absolute
      bottom: 10px
      left: 10%
      width: 600px
      height: 90px
      text-align: center
      line-height: 90px
      background: #F67C2F
      color: #fff
      border-radius: 8px
      font-size: 32px
</style>
