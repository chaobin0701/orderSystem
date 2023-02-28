const mongodb = require("../db/mongo");
const TABLENAME = "goodsType";

class GoodsTypeService {
  // 新增商品类型
  saveGoodsType = async (obj) => {
    let result = await mongodb.save(TABLENAME, obj);
    return result;
  };

  // 删除商品类型
  removeGoodsType = async (_id) => {
    let result = await mongodb.remove(TABLENAME, { _id });
    return result;
  };

  // 修改商品类型
  modifyGoodsType = async (_id, obj) => {
    let result = mongodb.update(TABLENAME, { _id }, obj);
    return result;
  };

  // 查询所有商品类型
  findAllGoodsCategory = async () => {
    let result = mongodb.find(TABLENAME, {});
    return result;
  };
  // 根据id查询商品类型
  findGoodsCategoryById = async (_id) => {
    let result = await mongodb.findById(TABLENAME, _id);
    return result;
  };
}

module.exports = new GoodsTypeService();
