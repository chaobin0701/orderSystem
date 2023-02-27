const mongodb = require("../db/mongo");
const response = require("../utils/response");
const FOODTABLE_TABLENAME = "foodtable";
const { foodtable } = require("../tables");

class gui {
  // 添加商品类别
  saveFoodtable = async (req, res) => {
    // 数据处理
    const where = {};
    Object.keys(foodtable).forEach((key) => {
      where[key] = req.body[key];
    });
    // 提交数据
    let result = await mongodb.save(FOODTABLE_TABLENAME, where);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 删除商品类别
  removeFoodtable = async (req, res) => {
    let _id = req.body._id;
    if (_id) {
      let result = await mongodb.remove(FOODTABLE_TABLENAME, { _id });
      if (result === false) {
        response.error(res, "删除餐桌出错");
      } else {
        response.success(res);
      }
    } else {
      response.error(res, "缺少餐桌id");
    }
  };

  // 修改商品类别
  modifyFoodtable = async (req, res) => {
    // 数据处理
    let where = {};
    Object.keys(foodtable).forEach((key) => {
      where[key] = req.body[key];
    });
    let _id = req.body._id;
    // 提交修改数据
    let result = mongodb.update(FOODTABLE_TABLENAME, { _id }, where);
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };

  // 查询商品类别
  findFoodtable = async (req, res) => {
    let result = null;
    if (req.query._id) {
      result = await mongodb.findById(FOODTABLE_TABLENAME, req.query._id);
    } else {
      result = await mongodb.find(FOODTABLE_TABLENAME, {});
    }
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };
}

module.exports = new gui();
