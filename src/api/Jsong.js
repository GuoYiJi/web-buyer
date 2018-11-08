
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
  async post(url, params = {}) {
    
    return new Promise(async (resolve, reject) => {
      try {

        loginSDK.isLogin(res => {
          
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
              switch (code) {
                case 0:
                  const msg = data.data.desc
                  wx.showToast({
                    title: `${msg}`,
                    icon: 'none',
                    duration: 2000
                  })
                  break;
                case 1:
                  resolve(data.data)
                  break;
              }
              
            }
          })
        })
      } catch(err) {
        console.log(err)
      }    
    })
  },
}