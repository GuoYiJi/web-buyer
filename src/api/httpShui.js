// 封装httpApi
import http from './Shui'
// 接口命名规范

// 和路由命名一样，加模块的h后缀
// h_getIndex = params => http.post()
class API {
  // 登录
  authLogin = params => http.post('api/account/authLogin', params)
  // 获取店铺信息
  getShopInfo = params => http.post('api/warehouse/selectWarehouse', params)
  // 一级分类
  getTabs = params => http.post('api/label/data/selectLabelList', params)
  // 二级分类
  getClassify = params => http.post('api/label/data/selectLabelList', params)
  // 获取商品
  getGoods = params => http.post('api/goods/pageManageByLabel', params)
  // 获取拼团商品
  getPinGoods = params => http.post('api/shop/ping/selectPingGoods', params)
  // 添加收藏
  addCollect = params => http.post('api/like/goods/addMyLike', params)
  // 删除收藏
  deleteCollect = params => http.post('api/like/goods/deleteMyLike', params)
  // 获取地址
  address = params => http.post('api/address/page', params)
  // 修改地址
  editAddress = params => http.post('api/address/edit', params)
  // 获取优惠券
  coupon = params => http.post('api/coupon/page', params)
  // 获取购物车
  getCardList = params => http.post('api/goods/card/selectGoodsCard', params)

  // 更新购物车
  addGoodsCard = params => http.post('api/goods/card/addGoodsCard', params, { 'content-type': 'application/json' })
  // 删除购物车
  deleteCard = params => http.post('api/goods/card/deleteGoodsCard', params)
  // 我的订单
  myOrder = params => http.post('api/order/selectMyOrderPage', params)
  // 获取订单详情
  getOrderDetails = params => http.post('api/order/selectMyOrderDetail', params)
  // 取消订单
  cancelOrder = params => http.post('api/order/cancelOrder', params)
  // 确认订单
  sureOrder = params => http.post('api/order/sureOrder', params)
  // 获取邮费
  calculateFreight = params => http.post('api/order/calculateFreight', params, { 'content-type': 'application/json' })

  // 获取商品详情
  selectGoodsDetail = params => http.post('api/goods/selectGoodsDetail', params)
  // 支付
  wxSign = params => http.post('api/order/wechatPay', params)

  // 拼团下单
  createPingOrder = params => http.post('api/order/createPingOrder', params)

  // 退款退货
  retreatGoods = params => http.post('api/order/doubleBack', params)
  // 售后列表
  afterService = params => http.post('api/order/refund/selectOrderRefund', params)
  // 售后详情
  getRefundDetails = params => http.post('api/order/refund/selectOrderRefundDetail', params)
  // 发送物流单号
  sendLogisticsNum = params => http.post('api/order/perfectRefundLogistics',params)
  // 删除订单
  delOrderShow = params => http.post('api/order/closeShow', params)


  // 查询历史搜索
  selectHistoryPage = params => http.post('api/searchHistory/selectHistoryPage', params)
  // 新增搜索历史
  saveHistory = params => http.post('api/searchHistory/saveHistory', params)
  deleteHistory = params => http.post('api/searchHistory/deleteHistory', params)
  

  copyGoods = params => http.post('api/goods/copy', params)
}

export default new API()
