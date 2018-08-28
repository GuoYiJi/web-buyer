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
      <!--<img v-else class="pic_img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">-->
      <!--<img class="pic_img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">-->
      <!--<img class="pic_img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">-->
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
    <div class="suspension" v-if="(suspension == 1)">
      <div class="top">
        <i class="top_img"></i>
        <p class="top_text">顶部</p>
      </div>
      <br/>
      <div class="home">
        <i class="home_img"></i>
        <p class="home_text">首页</p>
      </div>
      <br/>
      <div class="shopping">
        <i class="sp_img"></i>
        <p class="sp_text">购物车</p>
        <i class="sp_dian">12</i>
      </div>
    </div>
    <!-- 弹窗 -->
    <div class="popup" v-if="popupShow">
      <div class="kuang_1">
        <img class="pop_img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        <p class="pop_money">￥{{goodsInfo.sellPrice}}</p>
        <p class="pop_title" v-text="goodsInfo.name"></p>
        <i class="gb" @click="popupShow=false"></i>
      </div>
      <div class="kuang_2">
        <p class="k2_title">选择颜色和尺码</p>
        <div class="k2_btnk">
          <span class="k2_btn" :class="{active : index === isSpec }" v-for="(item, index) in specGroup[0].specAttr" :key="index" @click="selectSpec(index,item.name)">{{item.name}}
            <!--<span class="k2_dian">0</span>-->
          </span>
        </div>
      </div>
      <div class="kuang_3">
        <ul class="s_item_box box1">
          <li class="s_item">尺码</li>
          <li class="s_item">购买数量</li>
        </ul>
        <ul class="s_item_box" v-for="(item, index) in specGroup[1].specAttr" :key="index">
          <li class="s_item">{{item.name}}</li>
          <li class="s_item">
            <!--<i-input-number :value="value" min="0" max="100" @change="handleChange" />-->
            <span class="minus" @click="minus(item.id)"></span>
            <span class="count">{{count}}</span>
            <span class="add" @click="add()"></span>
          </li>
        </ul>
        <!--<ul class="s_item_box">-->
          <!--<li class="s_item">M</li>-->
          <!--<li class="s_item">-->
            <!--<i-input-number :value="value2" min="0" max="100" @change="handleChange2" />-->
          <!--</li>-->
        <!--</ul>-->
      </div>
      <div class="kuang_4">
        <p class="k4_title">已选</p>
        <p class="k4_text">绿色：S/1件；M/1件</p>
        <p class="k4_text">红色：S/1件；M/1件</p>
      </div>
      <span class="btn" @click="confirmBth()">确定</span>
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
      imgUrls: [
        'http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg',
        'http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg',
        'http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg',
        'http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg',
        'http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg'
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      suspension: 0,
      isLike: 0,
      visible1: false,
      popupShow: false,
      buyType: '',
      count: 1,
      goodsInfo: {},
      tags: [],
      details: [],
      specGroup: '',
      skuList: '',
      isSpec: '',
      selectSkuId: [],
      selectSkuText: []
    }
  },
  onPageScroll (e) {
    if (e.scrollTop > 600) {
      this.suspension = 1
    } else if (e.scrollTop < 600) {
      this.suspension = 0
    }
  },
  methods: {
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
      if (this.buyType === 1) {
        const TEST_URL = config.url
        const BASE_URL = config.url
        const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL
        let appId = config.appId
        let obj = {
          sessionId: this.sessionId,
          appId: appId,
          num: 1,
          skuId: this.skuList[0].id,
          goodsCard: [{ skuId: this.skuList[0].id, num: 1 }]
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
              that.$router.push({path: '/pages/shopping/shopping'})
            }
          }
        })
      }
      if (this.buyType === 2) {
        let skuObj = []
        skuObj.push({skuId: this.skuList[0].id, num: 1})
        let obj = {
          goods: this.goodsInfo,
          skuObj: skuObj,
          sKuCode: this.skuList[0].skuCode,
          totalPrice: 60,
          totalNum: 1
        }
        this.$router.push({path: '/pages/shopping/order/order', query: {details: JSON.stringify(obj)}})
      }
    },
    // 选择规格
    selectSpec (index, name) {
      this.isSpec = index
      console.log(name)
    },
    minus () {
      if (this.count === 0) {
        return false
      } else {
        this.count--
      }
    },
    add () {
      this.count++
    }
  },
  async mounted () {
    this.sessionId = await wx.getStorageSync('sessionId')
    this.goodsInfo = JSON.parse(this.$route.query.obj)
    this.imgUrls = this.goodsInfo.images.split(',')
    this.tags = this.goodsInfo.tagsList
    this.details = this.goodsInfo.content.split(',')
    this.specGroup = this.goodsInfo.sku.specGroup
    this.skuList = this.goodsInfo.sku.skuList
    this.isLike = this.goodsInfo.isLike
    console.log(this.goodsInfo)
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
    right: 30px
    bottom: 500px
    .top
      display: inline-block
      background: #fff
      border-radius: 60px
      width: 121px
      height: 121px
      overflow: hidden
      margin-top: 20px
      .top_img
        +bg-img('home/xqtb.png')
        width: 63px
        height: 65px
        margin: 7px auto 0
      .top_text
        padding-left: 31px
    .home
      display: inline-block
      background: #fff
      border-radius: 60px
      width: 121px
      height: 121px
      overflow: hidden
      margin-top: 20px
      .home_img
        +bg-img('home/xqsy.png')
        width: 70px
        height: 65px
        margin: 7px auto 0
      .home_text
        padding-left: 31px
    .shopping
      display: inline-block
      background: #fff
      border-radius: 60px
      width: 121px
      height: 121px
      position: relative
      overflow: hidden
      margin-top: 20px
      .sp_img
        +bg-img('home/xqgwc.png')
        width: 69px
        height: 65px
        margin: 7px auto 0
      .sp_text
        padding-left: 19px
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
          text-align: center
          background: url('../../../assets/img/shopping/minus.png') no-repeat
          background-size: 30px 40px
        .count
          display: inline-block
          width: 70px
          height: 38px
          text-align: center
          line-height: 38px
          border: 1px solid #ccc
          margin: 0 10px
        .add
          display: inline-block
          width: 30px
          height: 40px
          text-align: center
          background: url('../../../assets/img/shopping/add.png') no-repeat
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



</style>
