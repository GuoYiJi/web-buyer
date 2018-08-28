// import Vue from 'vue'
// import Router from 'vue-router'

// Vue.use(Router)

// 路由导入
// const Home = require('./home.js')
const home = require('./home')
const my = require('./my')
const shopping = require('./shopping')
const classify = require('./classify')
const search = require('./search/search')
// 路由集合
const routes = [].concat(home, my, shopping, classify, search)
// console.log(routes)
module.exports = routes
// export default new Router({
//   // mode: 'history',
//   routes: routes
// })
