const mongodb = require("../db/mongo");
const TABLENAME = "goodsCategory";

class GoodsCategoryService {
  // 添加商品类别
  saveGoodsCategory = async (obj) => {
    let result = await mongodb.save(TABLENAME, obj);
    return result;
  };

  // 删除商品类别
  removeGoodsCategory = async (_id) => {
    // todo 查询商品类型资料,当连接数量小于0时才可以删除
    let result = await mongodb.remove(TABLENAME, { _id });
    return result;
  };

  // 修改商品类别
  modifyGoodsCategory = async (_id, obj) => {
    // 提交修改数据
    let result = mongodb.update(TABLENAME, { _id }, obj);
    return result;
  };

  // 查询全部商品类别
  findAllGoodsCategory = async (conditions = {}, fields = {}) => {
    let result = await mongodb.find(TABLENAME, conditions, fields);
    return result;
  };
  // 根据id查询商品类别
  findGoodsCategoryById = async (_id, fields = {}) => {
    let result = await mongodb.findById(TABLENAME, _id, fields);
    return result;
  };
}

module.exports = new GoodsCategoryService();
