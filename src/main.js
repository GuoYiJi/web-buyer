import Vue from 'vue'
import App from './App'
//css
import '@/assets/css/weui.css'
import '@/assets/css/init.css'

// Common Scss
import '@/assets/scss/index.scss';

//vuex
// import wx from 'wx'
// import store from '@/store'
import api from '@/api/index'
import MpvueRouterPatch from 'mpvue-router-patch'
import check from '@/plugins/check'
import { $Message, $Toast, $success } from '@/utils/index'
Vue.use(MpvueRouterPatch)

Vue.prototype.$API = api
Vue.prototype.$check = check
Vue.prototype.$Message = $Message
Vue.prototype.$Toast = $Toast
Vue.prototype.$success = $success
Vue.config.productionTip = false
const app = new Vue({

  // el: '#app',
  // store,
  ...App
})
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/home/login'],
    window: {
      // backgroundTextStyle: 'light',
      // navigationBarBackgroundColor: '#004098',
      // navigationBarTitleText: '世模大赛',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      'color': '#999999',
      'selectedColor': '#EE7527',
      'backgroundColor': '#ffffff',
      'list': [{
        'pagePath': 'pages/home/home',
        'text': '首页',
        'iconPath': '/static/img/home1.png',
        'selectedIconPath': '/static/img/home2.png'
      }, {
        'pagePath': 'pages/classify/classify',
        'text': '分类',
        'iconPath': '/static/img/fl1.png',
        'selectedIconPath': '/static/img/fl2.png'
      }, {
        'pagePath': 'pages/shopping/shopping',
        'text': '购物车',
        'iconPath': '/static/img/gwc1.png',
        'selectedIconPath': '/static/img/gwc2.png'
      }, {
        'pagePath': 'pages/my/my',
        'text': '我的',
        'iconPath': '/static/img/user1.png',
        'selectedIconPath': '/static/img/user2.png'
      }]
    }
  }
}
