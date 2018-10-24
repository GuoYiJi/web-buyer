const address = [{
    path: '/pages/my/address/new',
    config: {
      navigationBarTitleText: '新增收货地址'
    }
  },
  {
    path: '/pages/my/address/edit',
    config: {
      navigationBarTitleText: '编辑收货地址'
    }
  },
  {
    path: '/pages/my/address/editAddress',
    config: {
      navigationBarTitleText: '地址管理',
      'enablePullDownRefresh': true,
      'usingComponents': {
        'zan-loading': '/zan-weapp/dist/loading/index',
        'zan-loadmore': '/zan-weapp/dist/loadmore/index',
        'i-modal': '/iview/modal/index',
      }
    }
  },
  {
    path: '/pages/my/like',
    config: {
      navigationBarTitleText: '我的喜欢',
      backgroundColor: '#ffffff',
      'usingComponents': {
        'zan-loadmore': '/zan-weapp/dist/loadmore/index',
        'zan-loading': '/zan-weapp/dist/loading/index',
        'i-modal': '/iview/modal/index',
      }
    }
  },
  {
    path: '/pages/my/procedures',
    config: {
      navigationBarTitleText: '申请小程序',
      backgroundColor: '#ffffff',
      'usingComponents': {
        'i-modal': '/iview/modal/index',
      }
    }
  },
]

module.exports = address
