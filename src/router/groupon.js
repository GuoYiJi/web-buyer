const groupon = [{
  path: '/pages/groupon/index',
  name: 'groupon',
  config: {
    navigationBarTitleText: '拼团详情',
    navigationBarBackgroundColor: '#ffffff',
    usingComponents: {
      'zan-loading': '/zan-weapp/dist/loading/index',
      'zan-loadmore': '/zan-weapp/dist/loadmore/index',
      'zan-popup': '/zan-weapp/dist/popup/index'
    }
  }
}, ]
module.exports = [].concat(groupon)
