import wx from 'wx';
import config from '@/config.js';
import qs from 'qs';
const TEST_URL = config.url
const BASE_URL = config.url
const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL;
let __instance = (function () {
  let instance;
  return (newInstance) => {
    if (newInstance) instance = newInstance;
    return instance;
  }
}());
export default class LoginSDK {
  _loginCbs = []
  isLoginLoading = false
  user = null
  wx = wx

  constructor() {
    if (__instance()) return __instance();

    __instance(this);
  }
  _checkIsLogin(cb) {

    const { wx, loginSuccess, user } = this;
    if (user) {
      cb({ errMsg: '', code: 200, login: true, user });
    } else {
      console.log(wx)
      wx.getSetting({
        success: (res) => {
          const { authSetting } = res;
          if (!authSetting['scope.userInfo']) {
            this._redirectLogin();
          } else {

            this.login({}, res => {
              switch (res.code) {
                case 200:
                  cb({ errMsg: '', code: 200, login: true, user: res.user });
                  break;
                default:
                  this._redirectLogin();
              }
            })
            // wx.getUserInfo({
            //   success: res => {
            //     const { userInfo } = res;
            //   },
            //   fail: res => {
            //     this._redirectLogin();
            //   }
            // })
          }
        },
        fail: (err) => {
          this._redirectLogin();
        }
      })
    }
  }
  isLogin(cb) {

    this._loginCbs.push(cb);
    if (this.isLoginLoading) {
      return false;
    } else {
      this._checkIsLogin(res => {
        this._loginCbs.forEach(cb => {
          if (typeof cb === 'function') {
            cb(res);
          }
        })
        this._loginCbs = [];
      });
    }
  }

  login(e, cb) {
    const { wx, loginSuccess, $route } = this;
    
    let appId = wx.getStorageSync('appId');
    if (!appId) {
      const account = wx.getAccountInfoSync();
      const { miniProgram: { appId: _appid } } = account;
      wx.setStorageSync('appId', _appid);
      appId = _appid;
    }
    wx.login({
      success: ({code}) => {
        wx.getUserInfo({
          success: res => {
            const { userInfo, encryptedData, iv } = res;
            const { avatarUrl: avatar, nickName: nick } = userInfo;
            wx.request({
              url: `${URL}/api/account/userLogin`,
              data: qs.stringify({code, encryptedData, iv, appId, avatar, nick}),
              header: {'content-type': 'application/x-www-form-urlencoded'},
              method: 'POST',
              // dataType: 'json',
              success: res => {
                const { data: { data, code, desc } } = res;
                if (code === 1) {
                  const { sessionId, no } = data;
                  wx.setStorage({
                    key: 'no',
                    data: no
                  })
                  cb({ errMsg: '', code: 200, user: data });
                  this.user = data;
                  this.isLoginLoading = false;
                } else {
                  wx.showToast({
                    title: desc,
                    icon: 'none',
                    duration: 3000
                  })
                  this._redirectLogin();
                }
              },
              fail: res => {
                this._redirectLogin();
              }
            })
          },
          fali: res => {
            this._redirectLogin();
          }
        })
      }
    })
  }
  _redirectLogin() {
    this.user = null;
    this._loginCbs = [];
    wx.reLaunch({
      url: '/pages/home/login'
    })
  }
}