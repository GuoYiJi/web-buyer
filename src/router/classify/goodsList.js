const goodsList = [{
  path: '/pages/classify/goodsList',
  name: 'goodsList',
  config: {
    navigationBarTitleText: '分类列表',
    navigationBarBackgroundColor: '#ffffff',
    usingComponents: {
      'zan-popup': '/zan-weapp/dist/popup/index',
      'zan-loading': '/zan-weapp/dist/loading/index',
      'zan-loadmore': '/zan-weapp/dist/loadmore/index'
    }
    // navigationBarBackgroundColor: '#FA8134',
  }
}, ]
module.exports = goodsList
