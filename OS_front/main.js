// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store'
import {$http} from '@escook/request-miniprogram'
Vue.config.productionTip = false
Vue.prototype.$store = store
uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://superbin.top:3290/api/front'
// 请求开 之前做一些事情 
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
// 请求完成之后做一些事情
$http.afterRequest = function() {
  uni.hideLoading()
}
Vue.prototype.$http = $http




App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
