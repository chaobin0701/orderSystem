// order的信息的控制
const mongodb = require("../../db/mongo");
const response = require("../../utils/response");
const GOODS_TABLENAME = "goods";
const { goods } = require("../../tables");

class gui {
  // 添加商品
  saveGoods = async (req, res) => {
    // 数据处理
    let where = {};
    Object.keys(goods).forEach((key) => {
      where[key] = req.body[key];
    });
    // 提交数据
    let result = await mongodb.save(GOODS_TABLENAME, where);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 删除商品
  removeGoods = async (req, res) => {
    let _id = req.body._id;
    // todo 查询商品类型资料,当连接数量小于0时才可以删除
    if (_id) {
      let result = await mongodb.remove(GOODS_TABLENAME, { _id });
      if (result === false) {
        response.error(res, "删除商品出错");
      } else {
        response.success(res);
      }
    } else {
      response.error(res, "缺少商品id");
    }
  };

  // 修改商品
  modifyGoods = async (req, res) => {
    // 数据处理
    let where = {};
    Object.keys(goods).forEach((key) => {
      where[key] = req.body[key];
    });
    let _id = req.body._id;
    // 提交修改数据
    let result = mongodb.update(GOODS_TABLENAME, { _id }, where);
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };

  // 查询商品
  findGoods = async (req, res) => {
    let result = null;
    if (req.query._id) {
      result = await mongodb.findById(GOODS_TABLENAME, req.query._id);
    } else {
      result = await mongodb.find(GOODS_TABLENAME, {});
    }
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };
}

module.exports = new gui();
