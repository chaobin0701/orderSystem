// 购物车模块
export default {
  state: {
    goodsCart: [] //购物信息
  },
  actions: {
    // 新添
    insertGoods({ state, commit }, goods) {
      goods.goodsCount = 1;
      let index = state.goodsCart.findIndex(item => item._id === goods._id);

      if (index < 0) {
        state.goodsCart.push(goods);
      }
    },
    // 改变商品的数量
    changeGoodsCount({ state, commit }, { goodsId, num }) {
      let goods = state.goodsCart.find(item => item._id === goodsId);
      goods.goodsCount += num;
      state.goodsCart = JSON.parse(JSON.stringify(state.goodsCart));
    },
    // 删除
    removeGoods({ state, commit }, _id) {
      let index = state.goodsCart.findIndex(item => item._id === _id);
      state.goodsCart.splice(index, 1);
    },
    // 清空购物车
    removeAll({ state }) {
      state.goodsCart = [];
    }
  },
  mutations: {},
  getters: {
    // 计算总价
    totalAmount(state) {
      let total = 0;
      state.goodsCart.forEach(goods => {
        total += goods.goodsPrice * goods.goodsCount;
      });
      return total;
    }
  }
};
