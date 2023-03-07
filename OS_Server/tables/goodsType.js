module.exports = {
  gt_name: {
    //类型名称
    type: String,
    required: [true, "缺少商品类型名称"],
  },
  gt_attribute: {
    //商品属性
    type: Object,
  },
  gt_specifications: {
    //商品规格
    type: Object,
  },
};
