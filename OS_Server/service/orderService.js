// order的信息的控制
const mongodb = require("../db/mongo");
const TABLENAME = "orders";
const goodsService = require("./goodsService");

class OrderService {
  // 新增订单
  async saveOrder(obj) {
    let result = await mongodb.save(TABLENAME, obj);
    obj.goodsInfo.forEach((goods) => {
      goodsService.goodsSell(goods._id, goods.goodsCount);
    });
    return result;
  }

  // 添加订单的评论
  async saveOrderAppraise(_id, score, appraise) {
    let result = await mongodb.update(TABLENAME, { _id }, { score, appraise });
    return result;
  }

  // 查询某个用户的订单
  async findOrderByUserId(customerId) {
    let result = await mongodb.find(TABLENAME, { customerId }, {});
    return result;
  }

  // 查询全部订单
  async findAll(currentPage, pageCount) {
    let recordCount = await this.findAllOrderCount();
    let model = mongodb.getConnection(TABLENAME);
    let result = await model.find({}).limit(pageCount).skip(currentPage);
    return { result, recordCount };
  }

  // 查询订单条数
  async findAllOrderCount() {
    let result = mongodb.count(TABLENAME, {});
    return result;
  }

  // 根据订单id查询订单
  findOrderById = async (_id) => {
    let result = await mongodb.findById(TABLENAME, _id, {});
    return result;
  };

  // 修改订单信息
  modifyOrder = async (_id, obj) => {
    let result = await mongodb.update(TABLENAME, { _id }, obj);
    return result;
  };

  // 修改订单状态
  modifyOrderState = async (_id, orderState) => {
    let result = mongodb.update(TABLENAME, { _id }, { orderState });
    return result;
  };
}
module.exports = new OrderService();
