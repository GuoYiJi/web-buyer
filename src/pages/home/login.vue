<template>
  <div class="home">
    <div class="login">
      <p v-if="userInfo.userInfo"><img :src="userInfo.userInfo.avatarUrl" class="icon_wx" /></p>
      <p v-else>
        <i class="icon_wx"></i>
      </p>
      <!-- <img :src="userInfo" class="icon_wx"></img> -->
      <p>{{userInfo.userInfo ? userInfo.userInfo.nickName : '微信登陆'}}</p>
    </div>
    <i-message id="message" />
    <button class="user_btn wx_btn" open-type="getUserInfo" @getuserinfo="getUserInfo">授权登陆</button>
    <!-- <button v-if="userInfoBool" class="wx_btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权登陆</button>  -->
  </div>
</template>
<script>
import wx from 'wx'
import mixin from '@/mixin'
import config from '@/config'
import API from '@/api/httpJsong';
import { clearUser } from '@/api/httpJsong';
import LoginSDK from '@/api/LoginSDK';
export default {
  mixins: [mixin],
  components: {},
  data () {
    return {
      userInfoBool: false,
      userInfo: {},
      code: ''
    }
  },
  computed: {
    showBtn () {
      return this.userInfoBool
    }
  },
  methods: {
    async getPhoneNumber (e) {
      // console.log(e.mp.detail);
      if (!e.mp.detail.encryptedData) {
        this.handleError('需要同意授权才可以使用噢！')
        // console.log()
      } else {
        const val = await wx.getStorageSync(`${process.env.NODE_ENV}_sessionId`)
        if (val) {
          return this.toRoute('home/home')
        }
        this.login(e.mp.detail)
      }
    },
    getUserInfo (e) {
      if (!e.mp.detail.encryptedData) {
        this.handleError('需要同意授权才可以使用噢！')
      } else {
        this.userInfoBool = true
        this.userInfo = e.mp.detail;
        const loginSDK = new LoginSDK();
        wx.showLoading({
          title: '登录中...'
        })
        loginSDK.login({ ...e.mp }, res => {
          wx.hideLoading();
          wx.reLaunch({
            url: '/pages/home/home'
          });
        })
      }
    },
    async login (encryptedData) {
      
      await API.authLogin({
        code: this.code,
        avatar: this.userInfo.userInfo.avatarUrl,
        nick: this.userInfo.userInfo.nickName,
        // phone: '',
        // appId: config.appId,
        // encryptedDataPhone: encryptedData.encryptedData,
        // ivPhone: encryptedData.iv,
        encryptedData: this.userInfo.encryptedData,
        iv: this.userInfo.iv
      })
        .then(res => {
          wx.reLaunch({
            url: '/pages/home/home'
          });
        })
        .catch(err => {
          this.userInfoBool = false;
        })
        .finally(() => {
          console.log(1);
        })
    }
  },
  async mounted () {

  }
}
</script>
<style type="text/sass" lang="sass" scoped>
@import '~@/assets/css/mixin'
.wx_btn
  position: absolute
  bottom: 218px
  width: 266px
  height: 74px
  left: 242px
  border-radius: 40px
  background: #FF9036
  line-height: 74px
  color: #fff
.user_btn
  bottom: 320px!important
.login
  padding-top: 226px
  padding-left: 285px
  width: 180px
  .icon_wx
    // +bg-img('login/wxLogin.png')
    +icon(180px)
    border-radius: 180px
  p
    color: #333
    font-size: 28px
    padding-top: 34px
    text-align: center

</style>
