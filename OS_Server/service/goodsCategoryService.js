const mongodb = require("../db/mongo");
const TABLENAME = "goodsCategory";
const G_GC_Service = require("./goods_goodsCategory"); //关联表service

class GoodsCategoryService {
  // 添加商品类别
  saveGoodsCategory = async (obj, goods = []) => {
    let result = await mongodb.save(TABLENAME, obj);
    //创建商品类别与商品的关联
    goods.forEach((item) => {
      G_GC_Service.saveRelevance(item.goods_id, result._id);
    });
    return result;
  };

  // 删除商品类别
  removeGoodsCategory = async (_id) => {
    let result = await mongodb.remove(TABLENAME, { _id });
    G_GC_Service.removeRelevance({ goodsCategory_id: _id }); // 根据id删除关联
    return result;
  };

  // 修改商品类别
  modifyGoodsCategory = async (_id, obj, goods = []) => {
    // 提交修改数据
    let result = mongodb.update(TABLENAME, { _id }, obj);
    // 修改商品类别的关联
    G_GC_Service.modifyRrlevance(_id, goods);
    return result;
  };

  // 查询全部商品类别
  findAllGoodsCategory = async (conditions = {}, fields) => {
    let result = await mongodb.find(TABLENAME, conditions, fields);
    let list = await G_GC_Service.findRelevanceByGoodsCategoryId(result);
    result.forEach((item, index) => {
      item.goods = list[index];
    });
    return result;
  };
  // 根据id查询商品类别
  findGoodsCategoryById = async (_id, fields) => {
    let result = await mongodb.findById(TABLENAME, _id, fields);
    if (result) {
      let list = await G_GC_Service.findRelevanceByGoodsCategoryId([result]);
      result._doc.goods = list[0]; //特殊的赋值
    }
    return result;
  };
}

module.exports = new GoodsCategoryService();
