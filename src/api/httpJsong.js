//封装httpApi
import http from './Jsong'
// 接口命名规范

// 和路由命名一样，加模块的h后缀
// h_getIndex = params => http.post()
class API {
	authLogin = params => http.post('api/account/userLogin', params)
}

export default new API()