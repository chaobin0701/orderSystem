const mongodb = require("../../db/mongo");
const response = require("../../utils/response");
const GOODSTYPE_TABLENAME = "goodsType";
const { goodsType } = require("../../tables");

class gui {
  // 新增商品类型
  saveGoodsType = async (req, res) => {
    // 数据处理
    let where = {};
    Object.keys(goodsType).forEach((key) => {
      where[key] = req.body[key];
    });
    where.gt_count = 0; //初始的关联数量为0
    // 提交数据
    let result = await mongodb.save(GOODSTYPE_TABLENAME, where);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 删除商品类型
  removeGoodsType = async (req, res) => {
    let _id = req.body._id;
    // todo 查询商品类型资料,当连接数量小于0时才可以删除
    if (_id) {
      let result = await mongodb.remove(GOODSTYPE_TABLENAME, { _id });
      if (result === false) {
        response.error(res, "删除商品类型出错");
      } else {
        response.success(res);
      }
    } else {
      response.error(res, "缺少商品类型id");
    }
  };

  // 修改商品类型
  modifyGoodsType = async (req, res) => {
    // 数据处理
    let where = {};
    Object.keys(goodsType).forEach((key) => {
      where[key] = req.body[key];
    });
    let _id = req.body._id;
    // 提交修改数据
    let result = mongodb.update(GOODSTYPE_TABLENAME, { _id }, where);
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };

  // 查询商品类型
  findAllGoodsCategory = async (req, res) => {
    let result = null;
    if (req.query._id) {
      result = await mongodb.findById(GOODSTYPE_TABLENAME, req.query._id);
    } else {
      result = await mongodb.find(GOODSTYPE_TABLENAME, {});
    }
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };
}

module.exports = new gui();
