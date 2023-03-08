var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = {
  orderPrice: {
    //订单价格
    type: Number,
    required: [true, "缺少orderPrice(订单价格)"],
  },
  orderState: {
    //订单状态
    type: String,
    required: [true, "缺少orderState(订单状态)"],
  },
  diningMethod: {
    //就餐方式
    type: String,
    default: "堂食",
  },
  staff: {
    //服务员工
    type: String,
    required: [true, "staff(服务员工)"],
  },
  staffId: {
    //服务员工id
    type: Schema.Types.ObjectId,
    required: [true, "staff_id(服务员工id)"],
  },
  diningFoodTable: String, //就餐餐桌
  diningFoodTableId: Schema.Types.ObjectId, //就餐餐桌Id
  customerName: {
    //顾客名称
    type: String,
    required: true,
  },
  customerId: {
    //顾客id
    type: Schema.Types.ObjectId,
    required: true,
  },
  orderAppraise: {
    //订单评价
    score: Number, //分数
    appraise: String, //评价
  },
  goodsInfo: [
    {
      goods_id: {
        // 商品id
        type: Schema.Types.ObjectId,
        required: [true, "缺少商品类别id"],
      },
      goodsCount: {
        // 商品数量
        type: Number,
        required: [true, "缺少商品数量"],
      },
      goodsName: {
        // 商品名
        type: String,
        required: [true, "缺少商品名称"],
      },
      goodsPrice: {
        // 商品价格
        type: Number,
        required: [true, "缺少商品价格"],
      },
      goodsImgs: {
        // 商品图片
        type: Array,
        default: [],
      },
      goodsType: {
        // 商品类型 | 规格
        type: Object,
      },
      goodsCategory: {
        // 商品类别
        type: String,
      },
    },
  ],
};
