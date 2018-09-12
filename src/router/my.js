const my = [{
  path: '/pages/my/my',
  config: {
    navigationBarTitleText: '我的',
    navigationBarBackgroundColor: '#FA8134'
  }
}, ]
const pinDetails = require('./my/pinDetails')
const myget = require('./my/myget')
const marketingMgt = require('./my/marketingMgt')
const address = require('./my/address')
const order = require('./my/order')
const orderDetails = require('./my/orderDetails')
const logistics = require('./my/logistics')
const after = require('./my/after')
// const mys = [].concat(my, marketingMgt, address, order, orderDetails, logistics, after, sales)
const applyCustomer = require('./my/applyCustomer')
const refund = require('./my/refund')
const refundDetails = require('./my/refundDetails')
const barter = require('./my/barter')
const barterDetails = require('./my/barterDetails')
const shopList = require('./my/shopList')
const mys = [].concat(pinDetails, myget, my, marketingMgt, address, order, orderDetails, applyCustomer, refund, logistics, after,refundDetails, barter, barterDetails, shopList)
module.exports = mys
// const mys = [].concat(pinDetails, myget, my, marketingMgt, address, order, orderDetails)
// module.exports = mys
