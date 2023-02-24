export default {  
  namespaced: true,//开启命名空间
  actions:{
    // 保存用户 id
    saveUserId({commit,state},data){
      state.userId = data //保存id
      state.userState = true
      // 持久化存储
      uni.setStorageSync('userState',state.userState)
      uni.setStorageSync('userId',state.userId)
    }
  },
  mutations:{
    SaveUserId(state,data){
      state.userId = data
      state.userState = true
    }
  },
  state:{
    userId:'', //存放用户id
    userState:false, //用户的登陆状态
  },
  getters:{
    
  }
}