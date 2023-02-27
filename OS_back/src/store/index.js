import Vue from "vue"; //引入Vue核心库
import Vuex from "vuex"; //引入Vuex
Vue.use(Vuex); //应用Vuex插件
// 引入api
import { queryStaff } from "@/api/staff";
import { queryFoodTable } from "@/api/foodTable";
import { queryGoodsCategory } from "@/api/goodsCategory";
import { queryGoodsType } from "@/api/goodsType";
// 引入模块
import user from "./modules/user";
import getters from "./getters";
//准备actions对象——响应组件中用户的动作
const actions = {
  // 获取员工信息
  async queryStaff({ state }) {
    const result = await queryStaff();
    state.staffInfo = result.data;
  },
  // 获取餐桌信息
  async queryFoodTable({ state }) {
    const result = await queryFoodTable();
    state.foodtableInfo = result.data;
  },
  // 获取商品类别信息
  async queryGoodsType({ state }) {
    const result = await queryGoodsType();
    state.goodsTypeInfo = result.data;
  },
  // 获取商品类型信息
  async queryGoodsCategory({ state }) {
    const result = await queryGoodsCategory();
    state.goodsCategoryInfo = result.data;
  }
};
const mutations = {};
//准备state对象——保存具体的数据
const state = {
  staffInfo: [],
  foodtableInfo: [],
  categoryInfo: [],
  goodsTypeInfo: [],
  goodsCategoryInfo: []
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
