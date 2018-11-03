<template>
  <div class="wrapper">
    <p v-if="type == 0" class="refundReason" @click="wellShow = true">退款原因<span class="reason">{{reason}}</span></p>
    <p v-if="type == 1" class="refundReason" @click="wellShow = true">退货原因<span class="reason">{{reason}}</span></p>
    <p class="refundPrice">
      退款金额：<span class="price">￥{{price}}</span>
      <span v-if="type == 0" class="freight">含邮费 ￥{{freight}}</span>
      <span v-if="type == 1" class="freight">不含邮费 ￥{{freight}}</span>
    </p>
    <!--<p v-if="type == '0'" class="refundMsg">含邮费￥{{freight}}</p>-->
    <!--<p v-else class="refundMsg">不含邮费￥{{freight}}</p>-->
    <div class="refundExplain">
      <p class="title">{{type == 0 ? '退款说明' : '退货说明'}}：</p>
      <textarea v-model="explain" class="explain" name="" id="" maxlength=50 placeholder="(最多可输入50个字)">

      </textarea>
    </div>
    <div v-if="type == 1" class="refundVoucher">
      <p class="title">上传凭证：<span>(最多可上传3张)</span></p>
      <div class="images" >
        <div class="img" @click="chooseImg(1)">
          <img v-if="img1" :src="img1" alt="">

          <img v-else src="../../assets/img/my/upimg.png" alt="">

          <span v-if="img1" class="close" @click.stop="closeImg('img1',event)"></span>

        </div>
        <div v-if="img1" class="img" @click="chooseImg(2)">
          <img v-if="img2" :src="img2" alt="">

          <img v-else src="../../assets/img/my/upimg.png" alt="">

          <span v-if="img2" class="close" @click.stop="closeImg('img2',event)"></span>

        </div>
        <div v-if="img2" class="img" @click="chooseImg(3)">
          <img v-if="img3" :src="img3" alt="">

          <img v-else src="../../assets/img/my/upimg.png" alt="">

          <span v-if="img3" class="close" @click.stop="closeImg('img3',event)"></span>

        </div>
      </div>
    </div>
    <div class="submit" @click="submit">提交</div>
    <div class="well" v-show="wellShow">
      <div class="box">
        <p v-if="type == 0" class="head">请选择退款原因</p>
        <p v-if="type == 1" class="head">请选择退货原因</p>
        <p class="select" @click="check(item.id,item.text)" v-for="(item,index) in reasonList" :key="index">
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
      orderId: '',
      type: '',
      freight: '',
      price: '',
      isCheck: 0,
      orderRefundId: '',
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
      userType: 1,
      explain: ''
    }
  },
  components: {

  },
  methods: {
    // 退款原因选择
    check (i, text) {
      this.isCheck = i
      this.reason = text
      this.wellShow = false
      this.userType = this.reasonList[i].id;
    },
    // 上传图片
    chooseImg (num) {
      const self = this
      wx.chooseImage({
        count: 1,
        success: function (file) {
          console.log(file)
          // self.img = file.tempFilePaths[0]
          self.uploadImg (file.tempFilePaths[0], function (url) {
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
      let that = this;
      console.log(tempFilePath.slice(location).toString(), 'sdf')
      wx.showLoading({
        title: '上传中'
      })
      wx.uploadFile({
        url: config.uploadImageUrl,
        filePath: tempFilePath,
        name: 'file',
        formData: {
          name: tempFilePath.slice(location).toString(),
          key: "img/${filename}",
          policy: config.imgPolicy,
          OSSAccessKeyId: config.OSSAccessKeyId,
          success_action_status: "200",
          signature: config.imgSignature
        },
        success: function (res) {
          console.log(res)
          if (res.statusCode === 400) {
            that.mySetTimeout('图片大小不能超过2m!')
          } else if (res.statusCode === 200) {
            if (that.maxNum && that.imgList.length >= that.maxNum) {
              that.mySetTimeout('不能超过3张图片噢！')
              return
            }
            callback (
              config.uploadImageUrl + "/img/" + tempFilePath.slice(location).toString()
            )
          }
        },
        fail: function (err) {
          console.log(err)
        },
        complete: res => {
          wx.hideLoading();
        }
      })
    },
    // 清除选择的图片
    closeImg (name, event) {
      this.$set(this, name, '');
      this[name] = '';
    },
    // 提交按钮
    async submit () {
      // if (this.reason === '') {
      //   this.mySetTimeout('请选择退款原因!')
      //   return false
      // }
      if (this.explain === '') {
        this.mySetTimeout('请填写退款说明!')
        return false
      }
      let params = {
        orderId: this.orderId,
        refundType: this.type,
        content: this.explain,
        img1: this.img1,
        img2: this.img2,
        img3: this.img3,
        type: this.userType
      };
      let data;
      wx.showLoading()
      if (this.orderRefundId) {
        Object.assign(params, {orderRefundId: this.orderRefundId});
        data = await API.updateRefund(params)
      } else {
        data = await API.retreatGoods(params);
      }
      wx.hideLoading();
      if (data.code === 1) {
        if (this.orderRefundId) {
          wx.setStorageSync('update', true);
          this.$router.back();
        } else {
          wx.setStorageSync('refundSuccess', true);
          console.log(this.type)
          if (this.type == 2) {
            console.log('data', data);
            this.$router.replace({
              path: '/pages/refund/barterDetails',
              query: {
                id: data.data.id
              }
            })
          } else {
            this.$router.replace({
              path: '/pages/refund/refundDetails',
              query: {
                id: data.data.id
              }
            })
          }
          
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
    console.log(this.$route.query);
    const { orderRefundId, orderId, explain, userType, img1, img2, img3 } = this.$route.query;
    this.img1 = img1;
    this.img2 = img2;
    this.img3 = img3;
    this.explain = explain;
    if (orderRefundId) {
      this.orderRefundId = orderRefundId;
    }
    this.orderId = this.$route.query.orderId;
    this.userType = userType || 1;
    this.isCheck = this.userType;
    const reasonIndex = this.reasonList.findIndex(item => item.id == this.userType);
    if (reasonIndex !== -1) {
      this.reason = this.reasonList[reasonIndex].text;
    }
    this.type = this.$route.query.type;
    this.price = Number(this.$route.query.price)
    this.freight = Number(this.$route.query.freight)
    switch (this.type) {
      case 0:
        wx.setNavigationBarTitle({
          title: '仅退款'
        })
        break;
    }
    if (this.$route.query.data) {
      const data = JSON.parse(this.$route.query.data);
      this.explain = data.content;
      this.img1 = data.img1;
      this.img2 = data.img2;
      this.img3 = data.img3;
    }
    if (this.type === 1) {
      this.price -= this.freight
      this.isRefund = false
    }
    // console.log(this.orderId)
    // console.log(this.type)
    // console.log(this.price)
    // console.log(this.freight)
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
.refundPrice
  height: 107px
  line-height: 107px
  font-size: 30px
  color: #333333
  padding: 0 24px
  background: #FFFFFF
  margin-top: 15px
  .price
    color: #FF0000
  .freight
    float: right
    font-size: 28px
    color: #999
.refundMsg
  height: 64px
  line-height: 64px
  padding: 0 24px
  font-size: 24px
  color: #333333
.refundExplain
  height: 310px
  padding: 0 24px
  background: #ffffff
  margin-top: 15px
  .explain
    width: 100%
    height: 240px
    z-index: 1
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
  z-index: 999
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
  padding: 40px 50px
  height: 114px
  line-height: 114px
  border-radius: 10px
  background: rgba(0,0,0,.8)
  color: #ffffff
  font-size: 30px
  text-align: center
</style>
