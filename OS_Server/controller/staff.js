const response = require("../utils/response");
const { staff } = require("../tables");
const staffService = require("../service/staffService");

class StaffController {
  // 添加员工
  saveStaff = async (req, res) => {
    // 数据处理
    const obj = {};
    Object.keys(staff).forEach((key) => {
      obj[key] = req.body[key];
    });
    // 提交数据
    let result = await staffService.saveStaff(obj);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 删除员工
  removeStaff = async (req, res) => {
    let _id = req.body._id;
    if (_id) {
      let result = await staffService.removeStaff(_id);
      if (result === false) {
        response.error(res, "删除员工信息出错");
      } else {
        response.success(res);
      }
    } else {
      response.error(res, "缺少员工id");
    }
  };

  // 修改员工
  modifyStaff = async (req, res) => {
    // 数据处理
    let obj = {};
    Object.keys(staff).forEach((key) => {
      obj[key] = req.body[key];
    });
    let _id = req.body._id;
    // 提交修改数据
    let result = staffService.modifyStaff(_id, obj);
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };

  // 查询员工
  findStaff = async (req, res) => {
    let result = null;
    if (req.query._id) {
      result = await staffService.findStaffById(req.query._id);
    } else {
      result = await staffService.findAllStaff();
    }
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };
}

module.exports = new StaffController();
