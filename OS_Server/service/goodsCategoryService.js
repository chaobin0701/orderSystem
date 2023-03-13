const mongodb = require("../db/mongo");
const mongoose = require("mongoose");
const TABLENAME = "goodsCategory";
const G_GC_Service = require("./goods_goodsCategory"); //关联表service

class GoodsCategoryService {
  // 添加商品类别
  saveGoodsCategory = async (obj, goods_goodsCategory = []) => {
    let result = await mongodb.save(TABLENAME, obj);
    //创建商品类别与商品的关联
    for (let index = 0; index < goods_goodsCategory.length; index++) {
      await G_GC_Service.saveRelevance(
        goods_goodsCategory[index].goods_id,
        goods_goodsCategory[index]._id
      );
    }
    return result;
  };

  // 删除商品类别
  removeGoodsCategory = async (_id) => {
    let result = await mongodb.remove(TABLENAME, { _id });
    await G_GC_Service.removeRelevance({ goodsCategory_id: _id }); // 根据id删除关联
    return result;
  };

  // 修改商品类别
  modifyGoodsCategory = async (_id, obj, goods_goodsCategory = []) => {
    
    let result = await mongodb.update(TABLENAME, { _id }, obj);
    // 修改商品类别的关联
    await G_GC_Service.modifyRrlevance(_id, goods_goodsCategory);
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
          as: "goods_goodsCategory",
        },
      },
      {
        $lookup: {
          from: "goods",
          localField: "goods_goodsCategory.goods_id",
          foreignField: "_id",
          as: "goodsInfo",
        },
      },
      {
        $project: {
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
          "goods_goodsCategory.__v": 0,
          "goods_goodsCategory.createdAt": 0,
          "goods_goodsCategory.updatedAt": 0,
          "goodsInfo.__v": 0,
          "goodsInfo.createdAt": 0,
          "goodsInfo.updatedAt": 0,
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
          as: "goods_goodsCategory",
        },
      },
      {
        $lookup: {
          from: "goods",
          localField: "goods_goodsCategory.goods_id",
          foreignField: "_id",
          as: "goodsInfo",
        },
      },
      {
        $project: {
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
          "goods_goodsCategory.__v": 0,
          "goods_goodsCategory.createdAt": 0,
          "goods_goodsCategory.updatedAt": 0,
          "goodsInfo.__v": 0,
          "goodsInfo.createdAt": 0,
          "goodsInfo.updatedAt": 0,
        },
      },
    ]);
    return result;
  };
}

module.exports = new GoodsCategoryService();
