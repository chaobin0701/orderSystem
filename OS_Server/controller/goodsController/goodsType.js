const response = require("../../utils/response");
const { goodsType } = require("../../tables");
const GoodsTypeService = require("../../service/goodsTypeService");

class GoodsTypeController {
  // 新增商品类型
  saveGoodsType = async (req, res) => {
    try {
      let obj = {};
      Object.keys(goodsType).forEach((key) => {
        obj[key] = req.body[key];
      });
      // 提交数据
      let result = await GoodsTypeService.saveGoodsType(obj);
      if (result === false) {
        response.error(res, "服务器错误");
      } else {
        response.success(res, result);
      }
    } catch (error) {
      response.error(res, "服务器错误(新增商品类型)");
    }
  };

  // 删除商品类型
  removeGoodsType = async (req, res) => {
    try {
      let _id = req.body._id;
      if (_id) {
        let result = await GoodsTypeService.removeGoodsType(_id);
        if (result === false) {
          response.error(res, "删除商品类型出错");
        } else {
          response.success(res);
        }
      } else {
        response.error(res, "缺少商品类型id");
      }
    } catch (error) {
      response.error(res, "服务器错误(删除商品类型)");
    }
  };

  // 修改商品类型
  modifyGoodsType = async (req, res) => {
    try {
      let obj = {};
      Object.keys(goodsType).forEach((key) => {
        obj[key] = req.body[key];
      });
      let _id = req.body._id;
      
      let result = GoodsTypeService.modifyGoodsType(_id, obj);
     response.success(res, result);
    } catch (error) {
      response.error(res, "服务器错误(修改商品类型)");
    }
  };

  // 查询商品类型
  findAllGoodsCategory = async (req, res) => {
    try {
      let result = null;
      if (req.query._id) {
        result = await GoodsTypeService.findGoodsCategoryById(req.query._id);
      } else {
        result = await GoodsTypeService.findAllGoodsCategory();
      }
     response.success(res, result);
    } catch (error) {
      response.error(res, "服务器错误(修改商品类型)");
    }
  };
}

module.exports = new GoodsTypeController();
