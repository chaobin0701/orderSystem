const response = require("../utils/response");
const { foodtable } = require("../tables");
const foodtableService = require("../service/foodtableService");

class gui {
  // 添加餐桌
  saveFoodtable = async (req, res) => {
    // 数据处理
    const obj = {};
    Object.keys(foodtable).forEach((key) => {
      obj[key] = req.body[key];
    });
    // 提交数据
    let result = await foodtableService.saveFoodtable(obj);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };

  // 删除餐桌
  removeFoodtable = async (req, res) => {
    let _id = req.body._id;
    if (_id) {
      let result = await foodtableService.removeFoodtable(_id);
      if (result === false) {
        response.error(res, "删除餐桌出错");
      } else {
        response.success(res);
      }
    } else {
      response.error(res, "缺少餐桌id");
    }
  };

  // 修改餐桌
  modifyFoodtable = async (req, res) => {
    // 数据处理
    let obj = {};
    Object.keys(foodtable).forEach((key) => {
      obj[key] = req.body[key];
    });
    let _id = req.body._id;
    // 提交修改数据
    let result = foodtableService.modifyFoodtable(_id, obj);
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };

  // 查询餐桌
  findFoodtable = async (req, res) => {
    let result = null;
    if (req.query._id) {
      result = await foodtableService.findFoodtableById(req.query._id);
    } else {
      result = await foodtableService.findAllFoodtable();
    }
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };
}

module.exports = new gui();
