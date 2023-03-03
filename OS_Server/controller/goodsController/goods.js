const response = require("../../utils/response");
const { goods } = require("../../tables");
const GoodsService = require("../../service/goodsService");

class GoodsController {
  // 添加商品
  saveGoods = async (req, res) => {
    console.log('1')
    // 数据处理
    let obj = {};
    Object.keys(goods).forEach((key) => {
      obj[key] = req.body[key];
    });
    // 提交数据
    let result = await GoodsService.saveGoods(obj, req.body.goodsCategory);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 删除商品
  removeGoods = async (req, res) => {
    let _id = req.body._id;
    if (_id) {
      let result = await GoodsService.removeGoods(_id);
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
    let obj = {};
    Object.keys(goods).forEach((key) => {
      obj[key] = req.body[key];
    });
    let _id = req.body._id;
    // 提交修改数据
    let result = GoodsService.modifyGoods(_id, obj, req.body.goodsCategory);
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };

  // 查询商品
  async findGoods(req, res) {
    let result = null;
    if (req.query._id) {
      result = await GoodsService.findGoodsById(req.query._id);
    } else {
      result = await GoodsService.findAllGoods();
    }
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  }
}

module.exports = new GoodsController();
