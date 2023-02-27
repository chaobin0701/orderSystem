const mongodb = require("../../db/mongo");
const response = require("../../utils/response");
const { mongo } = require("mongoose");
const GOODDSCATEGORY_TABLENAME = "goodsCategory";
const { goodsCategory } = require("../../tables");

class gui {
  // 添加商品类别
  saveGoodsCategory = async (req, res) => {
    // 数据处理
    const where = {};
    Object.keys(goodsCategory).forEach((key) => {
      where[key] = req.body[key];
    });
    // 提交数据
    let result = await mongodb.save(GOODDSCATEGORY_TABLENAME, where);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 删除商品类别
  removeGoodsCategory = async (req, res) => {
    let _id = req.body._id;
    // todo 查询商品类型资料,当连接数量小于0时才可以删除
    if (_id) {
      let result = await mongodb.remove(GOODDSCATEGORY_TABLENAME, { _id });
      if (result === false) {
        response.error(res, "删除商品类别出错");
      } else {
        response.success(res);
      }
    } else {
      response.error(res, "缺少商品类别id");
    }
  };

  // 修改商品类别
  modifyGoodsCategory = async (req, res) => {
    // 数据处理
    let where = {};
    Object.keys(goodsCategory).forEach((key) => {
      where[key] = req.body[key];
    });
    let _id = req.body._id;
    // 提交修改数据
    let result = mongodb.update(GOODDSCATEGORY_TABLENAME, { _id }, where);
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };

  // 查询商品类别
  findGoodsCategory = async (req, res) => {
    let result = null;
    if (req.query._id) {
      result = await mongodb.findById(GOODDSCATEGORY_TABLENAME, req.query._id);
    } else {
      result = await mongodb.find(GOODDSCATEGORY_TABLENAME, {});
    }
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };
}

module.exports = new gui();