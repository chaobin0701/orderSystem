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
    // 查询商品对应的关联信息和类别信息
    for (let i = 0; i < result.length; i++) {
      // 查询关联信息
      result[i].goodsCategory = await G_GC_Service.findRelevanceByGoodsId(
        result[i]._id
      );
      // 查询类别信息
      let gt_Info = await mongodb.findById("goodsType", result[i].goodsType_id);
      result[i].gt_name = gt_Info.gt_name;
    }

    return result;
  }
  // 根据id查询商品
  async findGoodsById(_id) {
    let result = await mongodb.findById(TABLENAME, _id);
    if (result) {
      result._doc.goodsCategory = await G_GC_Service.findRelevanceByGoodsId(
        result._id
      );
    }
    return result;
  }
}

module.exports = new GoodsService();
