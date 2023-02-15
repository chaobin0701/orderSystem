// 关于MySQL数据库的路由

const express = require("express");
const router = express.Router();

// 处理函数
const category_Handler = require("../controller/category");
const meals_Handler = require("../controller/meals");
const staff_Handler = require("../controller/staff");
const user_Handler = require("../controller/user");
const foodtable_Handler = require("../controller/foodTable");


// 新增餐品分类接口
router.post("/category", category_Handler.addCategory);
// 删除餐品分类接口
router.delete("/category", category_Handler.delCategory);
// 修改餐品分类信息接口
router.put("/category", category_Handler.modifyCategory);
// 查找餐品分类信息接口
router.get("/category", category_Handler.queryCategory);

// 新增餐品接口
router.post("/meals", meals_Handler.addMeals);
// 删除餐品接口
router.delete("/meals", meals_Handler.delMeals);
// 修改餐品信息接口
router.put("/meals", meals_Handler.modifyMeals);
// 查找餐品信息接口
router.get("/meals", meals_Handler.queryMeals);

// 新增员工接口
router.post("/staff", staff_Handler.addStaff);
// 删除员工接口
router.delete("/staff", staff_Handler.delStaff);
// 修改员工信息接口
router.put("/staff", staff_Handler.modifyStaff);
// 查找员工信息接口
router.get("/staff", staff_Handler.queryStaff);

// 新增餐桌接口
router.post("/foodtable", foodtable_Handler.addFoodTable);
// 删除餐桌接口
router.delete("/foodtable", foodtable_Handler.delFoodTable);
// 修改餐桌信息接口
router.put("/foodtable", foodtable_Handler.modifyFoodTable);
// 查找餐桌信息接口
router.get("/foodtable", foodtable_Handler.queryFoodTable);

// 获取用户信息
router.get("/user", user_Handler.queryUserInfo);
// 添加用户
router.post("/user", user_Handler.addUser);
// 修改用户信息
router.put("/user", user_Handler.modifyUser);
// 修改用户密码
router.put("/user/info", user_Handler.modifyUserInfo);
// 登陆
router.post("/user/login", user_Handler.login);
router.post("/user/islogin", (req, res) => {
  res.send("token未过期");
});

module.exports = router;
