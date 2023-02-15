import { getToken, setToken, removeToken } from "@/utils/auth";
import { login } from "@/api/user";
export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  actions: {
    // 获取用户信息
    async getUserInfo(context) {},
    // 登录
    async login(context, data) {
      // 调用登录接口
      const result = await login(data)
      context.commit("setToken",result.token)
      return result
    },
    // 登出
    async logout({commit}){
      commit("removeToken") 
      commit("removeUserInfo")
    }
  },
  mutations: {
    // 设置用户信息
    setUserInfo(state, info) {
      state.userInfo = info;
    },
    // 删除用户信息
    removeUserInfo(state) {
      state.userInfo = {};
    },
    setToken(state, token) {
      state.token = token, // 设置vuex中的token数据
      setToken(token); //同步到缓存
    },
    removeToken(state) {
      state.token = null; //将vuex中的数据清空
      removeToken(); //同步到缓存
    }
  }
};
