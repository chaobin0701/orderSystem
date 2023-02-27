// order的信息的控制
const mongodb = require("../db/mongo");
const response = require("../utils/response");

class gui {
  // 新增订单
  saveOrder = async (req, res) => {
    // 1.todo权限检测

    // 2.处理数据
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
    let where = {
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
    // todo 创建时间,修改时间,id 也可以在这个时候主动创建

    // 3.提交数据
    let result = await mongodb.save("orders", where);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 添加订单的评论
  saveOrderAppraise = async (req, res) => {
    const { _id, score, appraise } = req.body;

    let result = await mongodb.update("orders", { _id }, { score, appraise });
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 查询某个用户的订单
  findOrderByUserId = async (req, res) => {
    const { customerId } = req.query;
    let result = await mongodb.find("orders", { customerId });
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 查询全部订单
  findAll = async (req, res) => {
    const { currentPage, pageCount } = req.query;
    let recordCount = await mongodb.count("orders");
    let model = mongodb.getConnection("orders");
    let result = await model.find({}).limit(pageCount).skip(currentPage);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, { result, recordCount });
    }
  };

  // 查询订单条数
  findAllOrderCount = async (req, res) => {
    let result = mongodb.count("orders", {});
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 根据订单id查询订单
  findOrderById = async (req, res) => {
    const { _id } = req.query;
    let result = await mongodb.find("orders", { _id });
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 修改订单信息
  modifyOrder = async (req, res) => {
    const { _id } = req.body;
    let result = await mongodb.update("orders", { _id }, req.body);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 修改订单状态
  modifyOrderState = async (req, res) => {
    const { _id, orderState } = req.body;
    let result = mongodb.update("orders", { _id }, { orderState });
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };
}
module.exports = new gui();
