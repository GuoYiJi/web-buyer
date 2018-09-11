<template>
  <div class="nav">
    <div class="head">
      <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <block v-if="item" v-for="(item,index) in imgUrls" :key="index">
          <swiper-item class="coupon-img">
            <image :src="item" class="slide-image" />
            <!--<i class="h_bf"></i>-->
          </swiper-item>
        </block>
      </swiper>
      <p class="title" v-text="goodsInfo.name"></p>
      <div class="text">
        <p class="price">批发价:</p>
        <p class="money">￥{{goodsInfo.sellPrice}}</p>
        <p class="goods">货期: {{goodsInfo.delivery}}&nbsp;&nbsp;&nbsp;&nbsp;销量: {{goodsInfo.sellCount==9999 ? '9999+' : goodsInfo.sellCount }}</p>
        <!--收藏-->
        <div class="like" @click="Collect()">
          <i class="img_xh" v-if="isLike"></i>
          <i class="img_xh1" v-if="!isLike"></i>
          <p>喜欢</p>
        </div>
        <span class="xian"></span>
        <!--分享-->
        <div class="share" @click="toOpen('visible1')">
          <i class="img_fx"></i>
          <p>分享</p>
        </div>
        <i-modal :visible="visible1" @ok="toClose('visible1')" @cancel="toClose('visible1')">
          <i class="m_img"></i>
          <div class="m_tips">微信好友</div>
        </i-modal>
      </div>
    </div>
    <div class="shop">
      <span class="text">该商品支持转发铺货</span>
      <span class="btn" @click="toOpen('visible2')">一键铺货</span>
    </div>
    <i-modal :visible="visible2" @ok="toClose('visible2')" @cancel="toClose('visible2')">
      <div class="m_tips">是否一键转到自己的小程序店铺进行出售？</div>
    </i-modal>
    <div class="instructions">
      <p class="title_1">采购说明</p>
      <p class="text_1" v-text="goodsInfo.buyExplan"></p>
    </div>
    <div class="label">
      <span v-if="item" class="btn_1" v-for="(item, index) in tags" :key="index" v-text="item.name"></span>
      <!--<span class="btn_1">修身</span>-->
    </div>
    <div class="description">
      <p class="title">商品说明</p>
      <p class="commodity">类别：<span>{{goodsInfo.labelInfo}}</span></p>
      <p class="commodity" v-for="(item,i) in specGroup" :key="i">{{item.value}}：<span v-for="(val, j) in item.specAttr" :key="j">{{val.name}}</span></p>
      <!--<p class="commodity">材料：<span>纯棉</span></p>-->
    </div>
    <div class="picture">
      <p class="title_2">实拍图片</p>
      <img v-if="item" v-for="(item,index) in details" :key="index" class="pic_img" :src="item">
    </div>
    <div class="foot">
      <div class="service">
        <i class="img_kf"></i>
        <p class="xqkf">客服</p>
      </div>
      <div class="cart" @click="popup(1)">加入购物车</div>
      <div class="immediately" @click="popup(2)">立即购买</div>
    </div>
    <!-- 悬挂按钮 -->
    <div class="suspension" v-if="suspension">
      <div class="top" @click="toTop()">
        <i class="top_img"></i>
        <p class="top_text">顶部</p>
      </div>
      <br/>
      <div class="home" @click="toRoute('/pages/home/home')">
        <i class="home_img"></i>
        <p class="home_text">首页</p>
      </div>
      <br/>
      <div class="shopping" @click="toRoute('/pages/shopping/shopping')">
        <i class="sp_img"></i>
        <p class="sp_text">购物车</p>
        <!-- <i class="sp_dian">12</i> -->
      </div>
    </div>
    <!-- 弹窗 -->
    <div class="popup" v-if="popupShow">
      <div class="kuang_1">
        <img class="pop_img" :src="goodsInfo.image">
        <p class="pop_money">￥{{goodsInfo.sellPrice}}</p>
        <p class="pop_title" v-text="goodsInfo.name"></p>
        <i class="gb" @click="popupShow = false"></i>
      </div>
      <div class="kuang_2">
        <p class="k2_title">颜色</p>
        <div class="k2_btnk">
          <span class="k2_btn" :class="{active : index === colorIndex }" v-for="(item, index) in skuAttr" :key="index" @click="selectColorSpec(index,item.colorVal)">{{item.colorVal}}
            <!--<span class="k2_dian">0</span>-->
          </span>
        </div>
      </div>
      <div class="kuang_3">
        <ul class="s_item_box box1">
          <li class="s_item">尺码</li>
          <li class="s_item">购买数量</li>
        </ul>
        <ul class="s_item_box" v-for="(item, index) in skuAttr[colorIndex].sizeArray" :key="index">
          <li class="s_item">{{item.sizeVal}}</li>
          <li class="s_item">
            <span class="minus" @click="minus(colorIndex, index)"></span>
            <span class="count">{{item.sizeNum}}</span>
            <span class="add" @click="add(colorIndex, index)"></span>
          </li>
        </ul>
      </div>
      <div class="kuang_4">
        <p class="k4_title">已选</p>
        <p class="k4_text" v-for="(item,index) in skuAttr" :key="index">{{item.colorVal}}：<span v-for="(item,i) in item.sizeArray" :key="i">{{item.sizeVal}}/{{item.sizeNum}}件;</span></p>
        <!--<p class="k4_text">红色：S/1件；M/1件</p>-->
      </div>
      <span class="btn" @click="confirmBth()">确定</span>
    </div>
    <!-- 提示语 -->
    <div class="wellMsg" v-show="wellMsgShow">
      {{msg}}
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import config from '@/config.js'
import API from '@/api/httpShui'
export default {
  components: {},
  data () {
    return {
      sessionId: '',
      imgUrls: [],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      suspension: false,
      isLike: 0,
      visible1: false,
      popupShow: false,
      msg: '',
      wellMsgShow: false,
      buyType: '', // 加入购物车or立即购买
      goodsInfo: {}, // 商品信息
      tags: [], // 标签
      details: [], // 详情图片
      specGroup: '', // 规格列表
      skuList: '', // 规格组合列表
      colorIndex: 0, // 是否选中状态,及其下标
      skuAttr: [] // 处理可用的规格数组
    }
  },
  onPageScroll (e) {
    if (e.scrollTop > 600) {
      this.suspension = true
    } else if (e.scrollTop < 600) {
      this.suspension = false
    }
  },
  methods: {
    // 回到顶部
    toTop () {
      wx.pageScrollTo({
        scrollTop: 0
      })
    },
    // 跳转
    toRoute (path) {
      this.$router.push({path: path})
    },
    // 打开分享
    toOpen (name) {
      this[name] = true
    },
    // 关闭分享
    toClose (name) {
      this[name] = false
    },
    // 收藏
    async Collect () {
      if (this.isLike) {
        const data = await API.deleteCollect({goodsId: this.goodsInfo.id})
        if (data.code === 1) {
          this.isLike = false
        }
      } else {
        const data = await API.addCollect({goodsId: this.goodsInfo.id})
        if (data.code === 1) {
          this.isLike = true
        }
      }
    },
    // 打开选择规格弹窗
    popup (type) {
      this.popupShow = true
      if (type === 1) {
        // 加入购物车
        this.buyType = 1
      }
      if (type === 2) {
        // 立即购买
        this.buyType = 2
      }
    },
    // 确定按钮
    confirmBth () {
      let that = this
      let skuAttr = []
      let skuCode = []
      let totalNum = 0
      let price = that.goodsInfo.sellPrice
      let totalPrice = 0
      for (let i = 0; i < that.skuAttr.length; i++) {
        for (let j = 0; j < that.skuAttr[i].sizeArray.length; j++) {
          let obj = {}
          if (that.skuAttr[i].sizeArray[j].sizeNum === 0) {
            continue
          }
          let colorVal = that.skuAttr[i].colorVal
          let colorId = that.skuAttr[i].color
          let sizeVal = that.skuAttr[i].sizeArray[j].sizeVal
          let sizeId = that.skuAttr[i].sizeArray[j].sizeId
          let num = that.skuAttr[i].sizeArray[j].sizeNum
          let attrIds = colorId + ',' + sizeId
          let skuVal = ''
          let ishas = false
          for (let g = 0; g < skuCode.length; g++) {
            let str = skuCode[g].substring(0, 1)
            if (str === colorVal) {
              skuCode[g] += sizeVal + '/' + num + '件;'
              ishas = true
              break
            }
          }
          if (!ishas) {
            skuVal = colorVal + ': ' + sizeVal + '/' + num + '件;'
            skuCode.push(skuVal)
          }
          totalNum += Number(num)
          for (let k = 0; k < that.skuList.length; k++) {
            if (that.skuList[k].attrIds === attrIds) {
              obj.skuId = that.skuList[k].id
            }
          }
          obj.num = num
          skuAttr.push(obj)
        }
      }
      console.log(skuAttr)
      console.log(skuCode)
      totalPrice = totalNum * price
      // 加入购物车
      if (this.buyType === 1) {
        const TEST_URL = config.url
        const BASE_URL = config.url
        const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL
        let appId = config.appId
        let obj = {
          sessionId: this.sessionId,
          appId: appId,
          goodsCard: skuAttr
        }
        wx.request({
          method: 'POST',
          url: URL + '/api/goods/card/addGoodsCard',
          data: JSON.stringify(obj),
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res)
            if (res.data.code === 1) {
              that.mySetTimeout('加入购物车成功')
            }
          }
        })
      }
      // 立即购买
      if (this.buyType === 2) {
        let obj = {
          goods: this.goodsInfo,
          skuObj: skuAttr,
          skuCode: skuCode,
          totalPrice: totalPrice,
          totalNum: totalNum
        }
        this.$router.push({
          path: '/pages/shopping/order/order',
          query: {details: JSON.stringify(obj)}
        })
      }
    },
    // 选择规格
    selectColorSpec (index) {
      this.colorIndex = index
    },
    // 减
    minus (colorIndex, sizeIndex) {
      // console.log(colorIndex, sizeIndex)
      let num = this.skuAttr[colorIndex].sizeArray[sizeIndex].sizeNum
      if (num === 0) {
        return false
      } else {
        this.skuAttr[colorIndex].sizeArray[sizeIndex].sizeNum--
      }
    },
    // 加
    add (colorIndex, sizeIndex) {
      // console.log(colorIndex, sizeIndex)
      let num = this.skuAttr[colorIndex].sizeArray[sizeIndex].sizeNum
      if (num === 100) {
        return false
      } else {
        this.skuAttr[colorIndex].sizeArray[sizeIndex].sizeNum++
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
    this.popupShow = false
    this.sessionId = await wx.getStorageSync('sessionId')
    // 商品信息
    this.goodsInfo = JSON.parse(this.$route.query.obj)
    console.log(this.goodsInfo)
    // 图片列表
    this.imgUrls = this.goodsInfo.images.split(',')
    // 标签列表
    this.tags = this.goodsInfo.tagsList
    // 详情列表
    this.details = this.goodsInfo.content.split(',')
    // 规格数组
    this.specGroup = this.goodsInfo.sku.specGroup
    // 规格组合数组
    this.skuList = this.goodsInfo.sku.skuList
    // 是否收藏
    this.isLike = this.goodsInfo.isLike
    // 规格文字
    // let specGroup = this.goodsInfo.sku.specGroup
    // 规格id
    let skuList = this.goodsInfo.sku.skuList
    let attrArray = []
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
      sizeObj.sizeNum = 0
      sizeArray.push(sizeObj)
      obj.sizeArray = sizeArray
      let isHas = false
      for (let j = 0; j < attrArray.length; j++) {
        if (attrArray[j].color === obj.color) {
          // let skuSize = attrArray[j]
          attrArray[j].sizeArray.push(sizeObj)
          isHas = true
          break
        }
      }
      if (!isHas) {
        attrArray.push(obj)
      }
    }
    this.skuAttr = attrArray
  }
}
</script>
<style type="text/sass" lang="sass" scoped>
@import '../../../assets/css/mixin'
.m_img
  //+bg-img('home/wx.png')
  margin: 0 auto
  width: 90px
  height: 90px
  border: 1px solid red

