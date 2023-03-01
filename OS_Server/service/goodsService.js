const mongodb = require("../db/mongo");
const TABLENAME = "goods";
const G_GC_Service = require("./goods_goodsCategory"); //关联表service
class GoodsService {
  // 添加商品
  saveGoods = async (obj, goodsCategory) => {
    let result = await mongodb.save(TABLENAME, obj);
    //创建商品与商品类型的关联
    goodsCategory.forEach((item) => {
      G_GC_Service.saveRelevance(result._id, item.goodsCategory_id);
    });
    return result;
  };

  // 删除商品
  removeGoods = async (_id) => {
    let result = await mongodb.remove(TABLENAME, { _id });
    G_GC_Service.removeRelevance({ goods_id: _id }); // 根据id删除关联
    return result;
  };

  // 修改商品
  modifyGoods = async (_id, obj, goodsCategory) => {
    // 修改商品基本信息
    let result = mongodb.update(TABLENAME, { _id }, obj);
    // 修改商品的关联
    G_GC_Service.modifyRrlevance(_id, goodsCategory);
    return result;
  };

  // 查询全部商品
  async findAllGoods() {
    let result = await mongodb.find(TABLENAME, {});
    let list = await G_GC_Service.findRelevanceByGoodsId(result);
    result.forEach((item, index) => {
      item.goodsCategory = list[index];
    });
    return result;
  }
  // 根据id查询商品
  async findGoodsById(_id) {
    let result = await mongodb.findById(TABLENAME, _id);
    if (result) {
      let list = await G_GC_Service.findRelevanceByGoodsId([result]);
      result._doc.goodsCategory = list[0]; //特殊的赋值
    }
    return result;
  }
}

module.exports = new GoodsService();
