const response = require("../../utils/response");
const { foodtable } = require("../../tables");
const foodtableService = require("../../service/foodtableService");

class gui {
  // 添加餐桌
  saveFoodtable = async (req, res) => {
    try {
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
    } catch (error) {
      response.error(res, "服务器错误(添加餐桌");
    }
  };

  // 删除餐桌
  removeFoodtable = async (req, res) => {
    try {
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
    } catch (error) {
      response.error(res, "服务器错误(删除餐桌)");
    }
  };

  // 修改餐桌
  modifyFoodtable = async (req, res) => {
    try {
      let obj = {};
      Object.keys(foodtable).forEach((key) => {
        obj[key] = req.body[key];
      });
      let _id = req.body._id;

      let result = foodtableService.modifyFoodtable(_id, obj);
      response.success(res, result);
    } catch (error) {
      response.error(res, "服务器错误(修改餐桌)");
    }
  };

  // 查询餐桌
  findFoodtable = async (req, res) => {
    try {
      let result = null;
      if (req.query._id) {
        result = await foodtableService.findFoodtableById(req.query._id);
      } else {
        result = await foodtableService.findAllFoodtable();
      }
      response.success(res, result);
    } catch (error) {
      response.error(res, "服务器错误(查询餐桌)");
    }
  };
}

module.exports = new gui();
