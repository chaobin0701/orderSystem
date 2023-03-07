const mongodb = require("../db/mongo");
const mongoose = require("mongoose");
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
  findAllGoodsCategory = async () => {
    const DB = mongodb.getConnection("goodsCategory"); //获取连接状态
    let result = await DB.aggregate([
      {
        $lookup: {
          from: "goods_goodsCategory",
          localField: "_id",
          foreignField: "goodsCategory_id",
          as: "goodsCategory",
        },
      },
      {
        $lookup: {
          from: "goods",
          localField: "goodsCategory.goods_id",
          foreignField: "_id",
          as: "goods",
        },
      },
    ]);
    return result;
  };

  // 根据id查询商品类别
  findGoodsCategoryById = async (_id) => {
    const DB = mongodb.getConnection("goodsCategory"); //获取连接状态
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
          foreignField: "goodsCategory_id",
          as: "goodsCategory",
        },
      },
      {
        $lookup: {
          from: "goods",
          localField: "goodsCategory.goods_id",
          foreignField: "_id",
          as: "goods",
        },
      },
    ]);
    return result;
  };
}

module.exports = new GoodsCategoryService();
