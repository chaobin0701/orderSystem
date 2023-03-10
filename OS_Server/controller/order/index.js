const response = require("../../utils/response");
const orderService = require("../../service/orderService");
class OrderController {
  // 新增订单
  saveOrder = async (req, res) => {
    let orderPrice = req.body.orderPrice; //订单价格
    let diningMethod = req.body.diningMethod; //就餐方式
    let diningFoodTable = req.body.diningFoodTable; //就餐餐桌id
    let customerName = req.body.customerName; //顾客名字
    let customerId = req.body.customerId === "admin" ? "adminadminad" : req.body.customerId; //顾客id
    let goodsInfo = req.body.goodsInfo; //点餐信息
    let obj = {
      orderPrice,
      diningMethod,
      diningFoodTable,
      customerName,
      customerId,
      goodsInfo,
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
      response.success(res, result);
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
