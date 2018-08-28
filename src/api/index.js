//封装httpApi
import http from './http'
// 接口命名规范

// 和路由命名一样，加模块的h后缀
// h_getIndex = params => http.post()
class API {
  jiekouTest = params => http.post('api/ads/list',params)
}

export default new API()