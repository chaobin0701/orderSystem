const orders = {
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

const goodsType = {
  gt_name: {
    //类型名称
    type: String,
    required: [true, "缺少商品类型名称"],
  },
  gt_count: {
    //关联数量
    type: Number,
    default: 0,
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

const goodsCategory = {
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
  // gc_goods: {
  //   // 类别商品
  //   type: Array,
  //   default: [],
  // },
};

const goods = {
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
  // goodsCategory: {
  //   // 商品类别
  //   type: Array,
  //   required: [true, "缺少商品类别"],
  // },
  goodsType_Id: {
    type: String,
    default: [],
  },
  goodsType: {
    // 商品类型
    type: Object,
  },
};

const staff = {
  staff_name: {
    // 员工姓名
    type: String,
    require: [true, "缺少员工姓名"],
  },
  staff_sex: {
    // 员工性别
    type: String,
    default: "男",
  },
  staff_age: {
    //员工年龄
    type: Number,
  },
  staff_salary: {
    // 员工薪资
    type: Number,
  },
  staff_state: {
    // 员工状态
    type: Boolean,
    default: true,
  },
};

const foodtable = {
  foodtable_state: {
    // 餐桌状态
    type: Boolean,
    default: true,
  },
  foodtable_number: {
    // 餐桌乘坐人数
    type: Number,
    default: 5,
  },
  foodtable_describe: {
    // 餐桌描述
    type: String,
  },
};

const customer = {
  customer_name: {
    // 顾客名
    type: String,
    required: [true, "缺少用户名"],
  },
  customer_birthday: {
    // 顾客生日
    type: String,
  },
  customer_sex: {
    // 顾客性别
    type: String,
    default: "男",
  },
  customer_pwd: {
    // 密码
    type: String,
    required: [true, "缺少pwd字段"],
  },
  customer_account: {
    // 账号
    type: String,
    required: [true, "缺少account字段"],
  },
};

const goods_goodsCategory = {
  goods_id: {
    type: String,
    required: [true, "缺少商品id"],
  },
  goodsCategory_id: {
    type: String,
    required: [true, "缺少类别id"],
  },
};
// 导出schema
module.exports = {
  orders,
  goodsType,
  goodsCategory,
  goods,
  staff,
  foodtable,
  customer,
  goods_goodsCategory,
};
