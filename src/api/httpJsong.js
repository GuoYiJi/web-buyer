import config from '@/config.js'


import Vue from 'vue'
import wx from 'wx'
import qs from 'qs'
const vm = new Vue()
const TEST_URL = config.url
const BASE_URL = config.url
const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL
// 接口命名规范

// 和路由命名一样，加模块的h后缀
// h_getIndex = params => http.post()
let hasLogin = false;
let loading;
class API {
	authLogin = params => {
    return new Promise(async (resolve, reject) => {
      if (loading) {
        return;
      }
      if (hasLogin) {
        resolve();
        return;
      }
      function _getAuthSetting() {
        return new Promise((resolve, reject) => {
          wx.getSetting({
            success: res => {
              const { authSetting } = res;
              console.log('authSetting', authSetting)
              if (authSetting['scope.userInfo']) {
                resolve();
              } else {
                wx.reLaunch({
                  url: '/pages/home/login'
                })
                loading = false;
                hasLogin = false;
              }
            }
          });
        });
      }
      loading = true;
      _getAuthSetting()
        .then(res => {
          wx.login({
            success: res => {
              const { code } = res;

              wx.getUserInfo({
                success: res => {
                  const account = wx.getAccountInfoSync();
                  const { miniProgram: { appId } } = account;
                  const { encryptedData, iv, userInfo: { avatarUrl: avatar, nickName: nick } } = res;
                  wx.request({
                    url: `${URL}/api/account/userLogin`,
                    data: qs.stringify({...params, code, encryptedData, iv, avatar, nick, appId}),
                    header: {'content-type': 'application/x-www-form-urlencoded'},
                    method: 'POST',
                    // dataType: 'json',
                    success: res => {
                      const { data: { data, code } } = res;
                      if (code === 1) {
                        const { sessionId, no } = data;
                        hasLogin = true;
                        loading = false;
                        wx.setStorage({
                          key: 'no',
                          data: no
                        })
                        wx.setStorageSync(`${process.env.NODE_ENV}_sessionId`, sessionId);
                        resolve();
                      } else {
                        wx.reLaunch({url: '/pages/home/login'});
                        
                        loading = false;
                        hasLogin = false;
                      }
                    },
                    fail: res => {
                      loading = false;
                      wx.reLaunch({url: '/pages/home/login'});
                    }
                  })
                }
              });
              // http.post('api/account/userLogin', {...params, code, encryptedData, iv})
              //   .then(res => {
              //     resolve();
              //   })
            },
            fail: res => {
              loading = false;
            }
          })
          
        })
        .fail(res => {
          loading = false;
        })
      
    })
  }
}
export function clearUser() {
 loading = false;
 hasLogin = false;
}

export default new API()