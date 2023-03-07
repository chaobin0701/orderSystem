module.exports = {
  gc_name: {
    // 类别名称
    type: String,
    required: [true, "取消商品类别名称"],
  },
  gc_state: {
    // 类别状态
    type: Boolean,
    default: true,
  },
};
