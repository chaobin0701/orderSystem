//引入Vue核心库
import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './userInfo.js'
Vue.use(Vuex)

const actions = {
	// 获取菜单的数据
	getGoodsMsg({commit,state}, {goodsInfo,categoryInfo}) {
		state.goodsInfo = goodsInfo.filter(goods => {
			goods.goodsCount = 0
			return goods.goodsState
		})
		state.categoryInfo = categoryInfo
	},
	// 增加(add) or 减少(reduce)点餐数量
	changeGoodNumber({commit,state}, data) {
		let {id,change} = data
		// 查询索引值
		let index = state.goodsInfo.findIndex(item => {
			return item._id == id
		})
		// 判断是添加还是减少
		if (change === 'add') {
			if(state.goodsInfo[index].goodsStock < state.goodsInfo[index].goodsCount+1){
				return "超出商品数量"
			}
			return commit('addGoodNumber', index)
		} else {
			commit('reduceGoodNumber', index)
		}
	},
	// 获取餐桌数据
	getFoodTableMsg({commit,state}, data) {
		state.foodTable = data
		// 持久化存储餐桌数据
		uni.setStorageSync('foodTable', data)

	},
	// 改变选择的餐桌
	changeSelectedFoodTable({commit,state}, data) {
		// 改变餐桌编号
		state.selectedFoodTable = data.foodtable_describe
		// 改变餐桌id
		state.selectedFoodTable_id = data._id
	},
	// 添加用户订单输入
	getOrderData({commit,state}, data) {
		data = data.reduce((prev, next) => {
			if (prev.hasOwnProperty(next.O_id)) { // 包含这个属性
				prev[next.O_id].push(next)
			} else { // 不包含这个属性
				prev[next.O_id] = []
				prev[next.O_id].push(next)
			}
			return prev
		}, {})
		commit('GetOrderData', data)
	},
	// 清除信息
	clearMsg({commit,state}, data) {
		state.userInfo.userState = false; // 用户登录状态
		commit('ResetGoodCart')
	}
}

const mutations = {
	// 增加菜品数量
	addGoodNumber(state, index) {
		state.goodsInfo[index].goodsCount += 1
		uni.setStorageSync('goodsInfo', state.goodsInfo)
	},
	// 减少菜品数量
	reduceGoodNumber(state, index) {
		state.goodsInfo[index].goodsCount -= 1
		uni.setStorageSync('goodsInfo', state.goodsInfo)
	},
	// 添加用户订单输入
	GetOrderData(state, data) {
		state.orderData = data
	},
	// 重置购物车
	ResetGoodCart(state, data) {
		state.goodsInfo = state.goodsInfo.map(item => {
			item.goodsCount = 0
			return item
		})
	}
}

const state = {
	goodsInfo: [], // 存放原始的菜单数据
	categoryInfo: [],
	keyWord: '', // 搜索的关键词
	foodTable: [], // 餐桌信息
	selectedFoodTable: '', // 选择的餐桌
	selectedFoodTable_id: '', // 选择的餐桌的id
	orderData: '', // 订单数据
}

const getters = {
	// 返回处理好的菜单数据
	goodsMsg(state) {
		return state.categoryInfo.reduce((prev, next) => {
			if(next.gc_state){
				prev[next.gc_name] = state.goodsInfo.filter((goods) => {
					return goods.goodsCategory.gc_name === next.gc_name
				})
				return prev
			} else {
				return prev
			}
			
		}, {})
	},
	// 返回购物车的总价
	getTotalPrice(state) {
		let total = state.goodsInfo.reduce((prev, next) => {
			prev += next.goodsCount * next.goodsPrice
			return prev
		}, 0)
		return total
	},
	// 返回 keyWord对应的商品列表
	getGoodForKeyWord(state) {
		let goodsList = state.goodsInfo.filter(item => {
			return (item.goodsName.indexOf(state.keyWord) >= 0)
		})
		console.log(goodsList)
		return goodsList
	},
	// 返回已经添加到购物车的商品
	getSelectedGood(state) {
		let res = state.goodsInfo.filter(item => {
			return item.goodsCount > 0
		})
		// 排序
		res.sort((good1, good2) => {
			if (good1.M_class > good2.M_class) {
				return -1
			} else if (good1.M_class < good2.M_class) {
				return 1
			} else {
				return 0
			}
		})
		return res
	},
	// 返回餐桌信息
	getFoodTableInfo(state) {
		return state.foodTable
		// return state.foodTable.reduce((prev, next) => {
		// 	prev.push(next.foodtable_describe)
		// 	return prev
		// }, [])
	},
	// 返回加入购物车的餐份数
	shoppingCartNumber(state) {
		return state.goodsInfo.reduce((prev, next) => {
			prev += next.goodsCount
			return prev
		}, 0)
		return 0
	}
}


export default new Vuex.Store({
	actions,
	mutations,
	state,
	getters,
	modules: {
		userInfo
	}
})
