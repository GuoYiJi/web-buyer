const order = [{
  path: '/pages/my/order/myorder',
  config: {
    navigationBarTitleText: '我的订单',
    navigationBarBackgroundColor: '#ffffff',
    'enablePullDownRefresh': true,
    'usingComponents': {
      'i-input-number': '/iview/input-number/index',
      'i-panel': '/iview/panel/index',
      'i-modal': '/iview/modal/index',
      'zan-tab': '/zan-weapp/dist/tab/index',
      'zan-loadmore': '/zan-weapp/dist/loadmore/index',
      'zan-loading': '/zan-weapp/dist/loading/index'
    }
  }
}]

module.exports = order
