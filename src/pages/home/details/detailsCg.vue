<template>
  <div class="nav">
    <div class="head">
      <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <block v-for="(item,index) in imgUrls" :key="index">
          <swiper-item class="coupon-img">
            <image :src="item" class="slide-image" />
            <i class="h_bf"></i>
          </swiper-item>
        </block>
      </swiper>
      <p class="title" v-text="goodsInfo.name"></p>
      <div class="text">
        <p class="price">批发价：</p>
        <p class="money">￥{{goodsInfo.sellPrice}}</p>
        <p class="goods">货期: {{goodsInfo.delivery}}&nbsp;&nbsp;&nbsp;&nbsp;销量: {{goodsInfo.sellCount==9999 ? '9999+' : goodsInfo.sellCount }}</p>
        <div class="like" @click="Collect()">
          <i class="img_xh" v-if="isLike"></i>
          <i class="img_xh1" v-if="!isLike"></i>
          <p>喜欢</p>
        </div>
        <span class="xian"></span>
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
    <div class="group">
      <div class="g_head">
        <p class="gh_title">团长正在招募团员，你可以直接参团</p>
        <p class="gh_text" @click="more = true">查看更多>></p>
      </div>
      <div class="middle" v-for="(item,index) in pingOrder" v-if='index<=1' :key="index">
        <div class="box" v-for="(ite,i) in item.pingUser" :key="i" v-if="ite.isLeader===1">
          <img v-if="ite.head" class="mh_img" :src="ite.head">
          <img v-else class="mh_img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg" >
          <div class="m_title">{{ite.name ? ite.name : '未填写'}}</div>
          <div class="m_text">
            <p class="mt_1">还差{{item.chaNum}}人成团</p>
            <p class="mt_2">截止{{item.endTime}}</p>
          </div>
          <div class="m_btn" @click="chakanT(index)">去参团</div>
        </div>
      </div>
    </div>
    <div class="label">
      <span v-if="item" class="btn_1" v-for="(item, index) in tags" :key="index" v-text="item.name"></span>
    </div>
    <div class="description">
      <p class="commodity">商品说明</p>
      <p class="commodity">分类：<span>{{goodsInfo.labelInfo}}</span></p>
      <p class="commodity" v-for="(item,i) in specGroup" :key="i">{{item.value}}：<span v-for="(val, j) in item.specAttr" :key="j">{{val.name}}</span></p>

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
      <div class="cart" @click="popup(1)">单独采购</div>
      <div class="immediately" @click="popup(2)">我要开团</div>
    </div>
    <!-- 悬挂按钮 -->
    <div class="suspension" v-if="suspension == 1">
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
    <!-- 拼团更多弹窗 -->
    <div class="moreK" v-if="more">
      <div class="more">
        <div class="g-head">
          <p class="g-text">3人在招募团员</p>
          <i class="g-img" @click="more = false"></i>
        </div>
        <scroll-view scroll-y style="height: 100%;">
          <div class="middle" v-for="(item,index) in pingOrder" :key="index">
            <div class="box" v-for="(ite,i) in item.pingUser" :key="i" v-if="ite.isLeader===1">
              <img v-if="ite.head" class="mh_img" :src="ite.head">
              <img v-else class="mh_img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg" >
              <div class="m_title">{{ite.name ? ite.name : '未填写'}}</div>
              <div class="m_text">
                <p class="mt_1">还差{{item.chaNum}}人成团</p>
                <p class="mt_2">截止{{item.endTime}}</p>
              </div>
              <div class="m_btn" @click="chakanT(index)">去参团</div>
            </div>
          </div>
          <!-- 撑开 -->
          <div style="height: 100px">
          </div>
        </scroll-view>
      </div>
    </div>
    <!-- 参t弹窗 -->
    <div class="cT" v-if="cT">
      <p class="c-time">距结束:01天12时12分21秒</p>
      <p class="c-title">还差{{wellPingUser.chaNum}}人成团，赶快加入吧！</p>
      <div class="c-imgk" v-for="(item,index) in wellPingUser.heads" :key="index">
        <img v-if="item" class="c-img" :src="item">
        <img v-else class="c-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
      </div>
      <div class="btn">
        <span class="b-qx" @click="cT=0">取消</span>
        <span class="b-ct" @click="popup(3,wellPingUser.id)">立即参团</span>
      </div>
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
      imgUrls: [],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      suspension: 0,
      popupShow: false, // 选择规格弹窗
      visible1: false,
      visible2: false,
      more: false, // 更多团
      cT: false,
      isLike: false,
      buyType: '', // 1单独采购 or 2我要开团 or 3我要拼团
      goodsInfo: {}, // 商品信息
      tags: [], // 标签
      details: [], // 详情图片
      specGroup: '', // 规格列表
      skuList: '', // 规格组合列表
      colorIndex: 0, // 是否选中状态,及其下标
      skuAttr: [], // 处理可用的规格数组
      pingOrderId: '', // 拼团订单id
      pingOrder: '', // 拼团列表
      wellPingUser: {} // 立即参团弹窗

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
    // 收藏
    async Collect () {
      if (this.isLike) {
        const data = await API.deleteCollect({goodsId: this.goodsInfo.id})
        console.log('收藏', data)
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
    popup (type, pingOrderId) {
      this.popupShow = true
      // 1单独采购 2我要开团 3我要参团
      this.buyType = type
      if (type === 3) {
        // 3我要参团 保存团id
        this.pingOrderId = pingOrderId
        this.cT = false
      }
    },
    // 确定按钮
    confirmBth () {
      let that = this
      let data = {}
      let skuAttr = []
      let skuCode = []
      let totalNum = 0
      let totalPrice = 0
      let sellPrice = that.goodsInfo.sellPrice
      let pingPrice = that.goodsInfo.ping.price
      // 处理规格数据
      for (let i = 0; i < that.skuAttr.length; i++) {
        for (let j = 0; j < that.skuAttr[i].sizeArray.length; j++) {
          let obj = {}
          if (that.skuAttr[i].sizeArray[j].sizeNum === 0) {
            continue
          }
          let colorVal = that.skuAttr[i].colorVal
          let sizeVal = that.skuAttr[i].sizeArray[j].sizeVal
          let colorId = that.skuAttr[i].color
          let sizeId = that.skuAttr[i].sizeArray[j].sizeId
          let num = that.skuAttr[i].sizeArray[j].sizeNum
          let attrIds = colorId + ',' + sizeId
          totalNum += Number(num)
          // 处理规格文字
          let ishas = false
          let skuVal = ''
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
          for (let k = 0; k < that.skuList.length; k++) {
            if (that.skuList[k].attrIds === attrIds) {
              obj.skuId = that.skuList[k].id
            }
          }
          obj.num = num
          skuAttr.push(obj)
        }
      }
      // console.log(skuAttr)
      // console.log(skuCode)
      data = {
        goods: that.goodsInfo,
        skuObj: skuAttr,
        skuCode: skuCode,
        totalPrice: totalPrice,
        totalNum: totalNum
      }
      // 单独采购
      console.log('type', that.buyType)
      if (that.buyType === 1) {
        totalPrice = totalNum * sellPrice
      }
      // 去开团
      console.log(that.goodsInfo.ping.id)
      if (that.buyType === 2 || that.buyType === 3) {
        data.pingId = that.goodsInfo.ping.id
        totalPrice = totalNum * pingPrice
      }
      // 去参团
      if (that.buyType === 3) {
        data.pingOrderId = that.pingOrderId
      }
      console.log(data)
      that.$router.push({path: '/pages/shopping/order/order', query: {group: JSON.stringify(data)}})
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
      console.log(colorIndex, sizeIndex)
      let num = this.skuAttr[colorIndex].sizeArray[sizeIndex].sizeNum
      if (num === 100) {
        return false
      } else {
        this.skuAttr[colorIndex].sizeArray[sizeIndex].sizeNum++
      }
    },
    toOpen (name) {
      this[name] = true
    },
    toClose (name) {
      this[name] = false
    },
    xqxh () {
      console.log(this)
      if (this.xh === 0) {
        this.xh = 1
      } else if (this.xh === 1) {
        this.xh = 0
      }
    },
    handleChange1 ({ mp: { detail } }) {
      this.value1 = detail.value
    },
    handleChange2 ({ mp: { detail } }) {
      this.value2 = detail.value
    },
    // 去参团
    chakanT (index) {
      this.cT = !this.cT
      let obj = {}
      let pingUser = this.pingOrder[index].pingUser
      obj.id = this.pingOrder[index].id
      obj.endTime = this.pingOrder[index].endTime
      obj.chaNum = this.pingOrder[index].chaNum
      obj.heads = []
      for (let i = 0; i < pingUser.length; i++) {
        console.log(pingUser[i].head)
        if (pingUser[i].head === null) {
          obj.heads.push(' ')
        } else {
          obj.heads.push(pingUser[i].head)
        }
      }
      console.log(obj)
      this.wellPingUser = obj
    }
  },
  mounted () {
    // 商品信息
    this.goodsInfo = JSON.parse(this.$route.query.obj)
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
    // 拼团信息
    this.ping = this.goodsInfo.ping
    // 拼团人员列表
    this.pingOrder = this.goodsInfo.pingOrder
    for (let i = 0; i < this.pingOrder.length; i++) {
      let obj = this.pingOrder[i].pingUser
      this.pingOrder[i].endTime = this.ping.endTime
      this.pingOrder[i].chaNum = this.ping.num - obj.length
    }

    console.log(this.goodsInfo)
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
<style type="text/sass" lang='sass' scoped>
@import '~@/assets/css/mixin'
.m_img
  // +bg-img('home/wx.png')
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
        // +bg-img('home/xqbf.png')
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
  .group
    height: 380px
    background: #fff
    margin-top: 10px
    padding: 0 26px
    .g_head
      height: 76px
      line-height: 76px
      padding-top: 28px
      vertical-align: middle
      display: flex
      justify-content: space-between
      .gh_title
        font-size: 30px
        color: #010101
        display: inline-block
      .gh_text
        font-size: 24px
        color: #F67C2F
        display: inline-block
    .middle
      /*width: 702px*/
      height: 120px
      line-height: 120px
      background: #F9F9F9
      margin-top: 10px
      .box
        width: 100%
        height: 100%
        display: flex
        justify-content: space-between
        .mh_img
          display: inline-block
          width: 80px
          height: 80px
          border-radius: 50%
          margin: 20px 20px
        .m_title
          display: inline-block
          line-height: 120px
          font-size: 28px
          color: #000
        .m_text
          height: 120px
          display: inline-block
          text-align: right
          /*margin: 27px 0 0 0*/
          flex: 2
          .mt_1
            line-height: 60px
            font-size: 24px
            color: #F67C2F
          .mt_2
            line-height: 60px
            font-size: 24px
            color: #666
        .m_btn
          float: right
          display: inline-block
          width: 100px
          height: 120px
          line-height: 120px
          background: #F67C2F
          color: #fff
          font-size: 24px
          text-align: center
          margin-left: 25px
  .label
    margin-top: 10px
    background: #fff
    height: 120px
    display: flex
    width: 100%
    .btn_1
      margin: 30px 0 0 28px
      display: inline-block
      width: 150px
      height: 60px
      background: #FFE8D9
      border: 1px solid #F67C2F
      border-radius: 30px
      text-align: center
      line-height: 60px
  .description
    font-size: 30px
    color: #666
    background: #fff
    margin-top: 10px
    /*height: 184px*/
    .commodity
      font-size: 28px
      color: #666
      padding: 10px 0 0 22px
      span
        margin-right: 10px
    /*.classification*/
      /*display: inline-block*/
      /*padding: 10px 0 0 22px*/
    /*.color*/
      /*display: inline-block*/
      /*padding: 10px 0 0 183px*/
    /*.size*/
      /*display: inline-block*/
      /*padding: 10px 0 0 22px*/
    /*.material*/
      /*display: inline-block*/
      /*padding: 10px 0 0 183px*/
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
        +bg-img('home/home3.png')
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
  .moreK
    position: fixed
    top: 0px
    left: 0px
    background: rgba(0, 0, 0, 0.5)
    width: 100%
    height: 100%
    display: inline-block
    .more
      position: fixed
      bottom: 0px
      left: 0px
      display: inline-block
      width: 100%
      height: 700px
      background: #fff
      .g-head
        height: 98px
        display: flex
        position: relative
        .g-text
          font-size: 32px
          line-height: 98px
          padding-left: 20px
        .g-img
          +bg-img('home/gb.png')
          width: 44px
          height: 44px
          position: absolute
          top: 27px
          right: 20px
      .middle
        /*width: 702px*/
        height: 120px
        line-height: 120px
        background: #F9F9F9
        margin-top: 10px
      .box
        width: 100%
        height: 100%
        display: flex
        justify-content: space-between
        .mh_img
          display: inline-block
          width: 80px
          height: 80px
          border-radius: 50%
          margin: 20px 20px
        .m_title
          display: inline-block
          line-height: 120px
          font-size: 28px
          color: #000
        .m_text
          height: 120px
          display: inline-block
          text-align: right
          /*margin: 27px 0 0 0*/
          flex: 2
          .mt_1
            line-height: 60px
            font-size: 24px
            color: #F67C2F
          .mt_2
            line-height: 60px
            font-size: 24px
            color: #666
        .m_btn
          float: right
          display: inline-block
          width: 100px
          height: 120px
          line-height: 120px
          background: #F67C2F
          color: #fff
          font-size: 24px
          text-align: center
          margin-left: 25px
  .cT
    width: 600px
    height: 420px
    position: fixed
    background: #fff
    top: 30%
    left: 10%
    .c-time
      font-size: 26px
      color: #F67C2F
      position: relative
      top: 50px
      left: 155px
    .c-title
      font-size: 32px
      color: #000
      position: relative
      top: 50px
      left: 130px
    .c-imgk
      display: inline-block
      position: relative
      top: 80px
      left: 150px
      .c-img
        width: 84px
        height: 84px
        margin: 0 10px
    .btn
      height: 99px
      display: flex
      border-top: 1px solid #EAEAEA
      font-size: 32px
      line-height: 99px
      text-align: center
      position: relative
      top: 135px
      .b-qx
        flex: 1
        border-right: 1px solid #EAEAEA
      .b-ct
        flex: 1
        color: #F67C2F
</style>
