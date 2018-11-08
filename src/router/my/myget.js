const myget = [
  {
    path: '/pages/my/myget/get',
    config: {
      navigationBarTitleText: '我的拼单',
      navigationBarBackgroundColor: '#ffffff',
      enablePullDownRefresh: true,
      // navigationBarBackgroundColor: "#FFF",
      'usingComponents': {
        'zan-loading': '/zan-weapp/dist/loading/index',
        'zan-loadmore': '/zan-weapp/dist/loadmore/index',
        'zan-tab': '/zan-weapp/dist/tab/index',
        'i-panel': '/iview/panel/index',
        'i-modal': '/iview/modal/index'
      }
    }
  }
]
module.exports = myget
