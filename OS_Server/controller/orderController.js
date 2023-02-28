const response = require("../utils/response");
const orderService = require("../service/orderService");
class OrderController {
  // 新增订单
  saveOrder = async (req, res) => {
    // 处理数据
    let orderPrice = req.body.orderPrice; //订单价格
    let orderState = req.body.orderState; //订单状态
    let diningMethod = req.body.diningMethod; //就餐方式
    let staff = req.body.staff; //服务员工
    let staffId = req.body.staffId; //服务员工id
    let diningFoodTable = req.body.diningFoodTable; //就餐餐桌
    let diningFoodTableId = req.body.diningFoodTableId; //就餐餐桌id
    let customerName = req.body.customerName; //顾客名字
    let customerId = req.body.customerId; //顾客id
    let orderAppraise = req.body.orderAppraise; //订单评价
    let mealsInfo = req.body.mealsInfo; //点餐信息
    let obj = {
      orderPrice,
      orderState,
      diningMethod,
      staff,
      staffId,
      diningFoodTable,
      diningFoodTableId,
      customerName,
      customerId,
      orderAppraise,
      mealsInfo,
    };
    // 3.提交数据
    let result = await orderService.saveOrder(obj);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 添加订单的评论
  saveOrderAppraise = async (req, res) => {
    const { _id, score, appraise } = req.body;
    let result = await orderService.saveOrderAppraise(_id, score, appraise);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 查询某个用户的订单
  findOrderByUserId = async (req, res) => {
    const { customerId } = req.query;
    let result = await orderService.findOrderByUserId(customerId);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 查询全部订单
  findAll = async (req, res) => {
    const { currentPage, pageCount } = req.query;
    const result = await orderService.findAll(currentPage, pageCount);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res,result);
    }
  };

  // 查询订单条数
  findAllOrderCount = async (req, res) => {
    let result = orderService.findAllOrderCount();
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 根据订单id查询订单
  findOrderById = async (req, res) => {
    const { _id } = req.query;
    let result = await orderService.findOrderById(_id);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 修改订单信息
  modifyOrder = async (req, res) => {
    const { _id } = req.body;
    let result = await orderService.modifyOrder(_id, req.body);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 修改订单状态
  modifyOrderState = async (req, res) => {
    const { _id, orderState } = req.body;
    let result = orderService.modifyOrderState(_id, orderState);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };
}
module.exports = new OrderController();
