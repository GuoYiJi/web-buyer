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
        'i-modal': '/iview/modal/index',
      }
    }
  },
  {
    path: '/pages/my/like',
    config: {
      navigationBarTitleText: '我的喜欢',
      'usingComponents': {
        'i-modal': '/iview/modal/index',
      }
    }
  },
  {
    path: '/pages/my/procedures',
    config: {
      navigationBarTitleText: '申请小程序',
      'usingComponents': {
        'i-modal': '/iview/modal/index',
      }
    }
  },
]

module.exports = address
