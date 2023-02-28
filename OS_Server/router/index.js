const express = require("express");
const router = express.Router();

// 处理函数
const file_Handler = require("../controller/file");
const order_Handler1 = require("../controller/orderController");
// const dataAnalysis_Handler = require("../controller/dataAnalysis");
const goodstype_handler = require("../controller/goodsController/goodsType");
const goodsCategory_handler = require("../controller/goodsController/goodsCategory");
const goods_handler = require("../controller/goodsController/goods");
const staff_handler = require("../controller/staff");
const foodtable_handler = require("../controller/foodtable");
const customer_handler = require("../controller/customerController");



/* 订单 */
router.post("/order/", order_Handler1.saveOrder); // 添加新的订单接口
router.post("/order/appraise", order_Handler1.saveOrderAppraise); // 添加订单评价
router.get("/order/", order_Handler1.findAll); // 查询全部订单
router.get("/order/user", order_Handler1.findOrderByUserId); // 根据用户id查询订单
router.get("/order/detail", order_Handler1.findOrderById); // 根据订单id查询订单
router.put("/order/modify", order_Handler1.modifyOrder); // 修改订单状态
router.put("/order/modify", order_Handler1.modifyOrderState); // 修改订单状态

/* 商品类型 */
router.get("/goodstype", goodstype_handler.findAllGoodsCategory);
router.post("/goodstype", goodstype_handler.saveGoodsType);
router.put("/goodstype", goodstype_handler.modifyGoodsType);
router.delete("/goodstype", goodstype_handler.removeGoodsType);

/* 商品类别 */
router.get("/goodscategory", goodsCategory_handler.findGoodsCategory);
router.post("/goodscategory", goodsCategory_handler.saveGoodsCategory);
router.put("/goodscategory", goodsCategory_handler.modifyGoodsCategory);
router.delete("/goodscategory", goodsCategory_handler.removeGoodsCategory);

/* 商品 */
router.get("/goods", goods_handler.findGoods);
router.post("/goods", goods_handler.saveGoods);
router.put("/goods", goods_handler.modifyGoods);
router.delete("/goods", goods_handler.removeGoods);

/* 员工 */
router.get("/staff", staff_handler.findStaff);
router.post("/staff", staff_handler.saveStaff);
router.put("/staff", staff_handler.modifyStaff);
router.delete("/staff", staff_handler.removeStaff);

/* 餐桌 */
router.get("/foodtable", foodtable_handler.findFoodtable);
router.post("/foodtable", foodtable_handler.saveFoodtable);
router.put("/foodtable", foodtable_handler.modifyFoodtable);
router.delete("/foodtable", foodtable_handler.removeFoodtable);

/* 顾客信息 */
router.get("/customer", customer_handler.findCustomerInfo); // 获取用户信息
router.put("/customer", customer_handler.modifyCustomer); // 修改用户密码
router.post("/customer", customer_handler.saveCustomer); // 添加新用户
router.post("/customer/login", customer_handler.login); // 用户登录
router.put("/customer/info", customer_handler.modifyCustomerInfo); // 修改用户信息

/* 数据分析 */
// router.get("/dataAnalysis/category", dataAnalysis_Handler.categorySales); // 1.分类别销量分析
// router.get("/dataAnalysis/meals", dataAnalysis_Handler.mealsSales); // 2.分商品销量分析
// router.get("/dataAnalysis/dailySales", dataAnalysis_Handler.dailySales); // 3.订单状态分析
// 4.销售额分析

// 上传图片接口
router.post('/file/upload',file_Handler.img)

module.exports = router;
