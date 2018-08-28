// 封装httpApi
import http from './Jchan'
// 接口命名规范

// 和路由命名一样，加模块的h后缀
// h_getIndex = params => http.post()
class API {
  // 售后列表
  after = params => http.post('api/order/refund/selectOrderRefund', params)
  // 运费规则
  rules = params => http.post('api/configure/getConfigByName', params)
  // 我的订单
  myorder = params => http.post('api/order/selectMyOrderPage', params)
  // 优惠券
  myCoupon = params => http.post('api/coupon/page', params)
  // 详情
  obligation = params => http.post('api/order/selectMyOrderDetail', params)
  // 管理地址
  addres = params => http.post('api/address/add', params)
  pageaddres = params => http.post('api/address/page', params)
  editddres = params => http.post('api/address/edit', params)
  deleteddres = params => http.post('api/address/delete', params)
  // 推广链接
  prosave = params => http.post('api/form/save', params)
  prometaList = params => http.post('api/form/metaList', params)
  // 我的收藏
  deleteMyLike = params => http.post('api/like/goods/deleteMyLike', params)
  selectMyLike = params => http.post('api/like/goods/selectMyLike', params)
  // 申请售后
  doubleBack = params => http.post('api/order/doubleBack', params)
  // 首页红包
  pageByCreate = params => http.post('api/coupon/pageByCreate', params)
  getCoupon = params => http.post('api/coupon/getCoupon', params)
  // 首页搭配
  selectMGP = params => http.post('api/goods/selectMatchGoodsPage', params)
}

export default new API()
