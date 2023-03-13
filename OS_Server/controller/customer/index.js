const response = require("../../utils/response");
const { customer } = require("../../tables");
const customerService = require("../../service/customerService");

class CustomerController {
  // 添加新用户
  saveCustomer = async (req, res) => {
    try {
      
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
    } catch (error) {
      response.error(error, "服务器错误(添加新用户");
    }
  };
  // 修改用户信息
  modifyCustomerInfo = async (req, res) => {
    try {
      let _id = req.auth._id;
      let { customer_name, customer_birthday, customer_sex } = req.body;
      let obj = { customer_name, customer_birthday, customer_sex, _id };
      
      let result = customerService.modifyCustomerInfo(_id, obj);
     response.success(res, result);
    } catch (error) {
      response.error(error, "服务器错误(修改用户信息");
    }
  };
  // 修改用户密码
  modifyCustomer = async (req, res) => {
    try {
      let _id = req.auth._id;
      let { customer_pwd } = req.body;
      let obj = { customer_pwd, _id };      
      let result = customerService.modifyCustomer(_id, obj);
     response.success(res, result);
    } catch (error) {
      response.error(error, "服务器错误(修改用户密码");
    }
  };
  // 用户登录
  login = async (req, res) => {
    try {
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
    } catch (error) {
      response.error(error, "服务器错误(用户登录");
    }
  };
  // 获取用户信息
  findCustomerInfo = async (req, res) => {
    try {
      let _id = req.auth._id;
      let role = req.auth.role;
      let result = null;
      if (role === "admin") {
        result = await customerService.findAllCustomerInfo();
      } else if (_id) {
        result = await customerService.findCustomerInfoById(_id);
      }

     response.success(res, result);
    } catch (error) {
      response.error(error, "服务器错误(获取用户信息");
    }
  };
}

module.exports = new CustomerController();
