<template>
  <div class="nav">
    <div class="head">
      <span class="delivery" :class="{active: expressWay==0}" @click="Delivery(0)">快速邮寄</span>
      <span class="delivery" :class="{active: expressWay==1}" @click="Delivery(1)">物流到付</span>
    </div>
    <div class="address"  @click="toOpen('addressBox','selectAddress')">
      <i class="dt"></i>
      <p class="add_text">收货人：{{name + phone}}</p>
      <p class="add_text">收货地址：{{addressDetails}}</p>
      <p v-if="addressList.length == 0" class="add_text">添加收货地址</p>
    </div>
    <div class="content">
      <p class="c_title">菲斯的小店</p>
      <!--购物车-->
      <div v-if="buyType === 2" class="c_nav" v-for="(item,index) in goodsInfo" :key="index">
        <img v-if="item.image" :src="item.image" class="cn_img">
        <img v-else src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg" class="cn_img">
        <div class="cn_text">
          <p class="cn_t1">{{item.name}}</p>
          <p class="cn_t2" v-for="(item,i) in skuCode" :key="i">{{item}}</p>
          <i class="cn_sj"></i>
        </div>
      </div>
      <!--详情-->
      <div v-if="buyType === 1" class="c_nav">
        <img v-if="goodsInfo.image" :src="goodsInfo.image" class="cn_img">
        <img v-else src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg" class="cn_img">
        <div class="cn_text">
          <p class="cn_t1">{{goodsInfo.name}}</p>
          <p class="cn_t2" v-for="(item,i) in skuCode" :key="i">{{item}}</p>
          <i class="cn_sj"></i>
        </div>
      </div>
      <!--拼团-->
      <div v-if="buyType === 3" class="c_nav">
        <img v-if="goodsInfo.image" :src="goodsInfo.image" class="cn_img">
        <img v-else src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg" class="cn_img">
        <div class="cn_text">
          <p class="cn_t1">{{goodsInfo.name}}</p>
          <p class="cn_t2" v-for="(item,i) in skuCode" :key="i">{{item}}</p>
          <i class="cn_sj"></i>
        </div>
      </div>
      <div class="settlement">
        <p class="s_text1">共
          <span class="st1">{{totalPack}}</span>个款</p>
        <p class="s_text2">
          <span class="st2">{{totalNum}}</span>件商品</p>
        <p class="s_text3">合计:
          <span class="st3">
            <span class="st4">￥</span>{{totalPrice}}</span>
        </p>
      </div>
      <div class="message">
        <span class="m_text">买家留言:</span>
        <input class="m_input" type="text" v-model="remark" placeholder="选填（填写内容已和卖家协商确认）">
      </div>
      <div class="coupon" @click="toOpen('couponBox')">
        <span class="c_text">优惠券</span>
        <span v-if="couponPrice" class="r_text">-￥{{couponPrice}}</span>
      </div>
    </div>
    <div class="foot">
      <p class="f_text">合计:
        <span class="ft1">￥{{totalPrice}}</span>
      </p>
      <span class="f_btn" @click="buy()">马上支付</span>
    </div>
    <!-- 收货地址弹窗 -->
    <div class="tan" v-if="addressBox">
      <div class="t_nav">
        <div class="head">
          <span class="title">收货地址</span>
          <i class="close" @click="toClose('addressBox')"></i>
        </div>
        <!--添加地址-->
        <div class="address-add" v-if="addAddress">
          <p class="tc_text">
            <span class="tc_name">收货人:</span>
            <input class="tc_namet" type="text" v-model="tc_namet">
          </p>
          <p class="tc_text">
            <span class="tc_phone">联系电话:</span>
            <input class="tc_phonet" type="text" v-model="tc_phonet">
          </p>
          <p class="tc_text">
            <span class="tc_region">所在地址:</span>
            <picker class="region" mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
              <view class="picker">
                {{region.length > 0 ? region[0] + '-' + region[1] + '-' + region[2] : '' }}
              </view>
            </picker>
          </p>
          <p class="tc_text">
            <span class="tc_detailed">详细地址:</span>
            <input class="tc_detailedt" type="text">
          </p>
          <span class="btn" @click="popt()">添加</span>
        </div>

        <!--选择地址-->
        <scroll-view class="address-list" v-if="selectAddress">
          <div class="item"  v-for="(item,index) in addressList" :key="index">
            <p class="name">{{item.name+ '  ' + item.mobile}}</p>
            <p class="details">
              收货地址：{{item.value + item.address}}
            </p>
            <div class="select">
              <span class="check" :class="{active : item.isChoice == 1}" @click="defaultAddress(item.id,index)">默认地址</span>
              <span class="edit">编辑</span>
            </div>
          </div>
          <span class="btn" @click="confirm()">确认</span>
        </scroll-view>
      </div>
    </div>
    <!-- 红包弹窗 -->
    <div class="T-coupon" v-if="couponBox">
      <div class="c-head">
        <p class="c-text" @click="toClose('couponBox')">取消</p>
      </div>
      <scroll-view scroll-y style="height: 100%">
        <div class="yhq" v-for="(item,index) in couponList" :key="index" @click="selectCoupon(item.id,item.price)">
          <img class="y-img" src="../../../assets/img/marketingMgt/yhq.png">
          <div class="left">
            <p class="money">￥
              <span class="money1">{{item.price}}</span>
            </p>
            <p class="discount">优惠券</p>
            <p class="purchases">购满{{item.limitCount}}可使用</p>
            <p class="time">有效期{{item.startTime}} - {{item.endTime}}</p>
          </div>
          <div class="right">未使用</div>
        </div>
        <div style="height: 100px"></div>
      </scroll-view>
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
      isDetails: null,
      isGroup: false,
      selectAddressId: '',
      region: [],
      customItem: '全部',
      couponBox: false,
      selectAddress: false,
      addAddress: false,
      addressBox: false,
      remark: '',
      goodsInfo: {},
      name: '',
      phone: '',
      addressDetails: '',
      totalPack: 0,
      totalPrice: 0,
      totalNum: 0,
      expressWay: 0,
      addressId: '',
      addressList: [],
      skuObj: '',
      skuCode: '',
      couponId: '',
      couponList: '',
      couponPrice: '',
      sessionId: '',
      pingId: null,
      pingOrderId: null
    }
  },
  methods: {
    toOpen (parent, child) {
      if(this.addressList.length>0){
        this[parent] = false;
        this[child]=true;
      }else{
        this[parent] = true
        this[child]=false;
      }
      
      
    },
    toClose (name) {
      this[name] = false
    },
    // 选择地址
    defaultAddress (id, index) {
      let that = this
      for (let i = 0; i < that.addressList.length; i++) {
        if (i === index) {
          that.addressList[i].isChoice = 1
        } else {
          that.addressList[i].isChoice = 0
        }
      }
      that.selectAddressId = id
    },
    // 确定选择地址
    async confirm () {
      const data = await API.editAddress({addressId: this.selectAddressId, isChoice: 1})
      if (data.code === 1) {
        this.getAddress()
      }
      this.addressBox = false
    },
    // 配送方式
    Delivery (type) {
      this.expressWay = type
    },
    bindRegionChange (e) {
      console.log(e)
      this.region = e.mp.detail.value
    },
    // 默认地址
    // 添加地址
    // 获取收货地址
    async getAddress () {
      const data = await API.address({ pageNumber: 1, pageSize: 5 })
      console.log('收货地址', data)
      let list = data.data.list
      this.addressList = list
      // 加载显示默认地址
      for (var i = 0; i < list.length; i++) {
        if (list[i].isChoice === 1) {
          this.addressId = list[i].id
          this.name = list[i].name
          this.phone = list[i].mobile
          let val = list[i].value
          this.addressDetails = val.split(',').join('') + list[i].address
        } else {
          this.addressId = list[0].id
          this.name = list[0].name
          this.phone = list[0].mobile
          let val = list[0].value
          this.addressDetails = val.split(',').join('') + list[0].address
        }
      }
      if(list.length==0){
          this.addressId = ""
          this.name =""
          this.phone =""
          this.addressDetails =""
      }
    },
    // 获取优惠券
    async getCoupon () {
      const myCoupon = await API.coupon({
        isExchange: 0,
        state: 1,
        pageSize: 5,
        pageNumber: 1
      })
      console.log('优惠券', myCoupon)
      for (let i = 0; i < myCoupon.data.list.length; i++) {
        myCoupon.data.list[i].startTime = myCoupon.data.list[i].startTime.split(' ')[0].toString()
        myCoupon.data.list[i].endTime = myCoupon.data.list[i].endTime.split(' ')[0].toString()
      }
      this.couponList = myCoupon.data.list
    },
    // 选择优惠卷
    selectCoupon (id, price) {
      this.couponId = id
      this.couponPrice = price
      this.couponBox = false
    },
    // 立即购买
    buy () {
      let that = this
      const TEST_URL = config.url
      const BASE_URL = config.url
      const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL
      let appId = config.appId
      if (this.isGroup === true) {
        let obj = {
          sessionId: this.sessionId,
          appId: appId,
          addressId: this.addressId,
          remark: this.remark,
          skuList: this.skuObj,
          couponId: this.couponId,
          pingId: this.pingId,
          pingOrderId: '',
          expressWay: this.expressWay
        }
        wx.request({
          method: 'POST',
          url: URL + '/api/order/createPingOrder',
          data: JSON.stringify(obj),
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.wxSign(res.data.data.id)
          }
        })
      }
      // 普通购买
      if (this.buyType === 1 || this.buyType === 2) {
        wx.request({
          method: 'POST',
          url: URL + '/api/order/createOrder',
          data: JSON.stringify(obj),
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            if (res.data.code === 1) {
              that.wxSign(res.data.data.id, 1)
            }
          }
        })
      }
    },
    // 微信支付
    async wxSign (orderId) {
      let that = this
      const data = await API.wxSign({ orderId: orderId })
      console.log(data)
      if (data.code === 1) {
        let obj = data.data
        wx.requestPayment({
          timeStamp: obj.timeStamp,
          nonceStr: obj.nonceStr,
          package: obj.package,
          signType: obj.signType,
          paySign: obj.paySign,
          success: function (res) {
            console.log('支付成功返回结果', res)
            if (res.errMsg === 'requestPayment:ok') {
              if (type === 1) {
                that.$router.push({
                  path: '/pages/my/order/myorder',
                  query: { tag: 1 }
                })
              }
              if (type === 2) {
                that.$router.push({
                  path: '/pages/my/myget/get'
                })
              }
            }
          },
          fail: function (res) {
            console.log('支付失败返回结果', res)
            if (res.errMsg === 'requestPayment:fail cancel' || res.errMsg === 'requestPayment:fail (detail message)') {
              if (type === 1) {
                that.$router.push({
                  path: '/pages/my/order/myorder',
                  query: { tag: 1 }
                })
              }
              if (type === 2) {
                that.$router.push({
                  path: '/pages/my/myget/get'
                })
              }
            }
          }
        })
      }
    }
  },
  async mounted () {
    // 获取sessionId
    this.sessionId = await wx.getStorageSync('sessionId')
    // 详情过来
    if (this.$route.query.details) {
      this.isDetails = true
      let goods = JSON.parse(this.$route.query.details)
      console.log(goods)
      this.goodsInfo = goods.goods
      this.skuObj = goods.skuObj
      this.skuCode = goods.skuCode
      this.totalPrice = goods.totalPrice
      this.totalNum = goods.totalNum
      this.totalPack = 1
      console.log('详情过来', this.goodsInfo)
    }
    // 购物车过来
    if (this.$route.query.cart) {
      this.buyType = 2
      let goods = JSON.parse(this.$route.query.cart)
      this.goodsInfo = goods.goods
      this.skuObj = goods.skuObj
      this.totalPrice = goods.totalPrice
      this.totalNum = goods.totalNum
      this.totalPack = goods.goods.length
      console.log('购物车过来', this.goodsInfo)
    }
    // 拼团过来
    if (this.$route.query.group) {
      let goods = JSON.parse(this.$route.query.group)
      console.log(goods.goods)
      if (goods.pingId !== undefined) {
        this.buyType = 3
        this.pingId = goods.pingId
        if (goods.pingOrderId !== undefined) {
          this.pingOrderId = goods.pingOrderId
        }
      } else {
        this.buyType = 1
      }
      this.goodsInfo = goods.goods
      this.skuObj = goods.skuObj
      this.skuCode = goods.skuCode
      this.totalPrice = goods.totalPrice
      this.totalNum = goods.totalNum
      this.totalPack = 1
      console.log('拼团过来', this.goodsInfo)
    }
    this.getAddress()
    this.getCoupon()
  },

}
</script>
<style type="text/sass" lang="sass" scoped>
@import '~@/assets/css/mixin'
.nav
  .head
    height: 80px
    line-height: 80px
    background: #fff
    border-top: 1px solid #E5E5E5
    border-bottom: 1px solid #E5E5E5
    .delivery
      display: inline-block
      /*width: 136px*/
      height: 48px
      padding: 0 10px
      background: #fff
      font-size: 28px
      color: #333
      text-align: center
      line-height: 48px
      border: 1px solid #ccc
      border-radius: 4px
      margin: 0 20px
    .delivery.active
      background: #EE7527
      border: 1px solid #EE7527
      color: #fff
  .address
    /*height: 120px*/
    padding: 28px 33px 28px 83px
    background: #F9F9F9 url('../../../assets/img/shopping/shanJiao.png') no-repeat 95% center
    background-size: 14px 25px
    position: relative
    .dt
      position: absolute
      top: 40px
      left: 33px
      width: 26px
      height: 32px
      +bg-img('shopping/s3.png')
      vertical-align: middle
      display: inline-block
    .add_text
      font-size: 28px
      color: #000
      vertical-align: middle
      display: inline-block
  .content
    .c_title
      height: 82px
      font-size: 28px
      color: #000
      background: #fff
      line-height: 82px
      padding-left: 33px
    .c_nav
      display: flex
      .cn_img
        width: 160px
        height: 160px
        display: inline-block
        border-radius: 10px
        margin: 20px 32px
      .cn_text
        margin-top: 20px
        display: inline-block
        width: 518px
        position: relative
        .cn_t1
          +moreLine(2)
          font-size: 28px
          color: #000
        .cn_t2
          font-size: 24px
          color: #999
        .cn_sj
          position: absolute
          +bg-img('shopping/shanJiao.png')
          width: 14px
          height: 25px
          top: 90px
          right: 20px
    .settlement
      height: 82px
      background: #fff
      line-height: 82px
      padding: 0 30px
      font-size: 24px
      color: #000
      border-bottom: 1px solid #E5E5E5
      .s_text1
        display: inline-block
        vertical-align: middle
        .st1
          color: #F67C2F
          font-size: 28px
      .s_text2
        display: inline-block
        vertical-align: middle
        padding-left: 20px
        .st2
          color: #F67C2F
          font-size: 28px
      .s_text3
        float: right
        display: inline-block
        vertical-align: middle
        .st3
          font-size: 32px
          color: #FF0000
          .st4
            font-size: 24px
            color: #FF0000
    .message
      height: 82px
      background: #fff
      line-height: 82px
      padding: 0 30px
      font-size: 24px
      color: #000
      border-bottom: 1px solid #E5E5E5
      .m_text
        /*width: 120px*/
        display: inline-block
        vertical-align: middle
      .m_input
        width: 420px
        display: inline-block
        vertical-align: middle
        font-size: 28px
    .coupon
      height: 82px
      line-height: 82px
      padding: 0 50px 0 30px
      font-size: 24px
      color: #000
      background: #fff url('../../../assets/img/shopping/shanJiao.png') no-repeat 96% center
      background-size: 14px 25px
      .c_text
        font-size: 28px
        color: #000
        display: inline-block
        vertical-align: middle
      .r_text
        float: right
        font-size: 28px
        color: #EE7527
        display: inline-block
        vertical-align: middle
  .foot
    height: 99px
    background: #fff
    line-height: 99px
    display: flex
    width: 100%
    position: fixed
    bottom: 0
    .f_text
      flex: 3
      padding-left: 32px
      .ft1
        color: #FF0000
    .f_btn
      flex: 1
      background: #EE7527
      text-align: center
      color: #fff
  .tan
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    background: rgba(0,0,0,.3)
    z-index: 99
    .t_nav
      width: 650px
      height: 680px
      background: #fff
      border-radius: 10px
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      margin: auto
      .head
        box-sizing: border-box
        width: 650px
        height: 58px
        line-height: 58px
        border-bottom: 1px solid #E5E5E5
        display: inline-block
        vertical-align: middle
        font-size: 28px
        color: #000
        padding: 0 33px
        .title
          font-size: 28px
          color: #000
        .close
          float: right
          display: inline-block
          vertical-align: middle
          +bg-img('shopping/gb.png')
          width: 23px
          height: 23px
          margin-top: 18px
      .address-add
        background: #ffffff
        height: 622px
        .tc_text
          height: 48px
          line-height: 48px
          margin-top: 32px
          margin-left: 58px
          .tc_name
            display: inline-block
            vertical-align: middle
            font-size: 28px
            color: #000
          .tc_namet
            display: inline-block
            vertical-align: middle
            width: 384px
            height: 48px
            border: 1px solid #999
            margin-left: 61px
          .tc_phone
            display: inline-block
            vertical-align: middle
            font-size: 28px
            color: #000
          .tc_phonet
            display: inline-block
            vertical-align: middle
            width: 384px
            height: 48px
            border: 1px solid #999
            margin-left: 36px
          .tc_region
            display: inline-block
            vertical-align: middle
            font-size: 28px
            color: #000
          .region
            display: inline-block
            vertical-align: middle
            width: 384px
            height: 48px
            border: 1px solid #999
            margin-left: 36px
            overflow: hidden
            .picker
              display: inline-block
              vertical-align: middle
              width: 384px
              height: 48px
              padding-left: 10px
          .tc_detailed
            display: inline-block
            vertical-align: middle
            font-size: 28px
            color: #000
          .tc_detailedt
            display: inline-block
            vertical-align: middle
            width: 384px
            height: 48px
            border: 1px solid #999
            margin-left: 36px
        .btn
          display: inline-block
          width: 538px
          height: 64px
          background: #EE7527
          color: #fff
          font-size: 28px
          text-align: center
          line-height: 64px
          border-radius: 8px
          position: absolute
          bottom: 20px
          left: 56px
      .address-list
        height: 622px
        background: #f1f1f1
        overflow-y: auto
        .item
          box-sizing: border-box
          padding: 10px 32px 0 32px
          /*height: 208px*/
          background: #ffffff
          margin-top: 24px
          .name,.details
            width: 100%
            overflow-x: hidden
          .name
            line-height: 50px
            font-size: 28px
            color: #000
          .details
            line-height: 45px
            font-size: 24px
            color: #999
          .select
            height: 79px
            line-height: 80px
            border-top: 1px solid #ccc
            .check
              float: left
              display: inline-block
              height: 80px
              font-size: 24px
              color: #666
              padding-left: 53px
              background: url('../../../assets/img/my/check.png') no-repeat left center
              background-size: 28px 28px
            .check.active
              background: url('../../../assets/img/my/checked.png') no-repeat left center
              background-size: 28px 28px
            .edit
              float: right
              display: inline-block
              height: 80px
              font-size: 24px
              color: #666
              padding-left: 40px
              background: url('../../../assets/img/my/del-adr.png') no-repeat left center
              background-size: 28px 28px
        .btn
          display: inline-block
          width: 538px
          height: 64px
          background: #EE7527
          color: #fff
          font-size: 28px
          text-align: center
          line-height: 64px
          border-radius: 8px
          position: absolute
          bottom: 20px
          left: 56px
  .T-coupon
    display: inline-block
    position: fixed
    bottom: 0
    left: 0
    background: #F9F9F9
    height: 800px
    width: 100%
    z-index: 999
    .c-head
      height: 78px
      width: 100%
      line-height: 78px
      padding-left: 20px
      .c-text
        font-size: 28px
        color: #666
    .yhq
      width: 100%
      text-align: center
      position: relative
      height: 223px
      margin: 20px 0
      .y-img
        width: 668px
        height: 223px
        position: absolute
        left: 5%
        z-index: -1
      .left
        position: absolute
        top: 62px
        left: 0px
        color: #fff
        .money
          width: 300px
          color: #fff
          position: absolute
          top: -30px
          discount: inline-block
          .money1
            font-size: 60px
        .discount
          width: 200px
          position: absolute
          display: inline-block
          top: -30px
          left: 220px
          font-size: 35px
        .purchases
          width: 200px
          position: absolute
          display: inline-block
          color: #FECF8F
          top: 20px
          left: 220px
          font-size: 26px
        .time
          width: 500px
          position: absolute
          top: 100px
          left: 90px
          color: #EE7527
      .right
        position: absolute
        top: 50px
        right: 80px
        color: #fff
        font-size: 40px
</style>
