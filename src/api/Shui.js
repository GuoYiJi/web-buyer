import config from '@/config.js'

const TEST_URL = config.url
const BASE_URL = config.url
const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL

import Vue from 'vue'
import wx from 'wx'
import qs from 'qs'
import loginAPI from './httpJsong';
const vm = new Vue()
export default {
  async post (url, params = {}, headers = {}) {

    const account = wx.getAccountInfoSync();
    const { miniProgram: { appId } } = account;
    params.appId = appId
    return new Promise(async (resolve, reject) => {
      try {
        loginAPI.authLogin()
          .then(async res => {
            console.log('xxx', params);
            var value = await wx.getStorageSync(`${process.env.NODE_ENV}_sessionId`)
            if (value) {
              params.sessionId = value
            }
            wx.request({
              url: URL + '/' + url,
              data: headers['content-type'] === 'application/json' ? JSON.stringify(params) : qs.stringify(params),
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                ...headers
              },
              method: 'POST',
              // dataType: 'json',
              success: (data) => {
                if (data.statusCode === 500) {
                  wx.showToast({
                    title: '请求出错',
                    icon: 'none',
                    duration: 1500
                  })
                  reject();
                  return;
                }
                // return data
                // console.log(data.data.desc)
                const code = Number(data.data.code)
                if (code === 1) {
                  //  data.data
                  // console.log('这是请求')
                  resolve(data.data)
                  // return data.data
                } else if (code === 2) {
                  console.log(code, 'sdfssdafsd')
                  // 重新登陆 清除登陆信息 location.reload()
                  // window.location.reload()
                  wx.showToast({
                    title: '登录过期，请重新登录',
                    icon: 'none',
                    duration: 2000
                  })
                  wx.setStorageSync(`${process.env.NODE_ENV}_sessionId`, '')
                  // clearUser();
                  wx.reLaunch({url: '/pages/home/login'});
                } else if (code === 0) {
                  const msg = data.data.desc
                  wx.showToast({
                    title: `${msg}`,
                    icon: 'none',
                    duration: 2000
                  })
                }

              },

              fail: res => {
                reject();
              },
              complete: () => {
              }
            })
          });

      } catch (err) {
        reject();
      }
    })
  }
}
