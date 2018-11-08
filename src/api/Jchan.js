import config from '@/config.js'

const TEST_URL = config.url
const BASE_URL = config.url
const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL

import Vue from 'vue'
import wx from 'wx'
import qs from 'qs'
import loginAPI from './httpJsong';
import LoginSDK from './LoginSDK';

const vm = new Vue()
const loginSDK = new LoginSDK();
export default {
  async post (url, params = {}) {

    return new Promise(async (resolve, reject) => {
      try {
        loginSDK.isLogin(res => {
          if (res.code === 200) {
            const appId = wx.getStorageSync('appId');
            params = {
              ...params,
              sessionId: res.user.sessionId,
              appId
            }
            wx.request({
              url: URL + '/' + url,
              data: qs.stringify(params),
              header: {'content-type': 'application/x-www-form-urlencoded'},
              method: 'POST',
              // dataType: 'json',
              success: function(data){
                // return data
                // console.log(data.data.desc)
                const code = Number(data.data.code)
                if(code === 1) {
                  //  data.data
                  // console.log('这是请求')
                  resolve(data.data)
                  // return data.data
                }
                else if (code === 2 ) {
                  // 重新登陆 清除登陆信息 location.reload()
                  // window.location.reload()
                  wx.showToast({
                    title: '登录过期，请重新登录',
                    icon: 'none',
                    duration: 2000
                  })
                  wx.setStorageSync(`${process.env.NODE_ENV}_sessionId`, '');
                  wx.reLaunch({url: '/pages/home/login'})
                } else if (code === 0) {
                  const msg = data.data.desc
                  wx.showToast({
                    title: `${msg}`,
                    icon: 'none',
                    duration: 2000
                  })
                  reject();
                }

              }
            })
          }
        });

      } catch(err) {
        console.log(err)
      }
    })
  },
}
