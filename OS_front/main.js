// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store'
import {
	$http
} from '@escook/request-miniprogram'
Vue.config.productionTip = false
Vue.prototype.$store = store
uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'http://127.0.0.1:3280/api'
// 请求开 之前做一些事情 
$http.beforeRequest =  function(options) {
	options.header = {
		'Accept': 'application/json, text/javascript, */*; q=0.01',
		'Authorization': "Bearer " + uni.getStorageSync("token")
	}
	uni.showLoading({
		title: '数据加载中...',
	})
	return options
}
// 请求完成之后做一些事情
$http.afterRequest = function(response) {
	uni.hideLoading()
	// token失效
	response = response.data
	if (response.statud === 401) {
		this.$store.dispatch("userInfo/logout")
		this.open('error', "token失效了,请重新登陆")
	}
	return response
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
