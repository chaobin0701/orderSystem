var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = {
  goods_id: {
    type: Schema.Types.ObjectId,
    required: [true, "缺少商品id"],
  },
  goodsCategory_id: {
    type: Schema.Types.ObjectId,
    required: [true, "缺少类别id"],
  },
};
