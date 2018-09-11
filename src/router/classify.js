const classify = [{
  path: '/pages/classify/classify',
  name: 'classify',
  config: {
    navigationBarTitleText: '商品分类',
    navigationBarBackgroundColor: '#FA8134'
    // navigationBarBackgroundColor: '#FA8134',
  }
}, ]
const goodsList = require('./classify/goodsList')
const classifys = [].concat(classify, goodsList)
module.exports = classifys
