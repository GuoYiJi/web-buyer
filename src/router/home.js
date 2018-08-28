const home = [{
  path: '/pages/home/home',
  name: 'home',
  config: {
    // enablePullDownRefresh: true,
    navigationBarBackgroundColor: '#FA8134',
    'usingComponents': {
      'i-drawer': '/iview/drawer/index',
      'i-modal': '/iview/modal/index'
    }
  }
},{
  path: '/pages/home/login',
  // name: 'login',
  config: {
    navigationBarTitleText: '登录',
    'usingComponents': {
      'i-message': '/iview/message/index'
    }
  }
}, ]
const details = require('./home/details')
const homes = [].concat(home, details)
module.exports = homes
