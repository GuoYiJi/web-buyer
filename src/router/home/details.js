const details = [{
  path: '/pages/home/details/details',
  // name: 'details',
  config: {
    navigationBarTitleText: '商品详情',
    'usingComponents': {
      'i-input-number': '/iview/input-number/index',
      'zan-popup': '/zan-weapp/dist/popup/index',
      'zan-toptips': '/zan-weapp/dist/toptips/index',
      'zan-loadmore': '/zan-weapp/dist/loadmore/index',
      'i-panel': '/iview/panel/index',
      'i-modal': '/iview/modal/index'
    }
  }
},
{
  path: '/pages/home/details/detailsCg',
  // name: 'detailsCg',
  config: {
    navigationBarTitleText: '商品详情',
    'usingComponents': {
      'i-input-number': '/iview/input-number/index',
      'i-panel': '/iview/panel/index',
      'i-modal': '/iview/modal/index'
    }
  }
},
]
module.exports = details
