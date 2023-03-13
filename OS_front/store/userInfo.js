export default {
	namespaced: true, //开启命名空间
	actions: {
		// 保存用户信息
		saveUserInfo({
			commit,
			state
		}, data) {
			state.userInfo = data.userInfo
			state.token = data.token
			// 持久化存储
			uni.setStorageSync('userInfo', state.userInfo)
			uni.setStorageSync('token', state.token)
		},
		// 退出登录
		logout({
			commit,
			state
		}, data) {
			state.userInfo = null
			state.token = null
			// 持久化存储
			uni.setStorageSync('userInfo', null)
			uni.setStorageSync('token', null)
		}
	},
	state: {
		userId: '', //存放用户id
		userState: false, //用户的登陆状态
		userInfo: {}, //用户信息
		token: "", // token
	},
	getters: {

	}
}
