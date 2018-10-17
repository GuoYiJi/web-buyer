const classify = [{
  path: '/pages/classify/classify',
  name: 'classify',
  config: {
    navigationBarTitleText: '商品分类',
    navigationBarBackgroundColor: '#ffffff',
    usingComponents: {
      'zan-loading': '/zan-weapp/dist/loading/index',
      'zan-loadmore': '/zan-weapp/dist/loadmore/index',
      'zan-popup': '/zan-weapp/dist/popup/index'
    }
    // navigationBarBackgroundColor: '#FA8134',
  }
}, ]
const goodsList = require('./classify/goodsList')
const classifys = [].concat(classify, goodsList)
module.exports = classifys
