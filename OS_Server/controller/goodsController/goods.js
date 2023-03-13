const response = require("../../utils/response");
const { goods } = require("../../tables");
const GoodsService = require("../../service/goodsService");

class GoodsController {
  // 添加商品
  saveGoods = async (req, res) => {
    try {
      
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
    } catch (error) {
      response.error(res, "服务器错误(添加商品)");
    }
  };

  // 删除商品
  removeGoods = async (req, res) => {
    try {
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
    } catch (error) {
      response.error(res, "服务器错误(删除商品)");
    }
  };

  // 修改商品
  modifyGoods = async (req, res) => {
    try {
      
      let obj = {};
      Object.keys(goods).forEach((key) => {
        obj[key] = req.body[key];
      });
      let _id = req.body._id;
      
      let result = GoodsService.modifyGoods(_id, obj, req.body.goodsCategory);
     response.success(res, result);
    } catch (error) {
      response.error(res, "服务器错误(修改商品)");
    }
  };

  // 查询商品
  async findGoods(req, res) {
    try {
      let result = null;
      if (req.query._id) {
        result = await GoodsService.findGoodsById(req.query._id);
      } else {
        result = await GoodsService.findAllGoods();
      }
     response.success(res, result);
    } catch (error) {
      response.error(res, "服务器错误(查询商品)");
    }
  }
}

module.exports = new GoodsController();
