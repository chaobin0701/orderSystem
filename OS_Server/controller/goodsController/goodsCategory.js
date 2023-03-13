const mongodb = require("../../db/mongo");
const response = require("../../utils/response");
const { goodsCategory } = require("../../tables");
const GoodsCategoryService = require("../../service/goodsCategoryService");
class GoodsCategoryController {
  // 添加商品类别
  saveGoodsCategory = async (req, res) => {
    try {
      
      const obj = {};
      Object.keys(goodsCategory).forEach((key) => {
        obj[key] = req.body[key];
      });
      // 提交数据
      let result = await GoodsCategoryService.saveGoodsCategory(
        obj,
        req.body.goods_goodsCategory
      );
      if (result === false) {
        response.error(res, "服务器错误");
      } else {
        response.success(res, result);
      }
    } catch (error) {
      response.error(res, "服务器错误(添加商品类别)");
    }
  };

  // 删除商品类别
  removeGoodsCategory = async (req, res) => {
    try {
      let _id = req.body._id;
      // todo 查询商品类型资料,当连接数量小于0时才可以删除
      if (_id) {
        let result = await GoodsCategoryService.removeGoodsCategory(_id);
        if (result === false) {
          response.error(res, "删除商品类别出错");
        } else {
          response.success(res);
        }
      } else {
        response.error(res, "缺少商品类别id");
      }
    } catch (error) {
      response.error(res, "服务器错误(删除商品类别)");
    }
  };

  // 修改商品类别
  modifyGoodsCategory = async (req, res) => {
    
    try {
      let obj = {};
      Object.keys(goodsCategory).forEach((key) => {
        obj[key] = req.body[key];
      });
      let _id = req.body._id;

      
      let result = await GoodsCategoryService.modifyGoodsCategory(
        _id,
        obj,
        req.body.goods_goodsCategory
      );
     response.success(res, result);
    } catch (error) {
      response.error(res, "服务器错误(修改商品类别)");
    }
  };

  // 查询商品类别
  findGoodsCategory = async (req, res) => {
    try {
      let result = null;
      if (req.query._id) {
        result = await GoodsCategoryService.findGoodsCategoryById(
          req.query._id
        );
      } else {
        result = await GoodsCategoryService.findAllGoodsCategory();
      }
     response.success(res, result);
    } catch (error) {
      response.error(res, "服务器错误(查询商品类别)");
    }
  };
}

module.exports = new GoodsCategoryController();
