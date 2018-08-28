// 封装httpApi
import http from './Shui'
// 接口命名规范

// 和路由命名一样，加模块的h后缀
// h_getIndex = params => http.post()
class API {
  authLogin = params => http.post('api/account/authLogin', params)
  getTabs = params => http.post('api/label/data/selectLabelList', params)
  getClassify = params => http.post('api/label/data/selectLabelList', params)
  getGoods = params => http.post('api/goods/pageManageByLabel', params)
  getPinGoods = params => http.post('api/shop/ping/selectPingGoods', params)
  addCollect = params => http.post('api/like/goods/addMyLike', params)
  deleteCollect = params => http.post('api/like/goods/deleteMyLike', params)
  address = params => http.post('api/address/page', params)
  coupon = params => http.post('api/coupon/page', params)
  getCardList = params => http.post('api/goods/card/selectGoodsCard', params)
  deleteCard = params => http.post('api/goods/card/deleteGoodsCard', params)
  getOrderDetails = params => http.post('api/order/selectMyOrderDetail', params)
}

export default new API()
