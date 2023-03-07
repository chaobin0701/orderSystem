const response = require("../../utils/response");
const { customer } = require("../../tables");
const customerService = require("../../service/customerService");

class CustomerController {
  // 添加新用户
  saveCustomer = async (req, res) => {
    // 数据处理
    const obj = {};
    Object.keys(customer).forEach((key) => {
      obj[key] = req.body[key];
    });
    // 提交数据
    let result = await customerService.saveCustomer(obj);
    if (result === false) {
      response.error(res, "服务器错误");
    } else {
      response.success(res, result);
    }
  };
  // 修改用户信息
  modifyCustomerInfo = async (req, res) => {
    let { customer_name, customer_birthday, customer_sex, _id } = req.body;
    let obj = { customer_name, customer_birthday, customer_sex, _id };
    // 提交修改数据
    let result = customerService.modifyCustomerInfo(_id, obj);
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };
  // 修改用户密码
  modifyCustomer = async (req, res) => {
    let { customer_pwd, _id } = req.body;
    let obj = { customer_pwd, _id };
    // 提交修改数据
    let result = customerService.modifyCustomer(_id, obj);
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };
  // 用户登录
  login = async (req, res) => {
    let { customer_pwd, customer_account } = req.body;
    if (!customer_pwd && !customer_account) {
      response.error(res, "缺少账号或密码");
    }
    let result = await customerService.login(customer_account, customer_pwd);
    if (result) {
      response.success(res, result);
    } else {
      response.error(res, "登录失败");
    }
  };
  // 获取用户信息
  findCustomerInfo = async (req, res) => {
    let result = null;
    if (req.query._id) {
      result = await customerService.findCustomerInfoById(req.query._id);
    } else {
      result = await customerService.findAllCustomerInfo();
    }
    if (result === false) {
      response.error(res, "数据库错误");
    } else {
      response.success(res, result);
    }
  };
}

module.exports = new CustomerController();
