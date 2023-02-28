const mongodb = require("../db/mongo");
const TABLENAME = "staff";

class StaffService {
  // 添加员工
  async saveStaff(obj) {
    let result = await mongodb.save(TABLENAME, obj);
    return result;
  }

  // 删除员工
  async removeStaff(_id) {
    let result = await mongodb.remove(TABLENAME, { _id });
    return result;
  }

  // 修改员工
  async modifyStaff(_id, obj) {
    let result = mongodb.update(TABLENAME, { _id }, obj);
    return result;
  }

  // 查询全部员工
  async findAllStaff() {
    let result = await mongodb.find(TABLENAME, {});
    return result;
  }
  // 查询单个员工
  async findStaffById(_id) {
    let result = await mongodb.findById(TABLENAME, _id);
    return result;
  }
}

module.exports = new StaffService();
