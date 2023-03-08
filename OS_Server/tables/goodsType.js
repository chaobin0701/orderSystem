module.exports = {
  gt_name: {
    //类型名称
    type: String,
    required: [true, "缺少商品类型名称"],
  },
  gt_attribute: {
    //商品属性
    type: Array,
    default: [],
  },
  gt_specifications: {
    //商品规格
    type: Array,
    default: [],
  },
};
