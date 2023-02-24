import Vue from "vue"; //引入Vue核心库
import Vuex from "vuex"; //引入Vuex
Vue.use(Vuex); //应用Vuex插件
// 引入api
import { queryStaff } from "@/api/staff";
import { queryFoodTable } from "@/api/foodTable";
import { queryCategory } from "@/api/category";
// 引入模块
import user from "./modules/user";
import getters from "./getters";
//准备actions对象——响应组件中用户的动作
const actions = {
  // 1.获取员工信息
  async queryStaff({ commit, state }, data) {
    const { result } = await queryStaff();
    commit("queryStaff", { data: result });
  },
  //2.获取餐桌信息
  async queryFoodTable({ commit, state }, data) {
    const { result } = await queryFoodTable();
    commit("queryFoodTable", { data: result });
  },
  // 3.获取分类信息
  async queryCategory({ commit, state }, data) {
    const { result } = await queryCategory();
    commit("queryCategory", { data: result });
  }
};
//准备mutations对象——修改state中的数据
const mutations = {
  queryStaff(state, { data }) {
    state.staffInfo = data;
  },
  queryFoodTable(state, { data }) {
    state.foodtableInfo = data;
  },
  queryCategory(state, { data }) {
    state.categoryInfo = data;
  }
};
//准备state对象——保存具体的数据
const state = {
  staffInfo: [],
  foodtableInfo: [],
  categoryInfo: []
};
//准备getters——加工state里的数据

//创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
  modules: {
    user
  }
});
