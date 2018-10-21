const after = [{
  path: '/pages/my/after',
  config: {
    navigationBarTitleText: '售后订单',
    navigationBarBackgroundColor: '#ffffff',
    enablePullDownRefresh: true,
    usingComponents: {
      'zan-loadmore': '/zan-weapp/dist/loadmore/index',
      'zan-loading': '/zan-weapp/dist/loading/index'
    }
  }
}, ]

module.exports = after
