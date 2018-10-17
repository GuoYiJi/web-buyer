const shopping = [{
  path: '/pages/shopping/shopping',
  config: {
    navigationBarTitleText: '购物车',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
    'usingComponents': {
      'zan-popup': '/zan-weapp/dist/popup/index',
      'i-input-number': '/iview/input-number/index',
      'i-panel': '/iview/panel/index',
      'i-modal': '/iview/modal/index'
    }
  }
},
{
  path: '/pages/shopping/order/order',
  config: {
    navigationBarTitleText: '填写订单',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
    usingComponents: {
      'zan-toast': '/zan-weapp/dist/toast/index',
      'zan-popup': '/zan-weapp/dist/popup/index'
    }
  }
},
{
  path: '/pages/shopping/order/rules',
  config: {
    navigationBarTitleText: '运费规则',
    navigationBarBackgroundColor: '#FA8134'
  }
},
]
// const homes = [].concat(home,storeMgr,shopMgr)
module.exports = shopping
