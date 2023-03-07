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
    type: Number,
    required: [true, "staff_id(服务员工id)"],
  },
  diningFoodTable: String, //就餐餐桌
  diningFoodTableId: Number, //就餐餐桌Id
  customerName: {
    //顾客名称
    type: String,
    required: true,
  },
  customerId: {
    //顾客id
    type: Number,
    required: true,
  },
  orderAppraise: {
    //订单评价
    score: Number, //分数
    appraise: String, //评价
  },
  mealsInfo: [
    {
      meals_id: {
        //菜品id
        type: String,
        required: [true, "缺少meals_id(餐品id)"],
      },
      meals_name: {
        //菜品名称
        type: String,
        required: [true, "缺少meals_name(菜品名称)"],
      },
      meals_category: {
        //菜品类别
        type: String,
        required: [true, "缺少meals_category(菜品类别)"],
      },
      meals_categoryId: {
        //菜品类别ID
        type: Number,
        required: [true, "缺少meals_categoryId(菜品ID)"],
      },
      meals_price: {
        //菜品价格
        type: Number,
        required: [true, "缺少meals_price(菜品价格)"],
      },
      meals_describe: {
        //菜品详情
        type: String,
        required: [true, "缺少meals_describe(餐品详情)"],
      },
      meals_count: {
        //菜品数量
        type: Number,
        required: [true, "缺少meals_count(餐品数量)"],
      },
      meals_image: {
        //菜品图片
        type: String,
        required: false,
      },
    },
  ],
};
