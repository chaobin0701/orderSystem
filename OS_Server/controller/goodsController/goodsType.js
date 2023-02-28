const response = require("../../utils/response");
const { goodsType } = require("../../tables");
const GoodsTypeService = require("../../service/goodsTypeService");

class GoodsTypeController {
  // 新增商品类型
  saveGoodsType = async (req, res) => {
    // 数据处理
    let obj = {};
    Object.keys(goodsType).forEach((key) => {
      obj[key] = req.body[key];
    });
    obj.gt_count = 0; //初始的关联数量为0
    // 提交数据
    let result = await GoodsTypeService.saveGoodsType(obj);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 删除商品类型
  removeGoodsType = async (req, res) => {
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
  };

  // 修改商品类型
  modifyGoodsType = async (req, res) => {
    // 数据处理
    let obj = {};
    Object.keys(goodsType).forEach((key) => {
      obj[key] = req.body[key];
    });
    let _id = req.body._id;
    // 提交修改数据
    let result = GoodsTypeService.modifyGoodsType(_id, obj);
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
      result = await GoodsTypeService.findGoodsCategoryById(req.query._id);
    } else {
      result = await GoodsTypeService.findAllGoodsCategory();
    }
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };
}

module.exports = new GoodsTypeController();
