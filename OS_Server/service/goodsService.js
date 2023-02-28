const mongodb = require("../db/mongo");
const TABLENAME = "goods";

class GoodsService {
  // 添加商品
  saveGoods = async (obj) => {
    let result = await mongodb.save(TABLENAME, obj);
    //创建关联
    // req.body.goodsCategory.forEach(async (goodsCategory) => {
    //   await goods_goodsCategory.saveRelevance(result._id, goodsCategory._id);
    // });
    return result;
  };

  // 删除商品
  removeGoods = async (_id) => {
    let result = await mongodb.remove(TABLENAME, { _id });
    // goods_goodsCategory.removeRelevance({ goods_id: _id }); // 根据id删除关联
    return result;
  };

  // 修改商品
  modifyGoods = async (_id, obj) => {
    let result = mongodb.update(TABLENAME, { _id }, obj);
    return result;
  };

  // 查询全部商品
  async findAllGoods() {
    result = await mongodb.find(TABLENAME, {});
    return result;
  }
  // 根据id查询商品
  async findGoodsById(_id) {
    result = await mongodb.findById(_id);
    // goodsCatefory信息处理
    // result = await goods_goodsCategory.findRelevanceByGoodsId(result);
    return result;
  }
}

module.exports = new GoodsService();
