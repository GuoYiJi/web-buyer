const home = [{
  path: '/pages/home/home',
  name: 'home',
  config: {
    navigationBarTitleText: '首页',
    navigationBarBackgroundColor: '#ffffff',
    enablePullDownRefresh: true,
    'usingComponents': {
      'i-drawer': '/iview/drawer/index',
      'zan-popup': '/zan-weapp/dist/popup/index',
      'zan-loading': '/zan-weapp/dist/loading/index',
      'i-modal': '/iview/modal/index'
    }
  }
},
{
  path: '/pages/home/login',
  // name: 'login',
  config: {
    navigationBarTitleText: '登录',
    'usingComponents': {
      'i-message': '/iview/message/index'
    }
  }
}
]
const details = require('./home/details')
const homes = [].concat(home, details)
module.exports = homes
