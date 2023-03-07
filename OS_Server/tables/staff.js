module.exports = {
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