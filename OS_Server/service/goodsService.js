const mongodb = require("../db/mongo");
const mongoose = require("mongoose");
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
    const DB = mongodb.getConnection("goods"); //获取连接状态
    let result = await DB.aggregate([
      {
        // 查询对应的关联信息
        $lookup: {
          from: "goods_goodsCategory",
          localField: "_id",
          foreignField: "goods_id",
          as: "goods_goodsCategory",
        },
      },
      {
        $project: {
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    ]);
    for (let i = 0; i < result.length; i++) {
      const item = result[i];
      for (let index = 0; index < item.goods_goodsCategory.length; index++) {
        const G_GC = item.goods_goodsCategory[index];
        let res = await mongodb.findById(
          "goodsCategory",
          G_GC.goodsCategory_id
        );
        item.goodsCategory = res;
      }
    }

    return result;
  }

  // 根据id查询商品
  async findGoodsById(_id) {
    const DB = mongodb.getConnection("goods"); //获取连接状态
    let result = await DB.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(_id),
        },
      },
      {
        $lookup: {
          from: "goods_goodsCategory",
          localField: "_id",
          foreignField: "goods_id",
          as: "goodsCategory",
        },
      },
      {
        $project: {
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    ]);
    return result;
  }

  // 根据商品类型id查询商品
  async findGoodsByGoodsTypeId(_id) {
    let result = mongodb.findWhere(
      "goods",
      {},
      {
        fields: { goodsType_id: _id },
      }
    );
    return result;
  }

  // 根据新的商品类型更改商品数据
  async updateGoodsByNewGoodsType() {}

  // 商品售出
  async goodsSell(_id, count) {
    let goods = await mongodb.findById(TABLENAME, _id);
    goods.goodsStock -= count;
    goods.goodsSalesVolume += count;
    goods.goodsStock = goods.goodsStock < 0 ? 0 : goods.goodsStock;
    mongodb.update(TABLENAME,{_id},goods)
  }
}

module.exports = new GoodsService();