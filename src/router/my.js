const my = [{
  path: '/pages/my/my',
  config: {
    navigationBarTitleText: '我的'
    // navigationBarBackgroundColor: '#FA8134',
  }
},]
const pinDetails = require('./my/pinDetails')
const myget = require('./my/myget')
const marketingMgt = require('./my/marketingMgt')
const address = require('./my/address')
const order = require('./my/order')
const orderDetails = require('./my/orderDetails')
const logistics = require('./my/logistics')
const after = require('./my/after')
const sales = require('./my/sales')
// const mys = [].concat(my, marketingMgt, address, order, orderDetails, logistics, after, sales)
const refund = require('./my/refund')
const refundDetails = require('./my/refundDetails')
const barter = require('./my/barter')
const barterDetails = require('./my/barterDetails')
const mys = [].concat(pinDetails, myget, my, marketingMgt, address, order, orderDetails, refund, logistics, after, sales, refundDetails, barter, barterDetails)
module.exports = mys
// const mys = [].concat(pinDetails, myget, my, marketingMgt, address, order, orderDetails)
// module.exports = mys
