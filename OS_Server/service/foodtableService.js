const mongodb = require("../db/mongo");
const TABLENAME = "foodtable";

class foodtableService {
  // 添加餐桌
  async saveFoodtable(obj) {
    let result = await mongodb.save(TABLENAME, obj);
    return result;
  }
  // 删除餐桌
  async removeFoodtable(_id) {
    let result = await mongodb.remove(TABLENAME, { _id });
    return result;
  }
  // 修改餐桌
  async modifyFoodtable(_id, obj) {
    let result = mongodb.update(TABLENAME, { _id }, obj);
    return result;
  }
  // 查询单个餐桌
  async findFoodtableById(_id) {
    let result = await mongodb.findById(TABLENAME, _id);
    return result;
  }
  // 查询所有餐桌
  async findAllFoodtable() {
    let result = await mongodb.find(TABLENAME);
    return result;
  }
}

module.exports = new foodtableService();
