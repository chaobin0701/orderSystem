const mongodb = require("../db/mongo");
const TABLENAME = "goods_goodsCategory";
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
      console.log(`output->关联信息已存在`);
      return "关联信息已存在";
    }
  }

  /**
   * @des 删除单个关联,传递单个id时,删除全部关联
   * @param {goods_id,goodsCategory_id,_id}
   */
  async removeRelevance(conditions) {
    let result = await mongodb.remove(TABLENAME, conditions);
    console.log(`output->result`, result);
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
   * @param conditions 传递数组
   * */
  async findRelevanceByGoodsId(conditions) {
    let result = [];
    for (let i = 0; i < conditions.length; i++) {
      // 查找关联
      let { list } = await this.findRelevanceOne({
        goods_id: conditions[i]._id,
      });
      // 利用关联id查找 商品类型的资料
      for (let x = 0; x < list.length; x++) {
        let gc_info = await mongodb.findById(
          "goodsCategory",
          list[x].goodsCategory_id,
          {
            gc_name: 1,
            _id: 0,
          }
        );
        list[x].gc_name = gc_info?.gc_name;
      }
      result.push(list);
    }
    return result; //返回相应的goodsCategory数据
  }

  /**
   * @des 根据类别id 查询关联信息
   * @param conditions 传递数组
   * */
  async findRelevanceByGoodsCategoryId(conditions) {
    let result = [];
    for (let i = 0; i < conditions.length; i++) {
      // 查找关联
      let { list } = await this.findRelevanceOne({
        goodsCategory_id: conditions[i]._id,
      });
      // 利用关联id查找 商品的资料
      for (let x = 0; x < list.length; x++) {
        let goods_info = await mongodb.findById("goods", list[x].goods_id, {
          goodsName: 1,
          _id: 0,
        });
        list[x].goodsName = goods_info?.goodsName;
      }
      result.push(list);
    }
    return result; //返回相应的goodsCategory数据
  }

  /**
   * @des 判断是否存在关联关系
   * @param goods_id
   * @param goodsCategory_id
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

  /**
   * @des 修改依赖关系
   * @params _id 商品id 或者 商品类型id均可
   * @param newRrlevance 新的关联关系数组
   * @return newRrlevance
   * */
  async modifyRrlevance(_id, newRrlevance) {
    // 1.查询旧的关联关系
    let { list: oldRrlevance } = await mongodb.findWhere(TABLENAME, {
      $or: [{ goods_id: _id }, { goodsCategory_id: _id }],
    });
    // 2.判断出需要删除的关联关系
    const delRrlevance = oldRrlevance.map((oldItem) => {
      // 获取老数据在新数据中的索引
      let index = newRrlevance.find((newItem) => {
        return (
          newItem.goodsCategory_id === oldItem.goodsCategory_id &&
          newItem.goods_id === oldItem.goods_id
        );
      });
      // 当索引小于0 或 索引为undefined时，证明老索引在新数据中不存在
      if (index === undefined || index < 0) {
        return oldItem;
      } else {
        return false;
      }
    });
    // 3.进行添加和删除操作
    for (let i = 0; i < delRrlevance.length; i++) {
      if (delRrlevance[i]) {
        this.removeRelevance({ _id: delRrlevance[i]._id });
      }
    }
    for (let i = 0; i < newRrlevance.length; i++) {
      this.saveRelevance(
        newRrlevance[i].goods_id,
        newRrlevance[i].goodsCategory_id
      );
    }
  }
}
module.exports = new G_GC_Service();
