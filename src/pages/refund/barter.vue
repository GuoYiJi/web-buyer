<template>
  <div class="wrapper">
    <p class="refundReason" @click="wellShow = true">换货原因<span class="reason">{{reason}}</span></p>
    <div class="refundExplain">
      <p class="title">换货说明：</p>
      <textarea v-model="explain"  class="explain" name="" id="" maxlength="50" placeholder="(最多可输入50个字)">
      </textarea>
    </div>
    <div class="refundVoucher">
      <p class="title">上传凭证：<span>(最多可上传3张)</span></p>
      <div class="images">
        <div class="img" @click="chooseImg(1)">
          <img v-if="img1" :src="img1" alt="">

          <img v-else src="../../assets/img/my/upimg.png" alt="">

          <span v-if="img1" class="close" @click="closeImg('img1',event)"></span>

        </div>
        <div v-if="img1" class="img" @click="chooseImg(2)">
          <img v-if="img2" :src="img2" alt="">

          <img v-else src="../../assets/img/my/upimg.png" alt="">

          <span v-if="img2" class="close" @click="closeImg('img2',event)"></span>

        </div>
        <div v-if="img2" class="img" @click="chooseImg(3)">
          <img v-if="img3" :src="img3" alt="">

          <img v-else src="../../assets/img/my/upimg.png" alt="">

          <span v-if="img3" class="close" @click="closeImg('img3',event)"></span>

        </div>
      </div>
    </div>
    <div class="submit" @click="submit">提交</div>
    <div class="well" v-show="wellShow">
      <div class="box">
        <p class="head">请选择换货原因</p>
        <p class="select" @click="check(index, item.text)" v-for="(item,index) in reasonList" :key="index">
          <span class="check" :class="{checked : isCheck == item.id}"></span>
          <span>{{item.text}}</span>
        </p>
        <!--<p class="select" @click="check(1)">-->
        <!--<span class="check" :class="{checked : isCheck == 1}"></span>-->
        <!--<span>原因2</span>-->
        <!--</p>-->
      </div>
    </div>
    <div class="wellMsg" v-show="wellMsgShow">
      {{msg}}
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import API from '@/api/httpShui'
import config from '@/config'
export default {
  data () {
    return {
      orderRefundId: '',
      orderId: '',
      type: '',
      isType: true,
      isCheck: 0,
      reasonList: [
        {id: 1, text: '不喜欢/不想要'},
        {id: 2, text: '未按约定时间发货'},
        {id: 3, text: '空包裹'},
        {id: 4, text: '快递/物流未送达'}
      ],
      img1: '',
      img2: '',
      img3: '',
      reason: '',
      wellShow: false,
      wellMsgShow: false,
      msg: '',
      explain: ''
    }
  },
  components: {

  },
  methods: {
    // 退款原因选择
    check (i, text) {
      this.isCheck = this.reasonList[i].id;
      this.reason = text;
      this.wellShow = false;
      this.type = this.reasonList[i].id;
    },
    // 上传图片
    chooseImg (num) {
      const self = this
      wx.chooseImage({
        count: 1,
        success: function (file) {
          console.log(file)
          // self.img = file.tempFilePaths[0]
          self.uploadImg(file.tempFilePaths[0], function (url) {
            self.img = url
            if (num === 1) {
              self.img1 = url
            }
            if (num === 2) {
              self.img2 = url
            }
            if (num === 3) {
              self.img3 = url
            }
          })
        }
      })
    },
    uploadImg (tempFilePath, callback) {
      var location = tempFilePath.lastIndexOf('/') + 1;
      console.log('3432234')
      let that = this

    },
    // 清除选择的图片
    closeImg (name, event) {
      event.stopPropagation()
      this[name] = ''
    },
    // 提交按钮
    async submit () {
      // if (this.reason === '') {
      //   this.mySetTimeout('请选择换货原因!')
      //   return false
      // }
      if (this.explain === '') {
        this.mySetTimeout('请填写换货说明!')
        return false
      }
      wx.showLoading();
      const data = await API.retreatGoods({
        orderId: this.orderId,
        refundType: this.type,
        content: this.explain,
        type: this.type,
        img1: this.img1,
        img2: this.img2,
        img3: this.img3
      })
      wx.hideLoading();
      
      if (data.code === 1) {

        if (this.orderRefundId) {
          wx.setStorageSync('update', true);
          this.$router.back();
        } else {
          wx.setStorageSync('refundSuccess', true);
            console.log('data', data);
          this.$router.replace({
            path: '/pages/refund/barterDetails',
            query: {
              id: data.data.id
            }
          })
        }
      } else {

        wx.showToast({
          title: data.desc,
          icon: 'none',
          duration: 1500
        })
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
  mounted () {

    this.orderId = this.$route.query.orderId
    this.type = this.$route.query.type
  },
  
  onUnload() {
    Object.assign(this, this.$options.data());
  }
}
</script>
<style type="text/sass" lang="sass" scoped>
  @import '~@/assets/css/mixin'
  .clearfix:after
    content: ""
    display: block
    height: 0
    clear: both
    visibility: hidden
  .clearfix
    /* 触发 hasLayout */
    zoom: 1
  .refundReason
    height: 107px
    line-height: 107px
    font-size: 30px
    color: #333333
    padding: 0 48px 0 24px
    background: #ffffff url('../../assets/img/my/shanJiao.png') no-repeat 98% center
    background-size: 16px 28px
    .reason
      float: right
  .refundExplain
    height: 310px
    padding: 0 24px
    background: #ffffff
    .explain
      width: 100%
      height: 240px
  .refundVoucher
    height: 310px
    padding: 0 24px
    background: #ffffff
    margin-top: 10px
    .images
      height: 240px
      .img
        float: left
        position: relative
        margin-right: 20px
        width: 200px
        height: 200px
        /*background: url('../../assets/img/my/upimg.png') no-repeat*/
        /*background-size: 200px 200px*/
        .close
          position: absolute
          top: 10px
          right: 10px
          width: 36px
          height: 36px
          background: url('../../assets/img/my/cancel.png') no-repeat
          background-size: 36px 36px
  .title
    height: 70px
    line-height: 70px
    font-size: 30px
    color: #333333
    box-sizing: border-box
    span
      color: #999999
  .submit
    width: 600px
    height: 90px
    line-height: 90px
    text-align: center
    font-size: 32px
    color: #ffffff
    margin: 70px auto 0 auto
    background: url('../../assets/img/my/btnbg.png') no-repeat
    background-size: 600px 90px
  .well
    width: 100%
    height: 100%
    position: absolute
    left: 0
    top: 0
    z-index: 1000
    background: rgba(0,0,0,.5)
    .box
      width: 520px
      height: 500px
      background: #ffffff
      border-radius: 5px
      position: absolute
      left: 0
      right: 0
      top: 0
      bottom: 0
      margin: auto
      .head
        height: 120px
        line-height: 120px
        font-size: 32px
        color: #000000
        text-align: center
      .select
        height: 95px
        line-height: 95px
        padding-left: 80px
        font-size: 30px
        color: #333333
        .check
          display: inline-block
          width: 40px
          height: 40px
          margin-right: 30px
          vertical-align: middle
          background: url('../../assets/img/my/check.png') no-repeat center
          background-size: 40px 40px
        .checked
          background: url('../../assets/img/my/checked.png') no-repeat center
          background-size: 40px 40px
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
