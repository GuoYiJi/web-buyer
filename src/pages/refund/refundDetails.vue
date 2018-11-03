<template>
  <div class="wrapper" v-if="isFetch">
    <div class="refundInfo">
      <!-- 售后状态 -->
      <p class="refundState">
        {{state[details.refundType] + ',' + stateName[details.state]}}
      </p>
      <!-- 商家同意申请填写物流单号 -->
      <p v-if="isFh" class="title">请将商品寄回以下地址并填写物流单号：</p>
      <!-- 商家收货地址 -->
      <div v-if="isFh" class="addressBox">
        <p class="name">收货人：{{details.shopAddressName}} {{ details.shopMobile }}</p>
        <p class="address">收货地址：{{ details.shopValue }} {{details.shopAddress}}</p>
      </div>
      <!-- 物流单号 -->
      <div v-if="isFh" class="logisticsNumber">
        <p class="text">物流单号</p>
        <p v-if="details.orderLogistics && (details.state == 4 || details.state == 6)" class="num">
          {{ details.orderLogistics.logisticsNo }}
        </p>
        <div v-if="details.state == 3" class="label">
          <input class="number" type="number" v-model="logisticsNum">
          <span class="btn" @click="sendNum(details.id)">点击发送</span>
        </div>
      </div>
      <!-- 商品信息 -->
      <p class="title">{{state[details.refundType]}}信息</p>
      <div class="van-cell van-cell--clickable goods-thumb__list" @click="handleShopListClick(goods)">
        <div class="van-cell__title">
          <span class="goods-thumb-item" v-for="(item, index) in goods" :key="j" v-if="index < 3">
            <img class="n-img" :src="item.image" mode="aspectFill">
          </span>
        </div>
        <div class="van-icon van-icon-arrow van-cell__right-icon"></div>
      </div>
      <!-- 卖家信息 -->
      <div class="businessInfo">
        <p>卖家：{{shopName}}</p>
        <p>原因：{{reason}}</p>
        <p>{{state[details.refundType]}}说明：{{details.content}}</p>
        <p>退款金额：{{details.price}}</p>
        <p>申请时间：{{details.createTime}}</p>
        <p>编号：{{details.orderRefundNo}}</p>
        <div>
          <ul class="weui-uploader__files">
            <li class="weui-uploader__file" :style="{ backgroundImage: 'url(' + details.img1 + ')' }" alt="" v-if="details.img1"></li>
            <li class="weui-uploader__file" :style="{ backgroundImage: 'url(' + details.img2 + ')' }" alt="" v-if="details.img2"></li>
            <li class="weui-uploader__file" :style="{ backgroundImage: 'url(' + details.img3 + ')' }" alt="" v-if="details.img3"></li>
          </ul>
        </div>
      </div>

    </div>

    <div class="btnGroup clearfix">
      <div class="revise" v-if="details.state == 0 || details.state == 2" @click="revise">修改申请</div>
      <div class="cancel" v-if="details.state == 0" @click="revokes">撤销申请</div>
      <div class="cancel contact">联系客服 <button open-type="contact">联系客服</button></div>
    </div>
    <div class="wellMsg" v-show="wellMsgShow">
      {{msg}}
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import API from '@/api/httpShui'
import orderMixins from '@/orderMixins';
export default {
  mixins: [orderMixins],
  data () {
    return {
      isFh: false,
      msg: '',
      wellMsgShow: false,
      state: ['退款', '退货', '换货'],
      stateName: ['等待商家处理', '已完成', '商家已拒绝', '商家已同意', '等待商家确认收货', '已撤销'],
      shopName: '',
      details: {},
      reasonList: [
        {id: 1, text: '不喜欢/不想要'},
        {id: 2, text: '未按约定时间发货'},
        {id: 3, text: '空包裹'},
        {id: 4, text: '快递/物流未送达'}
      ],
      goods: [],
      stateIndex: '',
      refundTypeIndex: '',
      logisticsNum: '',
      isFetch: false
    }
  },
  computed: {
    reason() {
      const index = this.reasonList.findIndex(e => e.id == this.details.type);
      if (index !== -1) {
        return this.reasonList[index].text;
      } else {
        return ''
      }
    }
  },
  methods: {
    // 发送物流单号
    async sendNum (id) {
      if (this.logisticsNum != '') {
        wx.showLoading();
        const data = await API.sendLogisticsNum({logisticsNo: this.logisticsNum, orderRefundId: id})
        wx.hideLoading();
        if (data.code === 1) {
          wx.startPullDownRefresh();
        } else {
          wx.showToast({
            title: data.desc,
            icon: 'none',
            duration: 1500
          })
        }
      } else {
        this.mySetTimeout('请输入物流单号！')
      }
    },
    revise() {
      const { details: { refundType: type } } = this;
      let path;
      switch (type) {
        case 0:
        case 1:
          path = '/pages/refund/refund';
          break;
        case 2:
          path = '/pages/refund/barter';
          break;
      }
      if (type != 3) {
        this.$router.push({
          path,
          query: {
            orderId: this.details.orderId,
            type,
            orderRefundId: this.details.id,
            price: this.details.price,
            freight: this.details.freight,
            data: JSON.stringify({
              content: this.details.content,
              img1: this.details.img1,
              img2: this.details.img2,
              img3: this.details.img3
            })
          }
        })
      } else {
        this.$router.push({
        path: path,
        query: {orderId: this.orderId, type: type, orderRefundId: this.details.id}
        })
      }
    },
    revokes () {
      wx.showModal({
        title: '撤销申请',
        content: '您确定要撤销该订单的售后申请吗？',
        success: res => {
          if (res.confirm) {
            const { orderRefundId } = this;
            API.backRefund({
              orderRefundId
            })
              .then(res => {
                wx.setStorageSync('is-list-update', true);
                wx.showToast({
                  title: '操作成功',
                  icon: 'none',
                  duration: 1500
                })
                this.$router.back()
              })
              .catch(err => {
                wx.showToast({
                  title: '操作失败'
                })
              })
          }
        }
      })
      // 
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
    },
    async fetch() {

      const { orderRefundId } = this;
      const data = await API.getRefundDetails({orderRefundId})
      this.isFetch = true;
      if (data.code === 1) {
        this.details = data.data
        this.goods = data.data.goodsList
        this.stateIndex = data.data.state
        this.refundTypeIndex = data.data.refundType
        // 订单状态
        let refundType = data.data.refundType
        // 商家回复状态
        let state = data.data.state
        if (refundType === 1 || refundType === 2) {
          if (state === 0 || state === 2 || state === 5) {
            this.isFh = false
          }
          if (state === 1 || state === 3 || state === 4) {
            this.isFh = true
          }
        }
      }
      return Promise.resolve();
    }
  },
  async created () {
    let that = this
    wx.getStorage({
      key: 'shopName',
      success: function (res) {
        that.shopName = res.data
      }
    })
  },

  async onPullDownRefresh() {
    await this.fetch();
    wx.stopPullDownRefresh();
  },

  onShow() {
    const isUpdate = wx.getStorageSync('update');
    if (isUpdate) {
      wx.removeStorageSync('update');
      wx.startPullDownRefresh();
    }
  },
  async mounted () {
    this.orderRefundId = this.$route.query.id;
    wx.showLoading({
      title: '加载中'
    })
    await this.fetch();
    wx.hideLoading();
  },
  
  onUnload() {
    Object.assign(this, this.$options.data());
  }
}
</script>
<style type="text/sass" lang="sass" scoped>
  @import '~@/assets/css/mixin'
  .wrapper 
    height: auto;
    padding-bottom: 100px;
  .clearfix:after
    content: ""
    display: block
    height: 0
    clear: both
    visibility: hidden
  .clearfix
    /* 触发 hasLayout */
    zoom: 1
  .refundState
    height: 80px
    line-height: 80px
    font-size: 28px
    color: #F67C2F
    padding: 0 24px
    background: #FFFFFF
    margin-bottom: 20px
  .refundInfo
    margin-top: 20px
    .title
      height: 80px
      padding: 0 24px
      line-height: 80px
      font-size: 28px
      color: #333
      background: #ffffff
      box-sizing: border-box
    .title:first-child
      border-bottom: 1px solid #E5E5E5
    .addressBox
      height: 120px
      padding: 0 24px 0 84px
      background: #f9f9f9 url('../../assets/img/my/dz.png') no-repeat 33px 20px
      background-size: 32px 32px
      .name
        line-height: 60px
        font-size: 28px
        color: #000000
      .address
        line-height: 60px
        font-size: 24px
        color: #666666
    .logisticsNumber
      height: 120px
      padding: 20px 24px
      background: #ffffff
      margin-bottom: 20px
      .text
        line-height: 60px
        font-size: 22px
        color: #666
      .num
        height: 50px
        line-height: 50px
        padding: 0 20px
        font-size: 28px
        color: #EE7527
      .label
        display: block
        position: relative
        .number
          height: 50px
          line-height: 50px
          padding: 0 145px 0 20px
          border-left: 1px solid #ccc
          border-right: 1px solid #ccc
          border-top: 1px solid #ccc
          border-bottom: 1px solid #ccc
          border-radius: 50px
          font-size: 28px
          color: #EE7527
        .btn
          position: absolute
          top: 0
          right: 0
          width: 95px
          height: 54px
          padding: 0 25px
          line-height: 54px
          border-left: 1px solid #ccc
          font-size: 22px
          color: #EE7527
    .refundGoods
      height: 200px
      padding: 20px 24px 20px 213px
      box-sizing: border-box
      position: relative
      .img
        float: left
        width: 160px
        height: 160px
        margin-right: 23px
        position: absolute
        top: 20px
        left: 24px
        img
          width: 100%
          height: 100%
      .text
        height: 160px
        .name
          height: 60px
          line-height: 30px
          font-size: 28px
          color: #000000
          overflow: hidden
          margin-bottom: 10px
        .spec
          font-size: 24px
          color: #999999
    .businessInfo
      /*height: 360px*/
      padding: 32px 24px
      overflow: hidden;
      background: #ffffff
      p
        line-height: 60px
        font-size: 28px
        color: #666666
  .btnGroup
    width: 100%
    height: 100px
    position: fixed
    bottom: 0
    left: 0
    background: #ffffff
    .cancel,.revise
      float: right
      width: 192px
      height: 100px
      font-size: 24px
      line-height: 100px
      text-align: center
    .cancel
      color: #999999
      &.contact
        position: relative
        z-index: 1
        button
          position: absolute
          left: 0
          top: 0
          display: block
          width: 100%
          height: 100%
          opacity: 0
    .revise
      color: #ffffff
      background: #EE7527
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
