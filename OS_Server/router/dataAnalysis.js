const express = require("express");
const router = express.Router();
const dataAnalysis_Handler = require("../controller/dataAnalysis");

// 1.分类别销量分析
router.get("/category",dataAnalysis_Handler.categorySales)

// 2.分商品销量分析
router.get("/meals",dataAnalysis_Handler.mealsSales)


// 3.订单状态分析
router.get("/dailySales",dataAnalysis_Handler.dailySales)


// 4.销售额分析


module.exports = router;
