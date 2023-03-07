module.exports = {
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