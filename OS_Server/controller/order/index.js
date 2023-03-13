const response = require("../../utils/response");
const orderService = require("../../service/orderService");
const e = require("cors");
class OrderController {
  // 新增订单
  saveOrder = async (req, res) => {
    let customerName = "admin";
    let customerId = "admin";
    if (req.auth.role === "customer") {
      customerName = req.auth.customer_name;
      customerId = req.auth._id;
    }
    let orderPrice = req.body.orderPrice; //订单价格
    let diningMethod = req.body.diningMethod; //就餐方式
    let diningFoodTable = req.body.diningFoodTable; //就餐餐桌id
    let goodsInfo = req.body.goodsInfo; //点餐信息
    let obj = {
      orderPrice,
      diningMethod,
      customerName,
      customerId,
      goodsInfo,
    };
    if (diningMethod === "堂食") {
      obj.diningFoodTable = diningFoodTable;
    }
    // 3.提交数据
    try {
      let result = await orderService.saveOrder(obj);
      if (result === false) {
        response.error(res, "服务器错误");
      } else {
        response.success(res, result);
      }
    } catch (error) {
      res.send(error);
      return;
    }
  };

  // 添加订单的评论
  saveOrderAppraise = async (req, res) => {
    const { _id, score, appraise } = req.body;
    try {
      let result = await orderService.saveOrderAppraise(_id, score, appraise);
      if (result === false) {
        response.error(res, "服务器错误");
      } else {
        response.success(res, result);
      }
    } catch (error) {
      response.error(res, "服务器错误(添加订单的评论)");
    }
  };

  // 查询某个用户的订单
  findOrderByUserId = async (req, res) => {
    try {
      let customerId = req.auth._id;
      let result = await orderService.findOrderByUserId(customerId);
      if (result === false) {
        response.error(res, "服务器错误");
      } else {
        response.success(res, result);
      }
    } catch (error) {
      response.error(res, "服务器错误(查询某个用户的订单)");
    }
  };

  // 查询全部订单
  findAll = async (req, res) => {
    try {
      const { currentPage, pageCount } = req.query;
      const result = await orderService.findAll(currentPage, pageCount);
      if (result === false) {
        response.error(res, "服务器错误");
      } else {
        response.success(res, result);
      }
    } catch (error) {
      response.error(res, "服务器错误(查询全部订单)");
    }
  };

  // 查询订单条数
  findAllOrderCount = async (req, res) => {
    try {
      let result = orderService.findAllOrderCount();
      if (result === false) {
        response.error(res, "服务器错误");
      } else {
        response.success(res, result);
      }
    } catch (error) {
      response.error(res, "服务器错误(查询订单条数)");
    }
  };

  // 根据订单id查询订单
  findOrderById = async (req, res) => {
    try {
      const { _id } = req.query;
      let result = await orderService.findOrderById(_id);
      if (result === false) {
        response.error(res, "服务器错误");
      } else {
        response.success(res, result);
      }
    } catch (error) {
      response.error(res, "服务器错误(根据订单id查询订单)");
    }
  };

  // 修改订单信息
  modifyOrder = async (req, res) => {
    try {
      const { _id } = req.body;
      let result = await orderService.modifyOrder(_id, req.body);
      if (result === false) {
        response.error(res, "服务器错误");
      } else {
        response.success(res, result);
      }
    } catch (error) {
      response.error(res, "服务器错误(修改订单信息)");
    }
  };
}
module.exports = new OrderController();
