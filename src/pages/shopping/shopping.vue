<template>
  <div class="nav">
    <div class="kong" v-if="kong">
      <img class="k_img" src="../../assets/img/shopping/kgwc.png">
      <p class="k_text">你的购物车还没有商品~</p>
      <span class="k_btn" @click="toHome()">去首页逛逛吧</span>
    </div>
    <div class="content" v-if="!kong">
      <div class="head">
        <i class="xz" :class="{active : checkAll}" @click="clickCheckAll()"></i>
        <span class="h1_text" @click="clickCheckAll()">全选</span>
        <i class="sc" @click="delBtn()"></i>
      </div>
      <div class="kuang">
        <div class="k_head">
          <!--<i class="kh_img" v-if="(xz == 0)"></i>-->
          <!--<i class="kh_wimg" v-if="(xz == 1)"></i>-->
          <div class="kh_text" style="color: #EE7527;">店铺名称</div>
          <!--<i class="kh_img1"></i>-->
        </div>
        <div class="k_content" v-for="(item,index) in cardList" :key="index">
          <div class="item_1" @click="clickCheck(item.id,index)">
            <i class="kc_xz" :class="{active : item.check}"></i>
          </div>
          <div class="item_2">
            <img v-if="item.image" class="kc_img" :src="item.image">
            <img v-else class="kc_img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
          </div>
          <div class="item_3">
            <p class="i_title" v-text="item.name"></p>
            <p class="uniform" v-for="(ite,i) in item.skuCode" :key="i">{{ite}}</p>
            <p class="money">¥{{item.sellPrice}}</p>
            <span class="quantity">x{{item.totalNum}}</span>
            <span class="btn" @click="editOrder(index)">编辑</span>
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
    <div class="popup" v-if="popup">
      <div class="kuang_1">
        <img v-if="cardList[orderIndex].image" class="pop_img" src="cardList[orderIndex].image">
        <img v-else class="pop_img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <p class="pop_money">￥{{cardList[orderIndex].sellPrice}}</p>
        <p class="pop_title">{{cardList[orderIndex].name}}</p>
        <i class="gb" @click="popup=false"></i>
      </div>
      <div class="kuang_2">
        <p class="k2_title">选择颜色和尺码</p>
        <div class="k2_btnk">
          <span class="k2_btn" :class="{active : index === colorIndex }" v-for="(color,index) in cardList[orderIndex].skuAttr" :key="index" @click="selectColorSpec(index,color.colorVal)">{{color.colorVal}}
          </span>
        </div>
      </div>
      <div class="kuang_3">
        <ul class="s_item_box box1">
          <li class="s_item">尺码</li>
          <li class="s_item">购买数量</li>
        </ul>
        <ul class="s_item_box" v-for="(size, index) in cardList[orderIndex].skuAttr[colorIndex].sizeArray" :key="index">
          <li class="s_item">{{size.sizeVal}}</li>
          <li class="s_item">
            <span class="minus" @click="minus(colorIndex, index, orderIndex)"></span>
            <span class="count">{{size.newNum}}</span>
            <span class="add" @click="add(colorIndex, index, orderIndex)"></span>
          </li>
        </ul>
      </div>
      <div class="kuang_4">
        <p class="k4_title">已选</p>
        <p class="k4_text" v-for="(item,index) in cardList[orderIndex].skuAttr" :key="index">{{item.colorVal}}：<span v-for="(ite,i) in item.sizeArray" :key="i">{{ite.sizeVal}}/{{ite.newNum}}件;</span></p>
      </div>
      <span class="btn" @click="confirmEdit(orderIndex)">确定</span>
    </div>
    <!-- <span class="dian">3</span> -->
    <!--<div class="footer">-->
      <!--<footers :tag="3" />-->
    <!--</div>-->
    <!-- 提示语 -->
    <div class="wellMsg" v-show="wellMsgShow">
      {{msg}}
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import API from '@/api/httpShui'
import config from '@/config.js'
// import footers from '@/commond/footer'
export default {
  components: {},
  data () {
    return {
      sessionId: '',
      kong: false,
      showBtn: true,
      wellMsgShow: false,
      msg: '',
      count: 0,
      popup: false,
      value1: 1,
      value2: 1,
      xz: 0,
      del: 1,
      visible2: false,
      checkAll: false,
      check: false,
      cardList: [],
      selectArr: [],
      skuAttr: [],
      colorIndex: 0,
      orderIndex: 0
    }
  },
  methods: {
    toOpen (name) {
      this[name] = true
    },
    // 去首页
    toHome () {
      this.$router.push({
        path: '/pages/home/home'
      })
    },
    // 编辑(保存当前编辑商品的下标)
    editOrder (index) {
      this.popup = true
      this.orderIndex = index
    },
    // 选择规格(保存颜色下标)
    selectColorSpec (index) {
      this.colorIndex = index
    },
    // 减
    minus (colorIndex, sizeIndex, orderIndex) {
      let that = this
      let num = that.cardList[orderIndex].skuAttr[colorIndex].sizeArray[sizeIndex].newNum
      if (num === 0) {
        return false
      } else {
        that.cardList[orderIndex].skuAttr[colorIndex].sizeArray[sizeIndex].newNum--
        that.cardList[orderIndex].skuAttr[colorIndex].sizeArray[sizeIndex].editNum--
      }
    },
    // 加
    add (colorIndex, sizeIndex, orderIndex) {
      let that = this
      let num = that.cardList[orderIndex].skuAttr[colorIndex].sizeArray[sizeIndex].newNum
      if (num === 100) {
        return false
      } else {
        that.cardList[orderIndex].skuAttr[colorIndex].sizeArray[sizeIndex].newNum++
        that.cardList[orderIndex].skuAttr[colorIndex].sizeArray[sizeIndex].editNum++
      }
    },
    // 确认编辑(更新购物车)
    confirmEdit (orderIndex) {
      const TEST_URL = config.url
      const BASE_URL = config.url
      const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL
      let appId = config.appId
      let that = this
      let skuAttr = that.cardList[orderIndex].skuAttr
      let skuList = that.cardList[orderIndex].skuList
      let goodsCard = []
      for (let i = 0; i < skuAttr.length; i++) {
        let sizeArray = skuAttr[i].sizeArray
        for (let k = 0; k < sizeArray.length; k++) {
          console.log(sizeArray[k])
          // let editNum = sizeArray[k].editNum
          let newNum = sizeArray[k].newNum
          let sizeNum = sizeArray[k].sizeNum
          let editNum = newNum - sizeNum
          let obj = {}
          let colorId = skuAttr[i].color
          let sizeId = sizeArray[k].sizeId
          let attrIds = colorId + ',' + sizeId
          for (let g = 0; g < skuList.length; g++) {
            if (skuList[g].attrIds === attrIds) {
              obj.skuId = skuList[g].skuId
            }
          }
          obj.num = editNum
          goodsCard.push(obj)
        }
      }
      let data = {
        sessionId: this.sessionId,
        appId: appId,
        goodsCard: goodsCard
      }
      wx.request({
        method: 'POST',
        url: URL + '/api/goods/card/addGoodsCard',
        data: JSON.stringify(data),
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res)
          if (res.data.code === 1) {
            that.getCard()
            that.popup = false
          }
        }
      })
    },
    // 删除按钮切换
    delBtn () {
      this.count = this.selectArr.length
      if (this.showBtn) {
        this.showBtn = false
      } else {
        this.showBtn = true
      }
    },
    // 单选
    clickCheck (id, index) {
      let that = this
      if (that.cardList[index].check) {
        that.count--
        that.cardList[index].check = false
        for (let i = 0; i < that.selectArr.length; i++) {
          if (that.selectArr[i].id === id) {
            that.selectArr.splice(i, 1)
          }
        }
      } else {
        that.count++
        that.cardList[index].check = true
        that.selectArr.push({id: id})
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
          that.selectArr.push({id: item.id})
        })
        that.count = that.selectArr.length
      }
    },
    // 删除购物车
    async toClose (name) {
      let that = this
      let idStr = []
      that.selectArr.forEach(function (item) {
        idStr.push(item.id)
      })
      const data = await API.deleteCard({ids: idStr.join(',')})
      console.log('删除购物车', data)
      if (data.code === 1) {
        this.mySetTimeout('删除成功')
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
        let cardIds = []
        // 获取选中的商品信息,并计算价格数量
        for (let i = 0; i < this.selectArr.length; i++) {
          for (let j = 0; j < this.cardList.length; j++) {
            if (this.selectArr[i].id === this.cardList[j].id) {
              let price = this.cardList[j].sellPrice
              let num = this.cardList[j].totalNum
              totalPrice += Math.floor((price * num) * 100) / 100
              totalNum += num
              for (let k = 0; k < this.cardList[j].skuList.length; k++) {
                let id = this.cardList[j].skuList[k].id
                cardIds.push({id: id})
              }
              goods.push(this.cardList[j])
            }
          }
        }
        console.log(goods)
        let dataObj = {
          goods: goods,
          skuList: cardIds,
          totalPrice: totalPrice,
          totalNum: totalNum
        }
        console.log(dataObj)
        this.$router.push({path: '/pages/shopping/order/order', query: {cart: JSON.stringify(dataObj)}})
      } else {
        this.mySetTimeout('请选择商品')
      }
    },
    // 获取购物车列表
    async getCard () {
      let that = this
      const data = await API.getCardList()
      if (data.code === 1) {
        // console.log('购物车列表', data)
        let list = data.data
        console.log(list)
        if (list === null) {
          that.kong = true
        } else {
          for (let k = 0; k < list.length; k++) {
            list[k].check = false
            let skuList = list[k].skuList
            let skuAttr = []
            // 定义规格数组
            for (let i = 0; i < skuList.length; i++) {
              let sku = skuList[i]
              let obj = {}
              let attrIds = sku.attrIds.split(',')
              let attrVal = sku.skuCode.split(',')
              obj.color = attrIds[0]
              obj.colorVal = attrVal[0]
              let sizeArray = []
              let sizeObj = {}
              sizeObj.sizeId = attrIds[1]
              sizeObj.sizeVal = attrVal[1]
              sizeObj.sizeNum = sku.num
              sizeObj.newNum = sku.num
              sizeObj.editNum = 0
              sizeArray.push(sizeObj)
              obj.sizeArray = sizeArray
              let isHas = false
              for (let j = 0; j < skuAttr.length; j++) {
                if (skuAttr[j].color === obj.color) {
                  skuAttr[j].sizeArray.push(sizeObj)
                  isHas = true
                  break
                }
              }
              if (!isHas) {
                skuAttr.push(obj)
              }
            }
            list[k].skuAttr = skuAttr
            // 处理规格数据
            let skuCode = []
            let totalNum = 0
            for (let a = 0; a < skuAttr.length; a++) {
              for (let b = 0; b < skuAttr[a].sizeArray.length; b++) {
                let obj = {}
                if (skuAttr[a].sizeArray[b].sizeNum === 0) {
                  continue
                }
                let colorVal = skuAttr[a].colorVal
                let sizeVal = skuAttr[a].sizeArray[b].sizeVal
                // let colorId = skuAttr[a].color
                // let sizeId = skuAttr[a].sizeArray[b].sizeId
                let num = skuAttr[a].sizeArray[b].sizeNum
                // let attrIds = colorId + ',' + sizeId
                totalNum += Number(num)
                // 处理规格文字
                let ishas = false
                let skuVal = ''
                for (let c = 0; c < skuCode.length; c++) {
                  let str = skuCode[c].substring(0, 1)
                  if (str === colorVal) {
                    skuCode[c] += sizeVal + '/' + num + '件;'
                    ishas = true
                    break
                  }
                }
                if (!ishas) {
                  skuVal = colorVal + ': ' + sizeVal + '/' + num + '件;'
                  skuCode.push(skuVal)
                }
              }
            }
            list[k].skuCode = skuCode
            list[k].totalNum = totalNum
          }
          this.cardList = list
        }
      }
    },
    // 定时器弹窗
    mySetTimeout (msg) {
      let that = this
      that.wellMsgShow = true
      that.msg = msg
      setTimeout(function () {
        that.wellMsgShow = false
        that.msg = ''
      }, 1000)
    }
  },
  async mounted () {
    this.sessionId = await wx.getStorageSync('sessionId')
    this.getCard()
  },
  watch: {
    // 全选数组监听
    selectArr: {
      handler () {
        let cardListlen = this.cardList.length
        let selectArrlen = this.selectArr.length
        if (cardListlen > 0 && selectArrlen > 0) {
          if (selectArrlen === cardListlen) {
            this.checkAll = true
          } else {
            this.checkAll = false
          }
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
        margin-bottom: 20px
        background: #fff
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
        background: #fff
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
        right: 30px
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
        right: 30px
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
    z-index: 999
  .popup
    width: 100%
    position: fixed
    height: 957px
    bottom: 0
    left: 0px
    background: #fff
    padding-bottom: 30px
    overflow-y: auto
    z-index: 1000
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
        .k2_btn.active
          border: 1px solid #F67C2F
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
        .minus
          display: inline-block
          width: 30px
          height: 40px
          margin-top: 10px
          text-align: center
          background: url('../../assets/img/shopping/minus.png') no-repeat center
          background-size: 30px 40px
        .count
          display: inline-block
          position: relative
          top: -10px
          width: 70px
          height: 38px
          margin: 0 10px
          text-align: center
          line-height: 38px
          border: 1px solid #ccc
        .add
          display: inline-block
          width: 30px
          height: 40px
          margin-top: 10px
          text-align: center
          background: url('../../assets/img/shopping/add.png') no-repeat center
          background-size: 30px 40px
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
  .wellMsg
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    margin: auto
    width: 305px
    height: 114px
    line-height: 114px
    border-radius: 10px
    background: rgba(0,0,0,.8)
    color: #ffffff
    font-size: 30px
    text-align: center
</style>
