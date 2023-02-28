const mongodb = require("../../db/mongo");
const TABLENAME = "goods_goodsCategory";
const goodsCategory = require("./goodsCategory");
const goods = require("./goods");

class G_GC_Service {
  /**
   * @des 添加关联
   * @param goods_id
   * @param goodsCategory_id
   */
  async saveRelevance(goods_id, goodsCategory_id) {
    if (!goods_id && !goodsCategory_id) {
      return "信息不完整";
    }
    let obj = {
      goods_id,
      goodsCategory_id,
    };
    // 判断是否已经存在关联,如果存在,返回关联 不重复添加
    if (await this.isRelevance(goods_id, goodsCategory_id)) {
      const id = await mongodb.save(TABLENAME, obj);
      return id;
    } else {
      return "关联信息已存在";
    }
  }

  /**
   * @des 删除单个关联,传递单个id时,删除全部关联
   * @param {goods_id,goodsCategory_id}
   */
  async removeRelevance(conditions) {
    // TODO 根据两个id的同时查询删除关联
    let result = await mongodb.remove(TABLENAME, { conditions });
    if (result) {
      return "删除成功";
    } else {
      return "删除失败";
    }
  }

  /**
   * @des 查询关联信息
   * @param { goods_id } 或者 { goodsCategory_id }
   * @param fields 过滤数据
   * */
  async findRelevanceOne(conditions, fields) {
    let result = await mongodb.findWhere(
      TABLENAME,
      conditions,
      {},
      { createdAt: 0, updatedAt: 0, __v: 0, ...fields }
    );
    return result;
  }

  /**
   * @des 根据商品id 查询关联信息
   * @param conditions 传递单个id或数组
   * */
  async findRelevanceByGoodsId(conditions) {
    if (conditions instanceof Array) {
      for (let i = 0; i < conditions.length; i++) {
        // 查找关联
        let { list } = await this.findRelevanceOne(
          { goods_id: conditions[i]._id },
          { goods_id: 0 }
        );
        // 利用关联id查找 商品类型的资料
        for (let x = 0; x < list.length; x++) {
          // list._id
        }
        conditions[i].goodsCategory = list;
      }
      return conditions;
    } else {
      let data = await mongodb.findWhere(TABLENAME, conditions, {});
      return data.list;
    }
  }

  /**
   *@des 判断是否存在关联关系
   * */
  async isRelevance(goods_id, goodsCategory_id) {
    if (!goods_id && !goodsCategory_id) {
      return "信息不完整";
    }
    let result = await mongodb.findWhere(
      TABLENAME,
      { goods_id, goodsCategory_id },
      {},
      {}
    );
    if (result.total === 0) {
      return true;
    } else if (result.total > 0) {
      // 关联关系已经存在
      return false;
    }
  }
}

module.exports = new G_GC_Service();
