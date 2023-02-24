const express = require("express");
const router = express.Router();
const order_Handler1 = require("../controller/orderController")
const dataAnalysis_Handler = require("../controller/dataAnalysis");

// 添加新的订单接口
router.post("/order/", order_Handler1.saveOrder);
// 添加订单评价
router.post("/order/appraise", order_Handler1.saveOrderAppraise);
// 查询全部订单
router.get("/order/", order_Handler1.findAll);
// 根据用户id查询订单
router.get("/order/user", order_Handler1.findOrderByUserId);
// 根据订单id查询订单
router.get("/order/detail", order_Handler1.findOrderById);
// 修改订单状态
router.put("/order/modify", order_Handler1.modifyOrder);
// 修改订单信息
router.put("/order/modify", order_Handler1.modifyOrderState);


// 1.分类别销量分析
router.get("/dataAnalysis/category",dataAnalysis_Handler.categorySales)
// 2.分商品销量分析
router.get("/dataAnalysis/meals",dataAnalysis_Handler.mealsSales)
// 3.订单状态分析
router.get("/dataAnalysis/dailySales",dataAnalysis_Handler.dailySales)

// 4.销售额分析

module.exports = router;