.m_tips
  height: 80px
  padding: 20px
.nav
  background: #F9F9F9
  .head
    swiper
      height: 1000px
    .coupon-img
      position: relative
      .slide-image
        height: 1000px
        width: 100%
      .h_bf
        //+bg-img('home/xqbf.png')
        position: absolute
        bottom: 27px
        right: 32px
        border: 1px solid red
        width: 96px
        height: 96px
    .title
      font-size: 32px
      line-height: 36px
      padding: 17px 9px 0 23px
      color: #000
      +moreLine(2)
      background: #fff
    .text
      position: relative
      height: 139px
      padding-bottom: 10px
      border-bottom: 1px solid #EAEAEA
      background: #fff
      .price
        position: absolute
        font-size: 26px
        color: #000
        top: 55px
        left: 26px
      .money
        position: absolute
        font-size: 36px
        color: #FF0000
        top: 47px
        left: 130px
      .goods
        position: absolute
        font-size: 24px
        color: #999
        top: 96px
        left: 26px
      .like
        position: absolute
        top: 45px
        left: 535px
        .img_xh
          +bg-img('home/xqxh.png')
          width: 46px
          height: 42px
          margin-left: 7px
        .img_xh1
          +bg-img('home/xqxh1.png')
          width: 46px
          height: 42px
          margin-left: 7px
      .xian
        position: absolute
        top: 25px
        left: 618px
        display: inline-block
        width: 2px
        height: 100px
        background: #EAEAEA
      .share
        position: absolute
        top: 45px
        left: 635px
        .img_fx
          +bg-img('home/xqfx.png')
          width: 46px
          height: 42px
          margin-left: 7px
  .shop
    display: flex
    height: 100px
    background: #fff
    .text
      flex: 1
      font-size: 24px
      color: #999
      padding: 29px 0 0 25px
    .btn
      display: inline-block
      width: 140px
      height: 60px
      font-size: 24px
      color: #fff
      background: #F67C2F
      border-radius: 8px
      text-align: center
      line-height: 60px
      margin: 20px 20px 0 0
  .instructions
    height: 168px
    background: #fff
    margin-top: 10px
    .title_1
      font-size: 30px
      color: #010101
      padding: 15px 0 0 22px
    .text_1
      font-size: 28px
      color: #666666
      padding: 10px 29px 0 23px
  .label
    margin-top: 10px
    padding: 20px
    background: #fff
    /*height: 120px*/
    width: 100%
    .btn_1
      margin-right: 20px
      padding: 0 20px
      display: inline-block
      /*width: 150px*/
      height: 60px
      line-height: 60px
      background: #FFE8D9
      border: 1px solid #F67C2F
      border-radius: 30px
      text-align: center
  .description
    font-size: 30px
    color: #666
    background: #fff
    margin-top: 10px
    /*height: 184px*/
    .title
      color: #000
      padding: 10px 0 0 22px
    .commodity
      font-size: 28px
      color: #666
      padding: 10px 0 0 22px
      span
        margin-right: 10px
  .picture
    padding-bottom: 100px
    .title_2
      padding: 34px 0 26px 22px
    .pic_img
      width: 702px
      height: 1372px
      margin: 0 24px
  .foot
    display: flex
    position: fixed
    bottom: 0px
    width: 100%
    height: 98px
    .service
      flex: 1
      background: #fff
      .img_kf
        +bg-img('home/xqkf.png')
        width: 46px
        height: 42px
        margin-top: 10px
        margin-left: 100px
      .xqkf
        padding-left: 95px
    .cart
      flex: 1
      background: #FFA56C
      color: #fff
      font-size: 30px
      text-align: center
      line-height: 98px
    .immediately
      flex: 1
      background: #F67C2F
      color: #fff
      font-size: 30px
      text-align: center
      line-height: 98px
  .suspension
    position: fixed
    width: 96px
    right: 30px
    text-align: center 
    font-size: 22px
    color: #666
    bottom: 500px
    z-index: 999
    .top
      display: inline-block
      background: rgba(234,234,234,1)
      border-radius: 60px
      width: 96px
      height: 76px
      overflow: hidden
      margin-top: 20px
      padding: 10px 0
      .top_img
        +bg-img('home/xqtb.png')
        width: 38px
        height: 40px
        margin: 0 auto
    .home
      display: inline-block
      background: rgba(234,234,234,1)
      border-radius: 60px
      width: 96px
      height: 76px
      overflow: hidden
      margin-top: 20px
      padding: 10px 0
      .home_img
        +bg-img('home/home3.png')
        width: 45px
        height: 40px
        margin: 0 auto
    .shopping
      display: inline-block
      background: rgba(234,234,234,1)
      border-radius: 60px
      width: 96px
      height: 76px
      position: relative
      overflow: hidden
      margin-top: 20px
      padding: 10px 0
      .sp_img
        +bg-img('home/xqgwc.png')
        width: 45px
        height: 40px
        margin: 0 auto
      .sp_dian
        position: absolute
        top: 10px
        right: 30px
        width: 28px
        height: 28px
        display: inline-block
        background: red
        color: #fff
        border-radius: 50px
        text-align: center
        font-size: 17px
  .popup
    width: 100%
    position: fixed
    height: 957px
    bottom: 0px
    left: 0px
    background: #fff
    padding-bottom: 30px
    z-index: 999
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
      padding: 0 24px
      .k2_title
        font-size: 24px
        color: #000
        padding-bottom: 30px
      .k2_btnk
        .k2_btn
          display: inline-block
          width: 140px
          height: 60px
          background: #EAEAEA
          margin-right: 30px
          border: 1px solid transparent
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
        .minus
          display: inline-block
          width: 30px
          height: 40px
          margin-top: 10px
          text-align: center
          background: url('../../../assets/img/shopping/minus.png') no-repeat center
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
          background: url('../../../assets/img/shopping/add.png') no-repeat center
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
