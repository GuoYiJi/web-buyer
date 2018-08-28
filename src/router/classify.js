const classify = [{
  path: '/pages/classify/classify',
  name: 'classify',
  config: {
    // navigationBarBackgroundColor: '#FA8134',
  }
}, ]
const goodsList = require('./classify/goodsList')
const classifys = [].concat(classify, goodsList)
module.exports = classifys
