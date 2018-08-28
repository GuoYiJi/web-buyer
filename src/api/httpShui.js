// 封装httpApi
import http from './Shui'
// 接口命名规范

// 和路由命名一样，加模块的h后缀
// h_getIndex = params => http.post()
class API {
  // 登录
  authLogin = params => http.post('api/account/authLogin', params)
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
  // 获取优惠券
  coupon = params => http.post('api/coupon/page', params)
  // 获取购物车
  getCardList = params => http.post('api/goods/card/selectGoodsCard', params)
  // 删除购物车
  deleteCard = params => http.post('api/goods/card/deleteGoodsCard', params)
  // 获取订单详情
  getOrderDetails = params => http.post('api/order/selectMyOrderDetail', params)
  // 取消订单
  cancelOrder = params => http.post('api/order/cancelOrder', params)
  // 确认订单
  sureOrder = params => http.post('api/order /sureOrder', params)
  // 退款退货
  retreatGoods = params => http.post('api/order/doubleBack', params)
  // 售后列表
  afterService = params => http.post('api/order/refund/selectOrderRefund', params)
}

export default new API()
