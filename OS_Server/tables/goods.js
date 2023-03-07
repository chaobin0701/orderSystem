var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = {
  goodsName: {
    // 商品名
    type: String,
    required: [true, "缺少商品名称"],
  },
  goodsState: {
    // 商品状态
    type: Boolean,
    default: true,
  },
  goodsPrice: {
    // 商品价格
    type: Number,
    required: [true, "缺少商品价格"],
  },
  goodsStock: {
    // 商品库存
    type: Number,
    default: 0,
  },
  goodsSalesVolume: {
    // 商品销量
    type: Number,
    default: 0,
  },
  goodsDescribe: {
    // 商品描述
    type: String,
  },
  goodsImgs: {
    // 商品图片
    type: Array,
    default: [],
  },
  goodsType_id: {
    type: Schema.Types.ObjectId,
    required: [true, "缺少商品类别id"],
  },
  goodsType: {
    // 商品类型
    type: Object,
  },
};
